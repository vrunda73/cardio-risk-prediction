import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Clock, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HEALTH_INSIGHTS } from '../data';
import type { HealthCategory } from '../types';
import GlassCard from '../components/common/GlassCard';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';

const CATEGORIES: ('All' | HealthCategory)[] = ['All', ...Array.from(new Set(HEALTH_INSIGHTS.map((insight) => insight.category)))];

export default function HealthInsights() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | HealthCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => HEALTH_INSIGHTS.filter((insight) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [insight.title, insight.summary, insight.content, insight.category].some((value) => value?.toLowerCase().includes(query));
    return matchesSearch && (selectedCategory === 'All' || insight.category === selectedCategory);
  }), [search, selectedCategory]);

  const featured = filtered[0];
  const articles = filtered.slice(1);
  const clearFilters = () => { setSearch(''); setSelectedCategory('All'); };

  return <div className="min-h-screen bg-slate-50 pt-20 pb-20 dark:bg-navy-950">
    <section className="relative overflow-hidden bg-hero-gradient px-4 pb-24 pt-16 sm:px-6">
      <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-teal-400/15 blur-[110px]" />
      <div className="container-max relative text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100 backdrop-blur-md"><BookOpen size={14} /> Knowledge centre</div>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Practical insights for a healthier heart.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg">Clear, evidence-informed reading on the habits, measurements, and conversations that support cardiovascular wellbeing.</p>
        <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/15 bg-slate-950/20 py-4 backdrop-blur-sm">
          <div><p className="text-2xl font-bold text-white">{HEALTH_INSIGHTS.length}</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-blue-200">Articles</p></div>
          <div><p className="text-2xl font-bold text-white">{CATEGORIES.length - 1}</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-blue-200">Topics</p></div>
          <div><p className="text-2xl font-bold text-white">3–5</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-blue-200">Min reads</p></div>
        </div>
      </div>
    </section>

    <main className="container-max relative -mt-10 px-4 sm:px-6 lg:px-8">
      <GlassCard padding="lg" className="mb-12 bg-white dark:bg-navy-900">
        <div className="mx-auto w-full max-w-2xl"><InputField type="search" placeholder="Search articles, topics, or keywords..." value={search} onChange={(event) => setSearch(event.target.value)} leftIcon={<Search size={18} />} /></div>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`min-h-10 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${selectedCategory === category ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50 dark:border-navy-700 dark:bg-navy-800 dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:bg-blue-900/20'}`}>{category}</button>)}
        </div>
      </GlassCard>

      {featured && <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-12 grid overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-card dark:border-blue-400/10 dark:bg-navy-900 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-700 to-teal-600 p-8 text-white sm:p-10">
          <Sparkles className="absolute right-7 top-7 text-cyan-200/60" size={32} />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">Featured reading</p>
          <div className="mt-7 text-5xl">{featured.icon}</div>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-bold leading-tight">{featured.title}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-blue-100">{featured.summary}</p>
          <button type="button" onClick={() => setExpandedId(expandedId === featured.id ? null : featured.id)} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700 transition-transform hover:-translate-y-0.5"><BookOpen size={16} />{expandedId === featured.id ? 'Close article' : 'Read article'}<ArrowRight size={16} /></button>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-600 dark:text-teal-400"><Clock size={14} /> {featured.read_time} minute read <span className="text-slate-300 dark:text-slate-600">•</span> {featured.category}</div>
          <AnimatePresence initial={false}>{expandedId === featured.id && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-5 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-700 dark:border-navy-700 dark:text-slate-300">{featured.content}</motion.div>}</AnimatePresence>
          {expandedId !== featured.id && <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">Start with this short guide, then explore the library for more focused reading on health measurements and daily habits.</p>}
        </div>
      </motion.section>}

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400">Explore the library</p><h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'} to explore</h2></div>{(search || selectedCategory !== 'All') && <button type="button" onClick={clearFilters} className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Clear filters</button>}</div>

      {articles.length > 0 && <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"><AnimatePresence>{articles.map((insight) => {
        const isExpanded = expandedId === insight.id;
        return <motion.article layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }} key={insight.id}><GlassCard hover padding="lg" className="flex h-full flex-col bg-white dark:bg-navy-900"><div className="flex items-start justify-between gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-900/30">{insight.icon}</div><span className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"><Clock size={12} />{insight.read_time} min</span></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400">{insight.category}</p><h3 className="mt-2 text-xl font-bold leading-snug text-slate-900 dark:text-white">{insight.title}</h3><p className="mt-3 flex-grow text-sm leading-6 text-slate-600 dark:text-slate-400">{insight.summary}</p><AnimatePresence initial={false}>{isExpanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="mt-5 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-700 dark:border-navy-700 dark:text-slate-300">{insight.content}</p></motion.div>}</AnimatePresence><Button variant="outline" fullWidth className="mt-6" onClick={() => setExpandedId(isExpanded ? null : insight.id)}>{isExpanded ? 'Close article' : 'Read article'}</Button></GlassCard></motion.article>;
      })}</AnimatePresence></div>}

      {filtered.length === 0 && <GlassCard className="py-16 text-center" padding="lg"><BookOpen className="mx-auto text-blue-500" size={34} /><h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">No matching articles found</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Try a different search term or return to the full library.</p><Button variant="ghost" className="mt-5" onClick={clearFilters}>Clear filters</Button></GlassCard>}
      <MedicalDisclaimer className="mt-14" />
    </main>
  </div>;
}
