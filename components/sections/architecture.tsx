'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { medallionStages, techFlow, type MedallionStage } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SectionHeading } from '../section-heading'
import { Reveal } from '../reveal'

const tone: Record<MedallionStage['id'], { dot: string; ring: string; text: string }> = {
  bronze: { dot: 'bg-bronze', ring: 'border-bronze/70', text: 'text-bronze' },
  silver: { dot: 'bg-silver', ring: 'border-silver/70', text: 'text-silver' },
  gold: { dot: 'bg-gold', ring: 'border-gold/70', text: 'text-gold' },
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      viewBox={vertical ? '0 0 12 40' : '0 0 56 12'}
      className={cn('shrink-0 text-muted-foreground', vertical ? 'h-8 w-3' : 'h-3 w-12')}
      aria-hidden
    >
      {vertical ? (
        <>
          <path d="M6 0v34" stroke="currentColor" strokeWidth="1.5" className="animate-flow" />
          <path d="M2 30l4 6 4-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </>
      ) : (
        <>
          <path d="M0 6h50" stroke="currentColor" strokeWidth="1.5" className="animate-flow" />
          <path d="M46 2l6 4-6 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </>
      )}
    </svg>
  )
}

export function Architecture() {
  const [selected, setSelected] = useState<MedallionStage['id']>('bronze')
  const stage = medallionStages.find((s) => s.id === selected) ?? medallionStages[0]

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-title"
      className="dark border-t border-border bg-background py-20 text-foreground md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="architecture-title"
          index="05"
          eyebrow="Data Architecture"
          title="How raw data becomes analytics-ready"
          description="The Medallion Architecture I apply across my data projects. Select a layer to see its purpose, key operations, and the tools used for it in specific projects."
        />

        <Reveal className="mt-12">
          <div role="tablist" aria-label="Medallion layers" className="flex flex-col items-stretch md:flex-row md:items-center">
            {medallionStages.map((s, i) => {
              const isActive = s.id === selected
              return (
                <div key={s.id} className="flex flex-col items-center md:flex-1 md:flex-row">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${s.id}`}
                    aria-selected={isActive}
                    aria-controls="medallion-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setSelected(s.id)}
                    onKeyDown={(e) => {
                      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
                      e.preventDefault()
                      const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
                      const next = medallionStages[(i + dir + medallionStages.length) % medallionStages.length]
                      setSelected(next.id)
                      document.getElementById(`tab-${next.id}`)?.focus()
                    }}
                    className={cn(
                      'w-full rounded-xl border bg-card p-5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                      isActive ? cn(tone[s.id].ring, 'shadow-[0_0_0_4px_color-mix(in_oklch,var(--brand)_12%,transparent)]') : 'border-border opacity-75 hover:opacity-100',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className={cn('size-2.5 rounded-full', tone[s.id].dot)} aria-hidden />
                        <span className="font-semibold">{s.name}</span>
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">{`0${i + 1}`}</span>
                    </div>
                    <p className={cn('mt-2 font-mono text-xs uppercase tracking-wider', tone[s.id].text)}>{s.subtitle}</p>
                  </button>
                  {i < medallionStages.length - 1 ? (
                    <div className="flex justify-center py-2 md:px-3 md:py-0">
                      <span className="md:hidden">
                        <FlowArrow vertical />
                      </span>
                      <span className="hidden md:inline">
                        <FlowArrow />
                      </span>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div
            id="medallion-panel"
            role="tabpanel"
            aria-labelledby={`tab-${stage.id}`}
            className="mt-6 grid gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-3 md:p-8"
          >
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Purpose</h3>
              <p className="mt-3 text-pretty leading-relaxed">{stage.purpose}</p>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Key operations</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {stage.operations.map((op) => (
                  <li key={op} className="flex items-center gap-2.5">
                    <span className={cn('size-1.5 rounded-full', tone[stage.id].dot)} aria-hidden />
                    {op}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Technologies · where used</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {stage.technologies.map((t) => (
                  <li key={t.name} className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-border/60 pb-2 last:border-0">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.usedIn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-xl border border-dashed border-border p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Typical technology flow</p>
            <ol className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {techFlow.map((t, i) => (
                <li key={t.label} className="flex items-center gap-3">
                  <span className="rounded-md border border-border bg-card px-3 py-2">
                    <span className="block text-sm font-medium">{t.label}</span>
                    <span className="block font-mono text-[11px] text-muted-foreground">{t.caption}</span>
                  </span>
                  {i < techFlow.length - 1 ? (
                    <ArrowRight className="hidden size-4 text-brand-ink sm:block" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              Each project uses a subset of these tools — see the per-layer breakdown above for specifics.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
