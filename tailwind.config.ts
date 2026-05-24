import type { Config } from 'tailwindcss';
const config: Config = {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{colors:{cream:'#F2EDE4',ink:'#1B1814',coffee:'#312C26',orange:'#D2582B',gold:'#D99A31',muted:'#8A7D70'},fontFamily:{sans:['Inter','Arial','sans-serif'],serif:['Georgia','serif']},boxShadow:{soft:'0 20px 50px rgba(34,24,18,.12)'}}},plugins:[]};
export default config;
