import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  index: string
  eyebrow: string
  title: string
  description?: string
  id: string
  className?: string
}) {
  return (
    <Reveal className={cn('max-w-2xl', className)}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-ink">
        <span className="text-muted-foreground">{index}</span>
        <span className="h-px w-8 bg-brand/60" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  )
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-secondary-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}
