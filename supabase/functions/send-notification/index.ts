import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { userId, title, message, type, data: notificationData } = await req.json()

    if (!userId || !title || !message) {
      throw new Error('Missing required parameters: userId, title, message')
    }

    // Insert notification
    const { data, error } = await supabaseClient
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type: type || 'general',
        data: notificationData || {},
        created_at: new Date().toISOString()
      })
      .select()

    if (error) throw error

    // Send real-time notification
    await supabaseClient
      .channel('notifications')
      .send({
        type: 'broadcast',
        event: 'new_notification',
        payload: {
          userId,
          notification: data[0]
        }
      })

    return new Response(
      JSON.stringify({ success: true, data: data[0] }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})