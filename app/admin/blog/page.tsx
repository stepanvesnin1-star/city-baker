import AdminShell from '@/components/AdminShell';
import AdminSimpleCrudClient from '@/components/AdminSimpleCrudClient';
import { prisma } from '@/lib/prisma';
import { posts as demoPosts } from '@/lib/data';

export default async function AdminBlog(){
  let items:any[] = demoPosts as any[];
  try { items = await prisma.blogPost.findMany({orderBy:{createdAt:'desc'}}); } catch {}
  return <AdminShell title="Блог"><AdminSimpleCrudClient endpoint="/api/blog" title="Новая статья" initialItems={items} fields={[{name:'title',label:'Заголовок'},{name:'slug',label:'Slug'},{name:'category',label:'Категория'},{name:'excerpt',label:'Анонс'},{name:'content',label:'Текст',textarea:true},{name:'imageUrl',label:'Изображение',image:true}]}/></AdminShell>;
}
