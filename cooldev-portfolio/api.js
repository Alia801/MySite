const http = require('http');
const url = require('url');

const PORT = 3001;

function getAIResponse(message) {
    const q = message.toLowerCase();

    if (q.match(/привет|здравствуй|hey|hello|hi|йо|хай/)) {
        return 'Привет! 👋 Рад тебя видеть! Чем могу помочь?';
    }
    if (q.match(/навык|скилл|технолог|умеешь|стек|what can|что умеешь/)) {
        return 'Я владею React, Next.js, TypeScript, Node.js, Python и многими другими технологиями. Также работаю с AI/ML — OpenAI API, TensorFlow, PyTorch. 🚀';
    }
    if (q.match(/проект|portfolio|работ|что делал/)) {
        return 'У меня есть несколько крутых проектов: AI Chat Platform, Neon Social, CodeForge IDE и CyberShop. ✨';
    }
    if (q.match(/контакт|связ|email|телефон|telegram|social/)) {
        return 'Ты можешь связаться со мной через форму на сайте, или написать на hello@neon.dev. 📧';
    }
    return 'Интересный вопрос! Попробуй спросить о моих навыках, проектах или как со мной связаться. 🤔';
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    const parsed = url.parse(req.url, true);

    if (parsed.pathname === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { message } = JSON.parse(body);
                if (!message || typeof message !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'message is required' }));
                }
                const response = getAIResponse(message);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ response, timestamp: Date.now() }));
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    if (parsed.pathname === '/api/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    }

    if (parsed.pathname === '/api/project' && req.method === 'GET') {
        const projects = [
            { id: 1, title: 'AI Chat Platform', tech: ['Next.js', 'OpenAI', 'WebSocket'] },
            { id: 2, title: 'Neon Social', tech: ['React Native', 'Firebase', 'AR Kit'] },
            { id: 3, title: 'CodeForge IDE', tech: ['TypeScript', 'Docker', 'LSP'] },
            { id: 4, title: 'CyberShop', tech: ['Next.js', 'Stripe', 'Three.js'] }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ projects }));
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

if (require.main === module) {
    server.listen(PORT, () => console.log(`API server running on port ${PORT}`));
}

module.exports = { server, getAIResponse };
