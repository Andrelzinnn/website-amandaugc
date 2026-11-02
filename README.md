# 🌟 Portfólio UGC - Amanda Silveira

Protótipo e MVP de alta conversão desenvolvido para criadora de conteúdo UGC, com foco em estética editorial, retenção e geração de leads para marcas.

Construído com base na análise estrutural e mecânica de referências do setor (como Letícia Calisto), mas com identidade visual própria, sem cópia de layout ou risco de plágio de trade dress.

---

## 🚀 Tecnologias Utilizadas

- **[Bun](https://bun.sh)**: Runtime e gerenciador de pacotes ultrarrápido.
- **[Astro](https://astro.build)**: Framework focado em performance e zero JS desnecessário no client.
- **[Tailwind CSS v4](https://tailwindcss.com)**: Estilização utilitária moderna e fluida.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática em todos os componentes e dados.
- **[Zod](https://zod.dev)**: Validação de esquemas e contratos de dados em runtime.

---

## 📂 Estrutura do Projeto

```
portifolio_ugc/
├── src/
│   ├── schemas/
│   │   └── portfolio.schema.ts   # Esquemas Zod com tipos inferidos
│   ├── data/
│   │   └── portfolioData.ts      # Dados da Amanda validados em runtime pelo Zod
│   ├── styles/
│   │   └── global.css            # Configurações do Tailwind v4 e animações
│   ├── layouts/
│   │   └── Layout.astro          # Layout master, fontes Google e Lightbox global
│   ├── components/
│   │   ├── Header.astro          # Barra superior + Navbar Glassmorphism responsiva
│   │   ├── Hero.astro            # Capa com foto recortada e balões flutuantes
│   │   ├── MarqueeBrands.astro   # Tarja infinita de marcas parceiras
│   │   ├── Case3D.astro          # Pilha 3D interativa de vídeos (Case em Destaque)
│   │   ├── PortfolioNiches.astro # Filtro por nicho + Carrossel 9:16 + Lightbox
│   │   ├── FilmRollGallery.astro # Galeria de fotos em estilo rolo de filme vintage
│   │   ├── ServicesSection.astro # Cards em vidro/papel com pinos decorativos
│   │   ├── AboutSection.astro    # Seção Sobre com autoridade e setup de gravação
│   │   ├── Testimonials.astro    # Depoimentos e avaliações de marcas
│   │   ├── BudgetInquiry.astro   # Formulário com máscara de moeda e envio via WhatsApp
│   │   └── Footer.astro          # Perguntas frequentes (FAQ) e créditos
│   └── pages/
│       └── index.astro           # Página principal montada
├── astro.config.mjs              # Configuração Astro + Tailwind Vite Plugin
├── package.json
└── tsconfig.json
```

---

## 🛠️ Como Executar o Projeto

### 1. Iniciar o servidor de desenvolvimento
```bash
bun run dev
```
Acesse `http://localhost:4321` no seu navegador.

### 2. Gerar build de produção estático
```bash
bun run build
```
O build estático e otimizado será gerado na pasta `dist/`.

### 3. Testar a versão de produção
```bash
bun run preview
```

---

## ✏️ Como Atualizar o Conteúdo da Amanda

Todos os textos, links de vídeos, nichos, fotos e contatos ficam centralizados em:
`src/data/portfolioData.ts`

Graças ao **Zod** (`src/schemas/portfolio.schema.ts`), se você esquecer algum campo obrigatório ou colocar um tipo errado, o TypeScript e o Bun irão avisar imediatamente no terminal antes mesmo do build!
# website-amandaugc
