/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference path="../../worker-configuration.d.ts" />

import type { SupabaseClient, Session } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare global {
  namespace App {
    interface Locals extends Runtime {
      supabase: SupabaseClient<Database>;
      session: Session | null;
    }
  }
}
