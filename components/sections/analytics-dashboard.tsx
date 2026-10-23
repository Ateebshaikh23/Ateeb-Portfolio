'use client'

import { Info } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { months, sampleCategories, sampleDataset, sampleRegions, sampleYears } from '@/lib/sample-data'
import { SectionHeading } from '../section-heading'
import { Reveal } from '../reveal'

const nf = new Intl.NumberFormat('en-NZ')
const compact = new Intl.NumberFormat('en-NZ', { notation: 'compact', maximumFractionDigits: 1 })

const tooltipStyle = {
  contentStyle: {
    background: 'var(--popover)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    fontSize: 12,
    color: 'var(--popover-foreground)',
  },
  labelStyle: { color: 'var(--muted-foreground)', marginBottom: 4 },
  cursor: { fill: 'var(--muted)', opacity: 0.5 },
}

const axisTick = { fill: 'var(--muted-foreground)', fontSize: 11 }

function sum<T>(rows: T[], get: (r: T) => number) {
  return rows.reduce((acc, r) => acc + get(r), 0)
}

function FilterSelect<T extends string | number>({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: T | 'all'
  options: readonly T[]
  onChange: (v: T | 'all') => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <select
        id={id}
        value={String(value)}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === 'all') return onChange('all')
          const match = options.find((o) => String(o) === raw)
          if (match !== undefined) onChange(match)
        }}
        className="h-9 min-w-36 rounded-md border border-border bg-background px-2.5 text-sm focus-visible:outline-2 focus-visible:outline-ring"
      >
        {typeof options[0] === 'number' ? null : <option value="all">All</option>}
        {options.map((o) => (
          <option key={String(o)} value={String(o)}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-border bg-background p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      <div className="mt-3 flex-1">{children}</div>
    </div>
  )
}

export function AnalyticsDashboard() {
  const [year, setYear] = useState<(typeof sampleYears)[number]>(2025)
  const [category, setCategory] = useState<(typeof sampleCategories)[number] | 'all'>('all')
  const [region, setRegion] = useState<(typeof sampleRegions)[number] | 'all'>('all')

  const data = useMemo(() => {
    const matches = (r: (typeof sampleDataset)[number]) =>
      (category === 'all' || r.category === category) && (region === 'all' || r.region === region)
    const current = sampleDataset.filter((r) => r.year === year && matches(r))
    const previous = sampleDataset.filter((r) => r.year === year - 1 && matches(r))

    const total = sum(current, (r) => r.participants)
    const prevTotal = sum(previous, (r) => r.participants)
    const yoy = prevTotal > 0 ? ((total - prevTotal) / prevTotal) * 100 : null

    const monthly = months.map((m, i) => ({
      month: m,
      current: sum(current.filter((r) => r.month === i), (r) => r.participants),
      previous: sum(previous.filter((r) => r.month === i), (r) => r.participants),
    }))
    const peak = monthly.reduce((a, b) => (b.current > a.current ? b : a), monthly[0])

    const byCategory = sampleCategories
      .map((c) => ({ name: c, value: sum(current.filter((r) => r.category === c), (r) => r.participants) }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value)

    const byRegion = sampleRegions
      .map((g) => ({ name: g, value: sum(current.filter((r) => r.region === g), (r) => r.participants) }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value)

    const table = sampleCategories
      .flatMap((c) =>
        sampleRegions.map((g) => {
          const cur = sum(current.filter((r) => r.category === c && r.region === g), (r) => r.participants)
          const prev = sum(previous.filter((r) => r.category === c && r.region === g), (r) => r.participants)
          return { category: c, region: g, value: cur, change: prev > 0 ? ((cur - prev) / prev) * 100 : null }
        }),
      )
      .filter((r) => r.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)

    return { total, yoy, monthly, peak, byCategory, byRegion, table }
  }, [year, category, region])

  const hasPrevious = year > sampleYears[0]

  const kpis = [
    { label: 'Participants', value: compact.format(data.total), hint: `${year} total` },
    {
      label: 'YoY change',
      value: data.yoy === null ? '—' : `${data.yoy >= 0 ? '+' : ''}${data.yoy.toFixed(1)}%`,
      hint: hasPrevious ? `vs ${year - 1}` : 'No prior year',
    },
    { label: 'Top category', value: data.byCategory[0]?.name ?? '—', hint: category === 'all' ? 'By volume' : 'Filtered' },
    { label: 'Peak month', value: data.peak.month, hint: compact.format(data.peak.current) },
  ]

  return (
    <section id="analytics" aria-labelledby="analytics-title" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="analytics-title"
          index="06"
          eyebrow="Analytics Preview"
          title="An interactive dashboard, built the way I build reports"
          description="A Power BI / Databricks-style showcase demonstrating KPI design, time-series trends, and dimensional comparisons."
        />

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-end md:justify-between md:p-5">
              <div className="flex items-start gap-2.5 rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-xs leading-relaxed md:max-w-sm">
                <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                <p>
                  <strong className="font-semibold">Sample data.</strong> Synthetic, illustrative figures generated for
                  this demo — not real project results or business metrics.
                </p>
              </div>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Dashboard filters">
                <FilterSelect id="f-year" label="Year" value={year} options={sampleYears} onChange={(v) => v !== 'all' && setYear(v)} />
                <FilterSelect id="f-category" label="Category" value={category} options={sampleCategories} onChange={setCategory} />
                <FilterSelect id="f-region" label="Region" value={region} options={sampleRegions} onChange={setRegion} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:p-5">
              <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-live="polite">
                {kpis.map((k) => (
                  <div key={k.label} className="rounded-lg border border-border bg-background p-4">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{k.label}</dt>
                    <dd className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">{k.value}</dd>
                    <dd className="mt-0.5 text-xs text-muted-foreground">{k.hint}</dd>
                  </div>
                ))}
              </dl>

              <Panel title="Monthly participation" description={hasPrevious ? `${year} compared with ${year - 1}` : `${year}`}>
                <div className="h-64" role="img" aria-label={`Area chart of monthly sample participation for ${year}${hasPrevious ? ` compared with ${year - 1}` : ''}.`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthly} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                      <defs>
                        <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={false} />
                      <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v) => compact.format(v)} width={48} />
                      <Tooltip {...tooltipStyle} cursor={{ stroke: 'var(--border)' }} formatter={(v) => nf.format(Number(v))} />
                      <Legend wrapperStyle={{ fontSize: 12, color: 'var(--muted-foreground)' }} iconType="circle" iconSize={8} />
                      {hasPrevious ? (
                        <Area type="monotone" dataKey="previous" name={String(year - 1)} stroke="var(--chart-2)" strokeOpacity={0.6} strokeDasharray="4 4" fill="transparent" strokeWidth={1.5} />
                      ) : null}
                      <Area type="monotone" dataKey="current" name={String(year)} stroke="var(--brand)" fill="url(#fillCurrent)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              <div className="grid gap-4 lg:grid-cols-2">
                <Panel title="By category" description="Total sample participants">
                  <div className="h-56" role="img" aria-label="Bar chart comparing sample participation by sport category.">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.byCategory} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                        <CartesianGrid stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="name" tick={axisTick} tickLine={false} axisLine={false} interval={0} />
                        <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v) => compact.format(v)} width={48} />
                        <Tooltip {...tooltipStyle} formatter={(v) => [nf.format(Number(v)), 'Participants']} />
                        <Bar dataKey="value" fill="var(--brand)" radius={[4, 4, 0, 0]} maxBarSize={44} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
                <Panel title="By region" description="Total sample participants">
                  <div className="h-56" role="img" aria-label="Horizontal bar chart comparing sample participation by region.">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.byRegion} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 0 }}>
                        <CartesianGrid stroke="var(--border)" horizontal={false} />
                        <XAxis type="number" tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v) => compact.format(v)} />
                        <YAxis type="category" dataKey="name" tick={axisTick} tickLine={false} axisLine={false} width={80} />
                        <Tooltip {...tooltipStyle} formatter={(v) => [nf.format(Number(v)), 'Participants']} />
                        <Bar dataKey="value" fill="var(--chart-2)" radius={[0, 4, 4, 0]} maxBarSize={22} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
              </div>

              <Panel title="Top segments" description="Category × region, highest sample volume">
                <div className="-mx-4 overflow-x-auto">
                  <table className="w-full min-w-[480px] text-sm">
                    <caption className="sr-only">Top six category and region segments by sample participants for {year}</caption>
                    <thead>
                      <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        <th scope="col" className="px-4 py-2 font-normal">Category</th>
                        <th scope="col" className="px-4 py-2 font-normal">Region</th>
                        <th scope="col" className="px-4 py-2 text-right font-normal">Participants</th>
                        <th scope="col" className="px-4 py-2 text-right font-normal">YoY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.table.map((r) => (
                        <tr key={`${r.category}-${r.region}`} className="border-b border-border/60 last:border-0">
                          <td className="px-4 py-2.5">{r.category}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{r.region}</td>
                          <td className="px-4 py-2.5 text-right tabular-nums">{nf.format(r.value)}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums">
                            {r.change === null ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <span className={r.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}>
                                {`${r.change >= 0 ? '+' : ''}${r.change.toFixed(1)}%`}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
