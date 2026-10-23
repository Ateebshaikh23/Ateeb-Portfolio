'use client'

import { ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import { experience } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Chip, SectionHeading } from '../section-heading'
import { Reveal } from '../reveal'

const VISIBLE_BY_DEFAULT = 3

export function Experience() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true })

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="experience-title"
          index="03"
          eyebrow="Experience"
          title="Professional experience"
          description="Roles across full-stack development, data pipelines and analytics."
        />

        <ol className="relative mt-12 space-y-6 border-l border-border pl-6 md:ml-[12rem] md:pl-10">
          {experience.map((job, i) => {
            const isOpen = !!expanded[i]
            const shown = isOpen ? job.responsibilities : job.responsibilities.slice(0, VISIBLE_BY_DEFAULT)
            const hasMore = job.responsibilities.length > VISIBLE_BY_DEFAULT
            const panelId = `exp-panel-${i}`
            return (
              <li key={`${job.role}-${job.period}`} className="relative">
                <span
                  className={cn(
                    'absolute -left-[1.85rem] top-6 size-2.5 rounded-full border-2 border-background md:-left-[2.85rem]',
                    job.current ? 'bg-brand ring-4 ring-brand/20' : 'bg-muted-foreground/50',
                  )}
                  aria-hidden
                />
                <p className="mb-2 font-mono text-xs text-muted-foreground md:absolute md:-left-[14.5rem] md:top-5 md:mb-0 md:w-40 md:text-right">
                  {job.period}
                </p>
                <Reveal>
                  <article className="rounded-xl border border-border bg-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{job.role}</h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {job.company ?? 'Internship'}
                        </p>
                      </div>
                      {job.current ? (
                        <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] text-accent-foreground">
                          Current
                        </span>
                      ) : null}
                    </div>
                    {job.location ? (
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5" aria-hidden />
                        {job.location}
                      </p>
                    ) : null}

                    <ul id={panelId} className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/85">
                      {shown.map((r) => (
                        <li key={r} className="flex gap-3">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden />
                          {r}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {job.tags.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                      {hasMore ? (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setExpanded((s) => ({ ...s, [i]: !s[i] }))}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-brand-ink hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          {isOpen ? 'Show less' : `Show all ${job.responsibilities.length}`}
                          <ChevronDown className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')} aria-hidden />
                        </button>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
