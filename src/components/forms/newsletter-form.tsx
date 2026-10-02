"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

type State = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
  demo?: boolean;
};

export function NewsletterForm({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setState({ status: "error", message: parsed.error.issues[0].message });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as {
        ok: boolean;
        demo?: boolean;
        message?: string;
      };
      if (!res.ok || !data.ok)
        throw new Error(data.message || "Something went wrong.");
      setState({ status: "success", demo: data.demo, message: data.message });
      setEmail("");
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  const dark = tone === "dark";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("w-full", className)}
      aria-describedby="newsletter-status"
    >
      <label
        htmlFor="newsletter-email"
        className={cn("eyebrow mb-3 block", dark ? "text-stone-400" : "")}
      >
        Newsletter
      </label>
      <div
        className={cn(
          "flex items-center rounded-full border p-1 pl-4 transition-colors",
          dark
            ? "border-paper/20 focus-within:border-paper/60"
            : "border-stone-300 focus-within:border-ink",
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.de"
          autoComplete="email"
          required
          aria-invalid={state.status === "error"}
          className={cn(
            "h-10 min-w-0 flex-1 bg-transparent text-sm outline-none",
            dark
              ? "text-paper placeholder:text-stone-500"
              : "text-ink placeholder:text-stone-400",
          )}
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          aria-label="Subscribe"
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full transition-colors",
            dark
              ? "bg-paper text-ink hover:bg-white"
              : "bg-ink text-paper hover:bg-ink-3",
          )}
        >
          {state.status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : state.status === "success" ? (
            <Check className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 text-[13px]",
          state.status === "error"
            ? "text-accent"
            : dark
              ? "text-stone-400"
              : "text-stone-500",
        )}
      >
        {state.status === "success"
          ? state.demo
            ? "Demo mode: the address was validated but no subscription was created. Configure NEWSLETTER_ENDPOINT to go live."
            : "Thanks — check your inbox to confirm."
          : state.status === "error"
            ? state.message
            : "Product updates and studio notes, a few times a year. No tracking pixels."}
      </p>
    </form>
  );
}
