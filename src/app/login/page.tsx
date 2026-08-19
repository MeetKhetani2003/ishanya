"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await login(formData);
    },
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="w-full max-w-md p-8 bg-[#101010] border border-ivory/10">
        <h1 className="display text-3xl text-ivory mb-2">Admin Portal</h1>
        <p className="nav-type text-ivory/40 mb-8">Sign in to manage your content.</p>

        <form action={formAction} className="space-y-6">
          <label className="block">
            <span className="eyebrow text-ivory/40">Username</span>
            <input
              type="text"
              name="username"
              required
              className="mt-2 w-full border border-ivory/12 bg-[#1a1a1a] px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold"
            />
          </label>
          
          <label className="block">
            <span className="eyebrow text-ivory/40">Password</span>
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full border border-ivory/12 bg-[#1a1a1a] px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold"
            />
          </label>

          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {state.error}
            </div>
          )}

          <button
            disabled={pending}
            className="w-full border border-gold/60 px-8 py-3 nav-type text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
