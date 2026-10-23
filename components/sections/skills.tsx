import { BarChart3, Container, Database, LayoutTemplate, Server, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { skillGroups, type SkillGroup } from '@/lib/data'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

const icons: Record<SkillGroup['icon'], LucideIcon> = {
  workflow: Workflow,
  database: Database,
  chart: BarChart3,
  layout: LayoutTemplate,
  server: Server,
  container: Container,
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="skills-title"
          index="02"
          eyebrow="Skills"
          title="A toolkit spanning pipelines, platforms and products"
          description="Grouped by where they sit in the stack — from ingestion and modeling through to reporting and user-facing applications."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon]
            return (
              <Reveal key={group.title} delay={(i % 3) * 0.05}>
                <article className="group h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{group.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{group.summary}</p>
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <Icon className="size-4" aria-hidden />
                    </span>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground/85"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
