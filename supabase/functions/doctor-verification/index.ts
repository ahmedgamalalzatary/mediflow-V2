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

    const { doctorId, action, adminId } = await req.json()

    if (!doctorId || !action || !adminId) {
      throw new Error('Missing required parameters')
    }

    // Update doctor verification status
    const { data, error } = await supabaseClient
      .from('profiles')
      .update({ 
        verification_status: action === 'approve' ? 'verified' : 'rejected',
        verified_at: action === 'approve' ? new Date().toISOString() : null,
        verified_by: adminId
      })
      .eq('id', doctorId)
      .eq('role', 'doctor')
      .select()

    if (error) throw error

    // Send notification to doctor
    await supabaseClient
      .from('notifications')
      .insert({
        user_id: doctorId,
        title: action === 'approve' ? 'Verification Approved' : 'Verification Rejected',
        message: action === 'approve' 
          ? 'Your doctor verification has been approved. You can now start accepting appointments.'
          : 'Your doctor verification has been rejected. Please contact support for more information.',
        type: 'verification_update'
      })

    return new Response(
      JSON.stringify({ success: true, data }),
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