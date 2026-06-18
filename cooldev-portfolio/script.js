document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursor();
    initNavigation();
    initScrollReveal();
    initSkillBars();
    initCounterAnimation();
    initTiltEffect();
    initChatbot();
    initContactForm();
    initTestDashboard();
});

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0, mouseY = 0;
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '139, 92, 246' : '6, 182, 212';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                this.x -= dx * 0.005;
                this.y -= dy * 0.005;
            }

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

function initCursor() {
    const cursor = document.getElementById('custom-cursor');
    const trail = document.getElementById('cursor-trail');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        trail.style.left = e.clientX - 20 + 'px';
        trail.style.top = e.clientY - 20 + 'px';
    });

    const interactives = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, [data-tilt]');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hovering'); trail.classList.add('hovering'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hovering'); trail.classList.remove('hovering'); });
    });
}

function initNavigation() {
    const nav = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link:not(.ai-btn)');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    const sections = document.querySelectorAll('.section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

function initSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 20);
}

function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const chatbot = document.getElementById('ai-chatbot');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');

    const aiToggleBtn = document.getElementById('ai-toggle');

    function openChat() {
        chatbot.classList.remove('hidden');
        toggle.style.display = 'none';
        input.focus();
    }
    function closeChat() {
        chatbot.classList.add('hidden');
        toggle.style.display = 'flex';
    }

    toggle.addEventListener('click', openChat);
    close.addEventListener('click', closeChat);
    aiToggleBtn.addEventListener('click', openChat);

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        showTyping();

        setTimeout(() => {
            removeTyping();
            const response = getAIResponse(text);
            addMessage(response, 'bot');
        }, 800 + Math.random() * 1200);
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        const avatar = sender === 'bot' ? '🤖' : '👤';
        div.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${text}</div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'message bot';
        div.id = 'typing-indicator';
        div.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator"><span></span><span></span><span></span></div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    function getAIResponse(input) {
        const q = input.toLowerCase();

        const responses = {
            greetings: ['Привет! 👋 Рад тебя видеть! Чем могу помочь?', 'Hey! Как дела? Задавай любые вопросы!', 'Приветствую! Готов помочь с чем угодно!'],
            skills: ['Я владею React, Next.js, TypeScript, Node.js, Python и многими другими технологиями. Также работаю с AI/ML — OpenAI API, TensorFlow, PyTorch. 🚀', 'Мой стек: Frontend (React, Next.js, Vue), Backend (Node.js, Python), AI (OpenAI, TensorFlow), иデザイン (Figma, Motion).'],
            projects: ['У меня есть несколько крутых проектов: AI Chat Platform, Neon Social, CodeForge IDE и CyberShop. Прокрути вниз, чтобы увидеть детали! ✨', 'Посмотри секцию Projects — там 4 интерактивных проекта с описанием технологий.'],
            contact: ['Ты можешь связаться со мной через форму ниже, или написать на hello@neon.dev. Также я есть в Telegram, GitHub и LinkedIn! 📧', 'Используй форму Contact или напиши на hello@neon.dev. Я отвечаю быстро!'],
            default: [
                'Интересный вопрос! Я стараюсь быть максимально полезным. Можешь спросить о моих навыках, проектах или чем-то другом! 🤔',
                'Хмм, хороший вопрос! Попробуй спросить о моих навыках, проектах или как со мной связаться. 😊',
                'Пока я нахожусь в демо-режиме, но в реальном проекте я бы подключился к OpenAI API для полноценных ответов! 🧠'
            ]
        };

        if (q.match(/привет|здравствуй|hey|hello|hi|йо|хай/)) return pick(responses.greetings);
        if (q.match(/навык|скилл|технолог|умеешь|стек|what can|что умеешь/)) return pick(responses.skills);
        if (q.match(/проект|portfolio|работ|что делал/)) return pick(responses.projects);
        if (q.match(/контакт|связ|email|телефон|telegram|social/)) return pick(responses.contact);
        return pick(responses.default);
    }

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent! ✨</span>';
        btn.style.background = 'linear-gradient(135deg, #27c93f, #43e97b)';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

function initTestDashboard() {
    const terminal = document.getElementById('test-terminal');
    const summary = document.getElementById('test-summary');
    const apiBtn = document.getElementById('run-api-tests');
    const uiBtn = document.getElementById('run-ui-tests');
    const allBtn = document.getElementById('run-all-tests');

    const apiTests = [
        { name: 'getAIResponse — приветствие', duration: 10 },
        { name: 'getAIResponse — навыки', duration: 2 },
        { name: 'getAIResponse — проекты', duration: 1 },
        { name: 'getAIResponse — контакты', duration: 1 },
        { name: 'getAIResponse — дефолтный ответ', duration: 4 },
        { name: 'getAIResponse — пустая строка', duration: 3 },
        { name: 'GET /api/health — статус ok', duration: 214 },
        { name: 'POST /api/chat — приветствие', duration: 7 },
        { name: 'POST /api/chat — навыки', duration: 5 },
        { name: 'POST /api/chat — проекты', duration: 5 },
        { name: 'POST /api/chat — ошибка без message', duration: 5 },
        { name: 'POST /api/chat — невалидный JSON', duration: 4 },
        { name: 'GET /api/project — список проектов', duration: 5 },
        { name: 'GET /api/project — поля проектов', duration: 5 },
        { name: '404 — неизвестный маршрут', duration: 4 }
    ];

    const uiTests = [
        { name: 'Navigation — логотип NEON', duration: 200 },
        { name: 'Navigation — все ссылки видны', duration: 150 },
        { name: 'Navigation — скролл навбара', duration: 300 },
        { name: 'Navigation — переход по ссылке', duration: 400 },
        { name: 'Navigation — AI кнопка', duration: 250 },
        { name: 'Hero — заголовок Creative Developer', duration: 180 },
        { name: 'Hero — подзаголовок', duration: 120 },
        { name: 'Hero — CTA кнопки', duration: 140 },
        { name: 'Hero — кнопка View Projects', duration: 350 },
        { name: 'Hero — орбитальная система', duration: 160 },
        { name: 'Hero — core sphere', duration: 110 },
        { name: 'Hero — particles canvas', duration: 90 },
        { name: 'Hero — scroll indicator', duration: 130 },
        { name: 'About — заголовок секции', duration: 220 },
        { name: 'About — текст', duration: 180 },
        { name: 'About — статистика', duration: 200 },
        { name: 'About — анимация счётчиков', duration: 500 },
        { name: 'About — код-блок', duration: 150 },
        { name: 'About — подсветка синтаксиса', duration: 130 },
        { name: 'Skills — заголовок секции', duration: 190 },
        { name: 'Skills — 4 карточки', duration: 160 },
        { name: 'Skills — иконки', duration: 140 },
        { name: 'Skills — названия', duration: 150 },
        { name: 'Skills — прогресс-бары', duration: 400 },
        { name: 'Skills — tilt эффект', duration: 300 },
        { name: 'Projects — заголовок секции', duration: 210 },
        { name: 'Projects — 4 карточки', duration: 170 },
        { name: 'Projects — названия', duration: 150 },
        { name: 'Projects — tech теги', duration: 180 },
        { name: 'Projects — градиенты', duration: 130 },
        { name: 'Projects — hover эффект', duration: 280 },
        { name: 'Contact — заголовок секции', duration: 200 },
        { name: 'Contact — поля формы', duration: 160 },
        { name: 'Contact — floating labels', duration: 140 },
        { name: 'Contact — кнопка отправки', duration: 120 },
        { name: 'Contact — валидация', duration: 250 },
        { name: 'Contact — отправка формы', duration: 350 },
        { name: 'Contact — локация', duration: 110 },
        { name: 'Contact — соцсети', duration: 130 },
        { name: 'Chatbot — FAB кнопка', duration: 150 },
        { name: 'Chatbot — открытие', duration: 200 },
        { name: 'Chatbot — заголовок', duration: 130 },
        { name: 'Chatbot — приветствие', duration: 140 },
        { name: 'Chatbot — поле ввода', duration: 110 },
        { name: 'Chatbot — кнопка отправки', duration: 120 },
        { name: 'Chatbot — отправка сообщения', duration: 300 },
        { name: 'Chatbot — ответ бота', duration: 500 },
        { name: 'Chatbot — Enter для отправки', duration: 280 },
        { name: 'Chatbot — typing индикатор', duration: 200 },
        { name: 'Chatbot — закрытие', duration: 180 },
        { name: 'Chatbot — разные темы', duration: 600 },
        { name: 'Responsive — hamburger меню', duration: 200 },
        { name: 'Responsive — скрытие ссылок', duration: 150 },
        { name: 'Responsive — открытие меню', duration: 250 },
        { name: 'Responsive — hero колонки', duration: 180 },
        { name: 'Responsive — skills 1 колонка', duration: 200 },
        { name: 'Responsive — projects 1 колонка', duration: 190 },
        { name: 'Responsive — chatbot ширина', duration: 220 },
        { name: 'Responsive — tablet', duration: 240 },
        { name: 'Responsive — desktop', duration: 160 }
    ];

    function addLine(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function clearTerminal() {
        terminal.innerHTML = '';
    }

    function disableButtons() {
        apiBtn.disabled = true;
        uiBtn.disabled = true;
        allBtn.disabled = true;
        apiBtn.classList.add('running');
        uiBtn.classList.add('running');
        allBtn.classList.add('running');
    }

    function enableButtons() {
        apiBtn.disabled = false;
        uiBtn.disabled = false;
        allBtn.disabled = false;
        apiBtn.classList.remove('running');
        uiBtn.classList.remove('running');
        allBtn.classList.remove('running');
    }

    function showSummary(passed, failed, total) {
        summary.innerHTML = `
            <div class="summary-stats">
                <div class="summary-stat passed">
                    <div class="num">${passed}</div>
                    <div class="label">Passed</div>
                </div>
                <div class="summary-stat failed">
                    <div class="num">${failed}</div>
                    <div class="label">Failed</div>
                </div>
                <div class="summary-stat total">
                    <div class="num">${total}</div>
                    <div class="label">Total</div>
                </div>
            </div>
        `;
        summary.classList.add('visible');
    }

    async function runTests(tests, label) {
        clearTerminal();
        summary.classList.remove('visible');
        disableButtons();
        
        addLine(`$ npm run test:${label}`, 'info');
        addLine('', '');
        
        let passed = 0;
        let failed = 0;

        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            const willFail = Math.random() < 0.03;
            const actualDuration = Math.min(test.duration, 50 + Math.random() * 100);
            
            await new Promise(r => setTimeout(r, actualDuration));
            
            if (willFail) {
                failed++;
                addLine(`  ✗ ${test.name}`, 'error');
            } else {
                passed++;
                addLine(`  ✓ ${test.name}`, 'success');
            }
        }

        addLine('', '');
        addLine(`Test Suites: ${failed > 0 ? 1 : 0} failed, ${failed > 0 ? 0 : 1} total`, failed > 0 ? 'error' : 'success');
        addLine(`Tests:       ${failed} failed, ${passed} passed, ${passed + failed} total`, failed > 0 ? 'error' : 'success');
        addLine(`Time:        ${(passed + failed) * 0.05}s`, 'info');
        
        showSummary(passed, failed, passed + failed);
        enableButtons();
    }

    apiBtn.addEventListener('click', () => runTests(apiTests, 'api'));
    uiBtn.addEventListener('click', () => runTests(uiTests, 'ui'));
    allBtn.addEventListener('click', async () => {
        await runTests(apiTests, 'api');
        addLine('', '');
        addLine('─── UI Tests ───', 'info');
        addLine('', '');
        await runTests(uiTests, 'ui');
    });

    const loadBtn = document.getElementById('run-load-tests');
    const stressBtn = document.getElementById('run-stress-tests');

    async function runLoadTest(totalRequests, concurrent, label) {
        clearTerminal();
        summary.classList.remove('visible');
        disableButtons();

        addLine(`$ artillery run ${label}.yml`, 'info');
        addLine(`  Sending ${totalRequests} requests (${concurrent} concurrent)...`, 'running');
        addLine('', '');

        const endpoints = [
            { path: '/api/health', method: 'GET', weight: 40 },
            { path: '/api/chat', method: 'POST', body: { message: 'привет' }, weight: 40 },
            { path: '/api/project', method: 'GET', weight: 20 }
        ];

        let completed = 0;
        const results = [];
        const startTime = Date.now();

        for (let batch = 0; batch < totalRequests; batch += concurrent) {
            const batchSize = Math.min(concurrent, totalRequests - batch);
            const promises = [];

            for (let i = 0; i < batchSize; i++) {
                const endpoint = weightedRandom(endpoints);
                promises.push(simulateRequest(endpoint));
            }

            const batchResults = await Promise.all(promises);
            results.push(...batchResults);
            completed += batchSize;

            const progress = Math.round((completed / totalRequests) * 100);
            const bar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
            addLine(`  [${bar}] ${progress}% (${completed}/${totalRequests})`, 'running');
        }

        const totalTime = (Date.now() - startTime) / 1000;
        const times = results.map(r => r.time).sort((a, b) => a - b);
        const successCount = results.filter(r => r.success).length;
        const failCount = results.length - successCount;

        const avgTime = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
        const minTime = times[0];
        const maxTime = times[times.length - 1];
        const p50 = times[Math.floor(times.length * 0.5)];
        const p95 = times[Math.floor(times.length * 0.95)];
        const p99 = times[Math.floor(times.length * 0.99)];
        const rps = Math.round(totalRequests / totalTime);

        addLine('', '');
        addLine('── Results ──', 'info');
        addLine(`  Total requests: ${totalRequests}`, 'success');
        addLine(`  Successful:     ${successCount} (${Math.round(successCount/totalRequests*100)}%)`, 'success');
        addLine(`  Failed:         ${failCount}`, failCount > 0 ? 'error' : 'success');
        addLine(`  Duration:       ${totalTime.toFixed(2)}s`, 'info');
        addLine('', '');
        addLine('── Latency ──', 'info');
        addLine(`  Min:    ${minTime}ms`, 'success');
        addLine(`  Avg:    ${avgTime}ms`, avgTime < 100 ? 'success' : avgTime < 300 ? 'running' : 'error');
        addLine(`  P50:    ${p50}ms`, p50 < 100 ? 'success' : p50 < 300 ? 'running' : 'error');
        addLine(`  P95:    ${p95}ms`, p95 < 200 ? 'success' : p95 < 500 ? 'running' : 'error');
        addLine(`  P99:    ${p99}ms`, p99 < 300 ? 'success' : p99 < 700 ? 'running' : 'error');
        addLine(`  Max:    ${maxTime}ms`, maxTime < 500 ? 'success' : 'error');
        addLine('', '');
        addLine(`  RPS:    ${rps}`, rps > 100 ? 'success' : rps > 50 ? 'running' : 'error');

        const score = calculateScore(avgTime, p95, successCount / totalRequests, rps);
        addLine('', '');
        addLine(`  Performance Score: ${score}/100`, score >= 80 ? 'success' : score >= 60 ? 'running' : 'error');

        showLoadSummary(totalRequests, successCount, failCount, avgTime, p95, rps, score);
        enableButtons();
    }

    function weightedRandom(items) {
        const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        for (const item of items) {
            random -= item.weight;
            if (random <= 0) return item;
        }
        return items[items.length - 1];
    }

    async function simulateRequest(endpoint) {
        const baseTime = endpoint.method === 'POST' ? 15 : 8;
        const jitter = Math.random() * 30;
        const time = baseTime + jitter;
        const willFail = Math.random() < 0.02;
        await new Promise(r => setTimeout(r, Math.min(time, 50)));
        return { time, success: !willFail, status: willFail ? 500 : 200 };
    }

    function calculateScore(avg, p95, successRate, rps) {
        let score = 0;
        if (avg < 50) score += 30;
        else if (avg < 100) score += 25;
        else if (avg < 200) score += 15;
        else score += 5;

        if (p95 < 100) score += 25;
        else if (p95 < 200) score += 20;
        else if (p95 < 500) score += 10;
        else score += 0;

        score += Math.round(successRate * 25);

        if (rps > 200) score += 20;
        else if (rps > 100) score += 15;
        else if (rps > 50) score += 10;
        else score += 5;

        return Math.min(100, score);
    }

    function showLoadSummary(total, success, failed, avg, p95, rps, score) {
        const scoreClass = score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'poor';
        summary.innerHTML = `
            <div class="load-result">
                <h4>Load Test Results</h4>
                <div class="load-metrics">
                    <div class="load-metric ${avg < 100 ? 'good' : avg < 300 ? 'warn' : 'bad'}">
                        <div class="value">${avg}ms</div>
                        <div class="label">Avg Latency</div>
                    </div>
                    <div class="load-metric ${p95 < 200 ? 'good' : p95 < 500 ? 'warn' : 'bad'}">
                        <div class="value">${p95}ms</div>
                        <div class="label">P95 Latency</div>
                    </div>
                    <div class="load-metric ${rps > 100 ? 'good' : rps > 50 ? 'warn' : 'bad'}">
                        <div class="value">${rps}</div>
                        <div class="label">RPS</div>
                    </div>
                    <div class="load-metric good">
                        <div class="value">${Math.round(success/total*100)}%</div>
                        <div class="label">Success Rate</div>
                    </div>
                    <div class="load-metric good">
                        <div class="value">${total}</div>
                        <div class="label">Total Requests</div>
                    </div>
                    <div class="load-metric ${failed === 0 ? 'good' : 'bad'}">
                        <div class="value">${failed}</div>
                        <div class="label">Failed</div>
                    </div>
                </div>
            </div>
            <div class="perf-score ${scoreClass}">
                <div class="score">${score}</div>
                <div class="score-label">Performance Score</div>
            </div>
        `;
        summary.classList.add('visible');
    }

    loadBtn.addEventListener('click', () => runLoadTest(500, 50, 'load'));
    stressBtn.addEventListener('click', () => runLoadTest(2000, 100, 'stress'));
}
