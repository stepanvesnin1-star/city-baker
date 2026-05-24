import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage } from '@/lib/telegram';
export async function POST(req: Request){const form=await req.formData(); const name=String(form.get('name')||''); const email=String(form.get('email')||''); const message=String(form.get('message')||''); try{await prisma.contactRequest.create({data:{name,email,message}})}catch(e){console.warn('Contact DB skipped',e)} await sendTelegramMessage(`<b>Заявка с сайта</b>\n${name}\n${email}\n${message}`); return NextResponse.redirect(new URL('/contacts', req.url));}
