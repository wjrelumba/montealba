import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bevrqpnvapocibmjwsfw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldnJxcG52YXBvY2libWp3c2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0Mzc2NjAsImV4cCI6MjA3NTAxMzY2MH0.BYWOwpWelJu0KiNUBasg_cPUEgX5OqFCI6WUP-ItM50';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;