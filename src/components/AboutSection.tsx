import { motion } from 'motion/react';
import {
  Terminal,
  Globe,
  Zap,
  Network,
  Activity,
  ShieldAlert,
  Database,
  FolderSearch,
  Image as ImageIcon,
  Layout,
  MessageSquare,
  Video,
  Sun,
  Move
} from 'lucide-react';

export default function AboutSection() {
  return (
    <div id="about" className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bento-card md:col-span-3 md:p-12 justify-center min-h-[300px]"
      >
        <div className="max-w-3xl">
          <div className="bento-label mb-4 md:mb-8">About Me</div>
          <p className="text-xl md:text-3xl font-bold leading-tight text-white mb-6 md:mb-10 tracking-tight">
            Specializing in <span className="text-brand-purple">Penetration Testing</span> and <span className="text-brand-purple">Information Security</span>, 
            providing comprehensive digital asset protection.
          </p>
          <div className="h-1 w-20 bg-brand-purple mb-6 md:mb-10" />
          <p className="text-base md:text-lg font-medium leading-relaxed text-white/50">
            Driven by a passion for <span className="text-white underline decoration-brand-purple/30">Graphics Designer</span>. 
            Blending technical precision with creative visual solutions.
          </p>
        </div>
      </motion.div>

      {/* Education Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="md:col-span-3 mt-10 mb-4"
      >
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">Education Record</h2>
      </motion.div>

      {/* Education - Aurora A. Elementary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bento-card flex-row items-center gap-6 py-8"
      >
        <div className="flex-1 text-left">
          <span className="text-[10px] font-mono text-white/30 font-bold uppercase tracking-widest block mb-2">2007 - 2014</span>
          <h3 className="text-base md:text-lg font-bold">Aurora A. Elementary</h3>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
          <img src="https://raw.githubusercontent.com/kejzhin/portfolio/main/image/auro.png" alt="Aurora A. Logo" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Education - Carlos L. Albert */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bento-card flex-row items-center gap-6 py-8"
      >
        <div className="flex-1 text-left">
          <span className="text-[10px] font-mono text-white/30 font-bold uppercase tracking-widest block mb-2">2018 - 2020</span>
          <h3 className="text-base md:text-lg font-bold">Carlos L. Albert High School</h3>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
          <img src="https://raw.githubusercontent.com/kejzhin/portfolio/main/image/carlos.png" alt="Carlos L. Logo" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Education - AMA University */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="bento-card flex-row items-center gap-6 py-8"
      >
        <div className="flex-1 text-left">
          <span className="text-[10px] font-mono text-white/30 font-bold uppercase tracking-widest block mb-2">2020 - 2021</span>
          <h3 className="text-base md:text-lg font-bold">AMA University & College</h3>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
          <img src="https://raw.githubusercontent.com/kejzhin/portfolio/main/image/ama.png" alt="AMA Logo" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Pentesting Tools Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="md:col-span-3 mt-16 mb-4"
      >
        <div className="flex items-center gap-3 text-brand-purple mb-2">
          <div className="w-8 h-px bg-brand-purple/30" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Common tools i use.</span>
        </div>
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-white mb-2">Penetration Testing Toolkit</h2>
        <p className="text-white/40 text-sm font-medium">Industry-standard tools I utilize for comprehensive security assessments.</p>
      </motion.div>

      <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { name: "Kali Linux", role: "OS Architecture", color: "bg-blue-500/10 text-blue-400", image: "https://cdn.simpleicons.org/kalilinux/white", icon: Terminal },
          { name: "Burp Suite", role: "Web Analysis", color: "bg-orange-500/10 text-orange-400", image: "https://cdn.simpleicons.org/burpsuite/white", icon: Globe },
          { name: "Metasploit", role: "Exploitation", color: "bg-red-500/10 text-red-500", image: "https://cdn.simpleicons.org/metasploit/white", icon: Zap },
          { name: "Nmap", role: "Network Mapper", color: "bg-emerald-500/10 text-emerald-400", image: "https://cdn.simpleicons.org/nmap/white", icon: Network },
          { name: "Wireshark", role: "Packet Analysis", color: "bg-indigo-500/10 text-indigo-400", image: "https://cdn.simpleicons.org/wireshark/white", icon: Activity },
          { name: "Acunetix", role: "Vulnerability Scanner", color: "bg-blue-400/10 text-blue-300", icon: ShieldAlert },
          { name: "SQLmap", role: "DB Injection", color: "bg-zinc-500/10 text-zinc-300", icon: Database },
          { name: "Gobuster", role: "Directory Bruteforce", color: "bg-teal-500/10 text-teal-400", icon: FolderSearch }
        ].map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 group transition-colors"
          >
            <div className={`w-fit px-2 py-0.5 rounded-md text-[8px] md:text-[9px] font-bold uppercase tracking-tighter ${tool.color}`}>
              {tool.role}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0">
                {tool.image ? (
                  <img
                    src={tool.image}
                    alt=""
                    className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <tool.icon className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-brand-purple transition-colors" />
                )}
              </div>
              <span className="text-xs md:text-sm font-bold text-white group-hover:text-brand-purple transition-colors leading-none">
                {tool.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphics Designing Tools Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="md:col-span-3 mt-16 mb-4"
      >
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-white mb-2">Graphics Designing Toolkit</h2>
        <p className="text-white/40 text-sm font-medium">Creative stack I leverage for visual identity, branding, and asset creation.</p>
      </motion.div>

      <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
        {[
          { name: "Adobe Photoshop", role: "Image Manipulation", color: "bg-blue-600/10 text-blue-500", image: "https://cdn.simpleicons.org/adobephotoshop/white", icon: ImageIcon },
          { name: "Canva", role: "Layout Design", color: "bg-cyan-500/10 text-cyan-400", image: "https://cdn.simpleicons.org/canva/white", icon: Layout },
          { name: "ChatGPT", role: "AI Creative Assist", color: "bg-emerald-600/10 text-emerald-500", image: "https://cdn.simpleicons.org/openai/white", icon: MessageSquare },
          { name: "Filmora", role: "Video Editing", color: "bg-teal-500/10 text-teal-400", image: "https://cdn.simpleicons.org/wondersharefilmora/white", icon: Video },
          { name: "Lightroom", role: "Photo Grading", color: "bg-blue-400/10 text-blue-300", image: "https://cdn.simpleicons.org/adobelightroom/white", icon: Sun },
          { name: "After Effects", role: "Motion Design", color: "bg-violet-600/10 text-violet-500", image: "https://cdn.simpleicons.org/adobeaftereffects/white", icon: Move }
        ].map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 group transition-colors"
          >
            <div className={`w-fit px-2 py-0.5 rounded-md text-[8px] md:text-[9px] font-bold uppercase tracking-tighter ${tool.color}`}>
              {tool.role}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0">
                {tool.image ? (
                  <img
                    src={tool.image}
                    alt=""
                    className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <tool.icon className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-brand-purple transition-colors" />
                )}
              </div>
              <span className="text-xs md:text-sm font-bold text-white group-hover:text-brand-purple transition-colors leading-none">
                {tool.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
