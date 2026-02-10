import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <Logo size={28} />
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TaskMaster</span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Empowering teams to achieve more with secure, scalable, and intuitive task management.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link to="/features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</Link></li>
                            <li><Link to="/integrations" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Integrations</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link to="/docs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentation</Link></li>
                            <li><Link to="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</Link></li>
                            <li><Link to="/help" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link></li>
                            <li><Link to="/careers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                        &copy; {new Date().getFullYear()} TaskMaster. Made with <Heart size={14} className="text-red-500 fill-current" /> globally.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-slate-50 dark:bg-slate-800 rounded-full">
                            <Github size={18} />
                        </a>
                        <a href="#" className="p-2 text-slate-400 hover:text-blue-400 transition-colors bg-slate-50 dark:bg-slate-800 rounded-full">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="p-2 text-slate-400 hover:text-blue-700 transition-colors bg-slate-50 dark:bg-slate-800 rounded-full">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
