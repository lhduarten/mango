import { Link } from 'react-router-dom'
import { MangoLogo } from '../components/MangoLogo'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-ink text-cream">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="flex items-center gap-2 font-display text-xl tracking-tight">
          <MangoLogo className="h-6 w-6" />
          Mango
        </span>
        <Link
          to="/camera"
          className="rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/80 transition hover:border-cream/30 hover:text-cream"
        >
          Experimentar
        </Link>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-10 text-center sm:pt-16">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-mango-500/30 bg-mango-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-mango-400">
          Câmera descartável digital
        </span>

        <h1 className="font-display text-[2.5rem] leading-[1.1] font-medium tracking-tight sm:text-6xl">
          Todos fotografam.
          <br />
          <span className="text-mango-400 italic">Ninguém vê</span> antes da hora.
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-balance text-muted">
          Uma câmera compartilhada para o seu evento. Os convidados fotografam pelo
          celular, direto do navegador — e o álbum só aparece no momento da
          revelação. Como um rolo de filme.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/camera"
            className="rounded-full bg-gradient-to-b from-mango-300 to-mango-500 px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_30px_-8px_rgba(255,138,61,0.55)] transition hover:brightness-105"
          >
            Experimentar a câmera
          </Link>
          <span className="text-xs text-muted">Protótipo em construção</span>
        </div>

        <ShutterGraphic />
      </main>

      <section className="border-t border-cream/8">
        <div className="mx-auto grid max-w-4xl gap-10 px-6 py-16 sm:grid-cols-3">
          <Step
            number="01"
            title="Crie o evento"
            text="Defina o nome, a data e quantas fotos cada convidado pode tirar."
          />
          <Step
            number="02"
            title="Todos fotografam"
            text="Os convidados abrem o link e já estão dentro. Sem instalar nada."
          />
          <Step
            number="03"
            title="Revele junto"
            text="No momento certo, o álbum aparece pra todo mundo, ao mesmo tempo."
          />
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-muted/70">
        Mango — mango.cam
      </footer>
    </div>
  )
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="text-left">
      <span className="font-display text-sm text-mango-400">{number}</span>
      <h3 className="mt-2 font-display text-lg text-cream">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  )
}

// Gráfico decorativo inspirado no obturador/íris de uma câmera — reforça o
// tema sem depender de fotos reais, que ainda não existem neste protótipo.
function ShutterGraphic() {
  const blades = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return {
      x1: 100 + Math.cos(angle) * 34,
      y1: 100 + Math.sin(angle) * 34,
      x2: 100 + Math.cos(angle) * 62,
      y2: 100 + Math.sin(angle) * 62,
    }
  })

  return (
    <div className="relative mt-16 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
      <div className="absolute inset-0 rounded-full bg-mango-500/20 blur-3xl" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full">
        <circle cx="100" cy="100" r="98" fill="none" stroke="#F6EFE4" strokeOpacity="0.12" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#F6EFE4" strokeOpacity="0.18" />
        {blades.map((b, i) => (
          <line
            key={i}
            x1={b.x1}
            y1={b.y1}
            x2={b.x2}
            y2={b.y2}
            stroke="url(#mangoGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        <circle cx="100" cy="100" r="30" fill="url(#mangoGrad)" />
        <defs>
          <linearGradient id="mangoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFCA85" />
            <stop offset="100%" stopColor="#FF8A3D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
