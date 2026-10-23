import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '@/lib/data'
import { GithubIcon, LinkedinIcon } from './brand-icons'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const iconLink =
    'inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring'

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.title}</p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{`© ${year} ${profile.name}`}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)" className={iconLink}>
            <GithubIcon className="size-4" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)" className={iconLink}>
            <LinkedinIcon className="size-4" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} className={iconLink}>
            <Mail className="size-4" aria-hidden />
          </a>
          <a
            href="#home"
            className="ml-2 inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ArrowUp className="size-4" aria-hidden /> Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
