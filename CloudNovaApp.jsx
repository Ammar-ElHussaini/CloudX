import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Globe, Cpu, Database, Activity, Mail, Code, 
  MessageSquare, Shield, Zap, BarChart3, ChevronLeft, 
  Terminal, Cloud, Box, Layers, ArrowRight, Menu, X 
} from 'lucide-react';

// --- 3D Components & Styles ---
const GradientText = ({ children, className = "" }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 ${className}`}>
    {children}
  </span>
);

// بطاقة بتقنية Tilt ثلاثية الأبعاد
const TiltCard = ({ children, className = "", onClick }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative transition-all duration-200 ease-out transform hover:z-10 ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// عنصر مكعب ثلاثي الأبعاد يدور (CSS Pure 3D)
const RotatingCube = () => {
  return (
    <div className="w-full h-64 flex items-center justify-center perspective-container">
      <style>{`
        .perspective-container { perspective: 800px; }
        .cube {
          width: 100px; height: 100px; position: relative;
          transform-style: preserve-3d; animation: spin 10s infinite linear;
        }
        .cube-face {
          position: absolute; width: 100px; height: 100px;
          background: rgba(6, 182, 212, 0.1); border: 2px solid #06b6d4;
          display: flex; align-items: center; justify-content: center;
          font-weight: bold; color: #fff; box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
          backdrop-filter: blur(5px);
        }
        .front  { transform: rotateY(0deg) translateZ(50px); }
        .back   { transform: rotateY(180deg) translateZ(50px); }
        .right  { transform: rotateY(90deg) translateZ(50px); }
        .left   { transform: rotateY(-90deg) translateZ(50px); }
        .top    { transform: rotateX(90deg) translateZ(50px); }
        .bottom { transform: rotateX(-90deg) translateZ(50px); }
        @keyframes spin {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
      <div className="cube">
        <div className="cube-face front"><Cloud size={40} /></div>
        <div className="cube-face back">VPS</div>
        <div className="cube-face right">AI</div>
        <div className="cube-face left">API</div>
        <div className="cube-face top">WEB</div>
        <div className="cube-face bottom"><Database /></div>
      </div>
    </div>
  );
};

// --- Mock Data for 10 Pages ---
const PAGES = {
  HOME: 'home',
  LINUX_VPS: 'linux_vps',
  SHARED_HOST: 'shared_host',
  WEBSITE_STATS: 'website_stats',
  STORAGE: 'storage',
  AI_AGENT: 'ai_agent',
  API_MSG: 'api_msg',
  EMAILS: 'emails',
  WEB_DEV: 'web_dev',
  CONTACT: 'contact'
};

// --- Main App Component ---
export default function CloudNovaApp() {
  const [activePage, setActivePage] = useState(PAGES.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation Links
  const navLinks = [
    { id: PAGES.HOME, label: 'الرئيسية', icon: <Globe size={18} /> },
    { id: PAGES.LINUX_VPS, label: 'سيرفرات VPS', icon: <Server size={18} /> },
    { id: PAGES.SHARED_HOST, label: 'استضافة مشتركة', icon: <Layers size={18} /> },
    { id: PAGES.AI_AGENT, label: 'AI Agent', icon: <Cpu size={18} /> },
    { id: PAGES.WEB_DEV, label: 'تصميم مواقع', icon: <Code size={18} /> },
    { id: PAGES.API_MSG, label: 'API Messaging', icon: <MessageSquare size={18} /> },
  ];

  const navigateTo = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Page Components ---

  const HomePage = () => (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black -z-10" />
        
        <div className="md:w-1/2 z-10 space-y-6 text-center md:text-right">
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-mono mb-4">
            الجيل القادم من السحابة 🚀
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            بنيت للمستقبل <br />
            <GradientText>CloudNova Tech</GradientText>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
            منصة سحابية متكاملة توفر لك سيرفرات Linux عالية الأداء، حلول ذكاء اصطناعي، 
            وخدمات تخزين سحابية. كل ما يحتاجه المطورون والشركات في مكان واحد.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <button onClick={() => navigateTo(PAGES.LINUX_VPS)} className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-105">
              ابدأ الآن
            </button>
            <button onClick={() => navigateTo(PAGES.CONTACT)} className="px-8 py-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-xl font-bold transition-all">
              تواصل معنا
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
          <RotatingCube />
        </div>
      </section>

      {/* Services Grid Preview */}
      <section className="py-20 px-6 bg-slate-950">
        <h2 className="text-3xl font-bold text-center text-white mb-12">خدماتنا المتكاملة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { title: 'Linux VPS', icon: <Server className="text-cyan-400" />, desc: 'سيرفرات خاصة افتراضية بنظام لينكس', page: PAGES.LINUX_VPS },
            { title: 'Shared Hosting', icon: <Layers className="text-purple-400" />, desc: 'استضافة مواقع مشتركة اقتصادية وسريعة', page: PAGES.SHARED_HOST },
            { title: 'AI Agents', icon: <Cpu className="text-pink-400" />, desc: 'وكلاء ذكاء اصطناعي لأتمتة أعمالك', page: PAGES.AI_AGENT },
            { title: 'Storage S3', icon: <Database className="text-green-400" />, desc: 'تخزين سحابي آمن وقابل للتوسع', page: PAGES.STORAGE },
          ].map((item, idx) => (
            <TiltCard key={idx} onClick={() => navigateTo(item.page)} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl cursor-pointer hover:border-cyan-500/50 group">
              <div className="mb-4 p-3 bg-slate-800 rounded-lg w-fit group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  );

  const VPSPage = () => (
    <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn">
      <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
        <Terminal className="text-cyan-400" /> Linux VPS High Performance
      </h2>
      <p className="text-gray-400 mb-12 text-lg">سيرفرات KVM معزولة بالكامل، تخزين NVMe، وشبكة 10Gbps.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'Start', cpu: '1 vCPU', ram: '2GB RAM', disk: '40GB NVMe', price: '$5' },
          { name: 'Pro', cpu: '2 vCPU', ram: '4GB RAM', disk: '80GB NVMe', price: '$12' },
          { name: 'Ultimate', cpu: '4 vCPU', ram: '8GB RAM', disk: '160GB NVMe', price: '$25' },
        ].map((plan, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
            <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
            <div className="text-4xl font-bold text-cyan-400 mb-6">{plan.price}<span className="text-lg text-gray-500 font-normal">/شهر</span></div>
            <ul className="space-y-4 mb-8 text-gray-300">
              <li className="flex items-center gap-2"><Zap size={16} className="text-yellow-400" /> {plan.cpu}</li>
              <li className="flex items-center gap-2"><Activity size={16} className="text-green-400" /> {plan.ram}</li>
              <li className="flex items-center gap-2"><Database size={16} className="text-blue-400" /> {plan.disk}</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-purple-400" /> DDoS Protection</li>
            </ul>
            <button className="w-full py-3 bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-400 rounded-lg font-bold transition-all">اطلب الآن</button>
          </div>
        ))}
      </div>
      
      {/* Interactive Terminal Snippet */}
      <div className="mt-16 bg-black rounded-xl p-6 font-mono text-sm border border-slate-800 shadow-2xl">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-green-400">$ ssh root@192.168.1.10</div>
        <div className="text-white">Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-76-generic x86_64)</div>
        <div className="text-white mt-2">System load: 0.01</div>
        <div className="text-white">Memory usage: 12%</div>
        <div className="text-green-400 mt-2 animate-pulse">$ _</div>
      </div>
    </div>
  );

  const SharedHostPage = () => (
    <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn">
       <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
        <Globe className="text-purple-400" /> Shared Hosting
      </h2>
      <p className="text-gray-400 mb-12 text-lg">استضافة سريعة، لوحة تحكم cPanel، وشهادة SSL مجانية.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl text-white font-bold mb-4">المميزات الأساسية</h3>
            <ul className="space-y-3 text-gray-300">
                <li className="flex gap-2"><div className="w-2 h-2 mt-2 bg-purple-500 rounded-full"/> دومين مجاني للسنة الأولى</li>
                <li className="flex gap-2"><div className="w-2 h-2 mt-2 bg-purple-500 rounded-full"/> تنصيب WordPress بضغطة زر</li>
                <li className="flex gap-2"><div className="w-2 h-2 mt-2 bg-purple-500 rounded-full"/> نسخ احتياطي يومي</li>
            </ul>
        </div>
        <div className="bg-gradient-to-br from-purple-900 to-slate-900 p-8 rounded-2xl border border-purple-500/30 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl text-white font-bold">خطة الأعمال</h3>
            <div className="text-5xl text-purple-300 font-bold my-4">$3.99</div>
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full">ابدأ الاستضافة</button>
        </div>
      </div>
    </div>
  );

  const AIAgentPage = () => (
    <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn text-center">
      <div className="inline-block p-4 rounded-full bg-pink-900/20 mb-6">
        <Cpu size={48} className="text-pink-500" />
      </div>
      <h2 className="text-4xl font-bold text-white mb-4">AI Agents for Business</h2>
      <p className="text-gray-400 max-w-2xl mx-auto mb-12">
        استخدم قوة الذكاء الاصطناعي لإنشاء وكلاء أذكياء (Agents) يمكنهم الرد على العملاء، تحليل البيانات، وإدارة المهام تلقائياً.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
        {[
          { title: "Chat Bots", desc: "رد آلي ذكي يفهم اللهجات العربية." },
          { title: "Data Analysis", desc: "تحليل بيانات مبيعاتك وتقديم توصيات." },
          { title: "Automation", desc: "ربط الـ API الخاص بك لتنفيذ مهام معقدة." }
        ].map((item, i) => (
           <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-pink-500 transition-colors">
             <h3 className="text-xl font-bold text-pink-400 mb-2">{item.title}</h3>
             <p className="text-gray-300">{item.desc}</p>
           </div>
        ))}
      </div>
    </div>
  );

  const APIPage = () => (
    <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageSquare className="text-green-400" /> API Messaging System
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
                بوابة إرسال رسائل قوية (SMS, WhatsApp, Email) عبر واجهة برمجية موحدة (Rest API). 
                مثالية للمطورين لدمج الإشعارات في تطبيقاتهم.
            </p>
            <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center gap-2"><Shield size={16} className="text-green-400"/> تشفير End-to-End</li>
                <li className="flex items-center gap-2"><Zap size={16} className="text-green-400"/> سرعة وصول أقل من 2 ثانية</li>
                <li className="flex items-center gap-2"><BarChart3 size={16} className="text-green-400"/> تقارير تسليم فورية</li>
            </ul>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold">Get API Key</button>
        </div>
        <div className="flex-1 w-full">
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-slate-700" dir="ltr">
                <div className="bg-[#2d2d2d] px-4 py-2 text-xs text-gray-400 flex justify-between">
                    <span>POST /v1/send-message</span>
                    <span>JSON</span>
                </div>
                <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`{
  "token": "sk_live_51Mx...",
  "to": "+201000000000",
  "channel": "whatsapp",
  "message": {
    "type": "template",
    "template_id": "welcome_ar",
    "params": ["Ahmed"]
  }
}`}
                </pre>
            </div>
        </div>
      </div>
    </div>
  );

  const WebDevPage = () => (
    <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn">
       <h2 className="text-4xl font-bold text-white mb-6 text-center">
         <span className="text-blue-500">Web Development</span> Services
       </h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
         <div className="space-y-8">
            <div className="flex gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg h-fit"><Box className="text-blue-400" size={32}/></div>
                <div>
                    <h3 className="text-xl font-bold text-white">تصميم واجهات (UI/UX)</h3>
                    <p className="text-gray-400 mt-2">تصميمات عصرية تفاعلية باستخدام Figma و Adobe XD.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg h-fit"><Code className="text-blue-400" size={32}/></div>
                <div>
                    <h3 className="text-xl font-bold text-white">تطوير شامل (Full Stack)</h3>
                    <p className="text-gray-400 mt-2">بناء أنظمة معقدة باستخدام React, Node.js, Python.</p>
                </div>
            </div>
         </div>
         
         {/* 3D Concept Visual */}
         <div className="relative h-64 md:h-auto bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
            <div className="relative z-10 text-center">
                <div className="text-6xl mb-2">💻</div>
                <div className="text-blue-400 font-mono font-bold">&lt;WeCode /&gt;</div>
            </div>
         </div>
       </div>
    </div>
  );

  const StatsPage = () => {
    const [visitors, setVisitors] = useState(12540);
    const [loadTime, setLoadTime] = useState(0.42);
    const [bandwidth, setBandwidth] = useState(45);
    const [chartData, setChartData] = useState([40, 60, 30, 80, 50, 90, 70, 45, 65, 85, 55, 95]);

    useEffect(() => {
      const interval = setInterval(() => {
        setVisitors(v => v + Math.floor(Math.random() * 10) - 2);
        setLoadTime(t => Math.max(0.1, Math.min(1.5, t + (Math.random() - 0.5) * 0.1)));
        setBandwidth(b => Math.max(10, Math.min(90, b + Math.floor(Math.random() * 5) - 2)));
        setChartData(prev => {
          const newData = [...prev.slice(1), Math.floor(Math.random() * 60) + 20];
          return newData;
        });
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
    <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Website Statistics Dashboard</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-900/20 text-red-400 rounded-full text-xs border border-red-500/20 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div> LIVE DATA
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="text-gray-400 text-sm mb-1">الزوار الآن</div>
                <div className="text-3xl font-bold text-blue-400 font-mono tracking-wider">{visitors.toLocaleString()}</div>
                <div className="text-xs text-green-400 mt-2">↑ 12% Live Users</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="text-gray-400 text-sm mb-1">زمن التحميل</div>
                <div className="text-3xl font-bold text-green-400 font-mono tracking-wider">{loadTime.toFixed(2)}s</div>
                <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full transition-all duration-500" style={{width: `${(loadTime/2)*100}%`}}></div>
                </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="text-gray-400 text-sm mb-1">استهلاك الباندويدث</div>
                <div className="text-3xl font-bold text-yellow-400 font-mono tracking-wider">{bandwidth}%</div>
                <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full transition-all duration-500" style={{width: `${bandwidth}%`}}></div>
                </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="text-gray-400 text-sm mb-1">حالة السيرفر</div>
                <div className="text-3xl font-bold text-purple-400 font-mono tracking-wider">99.99%</div>
                <div className="text-xs text-gray-500 mt-2">Uptime (30 Days)</div>
            </div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 h-64 flex items-end justify-between gap-2 relative">
             <div className="absolute inset-0 pointer-events-none opacity-5 flex flex-col justify-between py-6 px-6">
                  {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white"></div>)}
             </div>
             {chartData.map((h, i) => (
                 <div key={i} className="w-full bg-cyan-900/50 hover:bg-cyan-500 transition-all duration-1000 ease-in-out rounded-t-sm relative group" style={{height: `${h}%`}}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-slate-700">
                        {Math.floor(h * 12.5)} Hits
                    </div>
                 </div>
             ))}
        </div>
    </div>
  );
  };

  const StoragePage = () => (
      <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="text-orange-400"/> Object Storage (S3)
          </h2>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-right text-gray-300">
                  <thead className="bg-slate-950 text-gray-400">
                      <tr>
                          <th className="p-4">المساحة</th>
                          <th className="p-4">السعر/شهر</th>
                          <th className="p-4">Bandwidth</th>
                          <th className="p-4"></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                          <td className="p-4">100 GB</td>
                          <td className="p-4 font-bold text-white">$2.00</td>
                          <td className="p-4">1 TB</td>
                          <td className="p-4"><button className="text-cyan-400 hover:underline">شراء</button></td>
                      </tr>
                      <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                          <td className="p-4">1 TB</td>
                          <td className="p-4 font-bold text-white">$15.00</td>
                          <td className="p-4">10 TB</td>
                          <td className="p-4"><button className="text-cyan-400 hover:underline">شراء</button></td>
                      </tr>
                       <tr className="hover:bg-slate-800/50">
                          <td className="p-4">5 TB</td>
                          <td className="p-4 font-bold text-white">$60.00</td>
                          <td className="p-4">50 TB</td>
                          <td className="p-4"><button className="text-cyan-400 hover:underline">شراء</button></td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  );

  const EmailPage = () => (
      <div className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn text-center">
          <Mail size={64} className="text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Business Emails</h2>
          <p className="text-gray-400 mb-8">بريد إلكتروني احترافي باسم شركتك (info@yourcompany.com)</p>
          <div className="flex flex-wrap justify-center gap-6">
             <div className="bg-slate-800 p-6 rounded-xl w-64 border border-slate-700 hover:border-yellow-500 transition-all">
                 <h3 className="text-xl font-bold text-white">Basic</h3>
                 <div className="text-2xl text-yellow-400 my-2">$1/user</div>
                 <div className="text-gray-400 text-sm">5GB Storage</div>
             </div>
             <div className="bg-slate-800 p-6 rounded-xl w-64 border border-slate-700 hover:border-yellow-500 transition-all transform scale-110 shadow-2xl shadow-yellow-900/20">
                 <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-2">Best Value</div>
                 <h3 className="text-xl font-bold text-white">Pro</h3>
                 <div className="text-2xl text-yellow-400 my-2">$3/user</div>
                 <div className="text-gray-400 text-sm">50GB Storage</div>
             </div>
          </div>
      </div>
  );

  // Mapping Pages
  const renderContent = () => {
    switch (activePage) {
      case PAGES.HOME: return <HomePage />;
      case PAGES.LINUX_VPS: return <VPSPage />;
      case PAGES.SHARED_HOST: return <SharedHostPage />;
      case PAGES.WEBSITE_STATS: return <StatsPage />;
      case PAGES.STORAGE: return <StoragePage />;
      case PAGES.AI_AGENT: return <AIAgentPage />;
      case PAGES.API_MSG: return <APIPage />;
      case PAGES.EMAILS: return <EmailPage />;
      case PAGES.WEB_DEV: return <WebDevPage />;
      case PAGES.CONTACT: return (
        <div className="py-20 px-6 text-center animate-fadeIn flex justify-center items-center min-h-[60vh]">
            <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 shadow-2xl max-w-lg w-full hover:border-cyan-500/50 transition-all duration-300 relative group transform hover:-translate-y-2">
                {/* توهج خلفي بسيط */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-900/30 text-cyan-400 mb-6 border border-cyan-500/30">
                        <MessageSquare size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-8">تواصل معنا</h2>
                    
                    <div className="space-y-8">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                            <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-2">خدمة العملاء</p>
                            <p className="text-3xl font-bold text-white font-mono tracking-wider" dir="ltr">010 6676 9730</p>
                        </div>

                        <div>
                            <p className="text-purple-400 font-bold text-sm uppercase tracking-widest mb-2">البريد الإلكتروني</p>
                            <p className="text-xl text-gray-400 hover:text-white transition-colors cursor-pointer">support@cloudnova.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
      default: return <HomePage />;
    }
  };

  // --- Main Layout ---
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-cyan-500/30" dir="rtl">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo(PAGES.HOME)}>
              <Cloud className="text-cyan-400 mr-2 ml-2" size={28} />
              <span className="text-xl font-bold tracking-tighter">Cloud<span className="text-cyan-400">Nova</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 space-x-reverse">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activePage === link.id 
                    ? 'bg-slate-800 text-cyan-400' 
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </button>
              ))}
              {/* Dropdown for extra items could go here, simplified for linear access */}
              <button onClick={() => navigateTo(PAGES.STORAGE)} className="text-gray-300 hover:text-white px-3 text-sm">التخزين</button>
              <button onClick={() => navigateTo(PAGES.WEBSITE_STATS)} className="text-gray-300 hover:text-white px-3 text-sm">الإحصائيات</button>
              <button onClick={() => navigateTo(PAGES.EMAILS)} className="text-gray-300 hover:text-white px-3 text-sm">إيميلات</button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800"
                >
                  {link.label}
                </button>
              ))}
               <button onClick={() => navigateTo(PAGES.STORAGE)} className="block w-full text-right px-3 py-2 text-gray-300 hover:bg-slate-800">التخزين</button>
               <button onClick={() => navigateTo(PAGES.EMAILS)} className="block w-full text-right px-3 py-2 text-gray-300 hover:bg-slate-800">إيميلات</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="relative">
        {/* Background Elements */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        </div>
        
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Cloud className="text-cyan-400 ml-2" />
              <span className="text-xl font-bold text-white">CloudNova</span>
            </div>
            <p className="text-gray-500 text-sm">
              شريكك التقني الأول لخدمات السحابة وتطوير الويب والذكاء الاصطناعي.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">الخدمات</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li onClick={() => navigateTo(PAGES.LINUX_VPS)} className="cursor-pointer hover:text-cyan-400">VPS Hosting</li>
              <li onClick={() => navigateTo(PAGES.SHARED_HOST)} className="cursor-pointer hover:text-cyan-400">Shared Hosting</li>
              <li onClick={() => navigateTo(PAGES.AI_AGENT)} className="cursor-pointer hover:text-cyan-400">AI Solutions</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">المطورين</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li onClick={() => navigateTo(PAGES.API_MSG)} className="cursor-pointer hover:text-cyan-400">API Docs</li>
              <li onClick={() => navigateTo(PAGES.STORAGE)} className="cursor-pointer hover:text-cyan-400">Object Storage</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">قانوني</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>سياسة الخصوصية</li>
              <li>شروط الاستخدام</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm mt-12">
          © 2024 CloudNova Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}