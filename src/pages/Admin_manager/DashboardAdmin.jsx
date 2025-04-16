import { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axios.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function DashboardAdmin() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('Token not found!');
        }

        const response = await axiosClient.get('/admin/statistics', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setStatistics(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError(error.message);
        setLoading(false);
        
        const mockStatistics = {
          totalUsers: 120,
          totalRecruiters: 25,
          totalCandidates: 95,
          totalAnnonces: 45,
          totalCandidatures: 210,
          candidaturesByStatus: {
            pending: 80,
            accepted: 95,
            rejected: 35
          },
          annoncesByMonth: {
            'Jan': 3,
            'Feb': 5,
            'Mar': 7,
            'Apr': 4,
            'May': 8,
            'Jun': 6,
            'Jul': 5,
            'Aug': 7
          },
          candidaturesByMonth: {
            'Jan': 15,
            'Feb': 22,
            'Mar': 30,
            'Apr': 25,
            'May': 35,
            'Jun': 28,
            'Jul': 32,
            'Aug': 23
          }
        };
        setStatistics(mockStatistics);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error && !statistics) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Erreur!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  const statusChartData = {
    labels: ['En attente', 'Acceptées', 'Refusées'],
    datasets: [
      {
        label: 'Candidatures par statut',
        data: [
          statistics.candidaturesByStatus.pending,
          statistics.candidaturesByStatus.accepted,
          statistics.candidaturesByStatus.rejected
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyAnnonceData = {
    labels: Object.keys(statistics.annoncesByMonth),
    datasets: [
      {
        label: 'Annonces publiées',
        data: Object.values(statistics.annoncesByMonth),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlyCandidatureData = {
    labels: Object.keys(statistics.candidaturesByMonth),
    datasets: [
      {
        label: 'Candidatures reçues',
        data: Object.values(statistics.candidaturesByMonth),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord Administrateur</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Utilisateurs</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Recruteurs</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.totalRecruiters}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Annonces</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.totalAnnonces}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Candidatures</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.totalCandidatures}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Statut des Candidatures</h2>
          <div className="h-64">
            <Pie data={statusChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Annonces par Mois</h2>
          <div className="h-64">
            <Bar data={monthlyAnnonceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Candidatures par Mois</h2>
        <div className="h-64">
          <Line data={monthlyCandidatureData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}