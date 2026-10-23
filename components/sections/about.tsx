import { BarChart3, Clock, Code2, Workflow } from 'lucide-react'
import { profile } from '@/lib/data'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'

const highlights = [
  { icon: Clock, title: '3+ years of experience', text: 'Across internships and professional engineering roles.' },
  { icon: Code2, title: 'Full-stack development', text: 'React, Next.js, Node.js, REST APIs and PostgreSQL.' },
  { icon: Workflow, title: 'Data engineering & ETL/ELT', text: 'Medallion pipelines with Python, PySpark and Polars.' },
  { icon: BarChart3, title: 'BI & analytics', text: 'Power BI, DAX and SQL reporting for decision-making.' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading id="about-title" index="01" eyebrow="About" title="Engineering Across Applications and Data" />
          <Reveal delay={0.05}>
            <dl className="mt-8 grid gap-4 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">Based</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">Focus</dt>
                <dd>Data Engineering · Analytics · Full-Stack</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>
                <span className="text-foreground">
                  {"I'm a Software Engineer working at the intersection of application development and data engineering."}
                </span>{' '}
                I enjoy designing responsive web applications, developing APIs, automating ETL/ELT workflows, and
                creating analytical solutions that help people make better decisions.
              </p>
              <p>
                My approach combines clean code, thoughtful data modeling, validation, and practical problem-solving. I
                focus on building systems that are maintainable, reliable, and useful in real-world environments.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {highlights.map((h, i) => (
              <li key={h.title} className="bg-card">
                <Reveal delay={i * 0.05} className="h-full p-5">
                  <h.icon className="size-5 text-brand-ink" aria-hidden />
                  <p className="mt-4 font-medium">{h.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
