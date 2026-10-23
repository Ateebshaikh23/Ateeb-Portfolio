import { BarChart3, Database, FileInput, Layers, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Step = {
  label: string
  detail: string
  tech: string
  icon: LucideIcon
  tone?: 'bronze' | 'silver' | 'gold'
}

const steps: Step[] = [
  { label: 'Ingest', detail: 'CSV · Excel · JSON/API · PDF', tech: 'MinIO', icon: FileInput },
  { label: 'Bronze', detail: 'Raw landing, checksums, catalogue', tech: 'Python', icon: Layers, tone: 'bronze' },
  { label: 'Silver', detail: 'Typed, standardized, validated', tech: 'PySpark · Polars', icon: Sparkles, tone: 'silver' },
  { label: 'Gold', detail: 'Dimensions, facts, KPIs', tech: 'PostgreSQL · Delta Lake', icon: Database, tone: 'gold' },
  { label: 'Serve', detail: 'Dashboards & reporting', tech: 'Power BI', icon: BarChart3 },
]

const toneClass: Record<NonNullable<Step['tone']>, string> = {
  bronze: 'bg-bronze',
  silver: 'bg-silver',
  gold: 'bg-gold',
}

export function HeroPipeline() {
  return (
    <figure
      aria-label="Data workflow: ingest, bronze, silver, gold, serve"
      className="relative rounded-xl border border-border bg-card shadow-[0_1px_0_0_var(--border),0_24px_48px_-24px_color-mix(in_oklch,var(--brand)_35%,transparent)]"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-brand" aria-hidden />
          <span className="font-mono text-xs text-muted-foreground">medallion_pipeline</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">workflow overview</span>
      </div>

      <ol className="relative p-4 sm:p-5">
        <span className="absolute left-[2.15rem] top-9 bottom-9 w-px bg-border sm:left-[2.4rem]" aria-hidden>
          <span className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_10px_var(--brand)] animate-travel" />
        </span>
        {steps.map((step) => (
          <li key={step.label} className="relative flex items-center gap-4 py-2.5">
            <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background">
              <step.icon className="size-4 text-foreground/80" aria-hidden />
              {step.tone ? (
                <span className={`absolute -right-0.5 -top-0.5 size-2 rounded-full ${toneClass[step.tone]}`} aria-hidden />
              ) : null}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">{step.label}</p>
                <p className="truncate text-xs text-muted-foreground">{step.detail}</p>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-brand-ink">{step.tech}</span>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 font-mono text-[11px] text-muted-foreground">
        <span>raw → cleaned → analytics-ready</span>
        <span className="hidden sm:inline">tools vary per project</span>
      </figcaption>
    </figure>
  )
}
