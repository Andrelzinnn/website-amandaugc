import { z } from "zod";

export const SocialMetricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const FeedbackBubbleSchema = z.object({
  quote: z.string().min(1),
  brand: z.string().min(1),
  brandLogo: z.string().optional(),
});

export const HeroSchema = z.object({
  badge: z.string().default("UGC Creator & Strategist"),
  location: z.string().default("Brasil · Atendimento Global"),
  headline: z.string().min(1),
  headlineCursive: z.string().min(1),
  subheadline: z.string().min(1),
  ctaText: z.string().default("Solicitar Proposta"),
  ctaWhatsapp: z.string().min(1),
  metrics: z.array(SocialMetricSchema),
  feedbacks: z.array(FeedbackBubbleSchema),
  photoUrl: z.string().min(1),
  photoAlt: z.string().default("Foto profissional da criadora de conteúdo UGC"),
});

export const PartnerBrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string().optional(),
});

export const VideoCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  brand: z.string(),
  nicheId: z.string(),
  format: z.enum(["9:16", "16:9"]).default("9:16"),
  youtubeId: z.string().optional(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string(),
  tag: z.string(),
  metrics: z.object({
    views: z.string().optional(),
    roas: z.string().optional(),
    ctr: z.string().optional(),
    sales: z.string().optional(),
  }).optional(),
  strategyDescription: z.string().optional(),
});

export const NicheSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  badge: z.string().optional(),
  videos: z.array(VideoCaseSchema),
});

export const FilmPhotoSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  alt: z.string(),
  frameNumber: z.number().int().positive(),
});

export const ServiceItemSchema = z.object({
  step: z.string(),
  title: z.string(),
  shortDesc: z.string(),
  deliverables: z.array(z.string()),
  idealFor: z.string(),
});

export const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  clientName: z.string(),
  role: z.string(),
  brand: z.string(),
  rating: z.number().min(1).max(5).default(5),
});

export const FaqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const FeaturedCaseCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  brand: z.string(),
  thumbnail: z.string(),
  youtubeId: z.string().optional(),
  stats: z.string(),
  badge: z.string(),
  highlightMetric: z.string(),
  metricLabel: z.string(),
  strategyPoints: z.array(z.string()),
  quote: z.string(),
  author: z.string(),
});

export const FeaturedCaseSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  badge: z.string(),
  cards: z.array(FeaturedCaseCardSchema),
});

export const PortfolioConfigSchema = z.object({
  creator: z.object({
    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    role: z.string(),
    email: z.email(),
    whatsapp: z.string(),
    instagram: z.string(),
    tiktok: z.string(),
    city: z.string(),
  }),
  hero: HeroSchema,
  partnerBrands: z.array(PartnerBrandSchema),
  featuredCase: FeaturedCaseSchema,
  niches: z.array(NicheSchema),
  filmRoll: z.object({
    trackA: z.array(FilmPhotoSchema),
    trackB: z.array(FilmPhotoSchema),
  }),
  services: z.array(ServiceItemSchema),
  testimonials: z.array(TestimonialSchema),
  faq: z.array(FaqItemSchema),
  topbar: z.object({
    badge: z.string().default("Vagas Abertas"),
    text: z.string().default("Recebendo projetos para as próximas semanas · Entrega em 5 a 7 dias úteis"),
    ctaText: z.string().default("Garantir data →"),
  }).optional(),
  contactSection: z.object({
    badge: z.string().default("Vamos Criar Juntos"),
    title: z.string().default("Solicite uma Proposta"),
    subtitle: z.string().default("resposta rápida em até 24 horas"),
    desc: z.string().default("Preencha os dados do projeto para receber um orçamento detalhado com opções de pacotes, prazos de envio e direcionamento de criativos."),
  }).optional(),
  theme: z.enum(["terracotta", "rose", "monochrome", "olive", "mocha"]).default("terracotta"),
});

// Infer Typescript types directly from Zod schemas
export type SocialMetric = z.infer<typeof SocialMetricSchema>;
export type FeedbackBubble = z.infer<typeof FeedbackBubbleSchema>;
export type HeroData = z.infer<typeof HeroSchema>;
export type PartnerBrand = z.infer<typeof PartnerBrandSchema>;
export type VideoCase = z.infer<typeof VideoCaseSchema>;
export type Niche = z.infer<typeof NicheSchema>;
export type FilmPhoto = z.infer<typeof FilmPhotoSchema>;
export type ServiceItem = z.infer<typeof ServiceItemSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;
export type FeaturedCaseCard = z.infer<typeof FeaturedCaseCardSchema>;
export type PortfolioConfig = z.infer<typeof PortfolioConfigSchema>;
