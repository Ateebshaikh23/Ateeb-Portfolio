import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading id="education-title" index="07" eyebrow="Education" title="Education & certifications" />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="size-4" aria-hidden /> Academic
            </h3>
            <ul className="mt-4 grid gap-4">
              {education.map((e, i) => {
                const inProgress = e.status === 'In progress'
                return (
                  <li key={e.degree}>
                    <Reveal delay={i * 0.05}>
                      <article
                        className={cn(
                          'rounded-xl border bg-card p-6',
                          inProgress ? 'border-dashed border-border' : 'border-border',
                        )}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h4 className="font-semibold">{e.degree}</h4>
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-1 font-mono text-[11px]',
                              inProgress ? 'border border-gold/50 bg-gold/10' : 'bg-accent text-accent-foreground',
                            )}
                          >
                            {inProgress ? 'In progress' : 'Degree'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{e.institution}</p>
                        <p className="mt-4 font-mono text-xs text-foreground/80">{e.period}</p>
                      </article>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <Award className="size-4" aria-hidden /> Certifications & training
            </h3>
            <Reveal className="mt-4">
              <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                {certifications.map((c) => (
                  <li key={c} className="flex items-center gap-3 px-5 py-4 text-sm">
                    <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
