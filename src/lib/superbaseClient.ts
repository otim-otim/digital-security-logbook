// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dnzerdgnilttyxfyzzyi.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string // Make sure the key is stored in environment variables
export const supabase = createClient(supabaseUrl, supabaseKey)
