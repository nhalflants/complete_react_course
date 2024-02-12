import { createClient } from "@supabase/supabase-js"

export const supabaseUrl = "https://sacgjdxwbandaxeskifz.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhY2dqZHh3YmFuZGF4ZXNraWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NzcwMTIsImV4cCI6MjAxNTU1MzAxMn0.JMq-2gDpUh5FMtlu89k-TQjbGuqEW8PaozGxeZcd8Jg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
