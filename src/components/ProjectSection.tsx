import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Layers, X, Shield, Globe, Cpu, Zap, Lock, Database, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  link: string;
  icon: any;
  color: string;
}

interface GraphicProject {
  title: string;
  description: string;
  image: string;
  galleryImages: string[];
  category: string;
}

export default function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGraphic, setSelectedGraphic] = useState<GraphicProject | null>(null);

  const projects: Project[] = [
    {
      title: "Stakecube.net",
      description: "One-stop Ecosystem for Crypto Assets.",
      longDescription: "Automated staking, masternode hosting, and integrated exchange. Served as a Security consultant and Penetration Tester.",
      tags: ["Crypto Ecosystem"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/sc.png",
      link: "https://stakecube.net",
      icon: Database,
      color: "#2C3E50"
    },
    {
      title: "Socialsend.io",
      description: "Blockchain-based Social Payment Gateway.",
      longDescription: "Information Security Analyzer (2019-2022). Performed security tests of the website before deployment, preventing malicious attacks and identifying critical bugs.",
      tags: ["Social Gateway"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/ss.png",
      link: "https://socialsend.io",
      icon: Shield,
      color: "#3498DB"
    },
    {
      title: "Vitae Token",
      description: "Social Rewards Blockchain Platform.",
      longDescription: "Penetration Tester and Information Security.",
      tags: ["Rewards Platform"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/vitae.png",
      link: "https://vitae.co",
      icon: Zap,
      color: "#F1C40F"
    },
    {
      title: "Metrixcoin.com",
      description: "Digital Currency built on Proof-of-Stake.",
      longDescription: "Penetration Tester & Information Security.",
      tags: ["Digital Currency"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/metrix.png",
      link: "https://metrixcoin.com",
      icon: Cpu,
      color: "#27AE60"
    },
    {
      title: "Aercrypt.net",
      description: "Secure Encryption & Communication Hub.",
      longDescription: "Performed penetration testing for Aercrypt's end-to-end encrypted messaging services.",
      tags: ["Encryption Hub"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/aer.jpg",
      link: "https://aercrypt.net",
      icon: Lock,
      color: "#E74C3C"
    },
    {
      title: "StackofStake.com",
      description: "Automated Staking & Masternodes platform.",
      longDescription: "Collaborated on platform security audits to provide a seamless user experience for crypto-asset staking.",
      tags: ["Staking Platform"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/sos.png",
      link: "https://stackofstake.com",
      icon: Database,
      color: "#8E44AD"
    },
    {
      title: "Cryptech.services",
      description: "Blockchain Technical Services Provider.",
      longDescription: "Penetration Tester & security advisor and system vulnerability assessments.",
      tags: ["Tech Services"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/cs.png",
      link: "https://cryptech.services",
      icon: Shield,
      color: "#95A5A6"
    },
    {
      title: "Pepecoin.org",
      description: "The Original Meme Coin Ecosystem.",
      longDescription: "Performed Penetration to Floppygame PEPE and Vulnerability Assessments",
      tags: ["Meme Ecosystem"],
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/pepe.png",
      link: "https://pepecoin.org",
      icon: Globe,
      color: "#1ABC9C"
    }
  ];

  const graphicsProjects: GraphicProject[] = [
    {
      title: "T-Shirt Design",
      description: "Anime-inspired illustrations and custom streetwear concepts featuring iconic characters.",
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/zoro-t.jpg",
      galleryImages: [
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/luffy-t.png?auto=format&fit=crop&q=80&w=800",
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/zoro-t.png?auto=format&fit=crop&q=80&w=800",
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/vs.png?auto=format&fit=crop&q=80&w=800",
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/ng.png?auto=format&fit=crop&q=80&w=800",
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/shanks.png?auto=format&fit=crop&q=80&w=800"
      ],
      category: "Merchandise"
    },
    {
      title: "Logo Design",
      description: "Minimalist and impactful brand identities for tech startups and blockchain projects.",
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/logo.png?auto=format&fit=crop&q=80&w=800",
      galleryImages: [
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/db.png?auto=format&fit=crop&q=80&w=800",
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/logo.png?auto=format&fit=crop&q=80&w=80"

      ],
      category: "Identity"
    },
    {
      title: "E-book",
      description: "Professional digital publication layouts and cover designs for technical guides.",
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/chester.png?auto=format&fit=crop&q=80&w=800",
      galleryImages: [
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/duck.png?auto=format&fit=crop&q=80&w=800"
      ],
      category: "Editorial"
    },
    {
      title: "ID Lace / Lanyard",
      description: "Custom event and corporate identity accessories designed for international conferences.",
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/lace.png",
      galleryImages: [
        "https://raw.githubusercontent.com/kejzhin/portfolio/main/image/lace.png"
      ],
      category: "Corporate"
    },
    {
      title: "E-Commerce",
      description: "Digital storefront concepts and visual assets for online retail platforms.",
      image: "https://raw.githubusercontent.com/kejzhin/portfolio/refs/heads/main/image/nec.jpg?auto=format&fit=crop&q=80&w=800",
      galleryImages: [
        "https://raw.githubusercontent.com/kejzhin/portfolio/refs/heads/main/image/nec.jpg?auto=format&fit=crop&q=80&w=800"
      ],
      category: "E-Commerce"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl px-1"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-brand-purple tracking-tight mb-3">
          Projects.
        </h2>
        <div className="flex items-center gap-3 text-zinc-500 mb-8">
          <div className="w-12 h-px bg-zinc-800" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Work Showcase.</span>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-4xl mx-auto">
        {projects.map((project, index) => (
            <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.05
            }}
            onClick={() => setSelectedProject(project)}
            className="group relative bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer"
          >
            {/* Image Container with fitted square image */}
            <div className="aspect-square overflow-hidden bg-zinc-950/40 relative flex items-center justify-center p-4">
              <img 
                src={project.image || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"} 
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Content Container */}
            <div className="p-3 sm:p-4 relative bg-zinc-950/80 backdrop-blur-md border-t border-white/[0.03]">
              <span className="text-[8px] sm:text-[9px] font-mono text-brand-purple font-bold uppercase tracking-widest mb-1 block truncate">
                {project.tags[0]}
              </span>
              <h3 className="text-[10px] sm:text-xs font-bold text-white transition-colors group-hover:text-brand-purple truncate">
                {project.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphics Projects Section */}
      <div className="pt-6 space-y-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl px-1"
        >
          <h2 className="text-3xl font-bold text-brand-purple tracking-tight mb-2">Graphics & Design</h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            A creative collection of visual artworks, from digital illustrations and branding to e-commerce assets and merchandise design.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative group/marquee">
          {/* Fading Edges Mask */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

          <motion.div 
            className="flex gap-6 w-max py-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 35, 
              repeat: Infinity 
            }}
          >
            {/* Duplicate projects for seamless loop */}
            {[...graphicsProjects, ...graphicsProjects].map((graphic, index) => (
              <motion.div
                key={`${graphic.title}-${index}`}
                whileHover={{ 
                  y: -12,
                  scale: 1.01,
                  transition: { duration: 0.4 }
                }}
                onClick={() => setSelectedGraphic(graphic)}
                className="w-[190px] md:w-[230px] flex-shrink-0 group relative bg-zinc-900/40 border border-white/[0.03] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden hover:border-brand-purple/30 hover:bg-zinc-900/60 transition-all duration-500 cursor-pointer shadow-2xl"
              >
                <div className="aspect-square overflow-hidden bg-zinc-950/40 flex items-center justify-center p-6 md:p-8">
                  <img 
                    src={graphic.image} 
                    alt={graphic.title}
                    className="w-full h-full object-contain transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-5 md:p-6">
                  <div className="transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                    <span className="text-[10px] font-mono text-brand-purple font-bold uppercase tracking-widest mb-2 block px-2 py-1 bg-brand-purple/10 border border-brand-purple/20 w-fit rounded-lg">
                      {graphic.category}
                    </span>
                    <h4 className="text-lg font-bold text-white tracking-tight">{graphic.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Details Modal (Folder Style) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl pointer-events-auto"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl z-10 flex flex-col pointer-events-auto"
            >
            {/* Main Modal Body */}
            <div className="w-full bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col md:flex-row h-full max-h-[90vh] md:h-[550px] relative">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 z-20"
              >
                <X size={20} />
              </button>
  
               {/* Left Side: Large Preview Centerpiece */}
              <div className="w-full md:w-2/3 p-6 md:p-12 bg-zinc-900/40 flex items-center justify-center relative overflow-hidden shrink-0">
                <div 
                  className="absolute inset-0 opacity-10 blur-[120px]"
                  style={{ backgroundColor: selectedProject.color }}
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative z-10 w-full h-full flex flex-col items-center justify-center"
                >
                  {selectedProject.image ? (
                    <div className="w-full h-full max-w-[90%] max-h-[90%] rounded-3xl bg-white shadow-2xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-contain p-6"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 bg-zinc-800 p-8 rounded-[2.5rem] shadow-2xl flex items-center justify-center">
                      <selectedProject.icon className="text-white" size={80} />
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Right Side: File Details Interface */}
              <div className="w-full md:w-1/3 p-10 md:p-12 flex flex-col border-l border-zinc-800 bg-zinc-950">
                <div className="flex-grow flex flex-col justify-center">
                  <header className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold rounded-lg uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white mb-3 leading-tight">{selectedProject.title}</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed mb-10">
                         {selectedProject.longDescription}
                      </p>
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-100 hover:bg-white text-zinc-950 text-[13px] font-bold rounded-2xl transition-all shadow-xl shadow-black/20"
                      >
                        <ExternalLink size={16} />
                        <span>Visit Project</span>
                      </a>
                    </div>
                  </header>
                </div>

                <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest font-bold">Security Analysis</span>
                  <Shield size={14} className="text-zinc-700" />
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Graphics Pop-up */}
      <AnimatePresence>
        {selectedGraphic && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGraphic(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl pointer-events-auto"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl z-10 flex flex-col pointer-events-auto"
            >
                {/* Main Modal Body */}
                <div className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col md:flex-row h-full max-h-[85vh] md:h-[520px] relative">
                  <button 
                    onClick={() => setSelectedGraphic(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 z-40 border border-zinc-800 shadow-xl"
                  >
                    <X size={20} />
                  </button>

                  {/* Left Side: Gallery Grid */}
                  <div className="w-full md:w-[60%] p-6 md:p-8 bg-zinc-900/40 overflow-y-auto custom-scrollbar shrink-0 md:shrink">
                    <div className="grid grid-cols-2 gap-3">
                    {selectedGraphic.galleryImages.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'} rounded-xl overflow-hidden border border-zinc-800 group/gallery`}
                      >
                        <img 
                          src={img} 
                          alt="Gallery item" 
                          className="w-full h-full object-contain group-hover/gallery:scale-105 transition-transform duration-500"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Side: File Details Interface */}
                <div className="w-full md:w-[40%] p-6 md:p-8 flex flex-col border-l border-zinc-800 bg-zinc-950 shrink-0 overflow-hidden">
                  <div className="flex-grow flex flex-col justify-center">
                    <header className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded-lg">
                          <span className="text-[10px] font-mono text-brand-purple font-bold tracking-widest">{selectedGraphic.category.toUpperCase()}</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight text-white leading-tight">{selectedGraphic.title}</h3>
                      <p className="text-zinc-500 text-[11px] leading-relaxed font-light line-clamp-3">
                        {selectedGraphic.description}
                      </p>
                    </header>

                    <div className="mt-8">
                      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-3">Portfolio Metadata</span>
                        <div className="space-y-3 font-mono">
                          <div className="flex justify-between items-center text-[10px]">
                             <span className="text-zinc-500">Industry:</span>
                             <span className="text-zinc-300">{selectedGraphic.category} Services</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <footer className="pt-6 border-t border-zinc-800 flex items-center justify-end">
                    <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.4em]">
                      &copy; 2024 JDLSR
                    </span>
                  </footer>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Design Decoration */}
      <div className="pt-6 mb-6">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />
        <div className="text-center font-mono text-[10px] text-white/20 uppercase tracking-[0.5em] animate-pulse">
          Continuous Innovation &middot; Secure by Design
        </div>
      </div>
    </div>
  );
}
