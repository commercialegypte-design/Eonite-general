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

// Status badge component
const StatusBadge = ({ status }) => {
  const config = {
    draft: { label: 'Brouillon', color: 'bg-gray-500/20 text-gray-400' },
    pending_design: { label: 'Design en attente', color: 'bg-yellow-500/20 text-yellow-500' },
    in_production: { label: 'En production', color: 'bg-blue-500/20 text-blue-500' },
    shipped: { label: 'Expédié', color: 'bg-purple-500/20 text-purple-500' },
    completed: { label: 'Terminé', color: 'bg-green-500/20 text-green-500' },
  };
  const { label, color } = config[status] || config.draft;
  return <span className={`px-3 py-1 text-xs font-medium ${color}`}>{label}</span>;
};

// Dashboard Home
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
        <h1 className="text-3xl font-black text-white">Bienvenue, {user?.company_name}</h1>
        <p className="text-white/60 mt-2">Gérez vos commandes et votre compte</p>
      </div>

      {/* Current Order Status */}
      {currentOrder ? (
        <div className="bg-white/5 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-lg">Commande en cours</h2>
            <StatusBadge status={currentOrder.status} />
          </div>
          
          {/* Progress Steps */}
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
            <div className="relative flex justify-between">
              {['draft', 'pending_design', 'in_production', 'shipped', 'completed'].map((step, i) => {
                const steps = ['draft', 'pending_design', 'in_production', 'shipped', 'completed'];
                const currentIdx = steps.indexOf(currentOrder.status);
                const isActive = i <= currentIdx;
                const isCurrent = i === currentIdx;
                
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                      isActive ? 'bg-[#FF6B00]' : 'bg-white/10'
                    } ${isCurrent ? 'ring-4 ring-[#FF6B00]/30' : ''}`}>
                      {i === 0 && <Package size={18} className={isActive ? 'text-black' : 'text-white/40'} />}
                      {i === 1 && <Clock size={18} className={isActive ? 'text-black' : 'text-white/40'} />}
                      {i === 2 && <AlertCircle size={18} className={isActive ? 'text-black' : 'text-white/40'} />}
                      {i === 3 && <Truck size={18} className={isActive ? 'text-black' : 'text-white/40'} />}
                      {i === 4 && <CheckCircle2 size={18} className={isActive ? 'text-black' : 'text-white/40'} />}
                    </div>
                    <span className={`text-xs mt-2 ${isActive ? 'text-white' : 'text-white/40'}`}>
                      {['Créée', 'Design', 'Prod.', 'Expédiée', 'Livrée'][i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
            <div>
              <p className="text-white/60 text-sm">Référence</p>
              <p className="text-white font-mono">#{currentOrder.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Total</p>
              <p className="text-[#FF6B00] font-bold text-xl">{currentOrder.total_price?.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 p-8 text-center">
          <Package size={48} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/60 mb-4">Aucune commande en cours</p>
          <Link to="/contact">
            <Button className="btn-brutal">
              <Plus size={18} className="mr-2" />
              Nouvelle commande
            </Button>
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/dashboard/orders" className="bg-white/5 border border-white/10 p-6 hover:border-[#FF6B00]/50 transition-colors group">
          <Package size={24} className="text-[#FF6B00] mb-4" />
          <h3 className="text-white font-bold">Mes Commandes</h3>
          <p className="text-white/50 text-sm mt-1">Voir l'historique</p>
          <ChevronRight size={18} className="text-white/40 mt-4 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all" />
        </Link>
        
        <Link to="/dashboard/profile" className="bg-white/5 border border-white/10 p-6 hover:border-[#FF6B00]/50 transition-colors group">
          <MapPin size={24} className="text-[#FF6B00] mb-4" />
          <h3 className="text-white font-bold">Mes Adresses</h3>
          <p className="text-white/50 text-sm mt-1">Gérer mes sites</p>
          <ChevronRight size={18} className="text-white/40 mt-4 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all" />
        </Link>
        
        <Link to="/contact" className="bg-white/5 border border-white/10 p-6 hover:border-[#FF6B00]/50 transition-colors group">
          <RefreshCw size={24} className="text-[#FF6B00] mb-4" />
          <h3 className="text-white font-bold">Nouveau Devis</h3>
          <p className="text-white/50 text-sm mt-1">Passer commande</p>
          <ChevronRight size={18} className="text-white/40 mt-4 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
};

// Orders List
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
        <h1 className="text-2xl font-black text-white">Mes Commandes</h1>
        <Link to="/contact">
          <Button className="btn-brutal">
            <Plus size={18} className="mr-2" />
            Nouvelle commande
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-white/60">Chargement...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 text-center">
          <Package size={48} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/60">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/60 text-sm">Commande</p>
                  <p className="text-white font-mono font-bold">#{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-white/40">Date</p>
                  <p className="text-white">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-white/40">Articles</p>
                  <p className="text-white">{order.items?.length || 0} produit(s)</p>
                </div>
                <div>
                  <p className="text-white/40">Total</p>
                  <p className="text-[#FF6B00] font-bold">{order.total_price?.toFixed(2)} €</p>
                </div>
              </div>

              {order.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button 
                    onClick={() => handleReorder(order.id)}
                    variant="outline" 
                    className="btn-brutal-outline text-sm"
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

// Profile
const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white">Mon Profil</h1>
      
      <div className="bg-white/5 border border-white/10 p-6">
        <h2 className="text-white font-bold mb-4">Informations</h2>
        <div className="space-y-4">
          <div>
            <p className="text-white/40 text-sm">Entreprise</p>
            <p className="text-white font-medium">{user?.company_name}</p>
          </div>
          <div>
            <p className="text-white/40 text-sm">Email</p>
            <p className="text-white">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">Adresses de livraison</h2>
          <Button className="btn-brutal text-sm">
            <Plus size={16} className="mr-2" />
            Ajouter
          </Button>
        </div>
        <p className="text-white/60">Aucune adresse enregistrée</p>
      </div>
    </div>
  );
};

// Main Dashboard Layout
const DashboardPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="bg-[#0A0A0A] min-h-screen pt-20 flex items-center justify-center">
        <p className="text-white/60">Chargement...</p>
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
    <main className="bg-[#0A0A0A] min-h-screen pt-20">
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
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive 
                        ? 'bg-[#FF6B00] text-black' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
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
