import { motion } from 'motion/react';
import { MapPin, Mail, GraduationCap, ArrowRight, Download, Briefcase, Award, CheckCircle2, Shield, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kejzhin@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const educationRecords = [
    {
      institution: 'AMA University & College',
      period: '2020 - 2021',
      degree: 'BS Computer Science / Information Technology',
      logo: '/image/ama.png',
      notes: 'Focused on algorithms, software engineering, databases, and network fundamentals.',
    },
    {
      institution: 'Carlos L. Albert High School',
      period: '2018 - 2020',
      degree: 'Information & Communications Technology Strand',
      logo: '/image/carlos.png',
      notes: 'Graduated with honors in technical computer hardware and programming fundamentals.',
    },
    {
      institution: 'Aurora A. Elementary',
      period: '2007 - 2014',
      degree: 'Primary Education',
      logo: '/image/auro.png',
      notes: 'Early passion for computing, logic puzzles, and visual arts.',
    },
  ];

  const workExperience = [
    {
      company: 'American Technologies Inc.',
      role: 'Data Management Staff',
      period: '2025',
      description: 'Reviewing and managing incoming enterprise assets using M-Files, Oracle database encoding, and developing Python scripts for automated data validation.',
      badge: 'Database & Scripting',
    },
    {
      company: 'Gentech IT Solutions Corp.',
      role: 'I.T Technician & Web Administrator',
      period: '2023 - 2025',
      description: 'Web administration, online technical support, graphic design for marketing, and hardware technical maintenance including network setup and system configuration.',
      badge: 'Infrastructure & Support',
    },
    {
      company: 'Jaslink Trading',
      role: 'Graphics Designer & E-Commerce Lead',
      period: '2023',
      description: 'Creating high-impact advertising layouts, managing e-commerce storefronts (Lazada/Shopee), and designing custom promotional merchandise.',
      badge: 'Branding & E-Commerce',
    },
    {
      company: 'Socialsend.net (Freelance)',
      role: 'Information Security / Vulnerability Analyst',
      period: '2019 - 2022',
      description: 'Performing comprehensive penetration tests on production websites, analyzing potential attack vectors, and securing cryptocurrency transaction infrastructure.',
      badge: 'Cybersecurity Audit',
    },
  ];

  return (
    <div className="pt-24 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Top Banner / Intro matching screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 mb-14"
      >
        <div className="badge-pill">
          <Sparkles size={14} className="text-indigo-400" />
          <span>About Me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Turning ideas into <span className="text-gradient">functional digital solutions.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              I'm a dedicated <span className="text-white font-semibold">Penetration Tester & Graphics Designer</span> with over 8 years of hands-on experience in vulnerability assessment, web security audits, and visual brand identity. I specialize in protecting digital infrastructures while crafting compelling, high-converting digital designs.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From auditing cryptocurrency exchanges and blockchain platforms to engineering native mobile applications and streetwear apparel graphics, I combine rigorous technical defense with creative visual precision.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Jeric.pdf"
                download="Jeric_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Download size={16} />
                <span>Download Resume CV</span>
              </a>

              <Link to="/contact" className="btn-secondary">
                <span>Get In Touch</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Bento Info Card matching screenshot */}
          <div className="lg:col-span-5 card-surface p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-white/[0.08] pb-4 flex items-center justify-between">
              <span>Quick Overview</span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </h2>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <MapPin size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Location</span>
                <p className="text-sm sm:text-base font-bold text-white">Philippines</p>
                <span className="text-xs text-slate-500">Open to remote & onsite opportunities</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                <Mail size={20} />
              </div>
              <div className="space-y-0.5 flex-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email</span>
                <div className="flex items-center gap-2">
                  <a href="mailto:kejzhin@gmail.com" className="text-sm sm:text-base font-bold text-white hover:text-indigo-400 transition-colors break-all">
                    kejzhin@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <span className="text-xs text-slate-500">Alt: jericdelosreyes127001@gmail.com</span>
              </div>
            </div>

            {/* Education */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <GraduationCap size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Education</span>
                <p className="text-sm sm:text-base font-bold text-white">BS Computer Science</p>
                <span className="text-xs text-indigo-400 font-medium">(In Progress)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Education Record Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Education History</h2>
            <p className="text-xs text-slate-400">Academic journey and foundational learning</p>
          </div>
          <GraduationCap className="text-indigo-400" size={24} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationRecords.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="card-surface p-6 flex flex-col justify-between group hover:border-indigo-500/40 h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {edu.period}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-md">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">{edu.degree}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{edu.notes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work & Security Experience Section */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Experience & Career</h2>
            <p className="text-xs text-slate-400">Professional positions, pentesting audits, and technical leadership</p>
          </div>
          <Briefcase className="text-indigo-400" size={24} />
        </div>

        <div className="space-y-6">
          {workExperience.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="card-surface p-6 sm:p-8 relative group hover:border-indigo-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-slate-300">{exp.company}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08]">
                    {exp.period}
                  </span>
                  <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {exp.badge}
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mt-2">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
