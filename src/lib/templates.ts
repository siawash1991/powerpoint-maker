import type { TemplateType, TemplateConfig } from '@/types/presentation';

export const TEMPLATES: Record<TemplateType, TemplateConfig> = {
  'modern-gradient': {
    name: 'modern-gradient',
    displayName: 'مدرن و رنگی',
    colors: {
      primary: '4F46E5', // Indigo
      secondary: '7C3AED', // Purple
      accent: '2563EB', // Blue
      background: 'FFFFFF',
      text: '1F2937',
    },
    fonts: {
      title: 'Vazirmatn',
      body: 'Vazirmatn',
    },
    defaultShapes: true,
  },

  'minimal-clean': {
    name: 'minimal-clean',
    displayName: 'ساده و تمیز',
    colors: {
      primary: '000000',
      secondary: '6B7280',
      accent: 'F3F4F6',
      background: 'FFFFFF',
      text: '1F2937',
    },
    fonts: {
      title: 'Vazirmatn',
      body: 'Vazirmatn',
    },
    defaultShapes: false,
  },

  'corporate-blue': {
    name: 'corporate-blue',
    displayName: 'کسب‌وکار آبی',
    colors: {
      primary: '1E40AF', // Blue 800
      secondary: '3B82F6', // Blue 500
      accent: 'DBEAFE', // Blue 100
      background: 'FFFFFF',
      text: '1E293B',
    },
    fonts: {
      title: 'Vazirmatn',
      body: 'Vazirmatn',
    },
    defaultShapes: true,
  },

  'creative-purple': {
    name: 'creative-purple',
    displayName: 'خلاقانه بنفش',
    colors: {
      primary: '7C3AED', // Purple 600
      secondary: 'A78BFA', // Purple 400
      accent: 'F3E8FF', // Purple 100
      background: 'FFFFFF',
      text: '1F2937',
    },
    fonts: {
      title: 'Vazirmatn',
      body: 'Vazirmatn',
    },
    defaultShapes: true,
  },

  'professional-dark': {
    name: 'professional-dark',
    displayName: 'حرفه‌ای تیره',
    colors: {
      primary: '111827', // Gray 900
      secondary: '4B5563', // Gray 600
      accent: 'F59E0B', // Amber 500
      background: '1F2937',
      text: 'F9FAFB',
    },
    fonts: {
      title: 'Vazirmatn',
      body: 'Vazirmatn',
    },
    defaultShapes: false,
  },
};

export function getTemplate(type: TemplateType): TemplateConfig {
  return TEMPLATES[type];
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATES);
}

export function getDefaultTemplate(): TemplateConfig {
  return TEMPLATES['modern-gradient'];
}
