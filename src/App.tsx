import { useState, useEffect, type ReactNode } from 'react'

/* ── PHOTO IMPORTS ── */
import img1 from '@/imports/bridal-photo-01.jpg'
import img2 from '@/imports/bridal-photo-02.jpg'
import img3 from '@/imports/bridal-photo-03.jpg'
import img4 from '@/imports/bridal-photo-04.jpg'
import img5 from '@/imports/bridal-photo-05.jpg'
import img6 from '@/imports/bridal-photo-06.jpg'
import img7 from '@/imports/bridal-photo-07.jpg'
import img8 from '@/imports/bridal-photo-08.jpg'
import img9 from '@/imports/bridal-photo-09.jpg'
import img10 from '@/imports/bridal-photo-10.jpg'
import img11 from '@/imports/bridal-photo-11.jpg'
import img12 from '@/imports/bridal-photo-12.jpg'
import img13 from '@/imports/bridal-photo-13.jpg'
import logo from '@/imports/WhatsApp_Image_2026-09-20_at_4.36.53_PM.jpeg'

/* ── PALETTE TOKENS (mirrored from CSS for inline styles) ── */
const T = {
  ivory:   '#FDF8F0',
  cream:   '#FAF3E3',
  beige:   '#EFE4D0',
  beige2:  '#E0CDB4',
  taupe:   '#8B7D6B',
  espresso:'#3D2314',
  brown:   '#5C3317',
  gold:    '#C9A84C',
  gold2:   '#D4AF37',
  gold3:   '#E8CC6A',
  gold4:   '#F5E6A3',
  goldDk:  '#8B6914',
} as const

/* ── GOLD 3-D BALLS ── */
const BALLS = [
  { s:64,  t:'4%',  l:'2%',   a:'orbit1', d:'10s', dl:'0s',   o:.7  },
  { s:24,  t:'12%', l:'16%',  a:'drift',  d:'8s',  dl:'1.3s', o:.55 },
  { s:48,  t:'7%',  r:'5%',   a:'orbit2', d:'9s',  dl:'.6s',  o:.65 },
  { s:17,  t:'22%', r:'15%',  a:'orbit3', d:'7s',  dl:'2s',   o:.5  },
  { s:78,  t:'38%', l:'1%',   a:'drift',  d:'13s', dl:'1.5s', o:.4  },
  { s:32,  t:'51%', r:'3%',   a:'orbit1', d:'11s', dl:'3s',   o:.6  },
  { s:21,  t:'62%', l:'9%',   a:'orbit3', d:'8s',  dl:'.8s',  o:.45 },
  { s:52,  t:'70%', r:'7%',   a:'orbit2', d:'12s', dl:'2.5s', o:.55 },
  { s:38,  t:'80%', l:'20%',  a:'drift',  d:'9s',  dl:'1s',   o:.5  },
  { s:22,  t:'89%', r:'18%',  a:'orbit1', d:'7s',  dl:'3.5s', o:.45 },
  { s:58,  t:'56%', l:'44%',  a:'orbit3', d:'14s', dl:'4s',   o:.26 },
  { s:14,  t:'31%', l:'37%',  a:'drift',  d:'6s',  dl:'2.2s', o:.4  },
  { s:40,  t:'18%', l:'60%',  a:'orbit2', d:'10s', dl:'1.8s', o:.36 },
  { s:28,  t:'75%', l:'53%',  a:'orbit1', d:'11s', dl:'.3s',  o:.46 },
  { s:18,  t:'45%', r:'26%',  a:'drift',  d:'8s',  dl:'5s',   o:.36 },
]

function GoldBalls() {
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
      {BALLS.map((b,i)=>(
        <div key={i} className="gold-ball" style={{
          width:b.s, height:b.s, top:b.t,
          left:(b as any).l, right:(b as any).r, opacity:b.o,
          animationName:b.a, animationDuration:b.d, animationDelay:b.dl,
          animationTimingFunction:'ease-in-out', animationIterationCount:'infinite',
        }}/>
      ))}
      {/* large soft gold blobs */}
      {[
        { w:500,h:500,t:'-10%',l:'-14%',c:'rgba(201,168,76,.1)'},
        { w:560,h:560,t:'36%', r:'-18%',c:'rgba(212,175,55,.09)'},
        { w:360,h:360,t:'72%', l:'15%', c:'rgba(232,204,106,.08)'},
        { w:320,h:320,t:'15%', l:'43%', c:'rgba(201,168,76,.06)'},
      ].map((b,i)=>(
        <div key={i} style={{ position:'absolute', width:b.w, height:b.h, borderRadius:'50%',
          background:`radial-gradient(circle,${b.c} 0%,transparent 70%)`,
          top:(b as any).t, left:(b as any).l, right:(b as any).r, filter:'blur(55px)' }}/>
      ))}
    </div>
  )
}

/* ── SCROLL REVEAL ── */
function useReveal() {
  useEffect(()=>{
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target as HTMLElement
          el.style.transitionDelay = el.dataset.delay??'0ms'
          el.classList.add('visible')
        }
      })
    },{ threshold:.11 })
    document.querySelectorAll('.sr').forEach(el=>io.observe(el))
    return ()=>io.disconnect()
  },[])
}

/* ── NAVBAR ── */
function Navbar(){
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',fn); return()=>window.removeEventListener('scroll',fn)
  },[])
  const go=(id:string)=>{ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setOpen(false) }
  const links=[['Home','home'],['About','about'],['Services','services'],['Gallery','gallery'],['Reviews','reviews'],['FAQ','faq'],['Contact','contact']]
  return(
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background:scrolled?'rgba(253,248,240,.94)':'transparent',
        backdropFilter:scrolled?'blur(24px)':'none',
        borderBottom:scrolled?`1px solid rgba(201,168,76,.2)`:'none',
        boxShadow:scrolled?'0 4px 40px rgba(201,168,76,.1)':'none',
      }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <button onClick={()=>go('home')} className="flex items-center gap-2.5">
            <img src={logo} alt="Dee Makeup Studio Logo"
              style={{ width:42, height:42, borderRadius:'50%', objectFit:'cover',
                boxShadow:`0 4px 16px rgba(201,168,76,.4)` }}/>
            <span className="whitespace-nowrap" style={{fontFamily:"'Playfair Display',serif",fontSize:'1.25rem',fontWeight:800,color:T.espresso,lineHeight:1.1}}>
              Dee Makeup Studio
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(([l,id])=>(
              <button key={id} onClick={()=>go(id)}
                className="relative text-xs font-semibold tracking-wide uppercase transition-colors duration-300 group"
                style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}
                onMouseEnter={e=>(e.currentTarget.style.color=T.gold)}
                onMouseLeave={e=>(e.currentTarget.style.color=T.taupe)}>
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full rounded-full"
                  style={{background:`linear-gradient(90deg,${T.goldDk},${T.gold3})`}}/>
              </button>
            ))}
            <button onClick={()=>go('contact')}
              className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{background:`linear-gradient(135deg,${T.goldDk},${T.gold},${T.gold3})`,color:T.ivory,
                boxShadow:`0 6px 22px rgba(201,168,76,.4)`}}>
              Book Now
            </button>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={()=>setOpen(!open)} style={{color:T.gold}}>
            {[0,1,2].map(n=>(
              <div key={n} className="h-0.5 w-6 rounded transition-all duration-300" style={{
                background:T.gold,
                opacity:open&&n===1?0:1,
                transform:open?(n===0?'rotate(45deg) translate(5px,5px)':n===2?'rotate(-45deg) translate(5px,-5px)':'none'):'none'
              }}/>
            ))}
          </button>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden overflow-hidden transition-all duration-500"
        style={{maxHeight:open?'380px':'0',background:'rgba(253,248,240,.97)',backdropFilter:'blur(24px)'}}>
        <div className="px-6 py-4 flex flex-col gap-3 border-t" style={{borderColor:'rgba(201,168,76,.15)'}}>
          {links.map(([l,id])=>(
            <button key={id} onClick={()=>go(id)}
              className="text-left py-2.5 text-sm font-medium border-b transition-colors"
              style={{fontFamily:"'Poppins',sans-serif",color:T.espresso,borderColor:'rgba(201,168,76,.1)'}}>
              {l}
            </button>
          ))}
          <button onClick={()=>go('contact')} className="mt-2 py-3 rounded-full text-xs font-bold tracking-wide uppercase"
            style={{background:`linear-gradient(135deg,${T.goldDk},${T.gold})`,color:T.ivory}}>
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ── HERO ── */
function Hero(){
  return(
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{background:`linear-gradient(145deg,${T.ivory} 0%,${T.cream} 45%,${T.beige} 100%)`}}>
      <div className="absolute inset-0" style={{backgroundImage:`radial-gradient(circle at 15% 55%,rgba(201,168,76,.08) 0%,transparent 55%),radial-gradient(circle at 85% 20%,rgba(232,204,106,.1) 0%,transparent 50%)`}}/>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-16 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-7"
              style={{background:`rgba(201,168,76,.1)`,color:T.goldDk,border:`1px solid rgba(201,168,76,.28)`}}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:T.gold}}/>
              Premium Makeup Studio · Zirakpur, Punjab
            </div>

            <h1 style={{fontFamily:"'Playfair Display',serif",lineHeight:1.08,color:T.espresso}}
              className="text-5xl md:text-6xl xl:text-[5.5rem] font-extrabold mb-4">
              Where Beauty<br/>
              <span className="gold-text italic">Becomes Art.</span>
            </h1>

            <p style={{fontFamily:"'Great Vibes',cursive",fontSize:'2rem',color:T.gold,lineHeight:1.2}} className="mb-5">
              Dee Makeup Studio
            </p>

            <p className="text-base leading-relaxed max-w-md mb-10"
              style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
              Transforming every bride into a timeless masterpiece. Bridal, party &amp; editorial artistry crafted with precision, passion and premium products at our studio in Zirakpur.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
                className="px-9 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105"
                style={{background:`linear-gradient(135deg,${T.goldDk},${T.gold},${T.gold3})`,color:T.ivory,
                  boxShadow:`0 10px 35px rgba(201,168,76,.48)`}}>
                Book Appointment ✦
              </button>
              <button onClick={()=>document.getElementById('gallery')?.scrollIntoView({behavior:'smooth'})}
                className="px-9 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 border-2"
                style={{borderColor:T.gold,color:T.goldDk,background:`rgba(201,168,76,.06)`}}>
                View Gallery
              </button>
            </div>

            <div className="flex gap-10">
              {[['500+','Happy Brides'],['10+','Yrs Expertise'],['100%','Satisfaction']].map(([n,l])=>(
                <div key={l} className="text-center">
                  <div className="gold-text font-extrabold text-3xl" style={{fontFamily:"'Playfair Display',serif"}}>{n}</div>
                  <div className="text-xs font-medium mt-0.5" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero portrait */}
          <div className="flex justify-center">
            <div className="relative" style={{width:'min(400px,84vw)',height:'min(520px,105vw)'}}>
              <div className="ring-a" style={{inset:-20,borderRadius:'60% 40% 58% 42% / 52% 58% 42% 48%'}}/>
              <div className="ring-b" style={{inset:-38,borderRadius:'60% 40% 58% 42% / 52% 58% 42% 48%'}}/>
              <div className="hero-img overflow-hidden w-full h-full"
                style={{borderRadius:'60% 40% 58% 42% / 52% 58% 42% 48%',
                  boxShadow:`0 35px 90px rgba(201,168,76,.35), 0 12px 35px rgba(201,168,76,.2)`,
                  border:`3px solid rgba(201,168,76,.3)`}}>
                <img src={img1} alt="Dee Makeup Studio – Bridal Masterpiece"
                  style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center'}}/>
                <div style={{position:'absolute',inset:0,
                  background:`linear-gradient(to bottom,transparent 55%,rgba(61,35,20,.2) 100%)`}}/>
              </div>
              {/* floating badges */}
              <div className="gc absolute -bottom-5 -left-6 rounded-2xl px-5 py-3 gs">
                <div className="text-xs font-bold" style={{fontFamily:"'Poppins',sans-serif",color:T.gold}}>⭐ 5.0 Rating</div>
                <div className="text-xs" style={{color:T.taupe}}>500+ Brides</div>
              </div>
              <div className="gc absolute -top-4 -right-5 rounded-2xl px-5 py-3 gs">
                <div className="text-xs font-bold" style={{fontFamily:"'Poppins',sans-serif",color:T.gold}}>✦ Bridal Expert</div>
                <div className="text-xs" style={{color:T.taupe}}>Zirakpur, Punjab</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll pill */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span style={{fontFamily:"'Poppins',sans-serif",color:T.beige2}} className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{border:`2px solid ${T.beige2}`}}>
          <div className="w-1 h-2.5 rounded-full" style={{background:T.gold,animation:'orbit3 1.6s ease-in-out infinite'}}/>
        </div>
      </div>
    </section>
  )
}

/* ── LAYOUT HELPERS ── */
function Wrap({id,bg,children}:{id?:string;bg:string;children:ReactNode}){
  return <section id={id} className="relative py-24 overflow-hidden" style={{background:bg}}>{children}</section>
}
function Box({children}:{children:ReactNode}){
  return <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">{children}</div>
}
function Head({tag,title,sub}:{tag:string;title:ReactNode;sub?:string}){
  return(
    <div className="text-center mb-16 sr up">
      <div className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
        style={{background:'rgba(201,168,76,.1)',color:T.goldDk,border:'1px solid rgba(201,168,76,.22)'}}>
        {tag}
      </div>
      <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-4xl md:text-5xl font-extrabold"
        style2={{color:T.espresso}}>{title}</h2>
      {sub&&<p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{sub}</p>}
    </div>
  )
}

/* ── ABOUT ── */
function About(){
  return(
    <Wrap id="about" bg={`linear-gradient(180deg,${T.cream} 0%,${T.ivory} 100%)`}>
      <Box>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="sr left">
            <div className="grid grid-cols-2 gap-3 relative">
              <img src={img5} alt="Dee – close-up bridal face"
                className="rounded-3xl object-cover w-full h-64 md:h-80"
                style={{boxShadow:`0 24px 60px rgba(201,168,76,.25)`,objectPosition:'top'}}/>
              <div className="flex flex-col gap-3 mt-10">
                <img src={img4} alt="Artist at work"
                  className="rounded-3xl object-cover w-full h-40 md:h-48"
                  style={{boxShadow:`0 20px 50px rgba(201,168,76,.2)`,objectPosition:'top'}}/>
                <img src={img9} alt="Bridal close-up"
                  className="rounded-3xl object-cover w-full h-40 md:h-48"
                  style={{boxShadow:`0 20px 50px rgba(201,168,76,.2)`,objectPosition:'top'}}/>
              </div>
              <div className="gc absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl px-7 py-4 gs text-center whitespace-nowrap">
                <div className="gold-text font-extrabold text-2xl" style={{fontFamily:"'Playfair Display',serif"}}>10+ Years</div>
                <div className="text-xs font-medium" style={{color:T.taupe}}>of Artistry Excellence</div>
              </div>
            </div>
          </div>

          <div className="sr right mt-10 lg:mt-0">
            <div className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{background:'rgba(201,168,76,.1)',color:T.goldDk}}>About the Studio</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}}
              className="text-4xl md:text-5xl font-extrabold mb-6">
              Where Beauty Meets <span className="gold-text">Artistry</span>
            </h2>
            <p className="leading-relaxed mb-5 text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
              <strong style={{color:T.espresso}}>Dee Makeup Studio</strong> is Zirakpur's most sought-after premium makeup studio, nestled in the heart of Sushma Valencia on Airport Road. With over a decade of hands-on artistry, we specialise in bridal transformations that are timeless, refined, and deeply personal.
            </p>
            <p className="leading-relaxed mb-8 text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
              Every face is a canvas. Our passion is to illuminate your natural beauty — using world-class techniques, luxury products, and an eye for detail that makes every look extraordinary in photographs and in life.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[['💎','Luxury Products'],['✨','Bespoke Looks'],['🕐','On-Time Always'],['📸','HD Airbrush Ready']].map(([icon,label])=>(
                <div key={label} className="gc flex items-center gap-3 rounded-xl p-3.5 hover:scale-105 transition-transform duration-300"
                  style={{border:`1px solid rgba(201,168,76,.18)`}}>
                  <span className="text-xl">{icon}</span>
                  <span className="text-xs font-semibold" style={{fontFamily:"'Poppins',sans-serif",color:T.brown}}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </Wrap>
  )
}

/* ── SERVICES ── */
const SERVICES=[
  {icon:'👰',t:'Bridal Makeup',        p:'From ₹8,000', d:'Complete bridal looks — traditional, fusion or modern — flawlessly crafted to last through your entire wedding day and into the night.'},
  {icon:'💍',t:'Engagement Makeup',    p:'From ₹4,500', d:'Luminous, soft and perfectly polished — your engagement look sets the tone for your entire love story. Make it breathtaking.'},
  {icon:'🌸',t:'Mehendi & Haldi',      p:'From ₹3,000', d:'Fresh, dewy and vibrantly colourful looks for your mehendi and haldi ceremonies — light yet utterly camera-perfect.'},
  {icon:'🎉',t:'Party & Event',        p:'From ₹3,500', d:'Glamorous looks that photograph beautifully and last all night — receptions, anniversaries, cocktails and more.'},
  {icon:'📸',t:'Pre-Wedding Shoot',    p:'From ₹5,000', d:'Editorial-quality makeup for your pre-wedding shoot — skin-perfecting, photogenic and designed for every lighting condition.'},
  {icon:'💨',t:'HD Airbrush Makeup',   p:'From ₹6,000', d:'Feather-light airbrush finish that looks flawless on camera, in natural light and under flash — the gold standard for brides.'},
]
function Services(){
  return(
    <Wrap id="services" bg={`linear-gradient(180deg,${T.ivory} 0%,${T.cream} 100%)`}>
      <Box>
        <Head tag="Services" title={<>Studio Services, <span className="gold-text">Crafted for You</span></>}
          sub="From intimate ceremonies to grand weddings — every look is bespoke, every finish is flawless."/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s,i)=>(
            <div key={s.t} className="gc sr flip group rounded-3xl p-7 hover:scale-105 transition-all duration-500 cursor-pointer"
              data-delay={`${i*85}ms`}
              style={{boxShadow:'0 4px 30px rgba(201,168,76,.07)',border:`1px solid rgba(201,168,76,.18)`}}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:rotate-12 transition-transform duration-300"
                style={{background:`linear-gradient(135deg,rgba(201,168,76,.12),rgba(201,168,76,.28))`}}>
                {s.icon}
              </div>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}} className="text-xl font-bold mb-3">{s.t}</h3>
              <p className="text-xs leading-relaxed mb-5" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{s.d}</p>
              <div className="flex items-center justify-between">
                <span className="gold-text font-extrabold text-lg" style={{fontFamily:"'Playfair Display',serif"}}>{s.p}</span>
                <button onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:shadow-xl"
                  style={{background:`linear-gradient(135deg,${T.goldDk},${T.gold})`,color:T.ivory}}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  )
}

/* ── COMPLIMENT 1 – Stats ── */
function Comp1(){
  return(
    <Wrap bg={`linear-gradient(135deg,${T.cream},${T.beige})`}>
      <Box>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="sr left">
            <div className="text-6xl mb-5">✨</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}}
              className="text-4xl md:text-5xl font-extrabold mb-6">
              A Decade of Making <span className="gold-text">Zirakpur's Most Beautiful Brides</span>
            </h2>
            <p className="leading-relaxed text-base" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
              Since 2014, Dee Makeup Studio has been the definitive destination for brides across Zirakpur, Mohali, Chandigarh and the entire tri-city region. Every look we create is a personal masterpiece — as unique and radiant as the bride herself.
            </p>
          </div>
          <div className="sr right grid grid-cols-2 gap-5">
            {[['500+','Brides Beautified'],['10+','Years in Art'],['50+','Ceremonies Served'],['5★','Average Rating']].map(([n,l],i)=>(
              <div key={l} className="gc rounded-3xl p-7 text-center gs hover:scale-105 transition-transform duration-300"
                data-delay={`${i*75}ms`} style={{border:`1px solid rgba(201,168,76,.2)`}}>
                <div className="gold-text text-4xl font-extrabold mb-2" style={{fontFamily:"'Playfair Display',serif"}}>{n}</div>
                <div className="text-xs font-medium" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Wrap>
  )
}

/* ── WHY CHOOSE US ── */
function WhyUs(){
  const items=[
    {icon:'🏆',t:'Award-Winning Artistry',       d:'Recognised as one of Punjab\'s top bridal makeup studios, trusted by hundreds of brides from Zirakpur to Chandigarh.'},
    {icon:'💄',t:'Luxury International Brands',   d:'MAC, Charlotte Tilbury, Huda Beauty, Armani Beauty — only the finest, most skin-safe professional products touch your face.'},
    {icon:'📍',t:'Premium Studio Location',       d:'Ideally situated in Sushma Valencia, Airport Road — a stunning, air-conditioned studio designed for a five-star experience.'},
    {icon:'🎨',t:'Fully Bespoke Looks',           d:'No templates, no repetition. Each look is custom-designed around your features, outfit, jewellery and skin tone.'},
    {icon:'⏰',t:'Punctual & Professional',       d:'We honour your timeline. Whether you have 90 minutes or 4 hours, we deliver perfection without rushing a single step.'},
    {icon:'📷',t:'Photography-Perfect Finish',    d:'From natural light to flash photography — every look is crafted to be as stunning in photos as it is in person.'},
  ]
  return(
    <Wrap id="why-us" bg={`linear-gradient(135deg,${T.beige} 0%,${T.ivory} 50%,${T.cream} 100%)`}>
      <Box>
        <Head tag="Why Choose Us" title={<>The <span className="gold-text">Dee Studio</span> Difference</>}/>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((r,i)=>(
            <div key={r.t} className="gc sr zoom group flex gap-5 rounded-3xl p-7 hover:scale-105 transition-all duration-500"
              data-delay={`${i*80}ms`} style={{border:`1px solid rgba(201,168,76,.18)`}}>
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-125 transition-transform duration-300"
                style={{background:`linear-gradient(135deg,${T.beige},${T.cream})`}}>{r.icon}</div>
              <div>
                <h3 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}} className="font-bold mb-2">{r.t}</h3>
                <p className="text-xs leading-relaxed" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  )
}

/* ── GALLERY ── */
function Gallery(){
  const [sel,setSel]=useState<string|null>(null)
  const photos=[
    {src:img1,alt:'Full-length bridal look in a red lehenga'},
    {src:img2,alt:'Bridal portrait with traditional jewellery and warm lights'},
    {src:img3,alt:'Red bridal look in a traditional setting'},
    {src:img4,alt:'Bridal portrait in an embellished ivory outfit'},
    {src:img5,alt:'Bridal portrait in a bright pink traditional outfit'},
    {src:img6,alt:'Close-up bridal portrait with red attire and jewellery'},
    {src:img7,alt:'Bridal portrait in a red embroidered outfit'},
    {src:img8,alt:'Bridal portrait in a deep red traditional outfit'},
    {src:img9,alt:'Bridal portrait in a red lehenga with traditional jewellery'},
    {src:img10,alt:'Bridal portrait in a red wedding outfit'},
    {src:img11,alt:'Bridal portrait in a pink traditional outfit'},
    {src:img12,alt:'Bridal portrait in a pink outfit with jewellery'},
    {src:img13,alt:'Bridal portrait in an ivory embellished outfit'},
  ]
  return(
    <Wrap id="gallery" bg={`linear-gradient(180deg,${T.cream} 0%,${T.ivory} 100%)`}>
      <Box>
        <Head tag="Gallery" title={<>A Glimpse of <span className="gold-text">Dee's Masterpieces</span></>}
          sub="Real brides, real transformations — each photograph a testament to the art of flawless beauty."/>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((p,i)=>(
            <div key={i} className="sr zoom break-inside-avoid rounded-3xl overflow-hidden cursor-pointer group relative"
              data-delay={`${i*50}ms`} onClick={()=>setSel(p.src)}>
              <img src={p.src} alt={p.alt} className="w-full object-cover transition-all duration-500 group-hover:scale-110 block"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{background:`linear-gradient(to top,rgba(61,35,20,.55),transparent)`}}>
                <span className="text-xs font-medium" style={{fontFamily:"'Poppins',sans-serif",color:T.gold4}}>{p.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </Box>
      {sel&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background:'rgba(20,10,5,.9)',backdropFilter:'blur(14px)'}} onClick={()=>setSel(null)}>
          <img src={sel} alt="Gallery zoom" className="max-w-full max-h-full rounded-3xl"
            style={{boxShadow:`0 30px 80px rgba(201,168,76,.3)`}}/>
          <button className="absolute top-6 right-6 text-3xl font-light hover:opacity-70 transition-opacity"
            style={{color:T.gold3}}>✕</button>
        </div>
      )}
    </Wrap>
  )
}

/* ── COMPLIMENT 2 – Quote + Tags ── */
function Comp2(){
  return(
    <Wrap bg={`linear-gradient(135deg,${T.ivory},${T.beige})`}>
      <Box>
        <div className="sr up max-w-4xl mx-auto text-center">
          <span style={{fontFamily:"'Great Vibes',cursive",fontSize:'3.2rem',color:T.gold,lineHeight:1.2,display:'block',marginBottom:'1rem'}}>
            The Art of Effortless Elegance
          </span>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}}
            className="text-4xl md:text-5xl font-extrabold mb-8">
            Punjab's Most Trusted <span className="gold-text">Bridal Studio</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed mb-12"
            style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
            From the first consultation to the last finishing touch on your wedding morning, Dee Makeup Studio promises an experience as extraordinary as the transformation itself. Our single guarantee: <em style={{color:T.espresso}}>you will feel absolutely magnificent.</em>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Bridal Expert','Airbrush Specialist','HD Makeup','Punjabi Bridal','Engagement Looks','Party Glam','South Asian Brides','Pre-Wedding Shoots'].map(tag=>(
              <span key={tag} className="px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-default"
                style={{background:'rgba(201,168,76,.1)',color:T.goldDk,border:'1px solid rgba(201,168,76,.22)'}}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Box>
    </Wrap>
  )
}

/* ── COMPLIMENT 3 – 3 Cards ── */
function Comp3(){
  return(
    <Wrap bg={`linear-gradient(135deg,${T.beige} 0%,${T.ivory} 100%)`}>
      <Box>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {icon:'🌹',t:'A Legacy of Elegance',d:'Ten years of bespoke artistry, one brushstroke at a time. Every look we create lives forever in photographs and in the hearts of the brides who wore it.'},
            {icon:'💝',t:'Your Vision, Perfected',d:'Share your inspiration or trust our expertise. Either way, you will leave our studio with a look that surpasses everything you imagined when you first walked in.'},
            {icon:'🪄',t:'Studio Magic, Guaranteed',d:'Luxury tools, couture-grade products and cutting-edge techniques combine to deliver a finish so flawless, it photographs perfectly in every light and at every angle.'},
          ].map((item,i)=>(
            <div key={item.t} className="gc sr spin text-center rounded-3xl p-9 hover:scale-105 transition-all duration-500 gs"
              data-delay={`${i*130}ms`} style={{border:`1px solid rgba(201,168,76,.2)`}}>
              <div className="text-5xl mb-5">{item.icon}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}} className="text-2xl font-extrabold mb-4">{item.t}</h3>
              <p className="leading-relaxed text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{item.d}</p>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  )
}

/* ── COMPLIMENT 4 – Image + Quote ── */
function Comp4(){
  return(
    <Wrap bg={`linear-gradient(135deg,${T.ivory} 0%,${T.cream} 50%,${T.beige} 100%)`}>
      <Box>
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 sr left">
            <div className="text-5xl mb-4">👑</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}}
              className="text-4xl md:text-5xl font-extrabold mb-6">
              Because You Deserve <span className="gold-text">Nothing Less Than Perfect</span>
            </h2>
            <p className="leading-relaxed mb-5 text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
              Your wedding day is the most photographed, most remembered, most precious day of your life. Every detail matters — from the softness of your foundation to the last wisp of your veil. At Dee, we leave nothing to chance.
            </p>
            <p className="leading-relaxed text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
              We don't just enhance beauty — we amplify confidence. Step into your ceremony feeling like royalty, knowing that every element of your look has been crafted with love, skill and an unwavering commitment to perfection.
            </p>
          </div>
          <div className="lg:col-span-2 sr right">
            <div className="relative overflow-hidden rounded-3xl" style={{boxShadow:`0 30px 80px rgba(201,168,76,.28)`}}>
              <img src={img6} alt="Dee – bridal fairy lights"
                className="w-full object-cover" style={{objectPosition:'top',maxHeight:480}}/>
              <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom,transparent 60%,rgba(61,35,20,.4) 100%)`}}/>
              <div className="gc absolute bottom-6 left-6 right-6 rounded-2xl p-5"
                style={{border:`1px solid rgba(201,168,76,.25)`}}>
                <div style={{fontFamily:"'Great Vibes',cursive",fontSize:'1.6rem',color:T.gold3}}>Every bride, a masterpiece</div>
                <div className="text-xs mt-1" style={{fontFamily:"'Poppins',sans-serif",color:T.beige2}}>— Dee Makeup Studio</div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Wrap>
  )
}

/* ── COMPLIMENT 5 – Promise Grid ── */
function Comp5(){
  return(
    <Wrap bg={`linear-gradient(135deg,${T.beige} 0%,${T.cream} 100%)`}>
      <Box>
        <Head tag="Our Promise" title={<>Excellence in <span className="gold-text">Every Detail</span></>}/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {icon:'💐',t:'All Ceremonies',   d:'Mehndi, haldi, engagement, wedding, reception — a signature look for every moment of your celebration.'},
            {icon:'🌟',t:'Master-Trained Artists',d:'Our artists hold certifications from VLCC, Jawed Habib and international beauty academies.'},
            {icon:'🎭',t:'Every Skin Type',  d:'Expert colour-matching and skincare prep for all undertones, textures and ages — including mature skin.'},
            {icon:'🛡️',t:'Hygiene First',    d:'Sterilised tools, single-use applicators and patch testing available on request — always.'},
          ].map((item,i)=>(
            <div key={item.t} className="gc sr zoom text-center rounded-3xl p-8 hover:scale-105 transition-all duration-500 gs group"
              data-delay={`${i*100}ms`} style={{border:`1px solid rgba(201,168,76,.18)`}}>
              <div className="text-5xl mb-5 group-hover:scale-125 transition-transform duration-300 inline-block">{item.icon}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}} className="text-lg font-bold mb-3">{item.t}</h3>
              <p className="text-xs leading-relaxed" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{item.d}</p>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  )
}

/* ── COMPLIMENT 6 – Centred Bold ── */
function Comp6(){
  return(
    <Wrap bg={`linear-gradient(135deg,${T.ivory} 0%,${T.beige} 100%)`}>
      <Box>
        <div className="sr up text-center max-w-3xl mx-auto">
          <span style={{fontFamily:"'Great Vibes',cursive",fontSize:'2.8rem',color:T.gold,display:'block',marginBottom:'.6rem'}}>
            Walk in. Leave breathtaking.
          </span>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:T.espresso}}
            className="text-4xl md:text-5xl font-extrabold mb-6">
            Trusted by <span className="gold-text">Hundreds of Brides</span> Across Punjab
          </h2>
          <p className="leading-relaxed mb-8 text-base" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
            Dee Makeup Studio is more than a salon — it's the beginning of your most beautiful chapter. From the first brush of foundation to the final spritz of setting spray, every moment in our studio is designed to make you feel extraordinary.
          </p>
          <button onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
            className="px-10 py-4 rounded-full font-extrabold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 inline-block"
            style={{background:`linear-gradient(135deg,${T.goldDk},${T.gold},${T.gold3})`,color:T.ivory,
              boxShadow:`0 10px 35px rgba(201,168,76,.42)`}}>
            Book Your Session ✦
          </button>
        </div>
      </Box>
    </Wrap>
  )
}

/* ── REVIEWS ── */
const REVIEWS=[
  {name:'Simran Kaur',   role:'Bride, Nov 2024',    text:'Dee Makeup Studio made my wedding day absolutely magical. The look lasted through my entire 3-day celebration without a single touch-up. My photos are stunning — I receive compliments every single time I post them. Truly the best in Punjab!'},
  {name:'Priya Sharma',  role:'Bride, Dec 2024',    text:'I had my bridal makeup done at Dee and I was completely blown away. The artist understood my vision instantly and elevated it beyond anything I had imagined. The gold and beige tones she used complemented my lehenga and skin tone perfectly.'},
  {name:'Ananya Mehta',  role:'Engagement Client',  text:'Got my engagement makeup done here and the look was absolutely flawless. The foundation matched my skin tone perfectly and the eyes were dramatic yet elegant. Everyone at the event kept asking who did my makeup. Would recommend to everyone!'},
  {name:'Riya Malhotra', role:'Bride, Oct 2024',    text:'The pre-wedding shoot makeup was phenomenal. HD finish that looked perfect in both studio light and outdoor photography. I have never felt more beautiful in my life. Dee Studio is a true gem in Zirakpur!'},
  {name:'Kavya Singh',   role:'Party Client',       text:'Booked for a cocktail party and the look was glamorous, modern and so sophisticated. The setting spray they used meant my makeup stayed perfect for 8 hours. Prices are very reasonable for the quality. Absolutely love this studio!'},
  {name:'Neha Arora',    role:'Bride, Jan 2025',    text:'My entire bridal package — mehndi, wedding and reception — was done at Dee. Every single look was even more beautiful than the last. The team is so warm, professional and talented. 10/10 — I will recommend forever!'},
]
function Reviews(){
  return(
    <Wrap id="reviews" bg={`linear-gradient(180deg,${T.ivory} 0%,${T.cream} 100%)`}>
      <Box>
        <Head tag="Reviews" title={<>What Our <span className="gold-text">Brides Say</span></>}/>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r,i)=>(
            <div key={r.name} className="gc sr flip rounded-3xl p-8 hover:scale-105 transition-all duration-500"
              data-delay={`${i*90}ms`} style={{border:`1px solid rgba(201,168,76,.16)`}}>
              <div className="text-sm mb-4" style={{color:T.gold}}>★★★★★</div>
              <p className="leading-relaxed mb-6 text-sm italic" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>
                "{r.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm"
                  style={{background:`linear-gradient(135deg,${T.goldDk},${T.gold})`,color:T.ivory}}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.espresso}}>{r.name}</div>
                  <div className="text-xs" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  )
}

/* ── FAQ ── */
const FAQS=[
  {q:'How do I book an appointment?',       a:'Call or WhatsApp us at 09812222779, or fill in the booking form on this page. For bridal slots, we recommend booking 2–4 months in advance.'},
  {q:'Where is the studio located?',        a:'Dee Makeup Studio is at Sushma Valencia, 121/3, Airport Road, Zirakpur, Nagla, Punjab 140603 — easily accessible from Chandigarh, Mohali and across the tri-city region.'},
  {q:'What products do you use?',           a:'We use MAC, Charlotte Tilbury, Huda Beauty, Armani Beauty and other luxury professional brands — always skin-safe and long-lasting.'},
  {q:'Do you offer airbrush makeup?',       a:'Yes! We specialise in HD airbrush makeup — a feather-light, flawless finish perfect for brides who want all-day wear and stunning photographs.'},
  {q:'Do you do pre-bridal trials?',        a:'Absolutely — we highly recommend a trial 3–4 weeks before your wedding. It allows us to perfect your look and ensures total confidence on your big day.'},
  {q:'How long does bridal makeup take?',   a:'Typically 2–3 hours depending on the complexity of the look. We recommend allowing 3–4 hours on your wedding morning to include hair as well.'},
  {q:'Do you offer home or venue service?', a:'Yes! We offer studio and on-location service. Travel charges apply for venues outside Zirakpur. Contact us with your location for a custom quote.'},
  {q:'Can you handle group bridal bookings?',a:'Yes — complete bridal party packages for bride, bridesmaids, mother of the bride and family are available. Contact us for group pricing.'},
]
function FAQ(){
  const [open,setOpen]=useState<number|null>(null)
  return(
    <Wrap id="faq" bg={`linear-gradient(180deg,${T.cream} 0%,${T.ivory} 100%)`}>
      <Box>
        <Head tag="FAQ" title={<>Frequently Asked <span className="gold-text">Questions</span></>}/>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((f,i)=>(
            <div key={i} className="gc sr up rounded-2xl overflow-hidden" data-delay={`${i*45}ms`}
              style={{border:`1px solid rgba(201,168,76,.15)`}}>
              <button className="w-full flex items-center justify-between px-7 py-5 text-left"
                onClick={()=>setOpen(open===i?null:i)}>
                <span className="font-semibold text-sm pr-4" style={{fontFamily:"'Poppins',sans-serif",color:T.espresso}}>{f.q}</span>
                <span className="text-xl font-light flex-shrink-0 transition-transform duration-300"
                  style={{color:T.gold,transform:open===i?'rotate(45deg)':'none'}}>+</span>
              </button>
              <div className="overflow-hidden transition-all duration-500" style={{maxHeight:open===i?'220px':'0'}}>
                <p className="px-7 pb-5 text-sm leading-relaxed" style={{fontFamily:"'Poppins',sans-serif",color:T.taupe}}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Wrap>
  )
}

/* ── CONTACT ── */
function Contact(){
  const [form,setForm]=useState({name:'',phone:'',date:'',service:'',message:''})
  const [sent,setSent]=useState(false)
  const submit=(e:React.FormEvent)=>{
    e.preventDefault()
    const msg=`Hello! I'd like to book an appointment at Dee Makeup Studio.%0AName: ${form.name}%0APhone: ${form.phone}%0ADate: ${form.date}%0AService: ${form.service}%0AMessage: ${form.message}`
    window.open(`https://wa.me/919812222779?text=${msg}`,'_blank')
    setSent(true); setTimeout(()=>setSent(false),4000)
  }
  const inp="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
  const is={ background:'rgba(253,248,240,.85)', border:`1.5px solid rgba(201,168,76,.22)`,
    fontFamily:"'Poppins',sans-serif", color:T.espresso }
  return(
    <Wrap id="contact" bg={`linear-gradient(135deg,${T.cream} 0%,${T.beige} 50%,${T.ivory} 100%)`}>
      <Box>
        <Head tag="Book Appointment" title={<>Create Your <span className="gold-text">Dream Look</span></>}
          sub="Fill in the form and we will confirm your booking via WhatsApp within 2 hours."/>
        <div className="grid lg:grid-cols-2 gap-14">
          <div className="sr left">
            <form onSubmit={submit} className="gc rounded-3xl p-8 gs space-y-5"
              style={{border:`1px solid rgba(201,168,76,.2)`}}>
              {[{f:'name',l:'Your Name',t:'text',p:'Simran Kaur'},{f:'phone',l:'Phone / WhatsApp',t:'tel',p:'9XXXXXXXXX'},{f:'date',l:'Preferred Date',t:'date',p:''}].map(({f,l,t,p})=>(
                <div key={f}>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wide"
                    style={{fontFamily:"'Poppins',sans-serif",color:T.brown}}>{l}</label>
                  <input type={t} placeholder={p} value={(form as any)[f]}
                    onChange={e=>setForm({...form,[f]:e.target.value})} className={inp} style={is} required/>
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wide"
                  style={{fontFamily:"'Poppins',sans-serif",color:T.brown}}>Service</label>
                <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}
                  className={inp} style={is} required>
                  <option value="">Select a service…</option>
                  {['Bridal Makeup','Engagement Makeup','Party & Event Makeup','Mehendi / Haldi','Pre-Wedding Shoot','HD Airbrush Makeup'].map(s=>(
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wide"
                  style={{fontFamily:"'Poppins',sans-serif",color:T.brown}}>Message (optional)</label>
                <textarea rows={3} placeholder="Tell us about your vision…" value={form.message}
                  onChange={e=>setForm({...form,message:e.target.value})}
                  className={`${inp} resize-none`} style={is}/>
              </div>
              <button type="submit"
                className="w-full py-4 rounded-2xl font-extrabold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105"
                style={{background:`linear-gradient(135deg,${T.goldDk},${T.gold},${T.gold3})`,color:T.ivory,
                  boxShadow:`0 10px 35px rgba(201,168,76,.42)`}}>
                {sent?'✓ Opening WhatsApp…':'Book via WhatsApp ✦'}
              </button>
            </form>
          </div>
          <div className="sr right space-y-6">
            <div className="gc rounded-3xl overflow-hidden gs" style={{height:280,border:`1px solid rgba(201,168,76,.18)`}}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.8!2d76.8413!3d30.6455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef5a88c3c0a7%3A0x1!2sSushma+Valencia%2C+Airport+Road%2C+Zirakpur!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"
                title="Dee Makeup Studio Location"/>
            </div>
            <div className="gc rounded-3xl p-8 gs space-y-5" style={{border:`1px solid rgba(201,168,76,.18)`}}>
              {[
                ['📍','Studio Address','Sushma Valencia, 121/3, Airport Road, Zirakpur, Nagla, Punjab 140603'],
                ['📞','Phone / WhatsApp','+91 98122 22779'],
                ['🕐','Studio Hours','Mon–Sun: 8:00 AM – 8:00 PM'],
                ['📌','Landmark','Sushma Valencia Complex, Airport Road, Zirakpur'],
              ].map(([icon,label,value])=>(
                <div key={label} className="flex gap-4">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div>
                    <div className="text-xs font-bold mb-0.5" style={{fontFamily:"'Poppins',sans-serif",color:T.gold}}>{label}</div>
                    <div className="text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.brown}}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </Wrap>
  )
}

/* ── CTA ── */
function CTA(){
  return(
    <section className="relative py-28 overflow-hidden"
      style={{background:`linear-gradient(135deg,${T.espresso} 0%,${T.brown} 35%,#8B6914 70%,${T.gold2} 100%)`}}>
      {[[500,'-130px','-130px'],[350,'auto','-90px']].map((_,i)=>(
        <div key={i} style={{position:'absolute',width:i===0?500:350,height:i===0?500:350,
          borderRadius:'50%',background:'rgba(255,240,180,.05)',
          top:i===0?'-130px':'auto',bottom:i===1?'-90px':'auto',
          left:i===0?'-130px':'auto',right:i===1?'-90px':'auto'}}/>
      ))}
      {[{t:'14%',l:'22%'},{t:'70%',l:'74%'},{t:'40%',l:'50%'},{t:'18%',r:'24%'},{t:'66%',l:'36%'}].map((pos,i)=>(
        <div key={i} style={{position:'absolute',width:7,height:7,borderRadius:'50%',
          background:`rgba(232,204,106,.7)`,top:pos.t,left:(pos as any).l,right:(pos as any).r,
          animation:`orbit3 ${2+i*.8}s ease-in-out infinite`,animationDelay:`${i*.4}s`}}/>
      ))}
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center relative z-10 sr up">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
          style={{background:'rgba(255,240,180,.1)',color:T.gold3,border:'1px solid rgba(232,204,106,.3)'}}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{background:T.gold3}}/> Limited Bridal Slots · 2025–2026
        </div>
        <span style={{fontFamily:"'Great Vibes',cursive",fontSize:'2.8rem',color:T.gold3,display:'block',marginBottom:'.5rem'}}>
          Your perfect look awaits
        </span>
        <h2 style={{fontFamily:"'Playfair Display',serif"}}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
          style2={{color:T.ivory}}>
          <span style={{color:T.ivory}}>Ready to Look<br/>Absolutely</span>{' '}
          <span className="gold-text">Magnificent?</span>
        </h2>
        <p className="text-lg mb-12 max-w-xl mx-auto leading-relaxed"
          style={{fontFamily:"'Poppins',sans-serif",color:'rgba(253,248,240,.75)'}}>
          Book your bridal consultation at Dee Makeup Studio today and secure your date. Limited slots available for the 2025–2026 bridal season.
        </p>
        <div className="flex flex-wrap justify-center gap-5 mb-12">
          <a href="https://wa.me/919812222779" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-extrabold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105"
            style={{background:T.ivory,color:T.goldDk,boxShadow:'0 12px 40px rgba(0,0,0,.25)'}}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp Now
          </a>
          <a href="tel:09812222779"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-extrabold text-sm uppercase tracking-wide border-2 transition-all duration-300 hover:scale-105"
            style={{borderColor:T.gold3,color:T.gold3}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(232,204,106,.12)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent'}}>
            📞 Call Now
          </a>
        </div>
        <div className="flex justify-center items-center gap-4">
          <span className="text-xs font-medium" style={{fontFamily:"'Poppins',sans-serif",color:'rgba(253,248,240,.5)'}}>Follow our work:</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-colors"
            style={{color:T.gold3,borderColor:'rgba(232,204,106,.3)'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(232,204,106,.1)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent'}}>
            <svg viewBox="0 0 24 24" className="w-4 h-4" style={{fill:T.gold3}}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            @instagram.com
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer(){
  const go=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  return(
    <footer className="relative py-16" style={{background:'#1a0c06'}}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dee Logo" style={{width:48,height:48,borderRadius:'50%',objectFit:'cover',
                boxShadow:`0 4px 16px rgba(201,168,76,.4)`}}/>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.5rem',fontWeight:800,color:T.gold3,lineHeight:1.1}}>Dee MAKEUP STUDIO</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'0.5rem',letterSpacing:'.2em',color:T.gold,fontWeight:700}}></div>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-6" style={{fontFamily:"'Poppins',sans-serif",color:'rgba(239,228,208,.35)'}}>
              Premium bridal makeup studio in Zirakpur, Punjab. Crafting timeless beauty for your most cherished moments.
            </p>
            <div className="flex gap-3">
              {[
                {href:'https://instagram.com',bg:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)',icon:<svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},
                {href:'https://wa.me/919812222779',bg:'#25d366',icon:<svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>},
              ].map((s,i)=>(
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{background:s.bg}}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-5 text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.gold3}}>Quick Links</h4>
            <div className="space-y-3">
              {[['About','about'],['Services','services'],['Gallery','gallery'],['Reviews','reviews'],['FAQ','faq'],['Contact','contact']].map(([l,id])=>(
                <button key={id} onClick={()=>go(id)} className="block text-xs transition-colors text-left"
                  style={{fontFamily:"'Poppins',sans-serif",color:'rgba(239,228,208,.38)'}}
                  onMouseEnter={e=>(e.currentTarget.style.color=T.gold)}
                  onMouseLeave={e=>(e.currentTarget.style.color='rgba(239,228,208,.38)')}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-5 text-sm" style={{fontFamily:"'Poppins',sans-serif",color:T.gold3}}>Contact Info</h4>
            <div className="space-y-3 text-xs" style={{fontFamily:"'Poppins',sans-serif",color:'rgba(239,228,208,.38)'}}>
              <p>📍 Sushma Valencia, 121/3, Airport Road, Zirakpur, Nagla, Punjab 140603</p>
              <p>📞 +91 98122 22779</p>
              <p>🕐 Mon–Sun: 8 AM – 8 PM</p>
            </div>
          </div>
        </div>
        <div className="gold-line mb-8"/>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{fontFamily:"'Poppins',sans-serif",color:'rgba(239,228,208,.22)'}}>
            © 2025 Dee Makeup Studio · All rights reserved.
          </p>
          <p className="text-xs" style={{fontFamily:"'Poppins',sans-serif",color:'rgba(239,228,208,.22)'}}>
            Crafted with ♥ in Zirakpur, Punjab
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ── FLOATING BUTTONS ── */
function FloatingBtns(){
  return(
    <div className="fixed right-5 bottom-8 z-50 flex flex-col gap-4">
      <a href="https://wa.me/919812222779" target="_blank" rel="noopener noreferrer"
        className="fab w-14 h-14 rounded-full flex items-center justify-center"
        style={{background:'#25d366',boxShadow:'0 8px 28px rgba(37,211,102,.5)'}} title="WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
        className="fab w-14 h-14 rounded-full flex items-center justify-center"
        style={{background:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',boxShadow:'0 8px 28px rgba(220,39,67,.5)'}} title="Instagram">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
    </div>
  )
}

/* ── ROOT ── */
export default function App(){
  useReveal()
  return(
    <div style={{position:'relative',background:T.ivory}}>
      <GoldBalls/>
      <div style={{position:'relative',zIndex:1}}>
        <Navbar/>
        <Hero/>
        <About/>
        <Services/>
        <Comp1/>
        <WhyUs/>
        <Gallery/>
        <Comp2/>
        <Reviews/>
        <Comp3/>
        <Comp4/>
        <Comp5/>
        <Comp6/>
        <FAQ/>
        <Contact/>
        <CTA/>
        <Footer/>
      </div>
      <FloatingBtns/>
    </div>
  )
}
