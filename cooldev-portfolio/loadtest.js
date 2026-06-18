const http = require('http');

const BASE_URL = 'http://localhost:3001';
const CONCURRENT_REQUESTS = 50;
const TOTAL_REQUESTS = 500;

function makeRequest(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            method,
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000
        };

        const start = Date.now();
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    time: Date.now() - start,
                    success: res.statusCode >= 200 && res.statusCode < 400
                });
            });
        });
        req.on('error', (err) => {
            resolve({ status: 0, time: Date.now() - start, success: false, error: err.message });
        });
        req.on('timeout', () => {
            req.destroy();
            resolve({ status: 0, time: Date.now() - start, success: false, error: 'timeout' });
        });
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function runLoadTest(endpoint, method, body, label) {
    const results = [];
    const batchSize = CONCURRENT_REQUESTS;
    const batches = Math.ceil(TOTAL_REQUESTS / batchSize);

    for (let b = 0; b < batches; b++) {
        const count = Math.min(batchSize, TOTAL_REQUESTS - b * batchSize);
        const promises = [];
        for (let i = 0; i < count; i++) {
            promises.push(makeRequest(endpoint, method, body));
        }
        const batchResults = await Promise.all(promises);
        results.push(...batchResults);
    }

    const times = results.map(r => r.time).sort((a, b) => a - b);
    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    return {
        label,
        total: results.length,
        success: successCount,
        failed: failCount,
        avgTime: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
        minTime: times[0],
        maxTime: times[times.length - 1],
        p50: times[Math.floor(times.length * 0.5)],
        p95: times[Math.floor(times.length * 0.95)],
        p99: times[Math.floor(times.length * 0.99)],
        rps: Math.round(results.length / (times[times.length - 1] / 1000))
    };
}

if (require.main === module) {
    (async () => {
        console.log('Starting load tests...');
        const health = await runLoadTest('/api/health', 'GET', null, 'GET /api/health');
        console.log(JSON.stringify(health));
        const chat = await runLoadTest('/api/chat', 'POST', { message: 'привет' }, 'POST /api/chat');
        console.log(JSON.stringify(chat));
        const project = await runLoadTest('/api/project', 'GET', null, 'GET /api/project');
        console.log(JSON.stringify(project));
    })();
}

module.exports = { makeRequest, runLoadTest };
