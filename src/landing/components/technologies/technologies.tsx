import React, { useState } from 'react';
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandNodejs,
  IconBrandMongodb,
  IconBrandGithub,
  IconBrandAws,
  IconBrandAzure,
  IconBrandDocker,
  IconBrandPython,
  IconBrandHtml5,
  IconDatabase,
  IconDeviceMobile,
  IconShieldCheck,
  IconBolt,
  IconChartBar,
  IconTestPipe,
  IconCode,
  IconLayersLinked,
  IconApi,
  IconCloud,
  IconServer,
  IconInfinity,
  IconRefresh
} from '@tabler/icons-react';

interface TechItem {
  name: string;
  category: string;
  domain: 'frontend' | 'backend' | 'cloud' | 'database' | 'security';
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  badge: string;
  description: string;
}

const allTechs: TechItem[] = [
  {
    name: 'React.js',
    category: 'Frontend Framework',
    domain: 'frontend',
    icon: IconBrandReact,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/15',
    borderColor: 'border-cyan-500/30',
    glowColor: 'from-cyan-500/20 via-blue-500/20 to-sky-500/20',
    badge: 'SPA & Web Apps',
    description:
      'Component-driven responsive web applications built with reusable hooks and high performance.'
  },
  {
    name: 'Next.js',
    category: 'Full-Stack Framework',
    domain: 'frontend',
    icon: IconBrandNextjs,
    color: 'text-white',
    bgColor: 'bg-slate-700/30',
    borderColor: 'border-slate-500/30',
    glowColor: 'from-slate-400/20 via-gray-500/20 to-white/10',
    badge: 'SSR & SSG',
    description:
      'Server-side rendering, hybrid static generation, and edge routing for SEO & speed.'
  },
  {
    name: 'TypeScript',
    category: 'Type-Safe Language',
    domain: 'frontend',
    icon: IconBrandTypescript,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/30',
    glowColor: 'from-blue-500/20 via-indigo-500/20 to-sky-500/20',
    badge: 'Type Safety',
    description:
      'Strict type checking, compile-time validation, and scalable code maintainability.'
  },
  {
    name: 'JavaScript',
    category: 'Core Web Language',
    domain: 'frontend',
    icon: IconBrandJavascript,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/15',
    borderColor: 'border-yellow-500/30',
    glowColor: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
    badge: 'ESNext',
    description:
      'Modern asynchronous programming, DOM manipulation, and dynamic client interactivity.'
  },
  {
    name: 'Tailwind CSS',
    category: 'Utility Styling',
    domain: 'frontend',
    icon: IconBrandTailwind,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/15',
    borderColor: 'border-teal-500/30',
    glowColor: 'from-teal-500/20 via-cyan-500/20 to-emerald-500/20',
    badge: 'Responsive UI',
    description:
      'Modern utility-first styling with dark mode, fluid typography, and custom micro-animations.'
  },
  {
    name: 'React Native',
    category: 'Mobile Engineering',
    domain: 'frontend',
    icon: IconDeviceMobile,
    color: 'text-cyan-300',
    bgColor: 'bg-cyan-500/15',
    borderColor: 'border-cyan-500/30',
    glowColor: 'from-cyan-500/20 via-sky-500/20 to-blue-500/20',
    badge: 'iOS & Android',
    description:
      'Native cross-platform mobile apps sharing unified business logic across platforms.'
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Markup & Styling',
    domain: 'frontend',
    icon: IconBrandHtml5,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/15',
    borderColor: 'border-orange-500/30',
    glowColor: 'from-orange-500/20 via-red-500/20 to-amber-500/20',
    badge: 'Semantic Web',
    description:
      'Semantic accessible markup, modern flexbox, CSS grid, and responsive web layouts.'
  },
  {
    name: 'Performance Optimization',
    category: 'Speed Engineering',
    domain: 'frontend',
    icon: IconBolt,
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/30',
    glowColor: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
    badge: 'Core Web Vitals',
    description:
      'Asset compression, code splitting, dynamic imports, and sub-second load times.'
  },

  {
    name: 'Node.js',
    category: 'Server Runtime',
    domain: 'backend',
    icon: IconBrandNodejs,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/30',
    glowColor: 'from-emerald-500/20 via-green-500/20 to-teal-500/20',
    badge: 'Event-Driven',
    description:
      'High-throughput asynchronous event-driven server runtime handling enterprise scale.'
  },
  {
    name: 'Express.js',
    category: 'Backend Framework',
    domain: 'backend',
    icon: IconServer,
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/30',
    glowColor: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    badge: 'RESTful APIs',
    description:
      'Fast, unopinionated routing, middleware pipelines, and robust REST API endpoints.'
  },
  {
    name: 'Python',
    category: 'Data & Backend',
    domain: 'backend',
    icon: IconBrandPython,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/30',
    glowColor: 'from-blue-500/20 via-yellow-500/20 to-amber-500/20',
    badge: 'Automation & AI',
    description:
      'Backend automation scripts, data analysis pipelines, and predictive algorithms.'
  },
  {
    name: 'API Platforms',
    category: 'API Architecture',
    domain: 'backend',
    icon: IconApi,
    color: 'text-teal-300',
    bgColor: 'bg-teal-500/15',
    borderColor: 'border-teal-500/30',
    glowColor: 'from-teal-500/20 via-cyan-500/20 to-sky-500/20',
    badge: 'REST Gateways',
    description:
      'Rate-limited, versioned, authenticated API gateways with strict schema validation.'
  },
  {
    name: 'Microservices',
    category: 'Distributed Systems',
    domain: 'backend',
    icon: IconLayersLinked,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/15',
    borderColor: 'border-purple-500/30',
    glowColor: 'from-purple-500/20 via-indigo-500/20 to-pink-500/20',
    badge: 'Decoupled Scale',
    description:
      'Decoupled microservices architecture ensuring fault isolation and independent scale.'
  },

  {
    name: 'AWS (Amazon Web Services)',
    category: 'Cloud Infrastructure',
    domain: 'cloud',
    icon: IconBrandAws,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/30',
    glowColor: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
    badge: 'Cloud Scale',
    description:
      'Enterprise cloud hosting, scalable storage, serverless functions, and IAM policies.'
  },
  {
    name: 'Microsoft Azure',
    category: 'Enterprise Cloud',
    domain: 'cloud',
    icon: IconBrandAzure,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/15',
    borderColor: 'border-sky-500/30',
    glowColor: 'from-sky-500/20 via-blue-500/20 to-indigo-500/20',
    badge: 'Hybrid Cloud',
    description:
      'Robust enterprise cloud computing, virtual networks, and hybrid deployment models.'
  },
  {
    name: 'Google Cloud (GCP)',
    category: 'Multi-Cloud Platform',
    domain: 'cloud',
    icon: IconCloud,
    color: 'text-red-400',
    bgColor: 'bg-red-500/15',
    borderColor: 'border-red-500/30',
    glowColor: 'from-red-500/20 via-amber-500/20 to-blue-500/20',
    badge: 'Compute & BigQuery',
    description:
      'High-performance cloud compute, BigQuery analytics, and global networking.'
  },
  {
    name: 'Docker & Containers',
    category: 'Containerization',
    domain: 'cloud',
    icon: IconBrandDocker,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/30',
    glowColor: 'from-blue-500/20 via-sky-500/20 to-cyan-500/20',
    badge: 'Orchestration',
    description:
      'Containerized services with automated scaling, rolling rollouts, and self-healing pods.'
  },
  {
    name: 'CI/CD Pipelines',
    category: 'DevOps Automation',
    domain: 'cloud',
    icon: IconInfinity,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/15',
    borderColor: 'border-indigo-500/30',
    glowColor: 'from-indigo-500/20 via-purple-500/20 to-blue-500/20',
    badge: 'Automated CI/CD',
    description:
      'Automated testing, building, staging, and zero-downtime production deployment.'
  },
  {
    name: 'GitHub Workflows',
    category: 'Version Control',
    domain: 'cloud',
    icon: IconBrandGithub,
    color: 'text-gray-300',
    bgColor: 'bg-slate-700/30',
    borderColor: 'border-slate-600/30',
    glowColor: 'from-slate-400/20 via-gray-500/20 to-purple-500/10',
    badge: 'Actions & PRs',
    description:
      'Code collaboration, branch protection, pull request reviews, and GitHub Actions automation.'
  },

  {
    name: 'PostgreSQL',
    category: 'Relational Database',
    domain: 'database',
    icon: IconDatabase,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/15',
    borderColor: 'border-sky-500/30',
    glowColor: 'from-sky-500/20 via-blue-500/20 to-indigo-500/20',
    badge: 'ACID Compliant',
    description:
      'Advanced object-relational SQL database with complex indexing, JSONB, and transaction safety.'
  },
  {
    name: 'MongoDB',
    category: 'Document Database',
    domain: 'database',
    icon: IconBrandMongodb,
    color: 'text-green-500',
    bgColor: 'bg-green-500/15',
    borderColor: 'border-green-500/30',
    glowColor: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    badge: 'NoSQL Scale',
    description:
      'Flexible schema document storage with high write performance and sharded clustering.'
  },
  {
    name: 'SQL & NoSQL Systems',
    category: 'Polyglot Persistence',
    domain: 'database',
    icon: IconDatabase,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/30',
    glowColor: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    badge: 'Hybrid Storage',
    description:
      'Selecting the optimal database engine for relational consistency vs document flexibility.'
  },
  {
    name: 'Data Pipelines',
    category: 'ETL & Streaming',
    domain: 'database',
    icon: IconRefresh,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/15',
    borderColor: 'border-cyan-500/30',
    glowColor: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    badge: 'Real-Time Ingestion',
    description:
      'Automated extraction, transformation, and ingestion pipelines for analytics.'
  },
  {
    name: 'Replication & Backup',
    category: 'Disaster Recovery',
    domain: 'database',
    icon: IconServer,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/15',
    borderColor: 'border-teal-500/30',
    glowColor: 'from-teal-500/20 via-emerald-500/20 to-cyan-500/20',
    badge: '99.99% Uptime',
    description:
      'Automated snapshot backups, point-in-time recovery, and multi-region failover.'
  },

  {
    name: 'Jest Framework',
    category: 'Unit & Integration',
    domain: 'security',
    icon: IconTestPipe,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/15',
    borderColor: 'border-rose-500/30',
    glowColor: 'from-rose-500/20 via-pink-500/20 to-purple-500/20',
    badge: 'Unit Tests',
    description:
      'Automated unit test cases, mock suites, snapshot validation, and test regression guards.'
  },
  {
    name: 'ESLint & Prettier',
    category: 'Code Quality',
    domain: 'security',
    icon: IconCode,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/15',
    borderColor: 'border-violet-500/30',
    glowColor: 'from-violet-500/20 via-purple-500/20 to-indigo-500/20',
    badge: 'Clean Code',
    description:
      'Strict AST static analysis, formatting consistency, and automated linting rules.'
  },
  {
    name: 'Vulnerability Audits',
    category: 'Security Audits',
    domain: 'security',
    icon: IconShieldCheck,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/30',
    glowColor: 'from-emerald-500/20 via-green-500/20 to-teal-500/20',
    badge: 'OWASP Security',
    description:
      'Automated dependency scanning, CVE patching, and security posture assessments.'
  },
  {
    name: 'Data Encryption',
    category: 'Enterprise Security',
    domain: 'security',
    icon: IconShieldCheck,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/15',
    borderColor: 'border-rose-500/30',
    glowColor: 'from-rose-500/20 via-red-500/20 to-pink-500/20',
    badge: 'Zero Trust',
    description:
      'TLS/SSL in transit, AES-256 encryption at rest, token authorization, and DDoS protection.'
  },
  {
    name: 'Live Dashboards & KPIs',
    category: 'Analytics & KPIs',
    domain: 'security',
    icon: IconChartBar,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/30',
    glowColor: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
    badge: 'Live Metrics',
    description:
      'Interactive metrics visualization, telemetry tracking, and predictive decision-making models.'
  }
];

const marqueeRow1 = [
  allTechs[0],
  allTechs[1],
  allTechs[2],
  allTechs[8],
  allTechs[13],
  allTechs[19],
  allTechs[4],
  allTechs[16],
  allTechs[24],
  allTechs[20],
  allTechs[18],
  allTechs[12],
  allTechs[27],
  allTechs[28]
];

const marqueeRow2 = [
  allTechs[3],
  allTechs[9],
  allTechs[10],
  allTechs[14],
  allTechs[15],
  allTechs[5],
  allTechs[17],
  allTechs[21],
  allTechs[11],
  allTechs[6],
  allTechs[25],
  allTechs[26],
  allTechs[22],
  allTechs[7]
];

export const Technologies: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend & Mobile' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'database', label: 'Databases & Storage' },
    { id: 'security', label: 'QA & Security' }
  ];

  const filteredTechs =
    activeDomain === 'all'
      ? allTechs
      : allTechs.filter(tech => tech.domain === activeDomain);

  return (
    <section
      id='technologies'
      className='w-full max-w-6xl mx-auto px-4 py-4 sm:py-2'
      aria-label='Cutting-Edge Tools & Technologies'
    >
      <div className='text-center mb-5 sm:mb-5'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight'>
          Cutting-Edge Tools & Technologies
        </h2>

        <p className='text-sm sm:text-base text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed'>
          Leveraging industry-leading frameworks, multi-cloud platforms, and
          robust data architectures to build high-performance, enterprise-grade
          digital solutions.
        </p>

        <div
          className='flex flex-wrap items-center justify-center gap-2 mt-8'
          role='tablist'
          aria-label='Technology domains'
        >
          {categories.map(cat => {
            const isActive = activeDomain === cat.id;
            return (
              <button
                key={cat.id}
                type='button'
                role='tab'
                aria-selected={isActive}
                onClick={() => setActiveDomain(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400'
                    : 'bg-slate-900/80 text-gray-400 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeDomain === 'all' ? (
        <div className='relative w-full overflow-hidden py-4 space-y-6'>
          <div className='pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10' />
          <div className='pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10' />

          <div className='flex overflow-hidden select-none'>
            <div className='animate-marquee-left flex items-center gap-4 sm:gap-6'>
              {marqueeRow1.concat(marqueeRow1).map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`row1-${tech.name}-${idx}`}
                    className='flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 shadow-lg shadow-blue-950/20 hover:border-blue-500/50 hover:bg-slate-800/90 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-default mt-1'
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${tech.bgColor} border ${tech.borderColor} flex items-center justify-center ${tech.color} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <Icon size={22} stroke={2} />
                    </div>
                    <div className='flex flex-col text-left'>
                      <span className='text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-200 whitespace-nowrap'>
                        {tech.name}
                      </span>
                      <span className='text-[10px] sm:text-[11px] text-gray-400 font-medium tracking-wide whitespace-nowrap'>
                        {tech.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='flex overflow-hidden select-none'>
            <div className='animate-marquee-right flex items-center gap-4 sm:gap-6'>
              {marqueeRow2.concat(marqueeRow2).map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`row2-${tech.name}-${idx}`}
                    className='flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 shadow-lg shadow-blue-950/20 hover:border-blue-500/50 hover:bg-slate-800/90 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-default mt-1'
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${tech.bgColor} border ${tech.borderColor} flex items-center justify-center ${tech.color} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <Icon size={22} stroke={2} />
                    </div>
                    <div className='flex flex-col text-left'>
                      <span className='text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-200 whitespace-nowrap'>
                        {tech.name}
                      </span>
                      <span className='text-[10px] sm:text-[11px] text-gray-400 font-medium tracking-wide whitespace-nowrap'>
                        {tech.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
          {filteredTechs.map(tech => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className='relative rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 p-5 shadow-xl shadow-blue-950/20 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-default'
              >
                {/* Ambient Top Glow */}
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-gradient-to-r ${tech.glowColor} blur-xl pointer-events-none rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className='relative z-10'>
                  <div className='flex items-center justify-between mb-3.5'>
                    <div
                      className={`w-11 h-11 rounded-xl ${tech.bgColor} border ${tech.borderColor} flex items-center justify-center ${tech.color} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <Icon size={24} stroke={2} />
                    </div>
                    <span className='text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-gray-300'>
                      {tech.badge}
                    </span>
                  </div>

                  <h4 className='text-base font-bold text-white group-hover:text-blue-300 transition-colors duration-200 mb-1.5'>
                    {tech.name}
                  </h4>

                  <p className='text-xs text-gray-400 leading-relaxed'>
                    {tech.description}
                  </p>
                </div>

                <div className='mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 relative z-10'>
                  <span className='text-gray-400 font-medium'>
                    {tech.category}
                  </span>
                  <span className='text-blue-400/80 font-medium group-hover:text-blue-300 transition-colors'>
                    Enterprise Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Technologies;
