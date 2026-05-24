import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function POST(req: Request){const form=await req.formData(); const email=String(form.get('email')||''); try{if(email) await prisma.subscriber.upsert({where:{email},update:{},create:{email}})}catch(e){console.warn('Subscriber DB skipped',e)} return NextResponse.redirect(new URL('/', req.url));}
