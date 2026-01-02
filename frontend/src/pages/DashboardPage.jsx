import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Clock, 
  RefreshCw,
  MapPin,
  User,
  ChevronRight,
  Plus,
  Truck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { orders as ordersApi } from '../lib/api';

const StatusBadge = ({ status }) => {
  const config = {
    draft: { label: 'Brouillon', color: 'bg-[#1A1A1A]/10 text-[#1A1A1A]/60' },
    pending_design: { label: 'Design en cours', color: 'bg-yellow-100 text-yellow-700' },
    in_production: { label: 'En production', color: 'bg-blue-100 text-blue-700' },
    shipped: { label: 'En livraison', color: 'bg-purple-100 text-purple-700' },
    completed: { label: 'Livré', color: 'bg-green-100 text-green-700' },
  };
  const { label, color } = config[status] || config.draft;
  return <span className={`px-3 py-1 text-xs font-semibold ${color}`}>{label}</span>;
};

const DashboardHome = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersApi.getAll();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const currentOrder = orders.find(o => o.status !== 'completed');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#1A1A1A]">Bienvenue, {user?.company_name}</h1>
        <p className="text-[#1A1A1A]/60 mt-2">Gérez vos commandes et votre compte</p>
      </div>

      {/* Current Order Status - Progress Bar */}
      {currentOrder ? (
        <div className="bg-[#F9F8EF] border border-[#6B705C] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1A1A1A] font-bold text-lg">Commande en cours</h2>
            <StatusBadge status={currentOrder.status} />
          </div>
          
          {/* Progress Steps */}
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#6B705C]/20" />
            <div className="relative flex justify-between">
              {['draft', 'pending_design', 'in_production', 'shipped', 'completed'].map((step, i) => {
                const steps = ['draft', 'pending_design', 'in_production', 'shipped', 'completed'];
                const currentIdx = steps.indexOf(currentOrder.status);
                const isActive = i <= currentIdx;
                const isCurrent = i === currentIdx;
                const labels = ['Créée', 'Design', 'Production', 'Livraison', 'Livrée'];
                
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                      isActive ? 'bg-[#6B705C]' : 'bg-[#CDCEBD]'
                    } ${isCurrent ? 'ring-4 ring-[#6B705C]/30' : ''}`}>
                      {i === 0 && <Package size={18} className={isActive ? 'text-[#F9F8EF]' : 'text-[#1A1A1A]/40'} />}
                      {i === 1 && <Clock size={18} className={isActive ? 'text-[#F9F8EF]' : 'text-[#1A1A1A]/40'} />}
                      {i === 2 && <AlertCircle size={18} className={isActive ? 'text-[#F9F8EF]' : 'text-[#1A1A1A]/40'} />}
                      {i === 3 && <Truck size={18} className={isActive ? 'text-[#F9F8EF]' : 'text-[#1A1A1A]/40'} />}
                      {i === 4 && <CheckCircle2 size={18} className={isActive ? 'text-[#F9F8EF]' : 'text-[#1A1A1A]/40'} />}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${isActive ? 'text-[#6B705C]' : 'text-[#1A1A1A]/40'}`}>
                      {labels[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#6B705C]/20 flex justify-between items-center">
            <div>
              <p className="text-[#1A1A1A]/60 text-sm">Référence</p>
              <p className="text-[#1A1A1A] font-mono font-bold">#{currentOrder.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-[#1A1A1A]/60 text-sm">Total</p>
              <p className="text-[#6B705C] font-bold text-xl">{currentOrder.total_price?.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#CDCEBD] border border-[#6B705C] p-8 text-center">
          <Package size={48} className="text-[#6B705C]/40 mx-auto mb-4" />
          <p className="text-[#1A1A1A]/60 mb-4">Aucune commande en cours</p>
          <Link to="/contact">
            <Button className="btn-primary">
              <Plus size={18} className="mr-2" />
              Nouvelle commande
            </Button>
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/dashboard/orders" className="bg-[#F9F8EF] border border-[#6B705C] p-6 hover:bg-[#CDCEBD] transition-colors group">
          <Package size={24} className="text-[#6B705C] mb-4" />
          <h3 className="text-[#1A1A1A] font-bold">Mes Commandes</h3>
          <p className="text-[#1A1A1A]/50 text-sm mt-1">Voir l'historique</p>
          <ChevronRight size={18} className="text-[#1A1A1A]/40 mt-4 group-hover:text-[#6B705C] group-hover:translate-x-1 transition-all" />
        </Link>
        
        <Link to="/dashboard/profile" className="bg-[#F9F8EF] border border-[#6B705C] p-6 hover:bg-[#CDCEBD] transition-colors group">
          <MapPin size={24} className="text-[#6B705C] mb-4" />
          <h3 className="text-[#1A1A1A] font-bold">Mes Adresses</h3>
          <p className="text-[#1A1A1A]/50 text-sm mt-1">Gérer mes sites</p>
          <ChevronRight size={18} className="text-[#1A1A1A]/40 mt-4 group-hover:text-[#6B705C] group-hover:translate-x-1 transition-all" />
        </Link>
        
        <Link to="/contact" className="bg-[#F9F8EF] border border-[#6B705C] p-6 hover:bg-[#CDCEBD] transition-colors group">
          <RefreshCw size={24} className="text-[#6B705C] mb-4" />
          <h3 className="text-[#1A1A1A] font-bold">Nouveau Devis</h3>
          <p className="text-[#1A1A1A]/50 text-sm mt-1">Passer commande</p>
          <ChevronRight size={18} className="text-[#1A1A1A]/40 mt-4 group-hover:text-[#6B705C] group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersApi.getAll();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleReorder = async (orderId) => {
    try {
      await ordersApi.reorder(orderId);
      const data = await ordersApi.getAll();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#1A1A1A]">Mes Commandes</h1>
        <Link to="/contact">
          <Button className="btn-primary">
            <Plus size={18} className="mr-2" />
            Nouvelle commande
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-[#1A1A1A]/60">Chargement...</p>
      ) : orders.length === 0 ? (
        <div className="bg-[#CDCEBD] border border-[#6B705C] p-12 text-center">
          <Package size={48} className="text-[#6B705C]/40 mx-auto mb-4" />
          <p className="text-[#1A1A1A]/60">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#F9F8EF] border border-[#6B705C] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[#1A1A1A]/60 text-sm">Commande</p>
                  <p className="text-[#1A1A1A] font-mono font-bold">#{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[#1A1A1A]/50">Date</p>
                  <p className="text-[#1A1A1A]">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-[#1A1A1A]/50">Articles</p>
                  <p className="text-[#1A1A1A]">{order.items?.length || 0} produit(s)</p>
                </div>
                <div>
                  <p className="text-[#1A1A1A]/50">Total</p>
                  <p className="text-[#6B705C] font-bold">{order.total_price?.toFixed(2)} €</p>
                </div>
              </div>

              {order.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-[#6B705C]/20">
                  <Button 
                    onClick={() => handleReorder(order.id)}
                    className="btn-outline text-sm"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Récommander
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-[#1A1A1A]">Mon Profil</h1>
      
      <div className="bg-[#F9F8EF] border border-[#6B705C] p-6">
        <h2 className="text-[#1A1A1A] font-bold mb-4">Informations</h2>
        <div className="space-y-4">
          <div>
            <p className="text-[#1A1A1A]/50 text-sm">Entreprise</p>
            <p className="text-[#1A1A1A] font-medium">{user?.company_name}</p>
          </div>
          <div>
            <p className="text-[#1A1A1A]/50 text-sm">Email</p>
            <p className="text-[#1A1A1A]">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F8EF] border border-[#6B705C] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#1A1A1A] font-bold">Adresses de livraison</h2>
          <Button className="btn-primary text-sm">
            <Plus size={16} className="mr-2" />
            Ajouter
          </Button>
        </div>
        <p className="text-[#1A1A1A]/60">Aucune adresse enregistrée</p>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="bg-[#F9F8EF] min-h-screen pt-20 flex items-center justify-center">
        <p className="text-[#1A1A1A]/60">Chargement...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { path: '/dashboard/orders', label: 'Commandes', icon: Package },
    { path: '/dashboard/profile', label: 'Profil', icon: User },
  ];

  return (
    <main className="bg-[#F9F8EF] min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 border transition-colors ${
                      isActive 
                        ? 'bg-[#6B705C] text-[#F9F8EF] border-[#6B705C]' 
                        : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#CDCEBD] border-transparent'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="orders" element={<OrdersList />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
