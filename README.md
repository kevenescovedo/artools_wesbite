# Precision Pen - Landing Page & Design System 🖋️✨

Bem-vindo ao repositório do projeto **Precision Pen**, uma vitrine interativa e de alta performance que demonstra a "caneta mais tecnológica do mundo". 

Este projeto foi construído com foco obsessivo em **design responsivo, animações fluidas e modularidade**, utilizando técnicas modernas de front-end para garantir uma experiência premium de navegação inspirada nas maiores empresas de tecnologia do mercado (estilo "Apple").

---

## 🌟 Principais Funcionalidades

- **Navegação Fluida (Smooth Scrolling):** Utiliza a biblioteca Lenis para entregar uma rolagem "buttery smooth", garantindo que a leitura seja perfeita independente do dispositivo.
- **Animações de Alta Performance:** Integração pesada com **GSAP (GreenSock)** e **ScrollTrigger** para animações sincronizadas com a rolagem, *scrubbing* de vídeo frame-a-frame e micro-interações.
- **Renderização Dinâmica:** Backgrounds imersivos que misturam Canvas 2D e reprodução de vídeos otimizados (`.mp4`) controlados pelo scroll do usuário.
- **Menu Overlay Responsivo:** Uma experiência de menu mobile de tela cheia, com animações em cascata para links fluídos e interativos.
- **Design System Modular:** A interface foi construída em cima de um Design System sólido (visível em `ds2.html`), com variáveis globais e componentes consistentes reutilizáveis (como botões magnéticos, cartões flutuantes, e tipografia moderna via Inter Font).

---

## 📂 Estrutura do Projeto

O projeto foi organizado de forma profissional para facilitar manutenção, escalabilidade e estar totalmente pronto para um deploy estático imediato (Vercel, Netlify, GitHub Pages, etc.).

```text
artools/
├── index.html           # Landing page principal (Precision Pen)
├── ds2.html             # Documentação do Design System e Componentes
├── templates.html       # Showcase de templates interativos adicionais
├── templates/           # Diretório contendo sub-módulos e templates estáticos isolados
└── assets/              # Todos os recursos estáticos globais do site
    ├── css/             # Estilos modulares extraídos por página (index.css, ds2.css)
    ├── js/              # Lógicas de interação extraídas por página (index.js, ds2.js)
    └── media/           # Imagens de alta resolução e vídeos (.mp4, .webp, .png)
```

---

## 🛠️ Tecnologias Utilizadas

- **Estrutura:** HTML5 Semântico
- **Estilos:** Vanilla CSS3 (com suporte a variáveis globais, Flexbox, CSS Grid e animações com `cubic-bezier`)
- **Animações e Scroll:** [GSAP 3.12](https://greensock.com/gsap/) + ScrollTrigger, e [Lenis Smooth Scroll](https://lenis.studiofreight.com/)
- **Tipografia:** Google Fonts ([Inter](https://fonts.google.com/specimen/Inter))
- **Ícones:** SVG nativo e Iconify

---

## 🚀 Como Rodar Localmente

O projeto não possui dependências de build complexas (como Node.js, Webpack ou Vite). Sendo puramente estático, você pode rodá-lo instantaneamente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/precision-pen.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd precision-pen/artools
   ```
3. Abra usando a extensão **Live Server** (do VS Code) ou sirva o diretório localmente usando Python:
   ```bash
   # Utilizando Python 3:
   python -m http.server 8000
   ```
4. Acesse em seu navegador: `http://localhost:8000`

> **Nota:** É recomendado rodar o projeto através de um servidor local em vez de abrir os arquivos diretamente (`file://`) devido a restrições de CORS ao executar vídeos locais sincronizados com Canvas.

---

## 💡 Sobre o Desenvolvimento

Este projeto reflete as melhores práticas na organização de *assets* para a web, extraindo scripts e estilos para pastas dedicadas a fim de proporcionar o melhor *Developer Experience* (DX). A separação rígida entre a lógica visual, regras de estilo e animações GSAP torna a base de código extremamente sustentável.

*Criado com dedicação à precisão e design de ponta.*
