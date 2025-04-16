import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../../api/axios.js';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnnonceStatistics() {
  const { annonceId } = useParams();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [annonce, setAnnonce] = useState(null);

  useEffect(() => {
    const fetchAnnonceStatistics = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('Token not found!');
        }

        const annonceResponse = await axiosClient.get(`/annonces/${annonceId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAnnonce(annonceResponse.data);

        const statisticsResponse = await axiosClient.get(`/admin/statistics/annonce/${annonceId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setStatistics(statisticsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching annonce statistics:', error);
        setError(error.message);
        setLoading(false);
        
        // Mock data for development
        const mockStatistics = {
          totalCandidatures: 45,
          candidaturesByStatus: {
            pending: 15,
            accepted: 22,
            rejected: 8
          },
          candidaturesByDay: {
            'Lun': 8,
            'Mar': 12,
            'Mer': 5,
            'Jeu': 7,
            'Ven': 10,
            'Sam': 2,
            'Dim': 1
          },
          averageResponseTime: 2.5,
          conversionRate: 48.9, 
        };
        
        const mockAnnonce = {
          id: annonceId,
          titre: "Développeur Full Stack",
          description: "Nous recherchons un développeur full stack expérimenté...",
          dateCreation: "2023-05-15",
          dateLimite: "2023-06-15",
        };
        
        setStatistics(mockStatistics);
        setAnnonce(mockAnnonce);
        setLoading(false);
      }
    };

    if (annonceId) {
      fetchAnnonceStatistics();
    }
  }, [annonceId]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Erreur!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  if (!statistics || !annonce) return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Attention!</strong>
      <span className="block sm:inline"> Données non disponibles.</span>
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

  const dailyChartData = {
    labels: Object.keys(statistics.candidaturesByDay),
    datasets: [
      {
        label: 'Candidatures par jour',
        data: Object.values(statistics.candidaturesByDay),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Statistiques de l'Annonce</h1>
      </div>

      {/* Annonce Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{annonce.titre}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Entreprise</p>
            <p className="font-medium">{annonce.entreprise}</p>
          </div>
       
          <div>
            <p className="text-sm text-gray-500">Date de Publication</p>
            <p className="font-medium">{new Date(annonce.dateCreation).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date Limite</p>
            <p className="font-medium">{new Date(annonce.dateLimite).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Salaire</p>
            <p className="font-medium">{annonce.salaire}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Candidatures</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.totalCandidatures}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Taux de Conversion</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.conversionRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Temps de Réponse Moyen</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.averageResponseTime} jours</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Candidatures Acceptées</p>
              <p className="text-2xl font-semibold text-gray-800">{statistics.candidaturesByStatus.accepted}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Statut des Candidatures</h2>
          <div className="h-64">
            <Bar data={statusChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Candidatures par Jour</h2>
          <div className="h-64">
            <Bar data={dailyChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}