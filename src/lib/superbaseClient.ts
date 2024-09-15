// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dnzerdgnilttyxfyzzyi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuemVyZGduaWx0dHl4Znl6enlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MDg1NDksImV4cCI6MjA0MTk4NDU0OX0.wOxIi2A7O0F-hMu8oDlpollwf2RQ0kgETBJLlGIgtxo'
export const supabase = createClient(supabaseUrl, supabaseKey)
