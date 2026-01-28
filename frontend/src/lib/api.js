
// API Configuration with Supabase
import { supabase } from './supabaseClient';
import { getPriceBreakdown, getAllTiersComparison } from './pricing';

// Helper for consistency
// Note: In Supabase, we don't send tokens manually in headers for DB calls, 
// the client handles it. For Edge Functions, we might need to if using raw fetch,
// but supabase.functions.invoke handles it too.

// Auth helpers
export const auth = {
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  register: async (data) => {
    const { email, password, company_name, contact_name, phone } = data;

    // 1. Sign up auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) throw authError;

    // 2. Create profile (triggers or manual insert depending on setup)
    // We'll manually insert/update profile here to be safe and simple
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email,
          company_name,
          contact_name,
          phone,
          role: 'client' // Default
        });

      if (profileError) console.error('Error creating profile:', profileError);
    }

    return authData;
  },

  getMe: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: profile } = await supabase
      .from('profiles')
      .select('*, addresses(*)')
      .eq('id', user.id)
      .single();

    // Combine auth user and profile
    return { ...user, ...profile };
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },

  // Backward compatibility
  getUser: () => {
    // This is sync, effectively impossible with just supabase-js v2 without subscription
    // For now returning null, components should use async checks or auth context
    return null;
  }
};

// Products API
export const products = {
  getAll: async (category) => {
    let query = supabase.from('products').select('*').eq('is_active', true);
    if (category) {
      query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  getById: async (id) => {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  getCategories: async () => {
    // Manually aggregating or fetching unique categories
    // Optimized: returning hardcoded list or simplified query
    const { data } = await supabase.from('products').select('category');
    // Count logic would ideally be a view or RPC
    return []; // Logic moved to component or simplified
  },
};

// Pricing API (Now Client Side)
export const pricing = {
  calculate: (quantity, printType, size = 'medium', category = 'sacs_kraft') => {
    return Promise.resolve(getPriceBreakdown(quantity, printType, size, category));
  },
  getTiers: (printType, size, category) => {
    return Promise.resolve(getAllTiersComparison(printType, size, category));
  },
};

// Quotes API
export const quotes = {
  create: async (data) => {
    const { data: result, error } = await supabase.from('quote_requests').insert(data).select().single();
    if (error) throw error;
    return { message: "Demande envoyée", quote_id: result.id };
  },
};

// Orders API
export const orders = {
  getAll: async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getById: async (id) => {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  create: async (data) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not found');

    // Add user_id
    const orderData = { ...data, user_id: user.id };

    const { data: result, error } = await supabase.from('orders').insert(orderData).select().single();
    if (error) throw error;
    return { message: "Commande créée", order_id: result.id };
  },

  reorder: async (id) => {
    // Fetch original
    const { data: original } = await supabase.from('orders').select('*').eq('id', id).single();
    if (!original) throw new Error('Order not found');

    const { data: { user } } = await supabase.auth.getUser();

    // Create new
    const newOrder = {
      user_id: user.id,
      items: original.items,
      total_price: original.total_price,
      shipping_address: original.shipping_address,
      billing_address: original.billing_address,
      notes: `Réassort commande #${id.slice(0, 8)}`
    };

    const { data: result, error } = await supabase.from('orders').insert(newOrder).select().single();
    if (error) throw error;
    return { message: "Commande dupliquée", order_id: result.id };
  },
};

// Upload API
export const upload = {
  file: async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return { url: publicUrl, filename: fileName };
  },
};

// AI Assistant API (Edge Function)
export const assistantApi = {
  createDesign: async (data) => {
    const { data: result, error } = await supabase.functions.invoke('ai-design', {
      body: data
    });

    if (error) throw error;
    return result;
  },

  getDesign: async (id) => {
    const { data, error } = await supabase.from('ai_designs').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  retryImage: async (designId) => {
    // This requires a separate edge function or handling in the main one
    // For now assuming main one can handle type='retry' or similar, 
    // OR we just re-call createLogic partially. 
    // Simplified: Just error for now as it needs a specialized function endpoint
    throw new Error("Retry image not yet implemented in Edge Function");
  },

  bookVisio: async (data) => {
    const { data: result, error } = await supabase.from('visio_requests').insert(data).select().single();
    if (error) throw error;
    return { message: "Visio réservée", visio_id: result.id };
  },

  requestQuote: async (data) => {
    const { data: result, error } = await supabase.from('quote_requests_v2').insert(data).select().single();
    if (error) throw error;
    return { message: "Demande devis envoyée", quote_id: result.id };
  },
};

export const ordersApi = orders;
