import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-primary-600 text-xl font-bold">CareerConnect</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Home</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Dashboard</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Jobs</Link>
            <Link to="/reports" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Reports</Link>
            <Link to="/login" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Login</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Home</Link>
            <Link to="/dashboard" className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Dashboard</Link>
            <Link to="/jobs" className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Jobs</Link>
            <Link to="/reports" className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">Reports</Link>
            <Link to="/login" className="block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}