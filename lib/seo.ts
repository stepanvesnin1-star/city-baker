export const siteConfig = {
  name: 'Сити Бейкер',
  title: 'Сити Бейкер — свежая выпечка и кофе с доставкой',
  description: 'Городская пекарня: свежий хлеб, круассаны, десерты, кофе, заказ боксов и доставка по городу.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'ru_RU',
  keywords: ['пекарня', 'выпечка', 'хлеб', 'круассаны', 'кофе', 'доставка выпечки', 'Сити Бейкер'],
};

export const routes = [
  { path: '/', priority: 1, changeFrequency: 'daily' as const },
  { path: '/menu', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/order', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/locations', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/contacts', priority: 0.6, changeFrequency: 'monthly' as const },
];
