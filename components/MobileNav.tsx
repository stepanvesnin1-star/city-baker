'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav=[['/menu','Меню'],['/about','О нас'],['/locations','Где купить'],['/order','Заказать'],['/blog','Блог'],['/contacts','Контакты']];
export function MobileNav(){
  const [open,setOpen]=useState(false);
  const pathname=usePathname();
  return <>
    <button aria-label="Открыть меню" className="lg:hidden rounded-full bg-black/5 p-3" onClick={()=>setOpen(true)}><Menu/></button>
    <AnimatePresence>
      {open&&<motion.div className="fixed inset-0 z-[100] bg-ink text-white" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <div className="container py-5 flex justify-between items-center border-b border-white/10">
          <Link href="/" onClick={()=>setOpen(false)} className="text-lg font-black tracking-wide"><span className="bg-orange text-white rounded-xl px-2 py-1 mr-2">⌁</span>СИТИ БЕЙКЕР</Link>
          <button aria-label="Закрыть меню" className="rounded-full bg-white/10 p-3" onClick={()=>setOpen(false)}><X/></button>
        </div>
        <motion.nav className="container py-10 grid gap-2" initial="hidden" animate="show" variants={{hidden:{},show:{transition:{staggerChildren:.05}}}}>
          {nav.map(([href,label],i)=><motion.div key={href} variants={{hidden:{opacity:0,x:-16},show:{opacity:1,x:0}}}>
            <Link onClick={()=>setOpen(false)} href={href} className={`flex justify-between items-center rounded-[28px] px-5 py-5 text-3xl font-black ${pathname===href?'bg-orange':'bg-white/5'}`}><span>{label}</span><span className="text-base opacity-60">0{i+1}</span></Link>
          </motion.div>)}
        </motion.nav>
        <div className="container fixed bottom-6 left-0 right-0"><Link onClick={()=>setOpen(false)} href="/order" className="btn btn-primary w-full"><ShoppingBag size={18}/> Собрать бокс</Link></div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
