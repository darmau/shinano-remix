// Re-export Supabase Database/Json types from the existing app/ workspace so
// that both projects share the single source of truth during the parallel
// migration period. After Step 3 (RR7 removal) move the file in here.
export type { Database, Json } from "../../../app/types/supabase";
