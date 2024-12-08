import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/users/${userId}/status`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{user.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{user.role}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        <button
                          onClick={() => toggleUserStatus(user._id, user.isActive)}
                          className={`mr-2 ${
                            user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {user.isActive ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}