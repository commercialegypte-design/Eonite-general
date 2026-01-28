
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    // Warn but don't crash, might be build time
    console.warn('Supabase URL or Key missing in environment variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
