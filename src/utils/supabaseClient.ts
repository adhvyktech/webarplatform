import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nhmpowvsrhswoynqibne.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obXBvd3Zzcmhzd295bnFpYm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3NTA4NjksImV4cCI6MjA0MzMyNjg2OX0.-S9UBOcKMKM-CQvGySqbOYQ0FydpMssTbgIn-wZvV2M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)