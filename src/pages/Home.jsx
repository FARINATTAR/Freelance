import React, { useState, useEffect } from 'react';
import { Rocket, Shield, Zap, Code, Briefcase, MessageSquare, User, Palette, ChevronRight, Star, Github, Twitter, Linkedin, Terminal, Database, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TechDashboardHomepage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Project Management",
      description: "Organize and track your projects with military precision",
      accent: "cyan"
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Service Offerings",
      description: "Showcase your skills and manage client services",
      accent: "purple"
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "AI-Powered Chat",
      description: "Intelligent conversations that boost productivity",
      accent: "green"
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Portfolio Builder",
      description: "Create portfolios that leave lasting impressions",
      accent: "orange"
    },
    {
      icon: <User className="w-12 h-12" />,
      title: "Profile Control",
      description: "Full control over your digital presence",
      accent: "pink"
    }
  ];

  const benefits = [
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "One dashboard. Every workflow.",
      description: "Everything unified in a single interface"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Minimal clicks. Maximum control.",
      description: "Streamlined UX designed for efficiency"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Secure, fast, and visually stunning.",
      description: "Enterprise-grade security meets beautiful design"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Built for coders, creators, and consultants.",
      description: "Tailored for the modern digital professional"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Full Stack Developer",
      content: "This platform revolutionized my workflow. Clean, fast, and incredibly powerful.",
      avatar: "AC",
      company: "TechCorp"
    },
    {
      name: "Sarah Kim",
      role: "UI/UX Designer",
      content: "Finally, a tool that looks as good as it performs. The interface is pure art.",
      avatar: "SK",
      company: "Design Studio"
    },
    {
      name: "Marcus Johnson",
      role: "Tech Consultant",
      content: "Client management became effortless. The AI features are next-level.",
      avatar: "MJ",
      company: "Freelance"
    }
  ];

  const MatrixRain = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {chars.charAt(Math.floor(Math.random() * chars.length))}
          </div>
        ))}
      </div>
    );
  };

  const HexagonGrid = () => (
    <div className="fixed inset-0 opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <polygon points="50,5 85,25 85,65 50,85 15,65 15,25" fill="none" stroke="url(#grad)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#AE00FF" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00FF87" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)"/>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <HexagonGrid />
      <MatrixRain />
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            NEXUS
          </div>
          <div className="hidden md:flex space-x-8 text-gray-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#benefits" className="hover:text-purple-400 transition-colors">Benefits</a>
            <a href="#testimonials" className="hover:text-green-400 transition-colors">Reviews</a>
            <a href="#footer" className="hover:text-orange-400 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-gray-300 hover:text-cyan-400 transition-colors font-medium"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-mono mb-8">
              ▶ SYSTEM.STATUS: OPERATIONAL
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="block text-white">YOUR DIGITAL</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              WORKSPACE,
            </span>
            <span className="block text-white">REDEFINED.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto font-light">
            Manage Projects. Offer Services. Build Your Portfolio. Connect.
            <br className="hidden md:block" />
            <span className="text-cyan-400 font-medium">All from one unified command center.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="group relative overflow-hidden px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Rocket className="w-6 h-6" />
                INITIALIZE SYSTEM
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="group px-12 py-4 border-2 border-purple-500 text-purple-400 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <span className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6" />
                ACCESS PORTAL
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
              CORE <span className="text-cyan-400">MODULES</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Five integrated systems designed to amplify your digital workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative h-80 p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${
                  feature.accent === 'cyan' ? 'from-cyan-400/20 to-blue-500/20' :
                  feature.accent === 'purple' ? 'from-purple-400/20 to-pink-500/20' :
                  feature.accent === 'green' ? 'from-green-400/20 to-cyan-500/20' :
                  feature.accent === 'orange' ? 'from-orange-400/20 to-red-500/20' :
                  'from-pink-400/20 to-purple-500/20'
                }`}></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`mb-6 ${
                    feature.accent === 'cyan' ? 'text-cyan-400' :
                    feature.accent === 'purple' ? 'text-purple-400' :
                    feature.accent === 'green' ? 'text-green-400' :
                    feature.accent === 'orange' ? 'text-orange-400' :
                    'text-pink-400'
                  }`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative z-10 px-6 py-24 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 text-white">
              WHY <span className="text-purple-400">NEXUS?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 animate-ping opacity-20 group-hover:opacity-40"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 text-white">
              FIELD <span className="text-green-400">REPORTS</span>
            </h2>
            <p className="text-xl text-gray-400">What the pros are saying about NEXUS</p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-light text-gray-300 mb-8 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-xl">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</div>
                    <div className="text-cyan-400">{testimonials[currentTestimonial].role}</div>
                    <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-cyan-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="relative z-10 px-6 py-16 border-t border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2">
                NEXUS
              </div>
              <p className="text-gray-400 font-mono">
                Made with <span className="text-red-500">💻</span> for modern creators
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              {[
                { icon: Github, color: 'hover:text-cyan-400' },
                { icon: Twitter, color: 'hover:text-blue-400' },
                { icon: Linkedin, color: 'hover:text-purple-400' }
              ].map((social, index) => (
                <button key={index} className={`p-4 rounded-xl bg-white/5 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:scale-110`}>
                  <social.icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechDashboardHomepage;