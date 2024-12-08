import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Jobs', href: '/admin/jobs', icon: BriefcaseIcon },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'Reports', href: '/admin/reports', icon: ChartBarIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 px-4">
        <span className="text-xl font-bold text-white">Admin Panel</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}