import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Zap, UserCheck, Lock, ArrowRight, Layout, Github, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardImg from '../public/dashboard.png';
import workflowImg from '../public/workflow.png';

const Home = () => {
    const { user } = useAuth();
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1 
            } 
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 font-sans text-slate-900 dark:text-white selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-26 overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 left-0 -translate-y-12 -translate-x-12 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                    
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-8 hover:bg-white hover:shadow-md transition-all cursor-default">
                                Plan Better. Execute Faster.
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
                                Master Your Workflow <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x">
                                    Securely & Efficiently
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                                The all-in-one task management platform built for modern teams. 
                                Secure, scalable, and beautifully designed to keep you focused.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {user ? (
                                    <Link to="/dashboard" className="group bg-indigo-600 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                        Go to Dashboard
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/register" className="group bg-slate-900 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                            Start for Free
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link to="/login" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-lg px-8 py-4 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                                            <Lock size={18} />
                                            Secure Login
                                        </Link>
                                    </>
                                )}
                            </div>
                            
                            <div className="mt-16 relative mx-auto max-w-5xl">
                                <div className="bg-slate-950 rounded-2xl p-2 shadow-2xl ring-1 ring-slate-900/10">
                                    <div className="bg-slate-900 rounded-xl overflow-hidden aspect-[16/9] relative group">
                                        <img 
                                            src={dashboardImg} 
                                            alt="TaskMaster Dashboard Preview" 
                                            className="w-full h-full object-fit opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            </div>
                                            <span className="text-xs text-slate-400 font-mono">dashboard_v2.tsx</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 bg-slate-50 dark:bg-slate-800/50 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Features</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300">Built with the latest tech stack to ensure your data is safe and your experience is seamless.</p>
                        </div>

                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {[
                                { icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", title: "Bank-Grade Security", desc: "HTTP-only cookies, CSRF protection, and JWT rotation." },
                                { icon: Zap, color: "text-amber-500", bg: "bg-amber-50", title: "Lightning Fast", desc: "Optimized React frontend with minimal latency." },
                                { icon: UserCheck, color: "text-green-600", bg: "bg-green-50", title: "Role-Based Access", desc: "Granular permissions for Admins and standard Users." },
                                { icon: Lock, color: "text-purple-600", bg: "bg-purple-50", title: "OAuth Integration", desc: "One-click login with Google for instant access." },
                            ].map((feature, index) => (
                                <motion.div key={index} variants={fadeIn} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                    <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                                        <feature.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Workflow</h2>
                                <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Simple, yet powerful.</h3>
                                <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">Get up and running in less than 2 minutes with our streamlined onboarding process.</p>
                                
                                <div className="space-y-12">
                                    {[
                                        { step: "01", title: "Create an Account", desc: "Sign up with email or continue with Google." },
                                        { step: "02", title: "Organize Tasks", desc: "Create, categorize, and prioritize your daily agenda." },
                                        { step: "03", title: "Track Progress", desc: "Visualize your productivity with real-time dashboards." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 font-bold group-hover:border-indigo-600 group-hover:text-indigo-600 transition-colors bg-white dark:bg-slate-800 z-10">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                                                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl rotate-6 opacity-20 blur-2xl"></div>
                               <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl h-[580px] border border-slate-800 group">

    {/* Heading inside card */}
    <div className="absolute top-0 left-0 w-full z-10 px-6 py-4 
                    bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white tracking-tight">
            How It Works
        </h2>
    </div>

    {/* Image */}
    <img 
        src={workflowImg} 
        alt="Workflow Interaction" 
        className="w-full h-full object-cover transition-all duration-500 
                   scale-105 group-hover:scale-100"
    />

</div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent"></div>
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to boost your productivity?</h2>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Join thousands of developers who are shipping faster with TaskMaster.
                            Get started today completely free.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {user ? (
                                <Link to="/dashboard" className="bg-indigo-500 hover:bg-indigo-400 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                                    Complete Your Tasks
                                </Link>
                            ) : (
                                <Link to="/register" className="bg-indigo-500 hover:bg-indigo-400 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                                    Create Free Account
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
                        <div className="col-span-2 lg:col-span-2">
                            <Link to="/" className="flex items-center gap-2 mb-6">
                                <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                                    <Layout size={20} />
                                </div>
                                <span className="text-xl font-bold text-slate-900 dark:text-white">TaskMaster</span>
                            </Link>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                                Empowering teams to build the future. Secure, scalable, and designed for humans.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://twitter.com/Ag15277Divyansh" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"><Twitter size={20} /></a>
                                <a href="https://github.com/Divyansh8843" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"><Github size={20} /></a>
                                <a href="https://www.linkedin.com/in/divyansh-agrawal-4556a0299" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"><Linkedin size={20} /></a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Product</h4>
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                                <li><a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
                                <li><a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Workflow</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Changelog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h4>
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Status</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">
                            &copy; {new Date().getFullYear()} TaskMaster Inc. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-sm text-slate-500">
                            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-900">Terms of Service</a>
                            <a href="#" className="hover:text-slate-900">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
