import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const { auth } = useAuth();
  const [reportData, setReportData] = useState({
    jobTrends: {
      labels: [],
      datasets: []
    },
    userActivity: {
      labels: [],
      datasets: []
    }
  });

  useEffect(() => {
    // Simulated data for demonstration
    setReportData({
      jobTrends: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Job Postings',
            data: [65, 78, 90, 85, 95, 110],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      userActivity: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Active Users',
            data: [120, 150, 180, 190, 210, 250],
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1
          }
        ]
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Job Posting Trends</h2>
          <div className="h-64">
            <Line
              data={reportData.jobTrends}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">User Activity</h2>
          <div className="h-64">
            <Line
              data={reportData.userActivity}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}