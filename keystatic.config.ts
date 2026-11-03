import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : {
        kind: 'cloud',
      },
  cloud: {
    project: 'website-amanda-ugc/website-amandaugc',
  },
  ui: {
    brand: {
      name: 'Amanda Lopes · UGC Studio Admin',
    },
    navigation: {
      '🎨 Identidade Visual & Avisos': ['general', 'topbar', 'hero'],
      '🎬 Criativos & Portfólio': ['cases', 'portfolioVideos', 'photos'],
      '💼 Serviços & Prova Social': ['services', 'partnerBrands', 'testimonials'],
    },
  },
  singletons: {
    topbar: singleton({
      label: 'Barra de Aviso do Topo (Urgência & Datas Comemorativas)',
      path: 'src/content/topbar',
      format: 'json',
      previewUrl: '/',
      schema: {
        badge: fields.text({
          label: 'Selo / Destaque (ex: Vagas Abertas, Black Friday 🔥, Dia das Mães 🌸)',
          defaultValue: 'Vagas Abertas',
        }),
        text: fields.text({
          label: 'Texto do Aviso (ex: Faltam 25 dias para a Black Friday · Reserve sua data)',
          defaultValue: 'Recebendo projetos para as próximas semanas · Entrega em 5 a 7 dias úteis',
        }),
        ctaText: fields.text({
          label: 'Texto do Link de Ação (ex: Garantir data →)',
          defaultValue: 'Garantir data →',
        }),
      },
    }),
    general: singleton({
      label: 'Informações Gerais, Tema & Contato',
      path: 'src/content/general',
      format: 'json',
      previewUrl: '/admin',
      schema: {
        fullName: fields.text({ label: 'Nome Completo', defaultValue: 'Amanda Lopes' }),
        role: fields.text({ label: 'Cargo / Especialidade', defaultValue: 'Criadora de Conteúdo UGC & Estrategista de Criativos' }),
        whatsappNumber: fields.text({ label: 'Número WhatsApp (apenas números com DDD)', defaultValue: '5511999998888' }),
        instagram: fields.text({ label: 'Instagram', defaultValue: '@a_lopes' }),
        tiktok: fields.text({ label: 'TikTok', defaultValue: '@a_lopes' }),
        theme: fields.select({
          label: '🎨 Paleta Visual & Cor de Destaque do Site',
          description: 'Muda instantaneamente os botões, selos, destaques cursivos e métricas do portfólio.',
          options: [
            {
              label: '🔴 Terracota & Dourado (Padrão Atual · Editorial Quente & Sofisticado)',
              value: 'terracotta',
            },
            {
              label: '🌸 Rosa Nude & Champagne (Delicado · Skincare, Beleza & Glow)',
              value: 'rose',
            },
            {
              label: '⚫ Preto & Branco Editorial (Minimalista · Moda High-End & Luxo)',
              value: 'monochrome',
            },
            {
              label: '🌿 Verde Oliva & Sage (Natural · Orgânicos, Saúde & Bem-Estar)',
              value: 'olive',
            },
            {
              label: '🍫 Marrom Mocha & Caramelo (Neutro Aconchegante · Lifestyle & Casa)',
              value: 'mocha',
            },
          ],
          defaultValue: 'terracotta',
        }),
        contactBadge: fields.text({ label: 'Selo do Contato (ex: Vamos Criar Juntos 💌)', defaultValue: 'Vamos Criar Juntos' }),
        contactTitle: fields.text({ label: 'Título do Formulário', defaultValue: 'Solicite uma Proposta' }),
        contactSubtitle: fields.text({ label: 'Subtítulo Cursivo (ex: resposta rápida em até 24 horas ⚡)', defaultValue: 'resposta rápida em até 24 horas' }),
        contactDesc: fields.text({
          label: 'Texto Descritivo de Orçamento',
          multiline: true,
          defaultValue: 'Preencha os dados do projeto para receber um orçamento detalhado com opções de pacotes, prazos de envio e direcionamento de criativos.',
        }),
      },
    }),
    hero: singleton({
      label: 'Hero (Início da Página)',
      path: 'src/content/hero',
      format: 'json',
      previewUrl: '/',
      schema: {
        headline: fields.text({ label: 'Título Principal', defaultValue: 'Vídeos autênticos que' }),
        headlineCursive: fields.text({ label: 'Destaque Cursivo', defaultValue: 'geram desejo e convertem' }),
        subheadline: fields.text({
          label: 'Subtítulo',
          multiline: true,
          defaultValue: 'Criativos em formato nativo pensados para reter a atenção nos primeiros 3 segundos e escalar campanhas de tráfego pago.',
        }),
        photoUrl: fields.text({
          label: 'URL da Foto Principal (Unsplash ou link de imagem)',
          defaultValue: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        }),
        metric1Value: fields.text({ label: 'Métrica 1 - Valor (ex: +350)', defaultValue: '+350' }),
        metric1Label: fields.text({ label: 'Métrica 1 - Rótulo', defaultValue: 'Vídeos Entregues' }),
        metric2Value: fields.text({ label: 'Métrica 2 - Valor (ex: +90)', defaultValue: '+90' }),
        metric2Label: fields.text({ label: 'Métrica 2 - Rótulo', defaultValue: 'Marcas Atendidas' }),
        metric3Value: fields.text({ label: 'Métrica 3 - Valor (ex: 4.6x)', defaultValue: '4.6x' }),
        metric3Label: fields.text({ label: 'Métrica 3 - Rótulo', defaultValue: 'ROAS Médio em Campanhas' }),
      },
    }),
  },
  collections: {
    services: collection({
      label: 'Formatos de Trabalho (Serviços)',
      slugField: 'title',
      path: 'src/content/services/*',
      format: 'json',
      previewUrl: '/#servicos',
      schema: {
        title: fields.slug({ name: { label: 'Nome do Formato (ex: Vídeos de Alta Conversão, Unboxing, Provador Fashion, Cobertura de Evento)' } }),
        step: fields.text({ label: 'Número de Ordem (ex: 01, 02, 03...)', defaultValue: '01' }),
        shortDesc: fields.text({ label: 'Breve Descrição do Formato', multiline: true }),
        deliverables: fields.text({ label: 'O que inclui (separe por vírgula)', multiline: true }),
        idealFor: fields.text({ label: 'Ideal para (ex: Marcas de vestuário, e-commerces que precisam diminuir CPA)' }),
      },
    }),
    partnerBrands: collection({
      label: 'Marcas Parceiras (Carrossel)',
      slugField: 'name',
      path: 'src/content/brands/*',
      format: 'json',
      previewUrl: '/#marcas',
      schema: {
        name: fields.slug({ name: { label: 'Nome da Marca' } }),
      },
    }),
    cases: collection({
      label: 'Cases em Destaque (Deck 3D)',
      slugField: 'brand',
      path: 'src/content/cases/*',
      format: 'json',
      previewUrl: '/#cases',
      schema: {
        brand: fields.slug({ name: { label: 'Nome da Marca / Produto' } }),
        title: fields.text({ label: 'Título do Vídeo' }),
        badge: fields.text({ label: 'Selo / Categoria (ex: Top Performer Ads)', defaultValue: 'Top Performer Ads' }),
        thumbnail: fields.text({ label: 'URL da Thumbnail' }),
        youtubeId: fields.text({ label: 'ID do Vídeo no YouTube (ex: dQw4w9WgXcQ)' }),
        stats: fields.text({ label: 'Métrica Resumida do Card (ex: 1.2M views · ROAS 4.8x)' }),
        highlightMetric: fields.text({ label: 'Número Destaque (ex: +1.2M)' }),
        metricLabel: fields.text({ label: 'Descrição da Métrica (ex: Visualizações & 4.8x ROAS)' }),
        pillar1: fields.text({ label: 'Pilar Estratégico 1' }),
        pillar2: fields.text({ label: 'Pilar Estratégico 2' }),
        pillar3: fields.text({ label: 'Pilar Estratégico 3' }),
        quote: fields.text({ label: 'Depoimento / Prova Social', multiline: true }),
        author: fields.text({ label: 'Autor do Depoimento (ex: Diretor de Marketing, Aura Glow)' }),
      },
    }),
    portfolioVideos: collection({
      label: 'Vídeos do Portfólio (Por Nicho)',
      slugField: 'title',
      path: 'src/content/portfolio-videos/*',
      format: 'json',
      previewUrl: '/#portfolio',
      schema: {
        title: fields.slug({ name: { label: 'Título do Criativo' } }),
        brand: fields.text({ label: 'Marca' }),
        niche: fields.select({
          label: 'Nicho',
          options: [
            { label: 'Beleza & Skincare', value: 'beleza' },
            { label: 'Moda & Estilo', value: 'moda' },
            { label: 'Casa, Decor & Rotina', value: 'casa' },
            { label: 'Saúde & Bem-Estar', value: 'saude' },
          ],
          defaultValue: 'beleza',
        }),
        thumbnail: fields.text({ label: 'URL da Thumbnail' }),
        youtubeId: fields.text({ label: 'ID do Vídeo no YouTube' }),
        views: fields.text({ label: 'Alcance / Visualizações (ex: 320k views)' }),
      },
    }),
    photos: collection({
      label: 'Galeria de Fotos UGC (Film Roll)',
      slugField: 'title',
      path: 'src/content/photos/*',
      format: 'json',
      previewUrl: '/#fotos',
      schema: {
        title: fields.slug({ name: { label: 'Título / Descrição da Foto' } }),
        url: fields.text({ label: 'URL da Imagem' }),
      },
    }),
    testimonials: collection({
      label: 'Depoimentos de Clientes',
      slugField: 'clientName',
      path: 'src/content/testimonials/*',
      format: 'json',
      previewUrl: '/#depoimentos',
      schema: {
        clientName: fields.slug({ name: { label: 'Nome do Cliente' } }),
        role: fields.text({ label: 'Cargo (ex: Head de Marketing)' }),
        brand: fields.text({ label: 'Marca / Loja' }),
        avatarUrl: fields.text({ label: 'URL da Foto do Cliente' }),
        quote: fields.text({ label: 'Texto do Depoimento', multiline: true }),
      },
    }),
  },
});
