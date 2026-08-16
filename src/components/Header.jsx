import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Moon,
  PlusCircle,
  X,
  Plus,
  Keyboard
} from 'lucide-react';

export const TopHeader = ({ onMenuClick, onToggleDesktopSidebar }) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addMenuRef = useRef(null);

  // Popups & Dropdowns State
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [notes, setNotes] = useState(localStorage.getItem('quick_notes') || '');
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isShortcutManagerOpen, setIsShortcutManagerOpen] = useState(false);
  const [shortcuts, setShortcuts] = useState(() => {
    return JSON.parse(localStorage.getItem('erp_shortcuts') || '{}');
  });
  const [shortcutsEnabled, setShortcutsEnabled] = useState(() => {
    return localStorage.getItem('erp_shortcuts_enabled') !== 'false';
  });

  const calcRef = useRef(null);
  const noteRef = useRef(null);
  const calRef = useRef(null);
  const reminderRef = useRef(null);
  const msgRef = useRef(null);
  const adminRef = useRef(null);
  const shortcutRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target)) setIsAddMenuOpen(false);
      if (calcRef.current && !calcRef.current.contains(e.target)) setIsCalcOpen(false);
      if (noteRef.current && !noteRef.current.contains(e.target)) setIsNoteOpen(false);
      if (calRef.current && !calRef.current.contains(e.target)) setIsCalOpen(false);
      if (reminderRef.current && !reminderRef.current.contains(e.target)) setIsReminderOpen(false);
      if (msgRef.current && !msgRef.current.contains(e.target)) setIsMessageOpen(false);
      if (adminRef.current && !adminRef.current.contains(e.target)) setIsAdminOpen(false);
      if (shortcutRef.current && !shortcutRef.current.contains(e.target)) setIsShortcutManagerOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

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

  const handleCalcClick = (val) => {
    if (val === '=') {
      try {
        // Safe evaluation
        const evaluated = Function(`"use strict"; return (${calcInput})`)();
        setCalcInput(String(evaluated));
      } catch (err) {
        setCalcInput('Error');
      }
    } else if (val === 'C') {
      setCalcInput('');
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  const handleNotesChange = (val) => {
    setNotes(val);
    localStorage.setItem('quick_notes', val);
  };

  return (
    <div className="h-14 flex items-center justify-between px-2 md:px-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 gap-2 transition-colors relative">
      {/* Three Dot Sidebar Toggle */}
      <button 
        onClick={() => {
          onMenuClick(); 
          if (onToggleDesktopSidebar) onToggleDesktopSidebar(); 
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
          
          {/* Calculator Popup */}
          <div className="relative flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" ref={calcRef}>
            <div onClick={() => setIsCalcOpen(!isCalcOpen)} className="flex flex-col items-center">
              <Calculator size={20} strokeWidth={1.5} />
              <span className="text-[10px] mt-1 font-medium">Calculator</span>
            </div>
            {isCalcOpen && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 bg-slate-150 dark:bg-slate-900 border dark:border-slate-800 rounded-lg p-2 shadow-xl z-50 text-slate-800 dark:text-slate-100">
                <input 
                  type="text" 
                  value={calcInput} 
                  readOnly 
                  className="w-full bg-white dark:bg-slate-850 border border-gray-300 dark:border-slate-700 rounded p-1 mb-2 text-right text-sm font-mono focus:outline-none" 
                />
                <div className="grid grid-cols-4 gap-1 text-xs font-bold">
                  {['7','8','9','/','4','5','6','*','1','2','3','-','0','C','=','+'].map(char => (
                    <button 
                      key={char} 
                      onClick={() => handleCalcClick(char)}
                      className="p-1.5 bg-white dark:bg-slate-800 hover:bg-gray-150 dark:hover:bg-slate-700 rounded shadow-xs text-center border dark:border-slate-700"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notepad Popup */}
          <div className="relative flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" ref={noteRef}>
            <div onClick={() => setIsNoteOpen(!isNoteOpen)} className="flex flex-col items-center">
              <StickyNote size={20} strokeWidth={1.5} />
              <span className="text-[10px] mt-1 font-medium">Notepad</span>
            </div>
            {isNoteOpen && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-lg p-3 shadow-xl z-50 text-slate-800 dark:text-slate-100">
                <div className="flex justify-between items-center mb-1 pb-1 border-b border-amber-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-500">Quick Notepad</span>
                  <X size={12} className="cursor-pointer" onClick={() => setIsNoteOpen(false)} />
                </div>
                <textarea 
                  value={notes} 
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Type notes here... (auto-saved)"
                  className="w-full h-32 text-xs bg-amber-50/10 dark:bg-slate-850 p-2 focus:outline-none resize-none font-medium border border-transparent dark:border-slate-800 rounded"
                />
              </div>
            )}
          </div>

          {/* Calendar Popup */}
          <div className="relative flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" ref={calRef}>
            <div onClick={() => setIsCalOpen(!isCalOpen)} className="flex flex-col items-center">
              <CalendarIcon size={20} strokeWidth={1.5} />
              <span className="text-[10px] mt-1 font-medium">Calendar</span>
            </div>
            {isCalOpen && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-56 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg p-3 shadow-xl z-50 text-slate-800 dark:text-slate-100">
                <div className="text-center font-bold text-xs mb-2 border-b pb-1 text-blue-600 dark:text-blue-400">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <div className="grid grid-cols-7 gap-1 text-[9px] text-center font-bold text-gray-500 mb-1">
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-semibold">
                  {Array.from({ length: 31 }, (_, i) => {
                    const today = new Date().getDate();
                    return (
                      <span 
                        key={i} 
                        className={`p-0.5 rounded ${i + 1 === today ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        {i + 1}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Reminder / Notification Dropdown */}
          <div className="relative flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" ref={reminderRef}>
            <div onClick={() => setIsReminderOpen(!isReminderOpen)} className="flex flex-col items-center">
              <div className="relative">
                <Bell size={20} strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">4</span>
              </div>
              <span className="text-[10px] mt-1 font-medium">Reminder</span>
            </div>
            {isReminderOpen && (
              <div className="absolute top-12 right-0 w-64 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg shadow-xl z-50 py-1 text-slate-800 dark:text-slate-100 text-xs font-semibold">
                <div className="px-3 py-2 border-b font-bold text-gray-700 dark:text-gray-300">System Notifications</div>
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">Low stock alert for 5 products</div>
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">GSTR-1 tax filings due in 3 days</div>
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">New voucher backup completed</div>
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">Audit logs check required</div>
                </div>
              </div>
            )}
          </div>

          {/* Message Dropdown */}
          <div className="relative flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" ref={msgRef}>
            <div onClick={() => setIsMessageOpen(!isMessageOpen)} className="flex flex-col items-center">
               <div className="relative">
                <MessageSquare size={20} strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">5</span>
              </div>
              <span className="text-[10px] mt-1 font-medium">Message</span>
            </div>
            {isMessageOpen && (
              <div className="absolute top-12 right-0 w-64 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg shadow-xl z-50 py-1 text-slate-800 dark:text-slate-100 text-xs font-semibold">
                <div className="px-3 py-2 border-b font-bold text-gray-700 dark:text-gray-300">Unread Messages</div>
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">From Manager: Sales report updated</div>
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">From Client: invoice request #982</div>
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">Support: Database sync completed</div>
                  <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">HR: monthly meeting scheduled</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Add Modules Dropdown */}
          <div className="relative shrink-0 flex flex-col items-center" ref={addMenuRef}>
            <button 
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none bg-transparent border-0 p-0 text-gray-600 dark:text-gray-300"
            >
              <PlusCircle size={20} strokeWidth={1.5} />
              <span className="text-[10px] mt-1 font-medium flex items-center gap-0.5">
                Add Entry <ChevronDown size={10} />
              </span>
            </button>
            {isAddMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-800 rounded-lg shadow-lg z-50 py-1.5 divide-y divide-gray-150 dark:divide-slate-800 text-[11px] font-semibold">
                <div className="py-1">
                  <Link to="/sales/add-sale" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Sale Entry</Link>
                  <Link to="/purchases/add-purchase" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Purchase Entry</Link>
                  <Link to="/receipt/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Receipt Entry</Link>
                  <Link to="/payment/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Payment Entry</Link>
                </div>
                <div className="py-1">
                  <Link to="/bank-receipt/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Bank Receipt</Link>
                  <Link to="/bank-payment/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Bank Payment</Link>
                  <Link to="/contra/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Contra Entry</Link>
                  <Link to="/journal/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Journal Entry</Link>
                </div>
                <div className="py-1">
                  <Link to="/stock-entry/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Stock Entry</Link>
                  <Link to="/stock-transfer/new" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Stock Transfer</Link>
                  <Link to="/products/add-product" onClick={() => setIsAddMenuOpen(false)} className="block px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800">Add Product</Link>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize size={20} strokeWidth={1.5} /> : <Maximize size={20} strokeWidth={1.5} />}
            <span className="text-[10px] mt-1 font-medium">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </div>

          {/* Dark Mode */}
          <div 
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
            onClick={() => setIsDarkMode(prev => !prev)}
            title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDarkMode ? <Sun size={20} strokeWidth={1.5} className="text-amber-400" /> : <Moon size={20} strokeWidth={1.5} />}
            <span className="text-[10px] mt-1 font-medium">{isDarkMode ? 'Light' : 'Dark'}</span>
          </div>

          {/* Keyboard Shortcuts Settings Manager */}
          <div className="relative" ref={shortcutRef}>
            <div 
              className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
              onClick={() => setIsShortcutManagerOpen(!isShortcutManagerOpen)}
              title="Manage Shortcut Keys"
            >
              <Keyboard size={20} strokeWidth={1.5} />
              <span className="text-[10px] mt-1 font-medium">Shortcuts</span>
            </div>

            {isShortcutManagerOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-800 rounded-lg shadow-lg z-50 p-4 space-y-3.5 text-xs font-semibold">
                <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Shortcut Keys Control</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={shortcutsEnabled}
                      onChange={() => {
                        const nextVal = !shortcutsEnabled;
                        setShortcutsEnabled(nextVal);
                        localStorage.setItem('erp_shortcuts_enabled', String(nextVal));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[250px] pr-1">
                  {Object.keys(shortcuts).map((keyName) => (
                    <div key={keyName} className="flex items-center justify-between gap-2">
                      <span className="bg-slate-100 dark:bg-slate-800 border px-1.5 py-0.5 rounded text-[10px] text-blue-600 font-bold font-mono min-w-[50px] text-center">
                        {keyName.replace('_', ' ').toUpperCase()}
                      </span>
                      <select
                        value={shortcuts[keyName]}
                        onChange={(e) => {
                          const nextPath = e.target.value;
                          const updated = { ...shortcuts, [keyName]: nextPath };
                          setShortcuts(updated);
                          localStorage.setItem('erp_shortcuts', JSON.stringify(updated));
                        }}
                        className="p-1 border rounded dark:bg-slate-850 dark:text-slate-100 font-semibold focus:outline-none max-w-[150px] text-[10px]"
                      >
                        <option value="/sales/add-sale">Sale Entry</option>
                        <option value="/purchases/add-purchase">Purchase Entry</option>
                        <option value="/receipt/new">Receipt Entry</option>
                        <option value="/payment/new">Payment Entry</option>
                        <option value="/bank-receipt/new">Bank Receipt</option>
                        <option value="/bank-payment/new">Bank Payment</option>
                        <option value="/journal/new">Journal Entry</option>
                        <option value="/products/product-list">Product List</option>
                        <option value="/stock-entry/new">Stock Entry</option>
                        <option value="/stock-transfer/new">Stock Transfer</option>
                        <option value="/reports/accounts/ledger-voucher">Ledger Reports</option>
                        <option value="/reports/mis/kpi-reports">KPI Reports</option>
                        <option value="/hrms/attendance/daily">Daily Attendance</option>
                        <option value="/hrms/attendance/leaves">Leave Requests</option>
                        <option value="/hrms/attendance/holidays">Holiday Calendar</option>
                        <option value="/hrms/payroll/structure">Salary Structure</option>
                        <option value="/hrms/payroll/slips">Salary Slips</option>
                        <option value="/hrms/payroll/pf-esi">PF & ESI Reports</option>
                        <option value="/hrms/expenses/claims">Expense Claims</option>
                        <option value="/coming-soon">Coming Soon</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help & Support */}
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => navigate('/setup/help-support')}>
            <HelpCircle size={20} strokeWidth={1.5} />
            <span className="text-[10px] mt-1 font-medium">Help</span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-gray-200 dark:bg-slate-800"></div>

        {/* User Profile */}
        <div className="relative" ref={adminRef}>
          <div 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 p-1.5 rounded-md transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold overflow-hidden border border-blue-200 dark:border-slate-700">
               <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800 dark:text-slate-100 leading-tight">ADMIN</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">Super Admin</div>
            </div>
            <ChevronDown size={16} className="text-gray-400 dark:text-gray-500" />
          </div>
          {isAdminOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg shadow-lg z-50 py-1.5 text-xs font-semibold">
              <div className="px-4 py-2 border-b text-gray-500 dark:text-gray-400">Status: Online</div>
              <Link to="/setup/user-master" onClick={() => setIsAdminOpen(false)} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-850">Manage Users</Link>
              <Link to="/setup/system-settings" onClick={() => setIsAdminOpen(false)} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-850">Settings</Link>
              <div onClick={() => { setIsAdminOpen(false); alert("Logging out..."); }} className="block px-4 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-850 cursor-pointer">Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SubHeader = () => {
  const navigate = useNavigate();
  // Configurable master switcher states
  const [company, setCompany] = useState(() => localStorage.getItem('erp_company') || 'ALLCORE SOLUTION PVT. LTD.');
  const [fy, setFy] = useState(() => localStorage.getItem('erp_fy') || '2024-2025');
  const [branch, setBranch] = useState(() => localStorage.getItem('erp_branch') || 'HEAD OFFICE');
  const [user, setUser] = useState(() => localStorage.getItem('erp_user') || 'ADMIN');

  // Toggle Menus
  const [isCompOpen, setIsCompOpen] = useState(false);
  const [isFyOpen, setIsFyOpen] = useState(false);
  const [isBrOpen, setIsBrOpen] = useState(false);
  const [isUsOpen, setIsUsOpen] = useState(false);

  const compRef = useRef(null);
  const fyRef = useRef(null);
  const brRef = useRef(null);
  const usRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      if (compRef.current && !compRef.current.contains(e.target)) setIsCompOpen(false);
      if (fyRef.current && !fyRef.current.contains(e.target)) setIsFyOpen(false);
      if (brRef.current && !brRef.current.contains(e.target)) setIsBrOpen(false);
      if (usRef.current && !usRef.current.contains(e.target)) setIsUsOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (setter, key, val) => {
    setter(val);
    localStorage.setItem(key, val);
    setIsCompOpen(false);
    setIsFyOpen(false);
    setIsBrOpen(false);
    setIsUsOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between px-4 py-2 md:py-0 md:h-14 border-b border-gray-200 dark:border-slate-800 shadow-sm gap-2 transition-colors relative">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 w-full max-w-5xl">
        
        {/* Company Dropdown */}
        <div className="flex flex-col w-64 relative" ref={compRef}>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Company</label>
            <Plus size={10} className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => navigate('/company/profile')} title="Add / Manage Company" />
          </div>
          <div 
            onClick={() => setIsCompOpen(!isCompOpen)}
            className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group"
          >
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100 truncate">{company}</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
          {isCompOpen && (
            <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 border dark:border-slate-800 rounded shadow-lg z-50 text-xs font-bold text-slate-850 dark:text-slate-150 py-1.5 divide-y divide-gray-100 dark:divide-slate-800">
              {['ALLCORE SOLUTION PVT. LTD.', 'GLOBAL ERP SERVICES LTD.', 'SANAJ AUTOMATION INC.'].map(val => (
                <div 
                  key={val} 
                  onClick={() => handleSelect(setCompany, 'erp_company', val)}
                  className={`px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${company === val ? 'text-blue-600' : ''}`}
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Financial Year */}
        <div className="flex flex-col w-32 relative" ref={fyRef}>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Financial Year</label>
            <Plus size={10} className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => navigate('/setup/system-settings')} title="Add / Manage Financial Year" />
          </div>
          <div 
            onClick={() => setIsFyOpen(!isFyOpen)}
            className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group"
          >
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100">{fy}</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
          {isFyOpen && (
            <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 border dark:border-slate-800 rounded shadow-lg z-50 text-xs font-bold text-slate-850 dark:text-slate-150 py-1.5">
              {['2024-2025', '2023-2024', '2025-2026'].map(val => (
                <div 
                  key={val} 
                  onClick={() => handleSelect(setFy, 'erp_fy', val)}
                  className={`px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${fy === val ? 'text-blue-600' : ''}`}
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Branch */}
        <div className="flex flex-col w-40 relative" ref={brRef}>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Branch</label>
            <Plus size={10} className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => navigate('/branch/info')} title="Add / Manage Branch" />
          </div>
          <div 
            onClick={() => setIsBrOpen(!isBrOpen)}
            className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group"
          >
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100">{branch}</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
          {isBrOpen && (
            <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 border dark:border-slate-800 rounded shadow-lg z-50 text-xs font-bold text-slate-850 dark:text-slate-150 py-1.5">
              {['HEAD OFFICE', 'MUMBAI BRANCH', 'DELHI OUTLET', 'BANGALORE R&D'].map(val => (
                <div 
                  key={val} 
                  onClick={() => handleSelect(setBranch, 'erp_branch', val)}
                  className={`px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${branch === val ? 'text-blue-600' : ''}`}
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex flex-col w-32 relative" ref={usRef}>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">User</label>
            <Plus size={10} className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => navigate('/setup/user-master')} title="Add / Manage User" />
          </div>
          <div 
            onClick={() => setIsUsOpen(!isUsOpen)}
            className="flex items-center justify-between border-b border-gray-300 dark:border-slate-700 pb-1 cursor-pointer group"
          >
            <span className="text-sm font-bold text-gray-800 dark:text-slate-100">{user}</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
          {isUsOpen && (
            <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 border dark:border-slate-800 rounded shadow-lg z-50 text-xs font-bold text-slate-850 dark:text-slate-150 py-1.5">
              {['ADMIN', 'ACCOUNTANT', 'SALES EXECUTIVE', 'OPERATOR'].map(val => (
                <div 
                  key={val} 
                  onClick={() => handleSelect(setUser, 'erp_user', val)}
                  className={`px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${user === val ? 'text-blue-600' : ''}`}
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date & Time */}
      <div className="hidden md:flex flex-col items-end whitespace-nowrap ml-4">
        <span className="text-xs text-gray-600 dark:text-slate-300 font-medium">
          {time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </span>
      </div>
    </div>
  );
};
