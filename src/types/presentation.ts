// Types for presentation outline and slides

export interface Slide {
  id: string;
  title: string;
  content: string[];
  layout: 'title' | 'content' | 'twoColumn' | 'conclusion';
  shapes?: GeometricShape[];
  chart?: ChartData;
  notes?: string;
}

export interface PresentationOutline {
  title: string;
  topic: string;
  slides: Slide[];
  slideCount: number;
  audience: AudienceType;
  template?: TemplateType;
  includeShapes?: boolean;
  includeCharts?: boolean;
}

export type AudienceType = 'general' | 'business' | 'academic';

export type TemplateType =
  | 'modern-gradient'
  | 'minimal-clean'
  | 'corporate-blue'
  | 'creative-purple'
  | 'professional-dark';

// Geometric Shapes
export type ShapeType = 'circle' | 'rect' | 'triangle' | 'arrow' | 'flowchart';

export interface GeometricShape {
  type: ShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
  text?: string;
  direction?: 'rtl' | 'ltr';
  borderColor?: string;
  borderWidth?: number;
}

// Charts
export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'column';

export interface ChartData {
  type: ChartType;
  title: string;
  labels: string[];
  datasets: ChartDataset[];
  colors?: string[];
}

export interface ChartDataset {
  name: string;
  values: number[];
  color?: string;
}

// Template Configuration
export interface TemplateConfig {
  name: TemplateType;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    title: string;
    body: string;
  };
  defaultShapes?: boolean;
}

export interface GenerateRequest {
  topic: string;
  slideCount: number;
  audience: AudienceType;
  template?: TemplateType;
  includeShapes?: boolean;
  includeCharts?: boolean;
}

export interface GenerateResponse {
  outline: PresentationOutline;
  error?: string;
}

export interface ExportRequest {
  outline: PresentationOutline;
}
