import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard, Receipt, PiggyBank,
  LogOut, Sun, Moon, TrendingUp, Menu, X
} from 'lucide-react';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses',  icon: Receipt,         label: 'Expenses'  },
  { to: '/budget',    icon: PiggyBank,       label: 'Budget'    },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <TrendingUp size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">Spendly</span>
        </div>
        {/* Close button — only mobile */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      {/* User Info */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
          <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
              ${isActive
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 space-y-1 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile Hamburger Button ─────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700"
      >
        <Menu size={20} className="text-gray-700 dark:text-white" />
      </button>

      {/* ── Mobile Overlay ──────────────────────────────────── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ───────────────────────────────────── */}
      <div className={`
        lg:hidden fixed top-0 left-0 h-full w-72 z-50
        bg-white dark:bg-gray-800 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </div>

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex-col z-30 shadow-sm">
        <SidebarContent />
      </aside>
    </>
  );
}