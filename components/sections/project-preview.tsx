import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'

function Node({ label, tone, className }: { label: string; tone?: 'bronze' | 'silver' | 'gold' | 'brand'; className?: string }) {
  const toneDot = {
    bronze: 'bg-bronze',
    silver: 'bg-silver',
    gold: 'bg-gold',
    brand: 'bg-brand',
  } as const
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5 font-mono text-[10px] leading-none text-foreground/85 shadow-sm',
        className,
      )}
    >
      {tone ? <span className={cn('size-1.5 shrink-0 rounded-full', toneDot[tone])} aria-hidden /> : null}
      <span className="truncate">{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 8" className="h-2 w-4 shrink-0 text-muted-foreground/70 sm:w-5" aria-hidden>
      <path d="M0 4h20" stroke="currentColor" strokeWidth="1.25" className="animate-flow" fill="none" />
      <path d="M18 1l4 3-4 3" stroke="currentColor" strokeWidth="1.25" fill="none" />
    </svg>
  )
}

function Bars({ values, className }: { values: number[]; className?: string }) {
  return (
    <div className={cn('flex h-full items-end gap-1', className)}>
      {values.map((v, i) => (
        <span
          key={i}
          className={cn('flex-1 rounded-sm', i === values.length - 2 ? 'bg-brand' : 'bg-chart-2/25 dark:bg-chart-2/30')}
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  )
}

function SportsPlatform() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-4">
      <div className="grid min-w-0 grid-cols-4 gap-1">
        {['CSV', 'Excel', 'JSON/API', 'PDF'].map((s) => (
          <Node key={s} label={s} className="justify-center" />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <Node label="MinIO" tone="brand" />
        <Arrow />
        <Node label="Bronze" tone="bronze" />
        <Arrow />
        <Node label="Silver" tone="silver" />
        <Arrow />
        <Node label="Gold" tone="gold" />
        <Arrow />
        <Node label="Power BI" />
      </div>
      <div className="flex flex-wrap gap-1 font-mono text-[10px] text-muted-foreground">
        <span className="rounded border border-dashed border-border px-1.5 py-0.5">sha256 dedupe</span>
        <span className="rounded border border-dashed border-border px-1.5 py-0.5">61 APIs · 24 categories</span>
        <span className="rounded border border-dashed border-border px-1.5 py-0.5">PostgreSQL</span>
      </div>
    </div>
  )
}

function Databricks() {
  return (
    <div className="grid h-full grid-cols-[auto_1fr] gap-3 p-4">
      <div className="flex flex-col justify-center gap-1.5">
        <Node label="raw CSV" />
        <Node label="bronze" tone="bronze" />
        <Node label="silver" tone="silver" />
        <Node label="gold · delta" tone="gold" />
      </div>
      <div className="flex flex-col gap-2 rounded-md border border-border bg-card p-2.5">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 rounded border border-border p-1.5">
              <div className="h-1 w-6 rounded bg-muted-foreground/30" />
              <div className="mt-1.5 h-2 w-10 rounded bg-foreground/70" />
            </div>
          ))}
        </div>
        <svg viewBox="0 0 120 40" className="h-full w-full flex-1" preserveAspectRatio="none" aria-hidden>
          <path d="M0 32 L15 28 L30 30 L45 20 L60 22 L75 14 L90 16 L105 8 L120 10" fill="none" stroke="var(--brand)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M0 36 L15 34 L30 35 L45 30 L60 31 L75 27 L90 28 L105 24 L120 25" fill="none" stroke="var(--chart-2)" strokeOpacity="0.5" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  )
}

function Fabric() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-4">
      <div className="flex items-center gap-1">
        <Node label="Data Pipelines" />
        <Arrow />
        <Node label="Dataflows Gen2" />
      </div>
      <div className="rounded-lg border border-dashed border-brand/50 bg-accent/40 p-2.5">
        <p className="font-mono text-[10px] text-accent-foreground">OneLake</p>
        <div className="mt-1.5 flex items-center gap-1">
          <Node label="Lakehouse" tone="brand" />
          <Arrow />
          <Node label="Notebooks" />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Arrow />
        <Node label="Power BI" />
      </div>
    </div>
  )
}

function Retail() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-2 p-4">
      <div className="grid grid-cols-3 gap-1.5">
        {['Revenue', 'Orders', 'Avg. basket'].map((k) => (
          <div key={k} className="rounded-md border border-border bg-card p-1.5">
            <p className="font-mono text-[9px] text-muted-foreground">{k}</p>
            <div className="mt-1 h-2 w-8 rounded bg-foreground/70" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.4fr_1fr] gap-1.5">
        <div className="rounded-md border border-border bg-card p-2">
          <Bars values={[40, 55, 48, 70, 62, 80, 74, 90, 68]} />
        </div>
        <div className="flex items-center justify-center rounded-md border border-border bg-card p-2">
          <svg viewBox="0 0 36 36" className="size-full max-h-16" aria-hidden>
            <circle cx="18" cy="18" r="14" fill="none" stroke="var(--chart-2)" strokeOpacity="0.2" strokeWidth="6" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="var(--brand)" strokeWidth="6" strokeDasharray="52 88" transform="rotate(-90 18 18)" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="var(--chart-3)" strokeWidth="6" strokeDasharray="20 88" strokeDashoffset="-52" transform="rotate(-90 18 18)" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function AppPreview() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="ml-2 h-2 flex-1 rounded bg-muted" />
        </div>
        <div className="grid grid-cols-[1fr_1.2fr] gap-2 p-2.5">
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 rounded bg-foreground/70" />
            <div className="h-1.5 w-full rounded bg-muted-foreground/25" />
            <div className="h-1.5 w-5/6 rounded bg-muted-foreground/25" />
            <div className="mt-2 h-3 w-12 rounded bg-brand" />
          </div>
          <div className="grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-6 rounded border border-border bg-background" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border px-2.5 py-1.5 font-mono text-[9px] text-muted-foreground">
          <span>React · Tailwind</span>
          <span>Prisma → PostgreSQL</span>
        </div>
      </div>
    </div>
  )
}

const previews: Record<Project['preview'], () => React.JSX.Element> = {
  'sports-platform': SportsPlatform,
  databricks: Databricks,
  fabric: Fabric,
  retail: Retail,
  app: AppPreview,
}

export function ProjectPreview({ type, title }: { type: Project['preview']; title: string }) {
  const Preview = previews[type]
  return (
    <div
      role="img"
      aria-label={`Illustrative diagram for ${title}`}
      className="relative h-44 overflow-hidden border-b border-border bg-secondary/50 bg-dots"
    >
      <Preview />
    </div>
  )
}
