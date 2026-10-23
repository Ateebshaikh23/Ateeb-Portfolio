export const profile = {
  name: 'Ateeb Shaikh',
  initials: 'AS',
  title: 'Software Engineer | Data Engineering & Full-Stack Development',
  location: 'Pune, Maharashtra, India',
  email: 'shaikhateeb23@gmail.com',
  linkedin: 'https://linkedin.com/in/ateeb-shaikh',
  github: 'https://github.com/Ateebshaikh23',
  /** Set to a real file path in /public (e.g. "/ateeb-shaikh-resume.pdf") to enable direct download. */
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL ?? null,
  /** Toggle off when no longer accurate. */
  openToOpportunities: true,
  intro:
    "I'm a Software Engineer with 3+ years of experience building full-stack applications, data pipelines, and analytics solutions. I work across modern web technologies and data platforms, transforming raw data into reliable pipelines, structured data models, and actionable dashboards. My experience spans React, Next.js, TypeScript, Python, SQL, Databricks, Microsoft Fabric, PostgreSQL, and Power BI.",
} as const

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'contact', label: 'Contact' },
] as const

export type SkillGroup = {
  title: string
  icon: 'workflow' | 'database' | 'chart' | 'layout' | 'server' | 'container'
  summary: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Data Engineering',
    icon: 'workflow',
    summary: 'Pipelines, modeling and data quality',
    skills: [
      'ETL/ELT',
      'Medallion Architecture',
      'Data Modeling: Star & Galaxy Schema',
      'Data Quality & Validation',
      'Apache Airflow',
      'PySpark',
      'Polars',
      'Fivetran',
      'MinIO',
    ],
  },
  {
    title: 'Data Platforms',
    icon: 'database',
    summary: 'Lakehouse and orchestration platforms',
    skills: [
      'Databricks',
      'Delta Lake',
      'Databricks Workflows / Jobs',
      'Databricks Genie',
      'Microsoft Fabric',
      'OneLake',
      'Fabric Lakehouse',
      'Fabric Notebooks',
      'Data Pipelines',
      'Dataflows Gen2',
    ],
  },
  {
    title: 'BI & Analytics',
    icon: 'chart',
    summary: 'Reporting, measures and dashboards',
    skills: ['Power BI', 'DAX', 'SQL Reporting', 'Data Visualization', 'Dashboard Development'],
  },
  {
    title: 'Frontend Development',
    icon: 'layout',
    summary: 'Responsive, accessible interfaces',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Material UI',
      'Bootstrap',
    ],
  },
  {
    title: 'Backend Development',
    icon: 'server',
    summary: 'APIs, services and validation',
    skills: ['Node.js', 'Express.js', 'NestJS', 'Flask', 'REST APIs', 'Zod'],
  },
  {
    title: 'Databases & DevOps',
    icon: 'container',
    summary: 'Storage, tooling and testing',
    skills: [
      'PostgreSQL',
      'MySQL',
      'Prisma ORM',
      'Docker',
      'Docker Compose',
      'Git',
      'GitHub',
      'DBeaver',
      'Jest',
      'Playwright',
      'Postman',
      'Insomnia',
    ],
  },
]

export type Experience = {
  role: string
  company?: string
  period: string
  location?: string
  current?: boolean
  responsibilities: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Grafikaly Business Communications Pvt. Ltd.',
    period: 'June 2026 – Present',
    location: 'Remote · Surrey, British Columbia, Canada',
    current: true,
    responsibilities: [
      'Develop and maintain full-stack applications, backend services, and PostgreSQL databases.',
      'Design and automate ETL/ELT workflows and data-processing pipelines.',
      'Integrate third-party APIs and optimize database performance.',
      'Test and document REST APIs using Postman and Insomnia.',
      'Use AI-assisted development tools to accelerate implementation and code review.',
    ],
    tags: ['PostgreSQL', 'ETL/ELT', 'REST APIs', 'Postman', 'Insomnia'],
  },
  {
    role: 'Web Developer Intern',
    period: 'June 2024 – May 2026',
    responsibilities: [
      'Built and deployed a full-stack news platform for a New Zealand client, supporting 500+ daily users.',
      'Implemented Zod-based validation for forms and APIs.',
      'Containerized development environments using Docker.',
      'Established automated testing workflows using Jest and Playwright.',
      'Developed Power BI dashboards and SQL reporting solutions.',
      'Used Fivetran for automated data ingestion and MinIO for object storage.',
    ],
    tags: ['Full-Stack', 'Zod', 'Docker', 'Jest', 'Playwright', 'Power BI', 'Fivetran', 'MinIO'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Diginowa',
    period: 'May 2023 – April 2024',
    responsibilities: [
      'Developed responsive interfaces using HTML, CSS, JavaScript, Bootstrap, and Tailwind CSS.',
      'Converted Figma designs into production-ready web interfaces.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'Figma'],
  },
]

export type ProjectCategory = 'data' | 'analytics' | 'fullstack'

export type Project = {
  slug: string
  title: string
  category: string
  filters: ProjectCategory[]
  status?: 'In Progress'
  description: string
  stack: string[]
  highlights: string[]
  preview: 'sports-platform' | 'databricks' | 'fabric' | 'retail' | 'app'
  links?: { live?: string; github?: string }
}

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'data', label: 'Data Engineering' },
  { id: 'analytics', label: 'Analytics & BI' },
  { id: 'fullstack', label: 'Full-Stack Development' },
]

export const projects: Project[] = [
  {
    slug: 'nz-sports-data-platform',
    title: 'NZ Sports Data Platform',
    category: 'Data Engineering',
    filters: ['data', 'analytics'],
    description:
      'An end-to-end sports data platform designed around the Bronze, Silver, and Gold medallion architecture, consolidating heterogeneous data sources into structured, analytics-ready datasets.',
    stack: ['Python', 'PostgreSQL', 'MinIO', 'Docker Compose', 'Power BI', 'Polars'],
    highlights: [
      'Ingests CSV, Excel, JSON/API, and PDF sources from MinIO.',
      'Catalogues 61 APIs across 24 categories.',
      'Implements SHA-256 checksum-based file deduplication.',
      'Performs data cleaning, header standardization, and data-quality validation.',
      'Builds conformed dimensions, domain fact tables, and KPI calculations such as YoY growth and CAGR.',
      'Power BI dashboard for participation, funding, and regional metrics is currently in progress.',
    ],
    preview: 'sports-platform',
  },
  {
    slug: 'databricks-medallion-dashboards',
    title: 'Databricks Medallion Analytics Dashboards',
    category: 'Data Engineering & Analytics',
    filters: ['data', 'analytics'],
    description:
      'An analytics solution that transforms raw CSV datasets into curated data layers and interactive analytical dashboards.',
    stack: ['Databricks', 'PySpark', 'Delta Lake', 'Python', 'SQL'],
    highlights: [
      'Organizes data into Bronze, Silver, and Gold layers.',
      'Cleans, transforms, and models datasets using PySpark, Python, and SQL.',
      'Stores curated datasets as Delta Lake tables.',
      'Explores Databricks Workflows/Jobs for scheduling.',
      'Uses Databricks Genie to assist data exploration and analysis.',
    ],
    preview: 'databricks',
  },
  {
    slug: 'fabric-lakehouse-analytics',
    title: 'Microsoft Fabric Lakehouse Analytics',
    category: 'Modern Data Platform',
    filters: ['data', 'analytics'],
    status: 'In Progress',
    description:
      'A lakehouse-based analytics solution using Microsoft Fabric to organize data ingestion, transformation, storage, and reporting.',
    stack: ['Microsoft Fabric', 'OneLake', 'Lakehouse', 'Notebooks', 'Data Pipelines', 'Dataflows Gen2', 'Power BI'],
    highlights: [
      'Uses OneLake for data storage.',
      'Works with Fabric Lakehouse and Notebooks.',
      'Uses Data Pipelines and Dataflows Gen2 for ingestion and transformation.',
      'Integrates Power BI for analytical reporting.',
    ],
    preview: 'fabric',
  },
  {
    slug: 'retail-sales-dashboard',
    title: 'Retail Sales Dashboard',
    category: 'Business Intelligence',
    filters: ['analytics'],
    description:
      'A retail analytics dashboard supported by Python-based data preparation and PostgreSQL integration.',
    stack: ['Power BI', 'Python', 'PostgreSQL'],
    highlights: [
      'Business-friendly visualizations focused on core sales KPIs.',
      'Python-based data preparation before loading into PostgreSQL.',
      'Dimensional data model connecting sales, products, and time.',
      'Power BI report layer built on the PostgreSQL model.',
    ],
    preview: 'retail',
  },
  {
    slug: 'portfolio-platform',
    title: 'Portfolio Platform',
    category: 'Full-Stack Development',
    filters: ['fullstack'],
    description:
      'A full-stack portfolio application combining a responsive React interface with a PostgreSQL database accessed through Prisma ORM.',
    stack: ['React', 'Tailwind CSS', 'Material UI', 'Prisma ORM', 'PostgreSQL'],
    highlights: [
      'Responsive React interface styled with Tailwind CSS and Material UI.',
      'PostgreSQL persistence layer accessed through Prisma ORM.',
      'Typed data access between the UI and the database.',
    ],
    preview: 'app',
  },
]

export type MedallionStage = {
  id: 'bronze' | 'silver' | 'gold'
  name: string
  subtitle: string
  purpose: string
  operations: string[]
  technologies: { name: string; usedIn: string }[]
}

export const medallionStages: MedallionStage[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    subtitle: 'Raw Data',
    purpose:
      'Land source data exactly as received so every downstream transformation is traceable and reproducible.',
    operations: ['Source ingestion', 'File cataloguing', 'SHA-256 checksums & deduplication', 'Raw-data preservation'],
    technologies: [
      { name: 'MinIO', usedIn: 'NZ Sports Data Platform' },
      { name: 'Python', usedIn: 'NZ Sports Data Platform' },
      { name: 'Databricks', usedIn: 'Databricks Medallion Dashboards' },
      { name: 'OneLake', usedIn: 'Fabric Lakehouse (in progress)' },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    subtitle: 'Cleaned Data',
    purpose: 'Turn raw inputs into consistent, validated, well-typed datasets that can be trusted.',
    operations: ['Data type normalization', 'Header standardization', 'Transformations', 'Data-quality checks'],
    technologies: [
      { name: 'Polars', usedIn: 'NZ Sports Data Platform' },
      { name: 'PySpark', usedIn: 'Databricks Medallion Dashboards' },
      { name: 'SQL', usedIn: 'Databricks Medallion Dashboards' },
      { name: 'Dataflows Gen2', usedIn: 'Fabric Lakehouse (in progress)' },
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    subtitle: 'Analytics Ready',
    purpose: 'Model business-facing datasets optimized for reporting, KPIs, and decision-making.',
    operations: ['Conformed dimensions', 'Fact tables', 'KPI calculations (YoY, CAGR)', 'Reporting-ready models'],
    technologies: [
      { name: 'PostgreSQL', usedIn: 'NZ Sports Data Platform' },
      { name: 'Delta Lake', usedIn: 'Databricks Medallion Dashboards' },
      { name: 'Power BI', usedIn: 'NZ Sports · Fabric · Retail' },
    ],
  },
]

export const techFlow = [
  { label: 'MinIO', caption: 'Object storage' },
  { label: 'Python · Polars · PySpark', caption: 'Transform' },
  { label: 'PostgreSQL · Delta Lake', caption: 'Serve' },
  { label: 'Power BI', caption: 'Report' },
]

export const education = [
  {
    degree: 'BBA (Computer Applications)',
    institution: "AKI's Poona College of Arts, Science & Commerce",
    period: '2023 – 2026',
    status: 'Formal education',
  },
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'IGNOU, Pune',
    period: 'Admission in Progress – 2026',
    status: 'In progress',
  },
]

export const certifications = [
  'Diploma in Computer Applications (NIELIT)',
  'Website Building Using AI',
  'Canva Design (AI)',
]
