import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Сити Бейкер',
    short_name: 'City Baker',
    description: 'Свежая выпечка, кофе и доставка городских боксов.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F2EDE4',
    theme_color: '#D2582B',
    lang: 'ru',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
