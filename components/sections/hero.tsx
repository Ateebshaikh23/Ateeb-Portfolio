import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { profile } from '@/lib/data'
import { Reveal } from '../reveal'
import { HeroPipeline } from './hero-pipeline'

const heroTech = ['Python', 'SQL', 'PySpark', 'Databricks', 'Microsoft Fabric', 'Next.js']

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[640px] rounded-full bg-brand/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-ink">
                {'Software Engineer · Data & Full-Stack'}
              </p>
              {profile.openToOpportunities ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Open to relevant opportunities
                </span>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              id="hero-title"
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Building Data Systems.{' '}
              <span className="text-muted-foreground">Engineering Digital Experiences.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              I build reliable data pipelines, analytics platforms, and full-stack applications that turn complex
              problems into practical solutions.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Explore My Work
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
              </a>
              <a
                href="#contact"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {"Let's Connect"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground" aria-label="Core technologies">
              {heroTech.map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  {i > 0 ? <span className="text-border" aria-hidden>{'/'}</span> : null}
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <HeroPipeline />
        </Reveal>
      </div>
    </section>
  )
}
