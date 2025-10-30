export const themes = [
  {
    id: 'professional-blue',
    name: 'حرفه‌ای آبی',
    description: 'مناسب برای ارائه‌های کسب‌وکار',
    colors: {
      primary: '#1C2833',
      secondary: '#2E4053',
      accent: '#1791e8',
      surface: '#F4F6F6',
      text: '#1d1d1d',
      muted: '#AAB7B8'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  },
  {
    id: 'creative-coral',
    name: 'خلاقانه مرجانی',
    description: 'مناسب برای ارائه‌های خلاقانه',
    colors: {
      primary: '#5EA8A7',
      secondary: '#277884',
      accent: '#FE4447',
      surface: '#FFFFFF',
      text: '#1d1d1d',
      muted: '#AAB7B8'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  },
  {
    id: 'minimal-sage',
    name: 'مینیمال سبز',
    description: 'ساده و تمیز',
    colors: {
      primary: '#87A96B',
      secondary: '#E07A5F',
      accent: '#F4F1DE',
      surface: '#FFFFFF',
      text: '#2C2C2C',
      muted: '#CCCBCB'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  },
  {
    id: 'bold-red',
    name: 'پررنگ قرمز',
    description: 'پرانرژی و جذاب',
    colors: {
      primary: '#C0392B',
      secondary: '#E74C3C',
      accent: '#F39C12',
      surface: '#FFFFFF',
      text: '#1d1d1d',
      muted: '#AAB7B8'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  },
  {
    id: 'luxury-burgundy',
    name: 'لوکس زرشکی',
    description: 'مناسب برای ارائه‌های رسمی',
    colors: {
      primary: '#5D1D2E',
      secondary: '#951233',
      accent: '#997929',
      surface: '#FAF7F2',
      text: '#1d1d1d',
      muted: '#C15937'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  },
  {
    id: 'dark-purple',
    name: 'تیره بنفش',
    description: 'مدرن و تکنولوژیک',
    colors: {
      primary: '#B165FB',
      secondary: '#181B24',
      accent: '#40695B',
      surface: '#1A1A2E',
      text: '#FFFFFF',
      muted: '#98ACB5'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  },
  {
    id: 'warm-blush',
    name: 'گرم صورتی',
    description: 'نرم و دوستانه',
    colors: {
      primary: '#A49393',
      secondary: '#EED6D3',
      accent: '#E8B4B8',
      surface: '#FAF7F2',
      text: '#2C2C2C',
      muted: '#D4A5A5'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  },
  {
    id: 'vibrant-orange',
    name: 'پرجنب‌وجوش نارنجی',
    description: 'پرانرژی و مثبت',
    colors: {
      primary: '#F96D00',
      secondary: '#F2F2F2',
      accent: '#222831',
      surface: '#FFFFFF',
      text: '#222831',
      muted: '#CCCBCB'
    },
    fonts: { heading: 'Arial', body: 'Arial' }
  }
];

export function getThemeById(themeId) {
  return themes.find(t => t.id === themeId);
}

export function getAllThemes() {
  return themes;
}
