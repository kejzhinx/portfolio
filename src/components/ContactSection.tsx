import { motion } from 'motion/react';
import { Mail, Phone, Facebook, ExternalLink, ShieldCheck, Send } from 'lucide-react';
import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const contactDetails = [
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '(+63) 9684431452', 
      href: 'tel:+639684431452',
      color: '#22C55E'
    },
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'jericdelosreyes127001@gmail.com', 
      href: 'mailto:jericdelosreyes127001@gmail.com',
      color: '#3B82F6'
    },
    { 
      icon: Facebook, 
      label: 'Facebook', 
      value: 'kejzhin', 
      href: 'http://facebook.com/kejzhin',
      color: '#1877F2'
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Using Formspree as an easy endpoint for frontend-only mail sending
      // The user should ideally replace this with their own Formspree ID
      const response = await fetch('https://formspree.io/f/mjvnrpob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _to: 'jericdelosreyes127001@gmail.com'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white tracking-tight">
          Let's build secure systems with <span className="text-brand-purple">striking visual appeal.</span>
        </h2>
        <p className="text-white/50 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
          Need a security assessment, a custom streetwear design, or just want to say hi? Fill out the form below or reach out via my socials.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/[0.03] border border-white/5 p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Send size={20} className="text-brand-purple" />
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-hidden focus:border-brand-purple/40 transition-all placeholder:text-white/5"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-hidden focus:border-brand-purple/40 transition-all placeholder:text-white/5"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">Subject</label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-hidden focus:border-brand-purple transition-all placeholder:text-white/10"
                  placeholder="What is this about?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-hidden focus:border-brand-purple transition-all placeholder:text-white/10 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-5 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-purple/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2 group"
              >
                {status === 'sending' ? (
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : status === 'success' ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-[10px] font-mono text-center mt-2 uppercase tracking-wider">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[100px] pointer-events-none" />
        </motion.div>

        {/* Contact Details Column */}
        <div className="space-y-4">
          {contactDetails.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.label === 'Facebook' ? '_blank' : undefined}
              rel={contact.label === 'Facebook' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] overflow-hidden hover:border-brand-purple/30 transition-all duration-300 flex items-center gap-6"
            >
              <div 
                className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shrink-0"
                style={{ color: contact.color }}
              >
                <contact.icon size={24} />
              </div>
              
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block font-bold">
                  {contact.label}
                </span>
                <div className="text-sm md:text-base font-bold text-white group-hover:text-brand-purple transition-colors break-all">
                  {contact.value}
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                <ExternalLink size={16} className="text-white/20" />
              </div>

              {/* Subtle Gradient Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at center, ${contact.color}, transparent 80%)` 
                }}
              />
            </motion.a>
          ))}

          {/* Facebook Quick Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-brand-purple/5 border border-brand-purple/20 rounded-[2.5rem] text-center"
          >
            <p className="text-brand-purple font-mono text-[10px] font-bold uppercase tracking-widest mb-4">Direct Message</p>
            <p className="text-base font-medium text-white/50 mb-8 leading-relaxed px-4">
              For quick inquiries or priority reports, reach out directly through my social channels.
            </p>
            <a 
              href="http://facebook.com/kejzhin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-purple text-white font-bold rounded-2xl hover:bg-brand-purple/90 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <Facebook size={20} />
              Connect on Facebook
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

