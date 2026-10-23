import { ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '@/lib/data'
import { GithubIcon, LinkedinIcon } from '../brand-icons'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'
import { ContactForm } from './contact-form'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: 'LinkedIn', value: 'in/ateeb-shaikh', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'GitHub', value: 'Ateebshaikh23', href: profile.github, Icon: GithubIcon, external: true },
]

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            index="08"
            eyebrow="Contact"
            title="Have a Project in Mind?"
            description="Whether you're building a data platform, modernizing an application, or exploring analytics solutions, I'd be happy to connect."
          />
          <Reveal delay={0.05}>
            <ul className="mt-8 grid gap-3">
              {channels.map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
                      <span className="block truncate text-sm font-medium">{value}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden />
                    {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
