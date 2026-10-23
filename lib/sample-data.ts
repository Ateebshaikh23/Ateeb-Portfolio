export const sampleYears = [2022, 2023, 2024, 2025] as const
export const sampleCategories = ['Football', 'Cricket', 'Netball', 'Rugby', 'Basketball'] as const
export const sampleRegions = ['Auckland', 'Wellington', 'Canterbury', 'Waikato', 'Otago'] as const
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

export type SampleRow = {
  year: number
  month: number
  category: (typeof sampleCategories)[number]
  region: (typeof sampleRegions)[number]
  participants: number
}

function seededRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

const categoryBase: Record<SampleRow['category'], number> = {
  Football: 420,
  Cricket: 310,
  Netball: 360,
  Rugby: 390,
  Basketball: 240,
}

const regionWeight: Record<SampleRow['region'], number> = {
  Auckland: 1.6,
  Wellington: 0.9,
  Canterbury: 1.1,
  Waikato: 0.8,
  Otago: 0.6,
}

const categorySeason: Record<SampleRow['category'], number> = {
  Football: 5,
  Cricket: 0,
  Netball: 6,
  Rugby: 6,
  Basketball: 3,
}

function buildDataset(): SampleRow[] {
  const random = seededRandom(20260623)
  const rows: SampleRow[] = []
  for (const year of sampleYears) {
    const growth = 1 + (year - 2022) * 0.06
    for (let month = 0; month < 12; month++) {
      for (const category of sampleCategories) {
        const peak = categorySeason[category]
        const seasonality = 1 + 0.35 * Math.cos(((month - peak) / 12) * Math.PI * 2)
        for (const region of sampleRegions) {
          const noise = 0.85 + random() * 0.3
          rows.push({
            year,
            month,
            category,
            region,
            participants: Math.round(categoryBase[category] * regionWeight[region] * seasonality * growth * noise),
          })
        }
      }
    }
  }
  return rows
}

export const sampleDataset = buildDataset()
