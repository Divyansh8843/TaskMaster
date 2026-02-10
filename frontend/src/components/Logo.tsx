import { Hexagon } from 'lucide-react';

const Logo = ({ size = 32, className = '' }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            <Hexagon 
                size={size} 
                className="text-indigo-600 dark:text-indigo-500 fill-indigo-100 dark:fill-indigo-500/20" 
                strokeWidth={2.5}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs" style={{ fontSize: size * 0.5 }}>T</span>
            </div>
        </div>
    );
};

export default Logo;
