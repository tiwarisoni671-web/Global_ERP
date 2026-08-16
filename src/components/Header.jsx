import React from 'react';
import { 
  Search, 
  Calculator, 
  StickyNote, 
  Calendar as CalendarIcon, 
  Bell, 
  MessageSquare, 
  HelpCircle,
  ChevronDown,
  Menu,
  MoreVertical,
  Maximize,
  Minimize,
  Sun,
  Moon
} from 'lucide-react';

export const TopHeader = ({ onMenuClick, onToggleDesktopSidebar }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="h-14 flex items-center justify-between px-2 md:px-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 gap-2 transition-colors">
      {/* Three Dot Sidebar Toggle */}
      <button 
        onClick={() => {
          onMenuClick(); // mobile overlay toggling
          if (onToggleDesktopSidebar) onToggleDesktopSidebar(); // desktop collapse toggling
        }}
        title="Toggle Sidebar"
        className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors"
      >
        <MoreVertical size={20} />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl flex items-center relative">
        <Search className="absolute left-3 text-gray-400 dark:text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search Menu / Customer / Invoice / Product..." 
          className="w-full pl-10 pr-4 py-1.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 dark:text-slate-100 transition-colors"
        />
        <div className="absolute right-3 text-xs text-blue-500 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">F3</div>
      </div>

      {/* Quick Actions & User Profile */}
      <div className="flex items-center gap-6 ml-4">
        {/* Actions */}
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Calculator size={20} strokeWidth={1.5} />
            <span className="text-[10px] mt-1 font-medium">Calculator</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <StickyNote size={20} strokeWidth={1.5} />
            <span className="text-[10px] mt-1 font-medium">Notepad</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <CalendarIcon size={20} strokeWidth={1.5} />
            <span className="text-[10px] mt-1 font-medium">Calendar</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative">
            <div className="relative">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">4</span>
            </div>
            <span className="text-[10px] mt-1 font-medium">Reminder</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative">
             <div className="relative">
              <MessageSquare size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">5</span>
            </div>
            <span className="text-[10px] mt-1 font-medium">Message</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize size={20} strokeWidth={1.5} /> : <Maximize size={20} strokeWidth={1.5} />}
            <span className="text-[10px] mt-1 font-medium">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </div>
          <div 
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
            onClick={() => setIsDarkMode(prev => !prev)}
            title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDarkMode ? <Sun size={20} strokeWidth={1.5} className="text-amber-400" /> : <Moon size={20} strokeWidth={1.5} />}
            <span className="text-[10px] mt-1 font-medium">{isDarkMode ? 'Light' : 'Dark'}</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <HelpCircle size={20} strokeWidth={1.5} />
            <span className="text-[10px] mt-1 font-medium">Help</span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-gray-200 dark:bg-slate-800"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 p-1.5 rounded-md transition-colors">
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold overflow-hidden border border-blue-200 dark:border-slate-700">
             <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 dark:text-slate-100 leading-tight">ADMIN</div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">Super Admin</div>
          </div>
          <ChevronDown size={16} className="text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export const SubHeader = () => {
  return (
    <div className="bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between px-4 py-2 md:py-0 md:h-14 border-b border-gray-200 dark:border-slate-800 shadow-sm gap-2 transition-colors">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 w-full max-w-5xl">
        {/* Company Dropdown */}
        <div className="flex flex-col w-64">
          <label className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5 font-medium">Company</label>
          <div className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group">
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100 truncate">ALLCORE SOLUTION PVT. LTD.</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
        </div>

        {/* Financial Year */}
        <div className="flex flex-col w-32">
          <label className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5 font-medium">Financial Year</label>
          <div className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group">
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100">2024-2025</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
        </div>

        {/* Branch */}
        <div className="flex flex-col w-40">
          <label className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5 font-medium">Branch</label>
          <div className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group">
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100">HEAD OFFICE</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
        </div>

        {/* User */}
        <div className="flex flex-col w-32">
          <label className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5 font-medium">User</label>
          <div className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group">
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100">ADMIN</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="hidden md:flex flex-col items-end whitespace-nowrap ml-4">
        <span className="text-xs text-gray-600 dark:text-slate-300 font-medium">Friday, 24 May, 2024</span>
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">11:30:25 AM</span>
      </div>
    </div>
  );
};
