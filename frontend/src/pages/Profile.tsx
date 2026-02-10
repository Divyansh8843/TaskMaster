import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Calendar, User, Shield, Key } from 'lucide-react';
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';
import Footer from '../components/Footer';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden"
                >
                    {/* Header Background */}
                    <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                    
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="p-1 bg-white dark:bg-slate-800 rounded-full">
                                <Avatar src={user.picture} alt={user.name} size={96} className="border-4 border-white dark:border-slate-800 shadow-md" />
                            </div>
                            <div className="mb-2">
                                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-200 dark:border-indigo-700">
                                    Member
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{user.name}</h1>
                            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Mail size={16} />
                                {user.email}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <User size={18} className="text-indigo-500" />
                                    Account Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Full Name</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Email Address</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">User ID</p>
                                        <p className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-600">
                                            {user._id || user.id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Shield size={18} className="text-indigo-500" />
                                    Security & Access
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Account Type</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            <p className="font-medium text-slate-900 dark:text-white">Active</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Authentication Method</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Key size={14} className="text-slate-400" />
                                            <p className="font-medium text-slate-900 dark:text-white">Google OAuth 2.0</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Joined</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar size={14} className="text-slate-400" />
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
