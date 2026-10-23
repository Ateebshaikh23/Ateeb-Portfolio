'use client'

import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { GithubIcon } from '../brand-icons'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { projectFilters, projects, type ProjectCategory } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Chip, SectionHeading } from '../section-heading'
import { ProjectPreview } from './project-preview'

type Filter = 'all' | ProjectCategory

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openCase, setOpenCase] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const visible = filter === 'all' ? projects : projects.filter((p) => p.filters.includes(filter))

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-title"
            index="04"
            eyebrow="Featured Projects"
            title="Selected work across data platforms, analytics and applications"
            description="Diagrams are custom illustrations of each project's architecture — not screenshots of live deployments."
          />
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-card p-1">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring',
                  filter === f.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {`Showing ${visible.length} project${visible.length === 1 ? '' : 's'}`}
        </p>

        <motion.ul layout={!reduce} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => {
              const isOpen = openCase === p.slug
              const panelId = `case-${p.slug}`
              return (
                <motion.li
                  key={p.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={cn('min-w-0', i === 0 && filter === 'all' && 'lg:col-span-2')}
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--brand)_45%,transparent)]">
                    <ProjectPreview type={p.preview} title={p.title} />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-brand-ink">{p.category}</p>
                        {p.status ? (
                          <span className="rounded-full border border-gold/50 bg-gold/10 px-2 py-0.5 font-mono text-[10px] text-foreground">
                            {p.status}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
                        {p.stack.map((s) => (
                          <li key={s}>
                            <Chip>{s}</Chip>
                          </li>
                        ))}
                      </ul>

                      {isOpen ? (
                        <ul id={panelId} className="mt-5 space-y-2 border-t border-border pt-4 text-sm leading-relaxed text-foreground/85">
                          {p.highlights.map((h) => (
                            <li key={h} className="flex gap-2.5">
                              <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden />
                              {h}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenCase(isOpen ? null : p.slug)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          {isOpen ? 'Hide case study' : 'Case study'}
                          <ChevronDown className={cn('size-4 transition-transform', isOpen && 'rotate-180')} aria-hidden />
                        </button>
                        {p.links?.live ? (
                          <a
                            href={p.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-brand-ink hover:bg-accent"
                          >
                            Live Demo <ArrowUpRight className="size-4" aria-hidden />
                          </a>
                        ) : null}
                        {p.links?.github ? (
                          <a
                            href={p.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-brand-ink hover:bg-accent"
                          >
                            <GithubIcon className="size-4" /> GitHub
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
