# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: about.spec.js >> About Section >> about section title displays
- Location: ui-tests\about.spec.js:11:5

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Tearing down "context" exceeded the test timeout of 30000ms.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: NEON NEON NEON
      - text: .DEV
    - generic [ref=e5]:
      - link "Home" [ref=e6] [cursor=pointer]:
        - /url: "#hero"
      - link "About" [ref=e7] [cursor=pointer]:
        - /url: "#about"
      - link "Skills" [ref=e8] [cursor=pointer]:
        - /url: "#skills"
      - link "Projects" [ref=e9] [cursor=pointer]:
        - /url: "#projects"
      - link "Contact" [ref=e10] [cursor=pointer]:
        - /url: "#contact"
      - button "AI Assistant" [ref=e11]
  - generic [ref=e13]:
    - paragraph [ref=e14]: Welcome to my digital universe
    - heading "Creative Developer & Designer" [level=1] [ref=e15]:
      - generic [ref=e16]: Creative
      - generic [ref=e17]: Developer
      - generic [ref=e18]: "& Designer"
    - paragraph [ref=e19]: Building immersive digital experiences with code, creativity, and AI
    - generic [ref=e20]:
      - link "View Projects" [ref=e21]:
        - /url: "#projects"
      - link "Get In Touch" [ref=e22]:
        - /url: "#contact"
    - paragraph [ref=e26]: Scroll Down
  - generic [ref=e37]:
    - heading "01. About Me" [level=2] [ref=e38]:
      - generic [ref=e39]: "01."
      - text: About Me
    - generic [ref=e40]:
      - generic [ref=e41]:
        - paragraph [ref=e42]: I'm a full-stack developer with a passion for creating beautiful, functional, and immersive digital experiences. With expertise in modern web technologies and AI, I bring ideas to life through clean code and stunning visuals.
        - paragraph [ref=e43]: My journey in tech started with curiosity and evolved into a deep love for crafting solutions that make a difference. I believe in the power of technology to transform ideas into reality.
        - generic [ref=e44]:
          - generic [ref=e45]:
            - text: 0+
            - generic [ref=e46]: Years Experience
          - generic [ref=e47]:
            - text: 0+
            - generic [ref=e48]: Projects Done
          - generic [ref=e49]:
            - text: 0+
            - generic [ref=e50]: Happy Clients
      - generic [ref=e52]:
        - generic [ref=e57]: developer.ts
        - code [ref=e59]: "const developer = { name: \"NEON.DEV\", skills: [\"React\", \"Next.js\", \"Node\"], passion: \"Building the future\", code: () => \"✨ Magic\", };"
  - generic [ref=e61]:
    - heading "02. Skills" [level=2] [ref=e62]:
      - generic [ref=e63]: "02."
      - text: Skills
    - generic [ref=e64]:
      - generic [ref=e65]:
        - generic [ref=e66]: ⚡
        - heading "Frontend" [level=3] [ref=e67]
        - paragraph [ref=e68]: React, Next.js, TypeScript, Tailwind CSS, Three.js, Framer Motion
      - generic [ref=e70]:
        - generic [ref=e71]: 🔧
        - heading "Backend" [level=3] [ref=e72]
        - paragraph [ref=e73]: Node.js, Python, PostgreSQL, MongoDB, Redis, GraphQL
      - generic [ref=e75]:
        - generic [ref=e76]: 🤖
        - heading "AI / ML" [level=3] [ref=e77]
        - paragraph [ref=e78]: OpenAI API, TensorFlow, PyTorch, LangChain, Hugging Face
      - generic [ref=e80]:
        - generic [ref=e81]: 🎨
        - heading "Design" [level=3] [ref=e82]
        - paragraph [ref=e83]: Figma, Adobe XD, UI/UX Design, Motion Graphics
  - generic [ref=e86]:
    - heading "03. Projects" [level=2] [ref=e87]:
      - generic [ref=e88]: "03."
      - text: Projects
    - generic [ref=e89]:
      - generic [ref=e90]:
        - generic [ref=e93]: Web App
        - generic [ref=e94]:
          - heading "AI Chat Platform" [level=3] [ref=e95]
          - paragraph [ref=e96]: Real-time AI-powered chat with GPT integration, voice messages, and smart context.
          - generic [ref=e97]:
            - generic [ref=e98]: Next.js
            - generic [ref=e99]: OpenAI
            - generic [ref=e100]: WebSocket
      - generic [ref=e101]:
        - generic [ref=e104]: Mobile
        - generic [ref=e105]:
          - heading "Neon Social" [level=3] [ref=e106]
          - paragraph [ref=e107]: Social network with AR filters, AI content moderation, and real-time translation.
          - generic [ref=e108]:
            - generic [ref=e109]: React Native
            - generic [ref=e110]: Firebase
            - generic [ref=e111]: AR Kit
      - generic [ref=e112]:
        - generic [ref=e115]: SaaS
        - generic [ref=e116]:
          - heading "CodeForge IDE" [level=3] [ref=e117]
          - paragraph [ref=e118]: Cloud-based IDE with AI code completion, real-time collaboration, and terminal.
          - generic [ref=e119]:
            - generic [ref=e120]: TypeScript
            - generic [ref=e121]: Docker
            - generic [ref=e122]: LSP
      - generic [ref=e123]:
        - generic [ref=e126]: E-Commerce
        - generic [ref=e127]:
          - heading "CyberShop" [level=3] [ref=e128]
          - paragraph [ref=e129]: Full-stack e-commerce with 3D product views, AI recommendations, and crypto payments.
          - generic [ref=e130]:
            - generic [ref=e131]: Next.js
            - generic [ref=e132]: Stripe
            - generic [ref=e133]: Three.js
  - generic [ref=e135]:
    - heading "04. Contact" [level=2] [ref=e136]:
      - generic [ref=e137]: "04."
      - text: Contact
    - generic [ref=e138]:
      - generic [ref=e140]:
        - generic [ref=e141]:
          - textbox "Your Name" [ref=e142]:
            - /placeholder: " "
          - generic: Your Name
        - generic [ref=e143]:
          - textbox "Your Email" [ref=e144]:
            - /placeholder: " "
          - generic: Your Email
        - generic [ref=e145]:
          - textbox "Your Message" [ref=e146]:
            - /placeholder: " "
          - generic: Your Message
        - button "Send Message" [ref=e147]:
          - generic [ref=e148]: Send Message
          - img [ref=e149]
      - generic [ref=e151]:
        - generic [ref=e152]:
          - generic [ref=e153]: 📍
          - generic [ref=e154]:
            - heading "Location" [level=4] [ref=e155]
            - paragraph [ref=e156]: Moscow, Russia
        - generic [ref=e157]:
          - generic [ref=e158]: 📧
          - generic [ref=e159]:
            - heading "Email" [level=4] [ref=e160]
            - paragraph [ref=e161]: hello@neon.dev
        - generic [ref=e162]:
          - generic [ref=e163]: 💬
          - generic [ref=e164]:
            - heading "Social" [level=4] [ref=e165]
            - generic [ref=e166]:
              - link "GitHub" [ref=e167] [cursor=pointer]:
                - /url: "#"
              - link "Telegram" [ref=e168] [cursor=pointer]:
                - /url: "#"
              - link "LinkedIn" [ref=e169] [cursor=pointer]:
                - /url: "#"
  - contentinfo [ref=e170]:
    - generic [ref=e172]:
      - generic [ref=e173]: NEON NEON NEON
      - text: .DEV
      - paragraph [ref=e174]: © 2026 NEON.DEV — Crafted with code and creativity
  - generic:
    - generic:
      - generic: AI Assistant
      - button "×"
    - generic:
      - generic:
        - generic: 🤖
        - generic: Hi! I'm your AI assistant. Ask me anything about my skills, projects, or just say hello!
    - generic:
      - textbox "Type a message..."
      - button:
        - img
  - button [ref=e175]:
    - img [ref=e176]
```