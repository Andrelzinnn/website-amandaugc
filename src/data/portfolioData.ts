import { PortfolioConfigSchema, type PortfolioConfig } from "../schemas/portfolio.schema";

const rawPortfolioData = {
  creator: {
    firstName: "Amanda",
    lastName: "Silveira",
    fullName: "Amanda Silveira",
    role: "Criadora de Conteúdo UGC & Estrategista de Criativos",
    email: "contato@amandaugc.com.br",
    whatsapp: "5511999998888",
    instagram: "@amandasilveiraugc",
    tiktok: "@amandasilveira.ugc",
    city: "São Paulo, SP · Atendimento Nacional & Internacional",
  },

  hero: {
    badge: "UGC Creator & Ads Strategist",
    location: "São Paulo · Brasil",
    headline: "Vídeos autênticos que",
    headlineCursive: "despertam desejo e vendem",
    subheadline:
      "Criativos focados em retenção nos primeiros 3 segundos e alta taxa de conversão para anúncios e redes sociais.",
    ctaText: "Solicitar Orçamento no WhatsApp",
    ctaWhatsapp:
      "Olá Amanda! Vi seu portfólio UGC e quero conversar sobre uma campanha para a minha marca.",
    metrics: [
      { value: "+350", label: "Vídeos Entregues" },
      { value: "+90", label: "Marcas Atendidas" },
      { value: "4.6x", label: "ROAS Médio em Campanhas" },
    ],
    feedbacks: [
      {
        quote: "O criativo da Amanda foi o campeão de vendas na nossa Black Friday, ROAS acima de 5!",
        brand: "Lumière Glow",
      },
      {
        quote: "A naturalidade que ela trouxe para o produto fez toda a diferença no nosso CPA.",
        brand: "Aura Essentials",
      },
      {
        quote: "Roteiro impecável, entrega antes do prazo e edição pronta para tráfego pago.",
        brand: "Casa & Conforto",
      },
    ],
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Amanda Silveira, criadora UGC sorrindo de forma acolhedora para a câmera",
  },

  partnerBrands: [
    { id: "1", name: "Sallve" },
    { id: "2", name: "Simple Organic" },
    { id: "3", name: "Amaro" },
    { id: "4", name: "Insider Store" },
    { id: "5", name: "Buser" },
    { id: "6", name: "Desinchá" },
    { id: "7", name: "Holistix" },
    { id: "8", name: "Principia" },
    { id: "9", name: "Yuool" },
    { id: "10", name: "Live Run" },
  ],

  featuredCase: {
    title: "Case em Destaque",
    subtitle: "Campanha de Escala para Tráfego Pago",
    badge: "Estratégia & Performance",
    cards: [
      {
        id: "case-1",
        title: "Gancho 'Pare de Gastar com Skincare Errado'",
        brand: "Sérum Facial Vitamina C · Aura Glow",
        thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80",
        youtubeId: "dQw4w9WgXcQ",
        stats: "1.2M views · ROAS 5.2x",
        badge: "Top Performer Ads",
        highlightMetric: "2.4M+",
        metricLabel: "Visualizações & 4.8x ROAS",
        strategyPoints: [
          "Gancho visual disruptivo nos primeiros 1.5s quebrando padrão de feed",
          "Demonstração sensorial da textura do produto na pele sob luz natural",
          "Quebra de objeções reais e chamada para ação (CTA) imperativa com cupom",
        ],
        quote: "Foi o criativo mais lucrativo da nossa história para Meta Ads. O retorno superou todas as nossas expectativas.",
        author: "Diretor de Marketing, Aura Glow",
      },
      {
        id: "case-2",
        title: "Rotina Matinal de 3 Minutos",
        brand: "Hidratante Facial Nutritivo · BioBeauty",
        thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
        youtubeId: "dQw4w9WgXcQ",
        stats: "780k views · CTR 3.8%",
        badge: "Campanha de Engajamento & Vendas",
        highlightMetric: "780K+",
        metricLabel: "Views Orgânicas & CTR 3.8%",
        strategyPoints: [
          "Formato 'Get Ready With Me' (GRWM) nativo sem cara de comercial tradicional",
          "Inserção contextual do produto no minuto 0:45 resolvendo problema de pele ressecada",
          "Gatilho de urgência com link na bio e cupom de desconto exclusivo",
        ],
        quote: "A naturalidade com que a Amanda introduziu nosso hidratante fez a taxa de cliques disparar no TikTok.",
        author: "Head de Growth, BioBeauty",
      },
      {
        id: "case-3",
        title: "Review Sincero após 14 dias de uso",
        brand: "Óleo Reparador Iluminador · Lumière",
        thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
        youtubeId: "dQw4w9WgXcQ",
        stats: "450k views · Conversão +42%",
        badge: "Quebra de Objeções & Prova Social",
        highlightMetric: "+42%",
        metricLabel: "Aumento na Taxa de Conversão",
        strategyPoints: [
          "Comparativo de 'Antes e Depois' sob a mesma iluminação e sem filtros de embelezamento",
          "Depoimento honesto destacando pontos fortes e como usar corretamente",
          "Chamada direta para página de produto com garantia de satisfação ou reembolso",
        ],
        quote: "Os vídeos de unboxing e review da Amanda diminuíram em 30% as dúvidas de suporte e aumentaram o ticket médio.",
        author: "Fundadora, Lumière Cosméticos",
      },
    ],
  },

  niches: [
    {
      id: "beleza",
      name: "Beleza & Skincare",
      slug: "beleza",
      badge: "Mais Solicitado",
      videos: [
        {
          id: "bel-1",
          title: "Rotina Glow com Duplo Sérum",
          brand: "Aura Skincare",
          nicheId: "beleza",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
          tag: "Demonstração de Textura",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "450k", roas: "4.2x" },
        },
        {
          id: "bel-2",
          title: "Dica de Maquiagem sem Craquelar",
          brand: "Luxe Beauty",
          nicheId: "beleza",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80",
          tag: "Tutorial Rápido",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "320k", roas: "3.9x" },
        },
        {
          id: "bel-3",
          title: "Unboxing Experiência Sensorial",
          brand: "BioOrgânica",
          nicheId: "beleza",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
          tag: "Unboxing Premium",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "280k", roas: "3.5x" },
        },
        {
          id: "bel-4",
          title: "Antes e Depois em 21 Dias",
          brand: "Dermocosméticos Vita",
          nicheId: "beleza",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
          tag: "Prova Social",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "510k", roas: "5.1x" },
        },
      ],
    },
    {
      id: "moda",
      name: "Moda & Estilo",
      slug: "moda",
      badge: "Tendência",
      videos: [
        {
          id: "mod-1",
          title: "3 Looks para o Trabalho com 1 Peça",
          brand: "Minimalist Wear",
          nicheId: "moda",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
          tag: "Try-On Haul",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "610k", roas: "4.7x" },
        },
        {
          id: "mod-2",
          title: "Caimento e Qualidade do Tecido",
          brand: "Urban Chic",
          nicheId: "moda",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
          tag: "Close nos Detalhes",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "410k", roas: "3.8x" },
        },
        {
          id: "mod-3",
          title: "Como Combinar Acessórios Dourados",
          brand: "Aura Joias",
          nicheId: "moda",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
          tag: "Styling Guide",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "290k", roas: "3.2x" },
        },
      ],
    },
    {
      id: "casa",
      name: "Casa, Decor & Rotina",
      slug: "casa",
      videos: [
        {
          id: "cas-1",
          title: "Achados Funcionais para o Quarto",
          brand: "Decore Bem",
          nicheId: "casa",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
          tag: "Organização & Estilo",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "820k", roas: "5.4x" },
        },
        {
          id: "cas-2",
          title: "Troca da Roupa de Cama Perfeita",
          brand: "Linnens Home",
          nicheId: "casa",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
          tag: "Estética Conforto",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "340k", roas: "4.0x" },
        },
      ],
    },
    {
      id: "saude",
      name: "Saúde & Bem-Estar",
      slug: "saude",
      videos: [
        {
          id: "sau-1",
          title: "Meu Pré-Treino Diário que não dá Pique",
          brand: "VitaEnergy",
          nicheId: "saude",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
          tag: "Uso no Dia a Dia",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "390k", roas: "4.3x" },
        },
        {
          id: "sau-2",
          title: "Teste do Copo Térmico Inteligente",
          brand: "HydroThermo",
          nicheId: "saude",
          format: "9:16",
          thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          tag: "Review Prático",
          youtubeId: "dQw4w9WgXcQ",
          metrics: { views: "520k", roas: "4.9x" },
        },
      ],
    },
  ],

  filmRoll: {
    trackA: [
      {
        id: "f-1",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80",
        alt: "Foto UGC Lifestyle look casual",
        frameNumber: 24,
      },
      {
        id: "f-2",
        imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
        alt: "Foto UGC Retrato com produto na mão",
        frameNumber: 25,
      },
      {
        id: "f-3",
        imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80",
        alt: "Foto UGC close de maquiagem",
        frameNumber: 26,
      },
      {
        id: "f-4",
        imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80",
        alt: "Foto UGC iluminação natural",
        frameNumber: 27,
      },
      {
        id: "f-5",
        imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
        alt: "Foto UGC momento autêntico",
        frameNumber: 28,
      },
    ],
    trackB: [
      {
        id: "fb-1",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
        alt: "Foto Still de produto em bancada",
        frameNumber: 29,
      },
      {
        id: "fb-2",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
        alt: "Foto sorrindo com look minimalista",
        frameNumber: 30,
      },
      {
        id: "fb-3",
        imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
        alt: "Foto de detalhe de cosmético",
        frameNumber: 31,
      },
      {
        id: "fb-4",
        imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=80",
        alt: "Foto externa luz da tarde",
        frameNumber: 32,
      },
      {
        id: "fb-5",
        imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
        alt: "Foto segurando embalagem",
        frameNumber: 33,
      },
    ],
  },

  services: [
    {
      step: "01",
      title: "Vídeos de Alta Conversão (UGC Ads)",
      shortDesc: "Criativos gravados sob medida para Meta Ads, TikTok Ads e Reels de tráfego pago.",
      deliverables: ["Ganchos alternativos A/B", "Legendas dinâmicas inclusas", "Formato 9:16 em 4K"],
      idealFor: "Marcas que precisam diminuir CPA e escalar campanhas de tráfego pago.",
    },
    {
      step: "02",
      title: "Unboxing & Primeira Impressão",
      shortDesc: "Vídeos que capturam a experiência real ao abrir o produto com áudio sensorial e detalhes do pacote.",
      deliverables: ["Take sensorial ASMR", "Close nos detalhes da embalagem", "Reação genuína"],
      idealFor: "E-commerces que querem gerar desejo imediato de compra e diminuir dúvidas.",
    },
    {
      step: "03",
      title: "Review Sincero & Demonstração",
      shortDesc: "Mostrando a solução na prática, explicando 'o porquê funciona' de forma natural e sem cara de comercial tradicional.",
      deliverables: ["Roteiro focado em dor e solução", "Demonstração de uso real", "CTA claro para compra"],
      idealFor: "Produtos com curva de aprendizado ou diferenciais tecnológicos e dermatológicos.",
    },
    {
      step: "04",
      title: "Pacote de Fotos Still & Hands-on",
      shortDesc: "Fotografia lifestyle em alta resolução para uso em páginas de produto, carrosséis de anúncio e e-mails.",
      deliverables: ["5 a 15 fotos em alta resolução", "Edição com color grading suave", "Uso em feed e PDP"],
      idealFor: "Renovação visual de lojas virtuais e criativos estáticos de alta performance.",
    },
  ],

  testimonials: [
    {
      id: "t-1",
      quote: "Trabalhar com a Amanda foi o melhor investimento do nosso trimestre. O vídeo dela reduziu nosso custo por aquisição em 38% na Meta.",
      clientName: "Mariana Costa",
      role: "Head de Growth",
      brand: "Lumière Cosméticos",
      rating: 5,
    },
    {
      id: "t-2",
      quote: "Entrega impecável, comunicação clara e ela realmente entendeu nosso tom de voz de primeira. Já virou criadora fixa das nossas campanhas.",
      clientName: "Lucas Mendes",
      role: "Fundador",
      brand: "Urban Minimal",
      rating: 5,
    },
    {
      id: "t-3",
      quote: "Ela não faz apenas 'vídeos bonitinhos'. A Amanda entende de funil de vendas, métricas de retenção e comportamento do consumidor.",
      clientName: "Camila Rocha",
      role: "Gestora de Tráfego",
      brand: "BioBeauty Club",
      rating: 5,
    },
  ],

  faq: [
    {
      question: "Qual é o prazo médio de entrega dos vídeos?",
      answer: "O prazo padrão é de 5 a 7 dias úteis após a chegada do produto no estúdio e aprovação do alinhamento do briefing.",
    },
    {
      question: "Você entrega o vídeo já editado ou os arquivos brutos (RAW)?",
      answer: "Entrego o vídeo 100% finalizado com cortes rápidos, legendas dinâmicas, trilha sonora sem direitos autorais e color grading. Também é possível contratar a entrega dos takes brutos.",
    },
    {
      question: "Os direitos de uso de imagem para anúncios estão inclusos?",
      answer: "Sim, os pacotes padrão já incluem licença de uso de imagem para tráfego pago (Meta, TikTok, Pinterest) pelo período de 30 a 90 dias, com possibilidade de renovação ou uso perpétuo.",
    },
    {
      question: "Como funciona o processo de envio dos produtos?",
      answer: "Assim que fechamos o pacote e formalizamos o contrato, envio o endereço do meu estúdio em São Paulo. Você me fornece o código de rastreio e iniciamos a pesquisa e roteirização.",
    },
  ],
  theme: "terracotta",
};

import fs from "node:fs";
import path from "node:path";

function loadKeystaticOverrides(base: any) {
  try {
    const contentDir = path.resolve(process.cwd(), "src/content");
    if (!fs.existsSync(contentDir)) return base;

    const data = JSON.parse(JSON.stringify(base));

    // Topbar singleton
    const topbarFile = path.join(contentDir, "topbar.json");
    if (fs.existsSync(topbarFile)) {
      const tb = JSON.parse(fs.readFileSync(topbarFile, "utf-8"));
      data.topbar = {
        badge: tb.badge || "Vagas Abertas",
        text: tb.text || "Recebendo projetos para as próximas semanas · Entrega em 5 a 7 dias úteis",
        ctaText: tb.ctaText || "Garantir data →",
      };
    }

    // General singleton
    const generalFile = path.join(contentDir, "general.json");
    if (fs.existsSync(generalFile)) {
      const general = JSON.parse(fs.readFileSync(generalFile, "utf-8"));
      if (general.fullName) data.creator.fullName = general.fullName;
      if (general.role) data.creator.role = general.role;
      if (general.whatsappNumber) {
        data.creator.whatsapp = general.whatsappNumber;
        data.creator.whatsappNumber = general.whatsappNumber;
      }
      if (general.instagram) data.creator.instagram = general.instagram;
      if (general.tiktok) data.creator.tiktok = general.tiktok;
      if (general.theme) data.theme = general.theme;
      data.contactSection = {
        badge: general.contactBadge || "Vamos Criar Juntos",
        title: general.contactTitle || "Solicite uma Proposta",
        subtitle: general.contactSubtitle || "resposta rápida em até 24 horas",
        desc: general.contactDesc || "Preencha os dados do projeto para receber um orçamento detalhado com opções de pacotes, prazos de envio e direcionamento de criativos.",
      };
    }

    // Services collection (Formatos de Trabalho)
    const servicesDir = path.join(contentDir, "services");
    if (fs.existsSync(servicesDir)) {
      const serviceFiles = fs.readdirSync(servicesDir).filter((f) => f.endsWith(".json"));
      if (serviceFiles.length > 0) {
        data.services = serviceFiles.map((f, i) => {
          const s = JSON.parse(fs.readFileSync(path.join(servicesDir, f), "utf-8"));
          const rawDeliverables = s.deliverables ? s.deliverables.split(",").map((d: string) => d.trim()).filter(Boolean) : ["Formato nativo 9:16", "Legendas dinâmicas"];
          return {
            step: s.step || String(i + 1).padStart(2, "0"),
            title: s.title || "Formato UGC",
            shortDesc: s.shortDesc || "Produção autêntica focada em alta retenção e conversão.",
            deliverables: rawDeliverables,
            idealFor: s.idealFor || "Marcas e e-commerces.",
          };
        });
      }
    }

    // Partner brands collection (Carrossel de marcas)
    const brandsDir = path.join(contentDir, "brands");
    if (fs.existsSync(brandsDir)) {
      const brandFiles = fs.readdirSync(brandsDir).filter((f) => f.endsWith(".json"));
      if (brandFiles.length > 0) {
        data.partnerBrands = brandFiles.map((f, i) => {
          const b = JSON.parse(fs.readFileSync(path.join(brandsDir, f), "utf-8"));
          return {
            id: `brand-${i + 1}`,
            name: b.name || "Marca Parceira",
          };
        });
      }
    }

    // Hero singleton
    const heroFile = path.join(contentDir, "hero.json");
    if (fs.existsSync(heroFile)) {
      const hero = JSON.parse(fs.readFileSync(heroFile, "utf-8"));
      if (hero.headline) data.hero.headline = hero.headline;
      if (hero.headlineCursive) data.hero.headlineCursive = hero.headlineCursive;
      if (hero.subheadline) data.hero.subheadline = hero.subheadline;
      if (hero.photoUrl) data.hero.photoUrl = hero.photoUrl;
    }

    // Cases collection
    const casesDir = path.join(contentDir, "cases");
    if (fs.existsSync(casesDir)) {
      const caseFiles = fs.readdirSync(casesDir).filter((f) => f.endsWith(".json"));
      if (caseFiles.length > 0) {
        const loadedCards = caseFiles.map((f, i) => {
          const item = JSON.parse(fs.readFileSync(path.join(casesDir, f), "utf-8"));
          const pillars = [item.pillar1, item.pillar2, item.pillar3].filter(Boolean);
          return {
            id: `case-${i + 1}`,
            brand: item.brand || "",
            title: item.title || "",
            badge: item.badge || "Top Performer Ads",
            thumbnail: item.thumbnail || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80",
            youtubeId: item.youtubeId || "dQw4w9WgXcQ",
            stats: item.stats || "",
            highlightMetric: item.highlightMetric || "",
            metricLabel: item.metricLabel || "",
            strategyPoints: pillars.length > 0 ? pillars : ["Gancho visual disruptivo", "Demonstração sensorial", "Chamada clara"],
            quote: item.quote || "",
            author: item.author || "",
          };
        });
        if (loadedCards.length > 0) {
          data.featuredCase.cards = loadedCards;
          data.featuredCase.brand = loadedCards[0].brand;
          data.featuredCase.badge = loadedCards[0].badge;
          data.featuredCase.highlightMetric = loadedCards[0].highlightMetric;
          data.featuredCase.metricLabel = loadedCards[0].metricLabel;
          data.featuredCase.strategyPoints = loadedCards[0].strategyPoints;
        }
      }
    }

    // Portfolio videos collection
    const videosDir = path.join(contentDir, "portfolio-videos");
    if (fs.existsSync(videosDir)) {
      const videoFiles = fs.readdirSync(videosDir).filter((f) => f.endsWith(".json"));
      if (videoFiles.length > 0) {
        const videosByNiche: Record<string, any[]> = {};
        videoFiles.forEach((f, idx) => {
          const v = JSON.parse(fs.readFileSync(path.join(videosDir, f), "utf-8"));
          const nId = v.niche || "beleza";
          if (!videosByNiche[nId]) videosByNiche[nId] = [];
          videosByNiche[nId].push({
            id: `vid-${idx + 1}`,
            title: v.title || "Criativo UGC",
            brand: v.brand || "Marca Parceira",
            nicheId: nId,
            format: "9:16",
            thumbnailUrl: v.thumbnail || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
            tag: v.views || "UGC Ad",
            youtubeId: v.youtubeId || "dQw4w9WgXcQ",
            metrics: {
              views: v.views || "100k views",
            },
          });
        });

        data.niches.forEach((n: any) => {
          if (videosByNiche[n.id] && videosByNiche[n.id].length > 0) {
            n.videos = videosByNiche[n.id];
          }
        });
      }
    }

    // Testimonials collection
    const testDir = path.join(contentDir, "testimonials");
    if (fs.existsSync(testDir)) {
      const testFiles = fs.readdirSync(testDir).filter((f) => f.endsWith(".json"));
      if (testFiles.length > 0) {
        data.testimonials = testFiles.map((f, i) => {
          const t = JSON.parse(fs.readFileSync(path.join(testDir, f), "utf-8"));
          return {
            id: `t-${i + 1}`,
            clientName: t.clientName || "",
            role: t.role || "",
            brand: t.brand || "",
            avatarUrl: t.avatarUrl || "",
            quote: t.quote || "",
          };
        });
      }
    }

    return data;
  } catch (err) {
    console.warn("Could not load Keystatic content overrides:", err);
    return base;
  }
}

// Validate data with Zod at build time, integrating Keystatic content overrides
const resolvedData = loadKeystaticOverrides(rawPortfolioData);
export const portfolioData: PortfolioConfig = PortfolioConfigSchema.parse(resolvedData);

