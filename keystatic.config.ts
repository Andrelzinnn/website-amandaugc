import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : {
        kind: 'cloud',
      },
  cloud: {
    project: process.env.PUBLIC_KEYSTATIC_PROJECT || 'seu-time/seu-projeto',
  },
  ui: {
    brand: {
      name: 'Amanda Silveira · UGC Admin',
    },
  },
  singletons: {
    general: singleton({
      label: 'Informações Gerais & Contato',
      path: 'src/content/general',
      format: 'json',
      schema: {
        fullName: fields.text({ label: 'Nome Completo', defaultValue: 'Amanda Silveira' }),
        role: fields.text({ label: 'Cargo / Especialidade', defaultValue: 'Criadora de Conteúdo UGC & Estrategista de Criativos' }),
        whatsappNumber: fields.text({ label: 'Número WhatsApp (apenas números com DDD)', defaultValue: '5511999998888' }),
        instagram: fields.text({ label: 'Instagram', defaultValue: '@amandasilveira.ugc' }),
        tiktok: fields.text({ label: 'TikTok', defaultValue: '@amandasilveiraugc' }),
      },
    }),
    hero: singleton({
      label: 'Hero (Início da Página)',
      path: 'src/content/hero',
      format: 'json',
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
      },
    }),
  },
  collections: {
    cases: collection({
      label: 'Cases em Destaque (Deck 3D)',
      slugField: 'brand',
      path: 'src/content/cases/*',
      format: 'json',
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
