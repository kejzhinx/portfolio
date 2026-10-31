import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import FloatingCyberObjects from '../components/FloatingCyberObjects';
import CardBorderDecoration from '../components/CardBorderDecoration';
import {
  Mail,
  Phone,
  Facebook,
  Github,
  Linkedin,
  Send,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function ContactPage() {
  const { isDark, isHalloween, isChristmas } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'activation_pending' | 'fallback'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const getEncodedSubject = () =>
    encodeURIComponent(
      formData.subject ? `[Portfolio] ${formData.subject}` : `[Portfolio] Inquiry from ${formData.name || 'Visitor'}`
    );

  const getFormattedMessageText = () =>
    `Hello Jeric,\n\nName: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\nSubject: ${formData.subject || 'General Inquiry'}\n\nMessage:\n${formData.message || ''}\n\n---\nSent from Jeric's Portfolio Contact Form`;

  const getGmailWebUrl = () => {
    const su = getEncodedSubject();
    const body = encodeURIComponent(getFormattedMessageText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=jericdelosreyes127001@gmail.com&su=${su}&body=${body}`;
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Jeric,\nName: ${formData.name || 'Visitor'} (${formData.email || 'No email'})\nSubject: ${formData.subject || 'Inquiry'}\n\n${formData.message || ''}`
    );
    return `https://wa.me/639684431452?text=${text}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const openLinkSafely = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/jericdelosreyes127001@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `Portfolio Message from ${formData.name}: ${formData.subject || 'Inquiry'}`,
          message: formData.message,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success === 'true') {
        setStatus('success');
      } else if (
        data?.message &&
        (data.message.toLowerCase().includes('activate') || data.message.toLowerCase().includes('activation'))
      ) {
        setStatus('activation_pending');
        setStatusMessage(data.message);
      } else if (response.ok && data?.success !== 'false') {
        setStatus('success');
      } else {
        setStatus('fallback');
        setStatusMessage(data?.message || 'Submission relay unavailable.');
      }
    } catch {
      // Network/CORS/Ad-blocker error
      setStatus('fallback');
      setStatusMessage('Network request blocked or unavailable (likely by browser ad-blocker).');
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    setStatusMessage('');
  };

  const contactChannels = [
    {
      icon: Mail,
      label: 'Email (Direct & Gmail)',
      value: 'jericdelosreyes127001@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=jericdelosreyes127001@gmail.com',
      sub: 'Open in Gmail or default mail app',
      action: 'Compose in Gmail'
    },
    {
      icon: Phone,
      label: 'WhatsApp / Mobile',
      value: '(+63) 968-443-1452',
      href: 'https://wa.me/639684431452',
      sub: 'Chat directly on WhatsApp',
      action: 'Open WhatsApp'
    },
    {
      icon: null,
      customIcon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M23.003 13.568c0-.44-.038-.868-.112-1.285h-6.843v2.433h3.901c-.168.905-.678 1.672-1.442 2.185v1.815h2.336c1.367-1.258 2.16-3.111 2.16-5.148zM16.048 20.648c2.029 0 3.73-.672 4.973-1.817l-2.336-1.815c-.673.451-1.534.718-2.637.718-2.027 0-3.743-1.369-4.356-3.212H9.278v1.874c1.238 2.458 3.774 4.252 6.77 4.252zm-4.356-7.868c-.156-.468-.244-.967-.244-1.48s.088-1.012.244-1.48V7.946H9.278C8.777 8.94 8.491 10.065 8.491 11.3s.286 2.36.787 3.354l2.414-1.874zm4.356-4.57c1.104 0 2.096.38 2.876 1.127l2.157-2.157C19.774 5.98 18.073 5.3 16.048 5.3c-2.996 0-5.532 1.794-6.77 4.252l2.414 1.874c.613-1.843 2.329-3.216 4.356-3.216z" />
        </svg>
      ),
      label: 'Fiverr Profile',
      value: 'fiverr.com/kejzhin',
      href: 'https://www.fiverr.com/kejzhin',
      sub: 'Order verified freelance gigs',
      action: 'View Fiverr'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'facebook.com/kejzhin',
      href: 'https://facebook.com/kejzhin',
      sub: 'Direct social message',
      action: 'Message on Facebook'
    }
  ];

  return (
    <div className={`relative w-full py-16 sm:py-24 px-6 sm:px-8 overflow-hidden transition-colors duration-300 ${
      isHalloween ? 'bg-[#0A0512]' : isChristmas ? 'bg-[#051120]' : isDark ? 'bg-[#070B14]' : 'bg-[#F8FAFC]'
    }`}>
      <FloatingCyberObjects />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
      {/* Top Banner */}
      <div
        className={`relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 transition-all ${
          isHalloween
            ? 'bg-gradient-to-r from-orange-950/85 via-[#150A1E] to-purple-950/75 border border-orange-500/35 shadow-2xl text-white'
            : isChristmas
            ? 'bg-gradient-to-r from-red-950/85 via-[#0A1B2A] to-emerald-950/75 border border-red-500/35 shadow-2xl text-white'
            : isDark
            ? 'bg-gradient-to-r from-indigo-950/80 via-[#0D1424] to-violet-950/70 border border-indigo-500/30 shadow-2xl text-white'
            : 'bg-white border border-slate-200 shadow-xl shadow-slate-200/50 text-slate-900'
        }`}
      >
        <div
          className={`absolute top-0 right-0 w-96 h-96 blur-[120px] pointer-events-none ${
            isHalloween ? 'bg-orange-500/20' : isChristmas ? 'bg-red-500/20' : isDark ? 'bg-indigo-500/15' : 'bg-indigo-200/40'
          }`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-widest ${
                isHalloween ? 'text-orange-400' : isChristmas ? 'text-red-300' : isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              {isHalloween ? '🎃 Summon Kejzhin >' : isChristmas ? '🎄 Holiday Greetings & Inquiries >' : 'Get In Touch >'}
            </span>
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Let's Work <span className="text-gradient">Together</span>
            </h1>
            <p
              className={`text-sm sm:text-base leading-relaxed font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Have a security audit requirement, custom development project, or creative apparel design in mind? I'd love to hear from you!
            </p>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start w-full lg:w-auto">
            <div className="flex items-center gap-2.5 justify-center">
              <a
                href="https://github.com/kejzhin"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  isHalloween
                    ? 'bg-orange-950/30 border border-orange-500/30 hover:border-orange-500 text-orange-200'
                    : isChristmas
                    ? 'bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 text-emerald-200'
                    : isDark
                    ? 'bg-white/[0.05] border border-white/[0.12] hover:border-indigo-500 hover:text-white text-slate-300'
                    : 'bg-slate-100 border border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 shadow-sm'
                }`}
                title="GitHub @kejzhin"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.fiverr.com/kejzhin"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  isHalloween
                    ? 'bg-orange-950/30 border border-orange-500/30 hover:border-[#1DBF73] text-orange-200 hover:text-[#1DBF73]'
                    : isChristmas
                    ? 'bg-emerald-950/30 border border-emerald-500/30 hover:border-[#1DBF73] text-emerald-200 hover:text-[#1DBF73]'
                    : isDark
                    ? 'bg-white/[0.05] border border-white/[0.12] hover:border-[#1DBF73] text-slate-300 hover:text-[#1DBF73]'
                    : 'bg-slate-100 border border-slate-300 hover:border-[#1DBF73] hover:bg-emerald-50 text-slate-800 hover:text-[#1DBF73] shadow-sm'
                }`}
                title="Fiverr @kejzhin"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fill="#1DBF73" d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  isHalloween
                    ? 'bg-orange-950/30 border border-orange-500/30 hover:border-orange-500 text-orange-200'
                    : isChristmas
                    ? 'bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 text-emerald-200'
                    : isDark
                    ? 'bg-white/[0.05] border border-white/[0.12] hover:border-indigo-500 hover:text-white text-slate-300'
                    : 'bg-slate-100 border border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 shadow-sm'
                }`}
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <button
                onClick={() => handleCopy('jericdelosreyes127001@gmail.com')}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isHalloween
                    ? 'bg-orange-950/30 border border-orange-500/30 hover:border-orange-500 text-orange-200'
                    : isChristmas
                    ? 'bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 text-emerald-200'
                    : isDark
                    ? 'bg-white/[0.05] border border-white/[0.12] hover:border-indigo-500 hover:text-white text-slate-300'
                    : 'bg-slate-100 border border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 shadow-sm'
                }`}
                title="Copy Email"
              >
                {copiedEmail ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form & Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div
          className={`relative overflow-hidden lg:col-span-7 p-6 sm:p-10 rounded-3xl border transition-all ${
            isHalloween
              ? 'bg-[#140A1F]/90 border-orange-500/25 shadow-2xl shadow-orange-950/40'
              : isChristmas
              ? 'bg-[#07192B]/90 border-emerald-500/25 shadow-2xl shadow-emerald-950/40'
              : isDark ? 'bg-[#0D1424] border-white/[0.08]' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <CardBorderDecoration />
          <div className="space-y-2 mb-8">
            <h2
              className={`text-2xl font-bold flex items-center gap-2.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Send size={20} className={isHalloween ? 'text-orange-400' : isChristmas ? 'text-red-400' : 'text-indigo-500'} />
              <span>
                {isHalloween ? '🦇 Send a Message 🎃' : isChristmas ? '🎅 Send a Message 🎁' : 'Send a Message'}
              </span>
            </h2>
            <p className={`text-xs ${isHalloween ? 'text-orange-200/70' : isChristmas ? 'text-emerald-200/70' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Fill in the details below and your message will be dispatched directly to Jeric's inbox.
            </p>
          </div>

          {/* SUCCESS STATE */}
          {status === 'success' ? (
            <div
              className={`p-6 sm:p-8 rounded-2xl border text-center space-y-4 ${
                isDark
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-emerald-400">Message Delivered Successfully!</h3>
                <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold">{formData.name || 'Friend'}</span>! Your inquiry has been dispatched directly to{' '}
                  <span className="font-mono font-semibold">jericdelosreyes127001@gmail.com</span>. I will review it and reply within 24 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-lg shadow-emerald-900/30"
              >
                <RefreshCw size={14} />
                <span>Send Another Message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${isHalloween ? 'text-orange-300' : isChristmas ? 'text-emerald-300' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isHalloween
                        ? 'bg-[#0E0517] border border-orange-500/30 focus:border-orange-500 focus:bg-[#140824] text-orange-50 placeholder:text-orange-300/30 shadow-inner'
                        : isChristmas
                        ? 'bg-[#031321] border border-emerald-500/30 focus:border-emerald-500 focus:bg-[#061D33] text-emerald-50 placeholder:text-emerald-300/30 shadow-inner'
                        : isDark
                        ? 'bg-[#080D1A] border border-white/[0.08] focus:border-indigo-500 text-white placeholder:text-slate-600'
                        : 'bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${isHalloween ? 'text-orange-300' : isChristmas ? 'text-emerald-300' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isHalloween
                        ? 'bg-[#0E0517] border border-orange-500/30 focus:border-orange-500 focus:bg-[#140824] text-orange-50 placeholder:text-orange-300/30 shadow-inner'
                        : isChristmas
                        ? 'bg-[#031321] border border-emerald-500/30 focus:border-emerald-500 focus:bg-[#061D33] text-emerald-50 placeholder:text-emerald-300/30 shadow-inner'
                        : isDark
                        ? 'bg-[#080D1A] border border-white/[0.08] focus:border-indigo-500 text-white placeholder:text-slate-600'
                        : 'bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-semibold ${isHalloween ? 'text-orange-300' : isChristmas ? 'text-emerald-300' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Subject / Project Category
                </label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Web Security Assessment / Mobile App Development / Apparel Design"
                  className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                    isHalloween
                      ? 'bg-[#0E0517] border border-orange-500/30 focus:border-orange-500 focus:bg-[#140824] text-orange-50 placeholder:text-orange-300/30 shadow-inner'
                      : isChristmas
                      ? 'bg-[#031321] border border-emerald-500/30 focus:border-emerald-500 focus:bg-[#061D33] text-emerald-50 placeholder:text-emerald-300/30 shadow-inner'
                      : isDark
                      ? 'bg-[#080D1A] border border-white/[0.08] focus:border-indigo-500 text-white placeholder:text-slate-600'
                      : 'bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-semibold ${isHalloween ? 'text-orange-300' : isChristmas ? 'text-emerald-300' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, scope, or requirements..."
                  className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors resize-none ${
                    isHalloween
                      ? 'bg-[#0E0517] border border-orange-500/30 focus:border-orange-500 focus:bg-[#140824] text-orange-50 placeholder:text-orange-300/30 shadow-inner'
                      : isChristmas
                      ? 'bg-[#031321] border border-emerald-500/30 focus:border-emerald-500 focus:bg-[#061D33] text-emerald-50 placeholder:text-emerald-300/30 shadow-inner'
                      : isDark
                      ? 'bg-[#080D1A] border border-white/[0.08] focus:border-indigo-500 text-white placeholder:text-slate-600'
                      : 'bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              {/* ACTIVATION PENDING OR FALLBACK NOTICES */}
              {status === 'activation_pending' && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                    isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-amber-400">
                        Notice for Jeric: One-Time Activation Pending
                      </p>
                      <p className="text-[11px] leading-relaxed opacity-90">
                        FormSubmit has sent an activation email to <span className="font-semibold underline">jericdelosreyes127001@gmail.com</span>. Please click "Activate Form" in that email once so background forms can deliver directly!
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold">
                    In the meantime, your message is fully saved! Send it immediately using one of these 1-click options:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openLinkSafely(getGmailWebUrl())}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#EA4335] text-white hover:bg-[#d9382b] transition-all cursor-pointer shadow-sm"
                    >
                      <Mail size={14} />
                      <span>Send via Gmail Web (1-Click)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openLinkSafely(getWhatsAppUrl())}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all cursor-pointer shadow-sm"
                    >
                      <MessageSquare size={14} />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}

              {status === 'fallback' && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                    isDark
                      ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-indigo-400">
                        Send Your Message Directly to Jeric
                      </p>
                      <p className="text-[11px] leading-relaxed opacity-90">
                        {statusMessage || 'Background relay blocked by browser ad-blocker.'} Your message is fully preserved! Choose your preferred method below to dispatch right away:
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openLinkSafely(getGmailWebUrl())}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#EA4335] text-white hover:bg-[#d9382b] transition-all cursor-pointer shadow-sm"
                    >
                      <Mail size={14} />
                      <span>Send via Gmail Web</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openLinkSafely(getWhatsAppUrl())}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all cursor-pointer shadow-sm"
                    >
                      <MessageSquare size={14} />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary py-3.5 mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Dispatching Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message to Jeric</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`relative overflow-hidden p-6 space-y-4 rounded-3xl border transition-all ${
              isHalloween
                ? 'bg-[#140A1F]/90 border-orange-500/25 shadow-2xl shadow-orange-950/40'
                : isChristmas
                ? 'bg-[#07192B]/90 border-emerald-500/25 shadow-2xl shadow-emerald-950/40'
                : isDark ? 'bg-[#0D1424] border-white/[0.08]' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <CardBorderDecoration />
            <h3
              className={`text-lg font-bold border-b pb-3 flex items-center justify-between ${
                isHalloween
                  ? 'text-white border-orange-500/20'
                  : isChristmas
                  ? 'text-white border-emerald-500/20'
                  : isDark ? 'text-white border-white/[0.08]' : 'text-slate-900 border-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{isHalloween ? '🦇 Direct Channels 🎃' : isChristmas ? '🎁 Direct Channels 🎄' : 'Direct Channels'}</span>
              </span>
              <Sparkles size={16} className={isHalloween ? 'text-orange-400' : isChristmas ? 'text-red-400' : 'text-indigo-500'} />
            </h3>

            <div className="space-y-3">
              {contactChannels.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group ${
                    isHalloween
                      ? 'bg-orange-950/20 border-orange-500/20 hover:border-orange-500/50 hover:bg-orange-950/40'
                      : isChristmas
                      ? 'bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-950/40'
                      : isDark
                      ? 'bg-white/[0.02] border-white/[0.06] hover:border-indigo-500/40 hover:bg-white/[0.05]'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-slate-100 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border ${
                      isHalloween
                        ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                        : isChristmas
                        ? 'bg-red-500/15 border-red-500/30 text-red-400'
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500'
                    }`}>
                      {item.icon ? <item.icon size={18} /> : item.customIcon}
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono uppercase font-bold block ${
                        isHalloween ? 'text-orange-400/80' : isChristmas ? 'text-emerald-400/80' : 'text-slate-400'
                      }`}>
                        {item.label}
                      </span>
                      <p
                        className={`text-xs font-bold transition-colors ${
                          isHalloween
                            ? 'text-white group-hover:text-orange-300'
                            : isChristmas
                            ? 'text-white group-hover:text-emerald-300'
                            : isDark
                            ? 'text-white group-hover:text-indigo-300'
                            : 'text-slate-900 group-hover:text-indigo-600'
                        }`}
                      >
                        {item.value}
                      </p>
                      <span className={`text-[11px] ${
                        isHalloween ? 'text-orange-200/50' : isChristmas ? 'text-emerald-200/50' : isDark ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        {item.sub}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    size={14}
                    className={`transition-all shrink-0 ml-2 group-hover:translate-x-0.5 ${
                      isHalloween
                        ? 'text-orange-400/60 group-hover:text-orange-400'
                        : isChristmas
                        ? 'text-emerald-400/60 group-hover:text-emerald-400'
                        : 'text-slate-400 group-hover:text-indigo-500'
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Location Badge Card */}
          <div
            className={`relative overflow-hidden p-6 flex items-center gap-4 rounded-3xl border transition-all ${
              isHalloween
                ? 'bg-[#140A1F]/90 border-orange-500/25 shadow-xl shadow-orange-950/40'
                : isChristmas
                ? 'bg-[#07192B]/90 border-emerald-500/25 shadow-xl shadow-emerald-950/40'
                : isDark ? 'bg-[#0D1424] border-white/[0.08]' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <CardBorderDecoration />
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
              isHalloween
                ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                : isChristmas
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-blue-500/10 border border-blue-500/20 text-blue-500'
            }`}>
              <MapPin size={20} />
            </div>
            <div>
              <span className={`text-[10px] font-mono uppercase font-bold block ${
                isHalloween ? 'text-orange-400' : isChristmas ? 'text-emerald-400' : 'text-slate-400'
              }`}>
                {isHalloween ? '🕸️ Current Location' : isChristmas ? '❄️ Current Location' : 'Current Location'}
              </span>
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Manila, Philippines (GMT+8)</p>
              <span className={`text-xs ${
                isHalloween ? 'text-orange-200/60' : isChristmas ? 'text-emerald-200/60' : isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>Available for remote contracts worldwide</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
