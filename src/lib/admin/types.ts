export interface CollectionItem {
  path: string;
  data: any;
}

export interface LivePreviewUpdateData {
  selector?: string;
  text?: string;
  imageSelector?: string;
  imageUrl?: string;
  theme?: string;
  caseUpdate?: {
    index: number;
    brand?: string;
    title?: string;
    stats?: string;
    badge?: string;
    highlightMetric?: string;
    metricLabel?: string;
    quote?: string;
    author?: string;
    thumbnail?: string;
    youtubeId?: string;
  };
  serviceUpdate?: {
    index: number;
    title?: string;
    shortDesc?: string;
    deliverables?: string;
    idealFor?: string;
  };
  testUpdate?: {
    index: number;
    clientName?: string;
    brand?: string;
    role?: string;
    quote?: string;
  };
  brandsUpdate?: Array<{ name: string }>;
  creatorUpdate?: {
    fullName?: string;
    role?: string;
    instagram?: string;
  };
  legalUpdate?: {
    showBrandsSection?: boolean;
    illustrativeBrandsNotice?: boolean;
  };
}

export interface ChangeEvaluation {
  isGeneralChanged: boolean;
  isTopbarChanged: boolean;
  isHeroChanged: boolean;
  totalChanged: number;
}
