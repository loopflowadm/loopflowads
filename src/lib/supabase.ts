import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let client: any = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Erro ao inicializar o Supabase:', err);
  }
}

if (!client) {
  console.warn(
    'Supabase não configurado. Certifique-se de definir VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas suas variáveis de ambiente em produção.'
  );
  
  // Proxy resiliente para evitar crash ao chamar métodos se a variável de ambiente não existir
  const mockQuery = () => {
    const builder: any = {
      select: () => builder,
      insert: () => builder,
      update: () => builder,
      delete: () => builder,
      order: () => builder,
      eq: () => builder,
      single: () => Promise.resolve({ data: null, error: null }),
      then: (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled)
    };
    return builder;
  };

  client = {
    from: mockQuery,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    }
  };
}

export const supabase = client;
