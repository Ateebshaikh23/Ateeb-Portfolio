import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { About } from '@/components/sections/about'
import { AnalyticsDashboard } from '@/components/sections/analytics-dashboard'
import { Architecture } from '@/components/sections/architecture'
import { Contact } from '@/components/sections/contact'
import { Education } from '@/components/sections/education'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { profile } from '@/lib/data'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Software Engineer',
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ['Data Engineering', 'Databricks', 'Microsoft Fabric', 'PySpark', 'Power BI', 'Next.js', 'PostgreSQL'],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Architecture />
        <AnalyticsDashboard />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
