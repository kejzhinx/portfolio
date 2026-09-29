import { motion } from 'motion/react';
import { Download, Briefcase, ShieldCheck, Cpu, Laptop, Terminal } from 'lucide-react';

export default function Resume() {
  const experiences = [
    {
      company: "American Technologies Inc.",
      role: "Data Management Staff",
      period: "2025",
      description: "Reviewing and managing incoming files using M-Files, Oracle database encoding, and developing Python scripts for automated data entry."
    },
    {
      company: "Gentech IT Solutions Corp.",
      role: "I.T Technician",
      period: "2023 - 2025",
      description: "Web administration, online support, graphics design, marketing, and hardware technical support including system assembly and installation."
    },
    {
      company: "Jaslink Trading",
      role: "Graphics Designer",
      period: "2023",
      description: "Creating advertising layouts, managing e-commerce platforms (Lazada/Shopee), and providing hardware assembly support."
    },
    {
      company: "Socialsend.net (Freelance)",
      role: "Information Security / Security Analyzer",
      period: "2019 - 2022",
      description: "Performing security tests on production websites, analyzing vulnerabilities, and identifying critical system bugs."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-16 md:pt-24 pb-8 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full px-10 md:px-12 space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6 md:pb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-balance leading-tight tracking-tight text-white">Jeric M. De Los Reyes</h1>
            <p className="text-brand-purple font-mono text-xs tracking-[0.3em] uppercase font-bold px-4 py-1.5 bg-brand-purple/5 border border-brand-purple/10 rounded-full w-fit">Information Technology</p>
          </div>
          <a 
            href="https://raw.githubusercontent.com/kejzhin/portfolio/main/Jeric.pdf" 
            download="Jeric_Resume.pdf"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-zinc-100 text-zinc-950 font-bold rounded-2xl transition-all shadow-2xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download size={20} />
            <span className="text-xs md:text-sm">Download CV</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="md:col-span-2 space-y-8 md:space-y-10">
            {/* Experience Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-brand-purple">
                <Briefcase size={20} className="md:w-6 md:h-6" />
                <h2 className="text-lg md:text-xl font-bold text-white">Experience</h2>
              </div>
              <div className="space-y-8 pl-10 md:pl-12 border-l border-zinc-800">
                {experiences.map((exp, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative space-y-2"
                  >
                    <div className="absolute -left-[44px] md:-left-[52px] top-2 w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(0,229,255,0.4)]" />
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base md:text-lg font-bold text-white leading-tight">{exp.role}</h3>
                      <span className="text-[9px] md:text-[10px] font-mono text-brand-purple bg-brand-purple/10 px-2 md:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg font-bold border border-brand-purple/20 whitespace-nowrap">{exp.period}</span>
                    </div>
                    <div className="text-xs md:text-sm font-bold text-zinc-400">{exp.company}</div>
                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* Skills Card */}
            <div className="bento-card">
              <div className="bento-label mb-4">Core Skills</div>
              <div className="flex flex-wrap gap-2">
                {[
                   'Graphics Designing', 
                   'Hardware / Software Troubleshooting', 
                   'Computer Repair', 
                   'Gadget Repair',
                   'Web Penetration Testing', 
                   'Linux', 
                   'Technical Support',
                   'Typing Speed: 60-80 WPM'
                ].map((skill, index) => (
                  <motion.span 
                    key={skill} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 229, 255, 0.2)' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/70 uppercase cursor-default transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Contemporary Laptop Showcase */}
            <div className="relative h-64 flex items-center justify-center overflow-hidden rounded-[24px] bg-bg-card border border-white/5 shadow-inner">
              {/* Subtle Ambient Glows */}
              <div className="absolute top-1/4 -left-4 w-32 h-32 bg-brand-purple/10 blur-[60px] rounded-full" />
              <div className="absolute bottom-1/4 -right-4 w-32 h-32 bg-brand-pink/5 blur-[60px] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-purple/5 blur-[80px] rounded-full" />
              
              {/* Floating Realistic Laptop Component */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateY: [-8, 8, -8],
                  rotateX: [10, 5, 10],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ perspective: 1000 }}
                className="relative z-20 flex flex-col items-center"
              >
                {/* Laptop Screen (Upper Part) */}
                <div className="relative w-40 h-28 bg-zinc-800 rounded-t-xl border-2 border-zinc-700 p-2 shadow-2xl overflow-hidden transition-colors group-hover:border-brand-purple/40">
                  {/* Screen Content - Vibrant Gradients */}
                  <div className="w-full h-full bg-zinc-950 rounded-md relative overflow-hidden flex items-center justify-center">
                    {/* Window Controls */}
                    <div className="absolute top-1.5 left-2 flex gap-1 z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    </div>
                    
                    {/* Atmospheric Backdrop */}
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/20 via-brand-pink/10 to-transparent animate-pulse opacity-80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]" />
                    
                    {/* Centered Content */}
                    <div className="relative z-10 flex flex-col items-center">
                       <Terminal size={32} className="text-zinc-500" />
                       <div className="mt-4 w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                         <motion.div 
                           animate={{ x: ['-100%', '100%'] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           className="w-full h-full bg-brand-purple/30" 
                         />
                       </div>
                    </div>
                    
                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent -skew-x-12 translate-x-4" />
                  </div>
                </div>

                {/* Laptop Base (Lower Part) */}
                <div className="relative w-44 h-2.5 bg-[#334155] rounded-b-lg shadow-xl shadow-black/40">
                  {/* Keyboard Area Detail */}
                  <div className="absolute -top-1 left-0 right-0 h-1.5 bg-[#475569] rounded-t-sm border-t border-white/10" />
                  
                  {/* Trackpad Accent */}
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#1E293B] rounded-full opacity-60" />
                  
                  {/* Front Edge Glow */}
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/20 blur-[1px]" />
                </div>

                {/* Status Badge Below Laptop */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-2 px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-full"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full md:animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-[10px] font-mono font-bold text-zinc-300 tracking-[0.2em] uppercase flex items-center gap-1.5">
                    Open For Work
                  </span>
                </motion.div>

                {/* Ground Shadow */}
                <div className="absolute -bottom-10 w-28 h-4 bg-black/50 blur-xl rounded-full scale-x-150" />
              </motion.div>

              {/* Orbiting Particles (No Text) */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 10 + i * 2, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div 
                    className={`w-1.5 h-1.5 rounded-full blur-[1px] ${
                      ['bg-brand-purple/50', 'bg-brand-pink/50', 'bg-brand-purple/30', 'bg-brand-pink/30'][i]
                    }`}
                    style={{ 
                      transform: `translateX(${100 + i * 20}px) translateY(${Math.sin(i) * 50}px)` 
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
