import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
  IconCode,
  IconCloud,
  IconDatabase,
  IconChartBar,
  IconDeviceLaptop,
  IconShieldCheck,
  IconArrowRight
} from '@tabler/icons-react';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  tag: string;
  capabilities: string[];
}

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'frontend', label: 'Web & Mobile' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'database', label: 'Data & Storage' },
    { id: 'analytics', label: 'AI & Analytics' },
    { id: 'consulting', label: 'Advisory & APIs' },
    { id: 'security', label: 'Security & Quality' }
  ];

  const services: ServiceItem[] = [
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      category: 'frontend',
      description:
        'High-performance responsive web and mobile applications engineered with React.js, Next.js, and React Native, powered by TypeScript and optimized for lightning-fast speeds.',
      icon: IconCode,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/15',
      borderColor: 'border-blue-500/30',
      glowColor: 'from-blue-500/20 via-sky-500/20 to-indigo-500/20',
      tag: 'Web & Mobile Apps',
      capabilities: [
        'React.js & Next.js',
        'React Native (Mobile & Web)',
        'TypeScript & JavaScript',
        'Tailwind CSS',
        'Performance Optimization'
      ]
    },
    {
      id: 'cloud-devops',
      title: 'Cloud Integration & DevOps',
      category: 'cloud',
      description:
        'Transform enterprise operations with multi-cloud deployments, automated Kubernetes container orchestration, continuous CI/CD pipelines, and GitHub collaboration workflows.',
      icon: IconCloud,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/15',
      borderColor: 'border-indigo-500/30',
      glowColor: 'from-indigo-500/20 via-purple-500/20 to-blue-500/20',
      tag: 'Cloud-Native & Scale',
      capabilities: [
        'AWS / Azure / GCP',
        'Kubernetes',
        'CI/CD Pipelines',
        'GitHub Workflows',
        'Microservices'
      ]
    },
    {
      id: 'database-mgmt',
      title: 'Database Architecture & Management',
      category: 'database',
      description:
        'Resilient relational and NoSQL database management, real-time data streaming pipelines, disaster recovery backups, and automated multi-region replication.',
      icon: IconDatabase,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15',
      borderColor: 'border-emerald-500/30',
      glowColor: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
      tag: 'High Availability & Storage',
      capabilities: [
        'PostgreSQL',
        'MongoDB',
        'SQL & NoSQL',
        'Data Pipelines',
        'Replication & Backup'
      ]
    },
    {
      id: 'business-analytics',
      title: 'Business Analytics & Insights',
      category: 'analytics',
      description:
        'Convert raw operational metrics into actionable enterprise intelligence with predictive data models, live KPI dashboards, and automated real-time reporting.',
      icon: IconChartBar,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/15',
      borderColor: 'border-amber-500/30',
      glowColor: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
      tag: 'Data-Driven Intelligence',
      capabilities: [
        'Predictive Models',
        'Live Dashboards',
        'KPI Tracking',
        'Real-Time Insights'
      ]
    },
    {
      id: 'it-consultation',
      title: 'Strategic IT Consultation',
      category: 'consulting',
      description:
        'Senior technology advisory to guide digital roadmaps, conduct deep architectural reviews, design scalable Node.js & Express API platforms, and recruit specialized tech talent.',
      icon: IconDeviceLaptop,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/15',
      borderColor: 'border-purple-500/30',
      glowColor: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
      tag: 'Technology Advisory',
      capabilities: [
        'Architecture Review',
        'Digital Roadmaps',
        'Tech Resourcing',
        'Node.js & Express.js',
        'API Platforms'
      ]
    },
    {
      id: 'enterprise-security',
      title: 'Enterprise Security Solutions',
      category: 'security',
      description:
        'End-to-end cybersecurity defense, automated vulnerability audits, data encryption protocols, and production code quality guaranteed with Jest testing, ESLint, and Prettier.',
      icon: IconShieldCheck,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/15',
      borderColor: 'border-rose-500/30',
      glowColor: 'from-rose-500/20 via-pink-500/20 to-purple-500/20',
      tag: 'Zero Trust & Code Quality',
      capabilities: [
        'Vulnerability Audits',
        'Data Encryption',
        'Threat Defense',
        'Jest Unit Testing',
        'ESLint & Prettier'
      ]
    }
  ];

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter(service => service.category === activeCategory);

  return (
    <section
      id='services'
      className='w-full max-w-6xl mx-auto px-4 py-9 sm:py-7'
      aria-label='Our Services'
    >
      <div className='text-center mb-10 sm:mb-12'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight'>
          Our Services
        </h2>

        <p className='text-sm sm:text-base text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed'>
          Empowering modern enterprises with full-stack digital engineering,
          scalable multi-cloud infrastructure, resilient data pipelines, and
          zero-trust security.
        </p>

        <div
          className='flex flex-wrap items-center justify-center gap-2 mt-8'
          role='tablist'
          aria-label='Service categories'
        >
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type='button'
                role='tab'
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7'>
        {filteredServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className='relative rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 p-7 sm:p-8 shadow-xl shadow-blue-950/20 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-default'
              aria-labelledby={`service-title-${index}`}
              aria-describedby={`service-desc-${index}`}
            >
              <div className='absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              <div
                className={`absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r ${service.glowColor} blur-2xl pointer-events-none rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className='relative z-10'>
                <div
                  className={`w-14 h-14 rounded-2xl ${service.bgColor} border ${service.borderColor} ${service.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <Icon size={28} stroke={2.2} />
                </div>

                <h3
                  id={`service-title-${index}`}
                  className='text-xl font-bold text-white mb-2.5 group-hover:text-blue-300 transition-colors duration-200'
                >
                  {service.title}
                </h3>

                <p
                  id={`service-desc-${index}`}
                  className='text-xs sm:text-sm text-gray-400 leading-relaxed min-h-[4rem]'
                >
                  {service.description}
                </p>

                <div className='mt-5 flex flex-wrap gap-1.5'>
                  {service.capabilities.map((cap, capIdx) => (
                    <span
                      key={capIdx}
                      className='inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/70 text-gray-300 hover:text-white hover:border-blue-400/40 hover:bg-slate-700/60 transition-all duration-200 cursor-default'
                    >
                      <span className='w-1 h-1 rounded-full bg-blue-400/60' />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className='mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-blue-400 transition-colors duration-200 relative z-10'>
                <span className='tracking-wide'>{service.tag}</span>
                <Link
                  to='#expert-consultation'
                  smooth={true}
                  className='inline-flex items-center gap-1.5 group/link text-gray-300 group-hover:text-blue-400 hover:underline underline-offset-2'
                >
                  <span>Explore Service</span>
                  <IconArrowRight
                    size={14}
                    className='transform group-hover/link:translate-x-1.5 transition-transform stroke-[2.2]'
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
