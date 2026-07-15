// Cloud demos config. The anon key is designed to be public/client-side — access is
// controlled by row-level security policies in the Supabase project.
window.__SUPABASE = {
  url: "https://zljglbqzbrpohtnzwrwv.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsamdsYnF6YnJwb2h0bnp3cnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5Nzc3MDgsImV4cCI6MjA5OTU1MzcwOH0.rigH9-dR0voCwN1n7Ozl-h-PxkNEK6reFBfsMLMB97k",
};

// Hosted MP4 export server (Render). Local dev always uses http://localhost:5050 instead.
window.__EXPORT_BASE = "";  // e.g. https://agentopus-export.onrender.com — set after the Render deploy
