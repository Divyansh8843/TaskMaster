import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskModal from '../components/TaskModal';
import { Plus, Search, Filter, Loader2, ListTodo, CheckCircle2, Clock, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

    const fetchTasks = async () => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                status: statusFilter !== 'all' ? statusFilter : '',
                priority: priorityFilter !== 'all' ? priorityFilter : '',
                search
            });
            const { data } = await api.get(`/tasks?${queryParams}`);
            setTasks(data.tasks);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/tasks/stats');
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch stats', err);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchStats();
    }, [page, statusFilter, priorityFilter, search]);

    const handleSaveTask = async (taskData: any) => {
        try {
            if (taskData._id) {
                await api.put(`/tasks/${taskData._id}`, taskData);
                toast.success('Task updated successfully');
            } else {
                await api.post('/tasks', taskData);
                toast.success('Task created successfully');
            }
            fetchTasks();
            fetchStats();
        } catch (err) {
            console.error('Failed to save task', err);
            toast.error('Failed to save task');
        }
    };

    const handleDeleteTask = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                toast.success('Task deleted successfully');
                fetchTasks();
                fetchStats();
            } catch (err) {
                console.error('Failed to delete task', err);
                toast.error('Failed to delete task');
            }
        }
    };

    const openEditModal = (task: any) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setCurrentTask(null);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-white transition-colors duration-300 flex flex-col">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 flex-grow w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your projects and tasks effectively.</p>
                    </div>
                    <button 
                        onClick={openCreateModal}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
                    >
                        <Plus size={20} />
                        New Task
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ListTodo size={64} className="text-indigo-600 dark:text-indigo-500" />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                                <ListTodo size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Tasks</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock size={64} className="text-yellow-600 dark:text-yellow-500" />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-xl border border-yellow-100 dark:border-yellow-500/20">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.pending}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Loader2 size={64} className="text-blue-600 dark:text-blue-500" />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-500/20">
                                <Loader2 size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">In Progress</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.inProgress}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CheckCircle2 size={64} className="text-green-600 dark:text-green-500" />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-500/20">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.completed}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2 md:w-48 relative">
                        <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none text-slate-900 dark:text-white cursor-pointer transition-colors"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 md:w-48 relative">
                        <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none text-slate-900 dark:text-white cursor-pointer transition-colors"
                        >
                            <option value="all">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                {/* Task List Header */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-xl overflow-hidden hidden md:grid grid-cols-12 gap-4 p-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <div className="col-span-4">Task Name</div>
                    <div className="col-span-3">Assignee</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {/* Task List Body */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-xl border-t-0">
                        <Loader2 className="animate-spin mb-4 text-indigo-600 dark:text-indigo-500" size={40} />
                        <p className="text-slate-500 dark:text-slate-400">Loading your tasks...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-xl border-t-0">
                        <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700">
                            <ListTodo size={40} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tasks found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                            Get started by creating your first task.
                        </p>
                        <button 
                            onClick={openCreateModal}
                            className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300"
                        >
                            Create New Task &rarr;
                        </button>
                    </div>
                ) : (
                    <>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                        <AnimatePresence>
                            {tasks.map(task => (
                                <motion.div 
                                    key={task._id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                                    onClick={() => openEditModal(task)}
                                >
                                    <div className="col-span-4 font-medium text-slate-900 dark:text-slate-200 truncate pr-4">
                                        {task.title}
                                        {task.priority && (
                                            <span className={`ml-2 text-xs font-medium ${
                                                task.priority === 'high' ? 'text-red-500' :
                                                task.priority === 'medium' ? 'text-orange-500' : 'text-green-500'
                                            }`}>
                                                ({task.priority.charAt(0).toUpperCase() + task.priority.slice(1)})
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-3 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500 flex items-center justify-center text-xs text-indigo-700 dark:text-white font-bold">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{user?.name || 'User'}</span>
                                    </div>
                                    <div className="col-span-2 text-sm text-slate-600 dark:text-slate-400">
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                            task.status === 'completed' 
                                                ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' 
                                                : task.status === 'in-progress' 
                                                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' 
                                                : 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20'
                                        }`}>
                                            {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="col-span-1 text-right flex justify-end gap-2">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); openEditModal(task); }}
                                            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                            title="Edit Task"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleDeleteTask(task._id); }}
                                            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                            title="Delete Task"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                    </>
                )}
            </main>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                initialData={currentTask}
            />
            
            <Footer />
        </div>
    );
};

export default Dashboard;
