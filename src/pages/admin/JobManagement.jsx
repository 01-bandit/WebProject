import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function JobManagement() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const { auth } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs?status=${filter}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const updateJobStatus = async (jobId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/jobs/${jobId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchJobs();
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const deleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Job Management</h1>
      <div className="mt-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="all">All Jobs</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {jobs.map((job) => (
                      <tr key={job._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{job.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{job.company}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            job.status === 'approved' ? 'bg-green-100 text-green-800' :
                            job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          <select
                            value={job.status}
                            onChange={(e) => updateJobStatus(job._id, e.target.value)}
                            className="mr-2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approve</option>
                            <option value="rejected">Reject</option>
                            <option value="non-compliant">Mark Non-Compliant</option>
                          </select>
                          <button
                            onClick={() => deleteJob(job._id)}
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
    </div>
  );
}