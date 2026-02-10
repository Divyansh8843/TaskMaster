import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Avatar from './Avatar';
import Logo from './Logo';
import { LogOut, Menu, X, ChevronRight, Sun, Moon, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        toast.success('Successfully logged out');
        navigate('/');
    };

    const scrollToSection = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl hover:opacity-80 transition-opacity">
                        <Logo size={32} />
                        <span className={`text-xl font-extrabold tracking-tight ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>TaskMaster</span>
                    </Link>
                    
                    {/* Center: Navigation Links (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
                        {!user ? (
                            <>
                                <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</button>
                                <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How it Works</button>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Dashboard</Link>
                                <Link to="/profile" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Profile</Link>
                            </>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {!user ? (
                            <>
                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                                <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Sign In</Link>
                                <Link to="/register" className="bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-1">
                                    Get Started <ChevronRight size={14} />
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                                
                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="flex items-center gap-2 focus:outline-none"
                                    >
                                        <Avatar src={user.picture} alt={user.name} size={40} className="border-2 border-white dark:border-slate-700 shadow-sm ring-2 ring-transparent hover:ring-indigo-100 dark:hover:ring-indigo-900 transition-all cursor-pointer" />
                                    </button>

                                    <AnimatePresence>
                                        {userDropdownOpen && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-1 z-50"
                                            >
                                                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                                                </div>
                                                
                                                <div className="py-1">
                                                    <Link 
                                                        to="/dashboard" 
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                    >
                                                        <LayoutDashboard size={16} />
                                                        Dashboard
                                                    </Link>
                                                    <Link 
                                                        to="/profile" 
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                    >
                                                        <UserIcon size={16} />
                                                        Profile
                                                    </Link>
                                                </div>

                                                <div className="border-t border-slate-100 dark:border-slate-700 py-1">
                                                    <button 
                                                        onClick={handleLogout}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <LogOut size={16} />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                
                                {/* Sign Out Button */}
                                <button 
                                    onClick={handleLogout} 
                                    className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-full text-sm font-medium transition-all"
                                >
                                    <LogOut size={16} />
                                    <span className="hidden xl:inline">Sign Out</span>
                                </button>
                            </>
                        )}
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-4">
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button 
                            className="p-2 text-slate-600 dark:text-slate-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-4">
                            {!user ? (
                                <>
                                    <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-slate-600 dark:text-slate-300 font-medium">Features</button>
                                    <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-slate-600 dark:text-slate-300 font-medium">How it Works</button>
                                    <hr className="border-slate-100 dark:border-slate-700" />
                                    <Link to="/login" className="block w-full py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                                    <Link to="/register" className="block w-full py-3 text-center bg-indigo-600 text-white rounded-xl font-bold" onClick={() => setMobileMenuOpen(false)}>
                                        Get Started Free
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/dashboard" className="block py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                                    <Link to="/profile" className="block py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                                    <div className="flex items-center gap-3 py-4 border-t border-slate-100 dark:border-slate-700 mt-2">
                                        <Avatar src={user.picture} alt={user.name} size={40} />
                                        <div>
                                            <p className="font-bold text-slate-800 dark:text-white">{user.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-medium w-full py-2">
                                        <LogOut size={18} />
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
