import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/*
 * Only create the Supabase client when both
 * environment variables are available.
 */

let supabase = null

if (supabaseUrl && supabasePublishableKey) {
  try {
    supabase = createClient(
      supabaseUrl,
      supabasePublishableKey
    )

    console.log("Supabase client initialized successfully.")
  } catch (error) {
    console.error(
      "Failed to initialize Supabase:",
      error
    )
  }
} else {
  console.error(
    "Supabase environment variables are missing."
  )

  console.error(
    "VITE_SUPABASE_URL:",
    supabaseUrl ? "Found" : "Missing"
  )

  console.error(
    "VITE_SUPABASE_PUBLISHABLE_KEY:",
    supabasePublishableKey
      ? "Found"
      : "Missing"
  )
}

export { supabase }