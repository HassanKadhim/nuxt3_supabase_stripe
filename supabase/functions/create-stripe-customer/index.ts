import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";
import { stripe } from "../_shared/stripe.ts";

serve(async (req) => {
  // if (req.method === "OPTIONS") {
  //   return new Response("ok", { headers: corsHeaders });
  // }

  const { record } = await req.json();

  const customer = await stripe.customers.create({
    email: record.email,
    metadata: {
      supabase_id: record.id,
    },
  });

  const { data, error } = await supabaseClient
    .from("proflies")
    .update({
      stripe_customer_id: customer.id,
    })
    .match({ id: record.id });

  console.log({ data, error, customer });

  return new Response(JSON.stringify({ customer_stripe_id: customer.id }), {
    headers: { "Content-Type": "application/json" },
  });
});
