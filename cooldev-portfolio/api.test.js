const http = require('http');
const { server, getAIResponse } = require('./api');

let baseUrl;

beforeAll((done) => {
    server.listen(0, () => {
        const { port } = server.address();
        baseUrl = `http://localhost:${port}`;
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, baseUrl);
        const options = {
            method,
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            headers: { 'Content-Type': 'application/json' }
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ status: res.statusCode, body: JSON.parse(data) });
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

describe('getAIResponse unit tests', () => {
    test('greeting returns welcome message', () => {
        const res = getAIResponse('привет');
        expect(res).toMatch(/Привет|привет|Hello|Hey/i);
    });

    test('skills question returns tech stack', () => {
        const res = getAIResponse('что ты умеешь');
        expect(res).toMatch(/React|Node|Python|AI/i);
    });

    test('project question returns project list', () => {
        const res = getAIResponse('расскажи о проектах');
        expect(res).toMatch(/проект|Project|Chat|Social/i);
    });

    test('contact question returns contact info', () => {
        const res = getAIResponse('как связаться');
        expect(res).toMatch(/email|form|связаться|Telegram/i);
    });

    test('unknown question returns default response', () => {
        const res = getAIResponse('xyz123 random');
        expect(res).toBeTruthy();
        expect(typeof res).toBe('string');
    });

    test('handles empty string', () => {
        const res = getAIResponse('');
        expect(typeof res).toBe('string');
    });
});

describe('GET /api/health', () => {
    test('returns status ok', async () => {
        const { status, body } = await request('GET', '/api/health');
        expect(status).toBe(200);
        expect(body.status).toBe('ok');
        expect(body.uptime).toBeGreaterThanOrEqual(0);
    });
});

describe('POST /api/chat', () => {
    test('responds to greeting', async () => {
        const { status, body } = await request('POST', '/api/chat', { message: 'привет' });
        expect(status).toBe(200);
        expect(body.response).toBeTruthy();
        expect(body.timestamp).toBeTruthy();
    });

    test('responds to skills question', async () => {
        const { status, body } = await request('POST', '/api/chat', { message: 'что умеешь' });
        expect(status).toBe(200);
        expect(body.response).toMatch(/React|Node|Python/i);
    });

    test('responds to project question', async () => {
        const { status, body } = await request('POST', '/api/chat', { message: 'твои проекты' });
        expect(status).toBe(200);
        expect(body.response).toBeTruthy();
    });

    test('returns 400 when message missing', async () => {
        const { status, body } = await request('POST', '/api/chat', {});
        expect(status).toBe(400);
        expect(body.error).toBeTruthy();
    });

    test('returns 400 for invalid JSON body', async () => {
        const { status, body } = await request('POST', '/api/chat', { message: 123 });
        expect(status).toBe(400);
    });
});

describe('GET /api/project', () => {
    test('returns list of projects', async () => {
        const { status, body } = await request('GET', '/api/project');
        expect(status).toBe(200);
        expect(Array.isArray(body.projects)).toBe(true);
        expect(body.projects.length).toBe(4);
    });

    test('each project has required fields', async () => {
        const { body } = await request('GET', '/api/project');
        body.projects.forEach(project => {
            expect(project.id).toBeDefined();
            expect(project.title).toBeDefined();
            expect(Array.isArray(project.tech)).toBe(true);
        });
    });
});

describe('404 handling', () => {
    test('unknown route returns 404', async () => {
        const { status, body } = await request('GET', '/api/unknown');
        expect(status).toBe(404);
        expect(body.error).toBe('Not found');
    });
});
