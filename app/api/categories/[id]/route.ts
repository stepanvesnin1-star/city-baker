import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();const {id}=await params;const b=await req.json();if(b.sort!==undefined)b.sort=Number(b.sort||0);return NextResponse.json({ok:true,data:await prisma.category.update({where:{id},data:b})});}catch{return NextResponse.json({ok:false},{status:400});}}
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();const {id}=await params;await prisma.category.delete({where:{id}});return NextResponse.json({ok:true});}catch{return NextResponse.json({ok:false},{status:400});}}
