// Types for presentation outline and slides

export interface Slide {
  id: string;
  title: string;
  content: string[];
  layout: 'title' | 'content' | 'twoColumn' | 'conclusion';
}

export interface PresentationOutline {
  title: string;
  topic: string;
  slides: Slide[];
  slideCount: number;
  audience: AudienceType;
}

export type AudienceType = 'general' | 'business' | 'academic';

export interface GenerateRequest {
  topic: string;
  slideCount: number;
  audience: AudienceType;
}

export interface GenerateResponse {
  outline: PresentationOutline;
  error?: string;
}

export interface ExportRequest {
  outline: PresentationOutline;
}
