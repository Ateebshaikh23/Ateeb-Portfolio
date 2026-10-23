'use client'

import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems, profile } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

function ResumeLink({ className }: { className?: string }) {
  const href = profile.resumeUrl ?? `mailto:${profile.email}?subject=${encodeURIComponent('Resume request')}`
  return (
    <a
      href={href}
      {...(profile.resumeUrl ? { download: true } : {})}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      <FileText className="size-4" aria-hidden />
      {profile.resumeUrl ? 'Download Resume' : 'Request Resume'}
    </a>
  )
}

export function SiteHeader() {
  const [active, setActive] = useState<string>('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))

    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors',
        scrolled || open ? 'border-border bg-background/85 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Ateeb Shaikh — back to top">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary font-mono text-xs font-semibold text-primary-foreground">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring',
                  active === item.id ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {item.label}
                {active === item.id ? (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-brand" aria-hidden />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ResumeLink className="hidden sm:inline-flex" />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cn(
                    'flex items-center justify-between rounded-md px-2 py-3 text-base',
                    active === item.id ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                  {active === item.id ? <span className="size-1.5 rounded-full bg-brand" aria-hidden /> : null}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-1 sm:hidden">
              <ResumeLink className="h-11 w-full justify-center" />
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
