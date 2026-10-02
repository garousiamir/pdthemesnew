"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  topic: z.enum(["sales", "support", "licensing", "press", "other"]),
  product: z.string().optional(),
  licenseKey: z.string().optional(),
  message: z.string().trim().min(20, "Please tell us a little more (at least 20 characters)."),
  consent: z.boolean().refine((v) => v, "Please agree to the privacy policy."),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values | "form", string>>;

const topics = [
  { id: "sales", label: "Pre-sales question" },
  { id: "support", label: "Support request" },
  { id: "licensing", label: "Licensing & account" },
  { id: "press", label: "Press & partnerships" },
  { id: "other", label: "Something else" },
] as const;

export function ContactForm({ products }: { products: { slug: string; name: string }[] }) {
  const params = useSearchParams();
  const fromUrl = params.get("topic");
  const defaultTopic = (["sales", "support", "licensing", "press", "other"] as const).find((t) => t === fromUrl) ?? "sales";
  const [values, setValues] = useState<Values>({ name: "", email: "", topic: defaultTopic, product: "", licenseKey: "", message: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [demo, setDemo] = useState(false);
  const [website, setWebsite] = useState("");

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const i of parsed.error.issues) next[i.path[0] as keyof Values] = i.message;
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...parsed.data, website }) });
      const data = (await res.json()) as { ok: boolean; demo?: boolean; message?: string; fieldErrors?: Record<string, string> };
      if (!res.ok || !data.ok) {
        setErrors({ ...(data.fieldErrors ?? {}), form: data.message });
        setStatus("error");
        return;
      }
      setDemo(Boolean(data.demo));
      setStatus("success");
    } catch {
      setErrors({ form: "We could not send your message. Please try again or email us directly." });
      setStatus("error");
    }
  }

  const field = "w-full rounded-md border bg-paper px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-stone-400 focus:border-ink";
  const err = (k: keyof Errors) => (errors[k] ? "border-accent" : "border-stone-300");
  const label = "mb-1.5 block text-[13px] font-medium";
  const needsLicense = values.topic === "support" || values.topic === "licensing";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-moss/30 bg-moss-soft p-8" role="status" data-testid="contact-success">
        <span className="grid size-10 place-items-center rounded-full bg-moss text-paper">
          <Check className="size-5" />
        </span>
        <h3 className="mt-4 font-display text-2xl">Message received.</h3>
        <p className="mt-2 text-[15px] text-stone-700">
          {demo ? "Demo mode: the message was validated but not delivered, because no CONTACT_ENDPOINT is configured. In production you would receive a confirmation by email." : "Thanks — we reply within one business day, usually faster for support requests with a license key."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" data-testid="contact-form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>Name</label>
          <input id="contact-name" name="name" value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "err-name" : undefined} className={cn(field, err("name"))} />
          {errors.name && <p id="err-name" className="mt-1.5 text-[13px] text-accent">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>Email</label>
          <input id="contact-email" name="email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "err-email" : undefined} className={cn(field, err("email"))} />
          {errors.email && <p id="err-email" className="mt-1.5 text-[13px] text-accent">{errors.email}</p>}
        </div>
      </div>
      <div>
        <p className={label} id="contact-topic-label">Topic</p>
        <div role="radiogroup" aria-labelledby="contact-topic-label" className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t.id} className={cn("cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors", values.topic === t.id ? "border-ink bg-ink text-paper" : "border-stone-300 hover:border-ink")}>
              <input type="radio" name="topic" value={t.id} checked={values.topic === t.id} onChange={() => set("topic", t.id)} className="sr-only" />
              {t.label}
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-product" className={label}>Product <span className="font-normal text-stone-500">(optional)</span></label>
          <select id="contact-product" name="product" value={values.product} onChange={(e) => set("product", e.target.value)} className={cn(field, "border-stone-300")}>
            <option value="">Not product-specific</option>
            {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        {needsLicense && (
          <div>
            <label htmlFor="contact-licenseKey" className={label}>License key <span className="font-normal text-stone-500">(speeds things up)</span></label>
            <input id="contact-licenseKey" name="licenseKey" value={values.licenseKey} onChange={(e) => set("licenseKey", e.target.value)} placeholder="sk_…" className={cn(field, "border-stone-300 font-mono")} />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>Message</label>
        <textarea id="contact-message" name="message" rows={6} value={values.message} onChange={(e) => set("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "err-message" : undefined} className={cn(field, err("message"), "resize-y")} placeholder="What are you building, and what do you need?" />
        {errors.message && <p id="err-message" className="mt-1.5 text-[13px] text-accent">{errors.message}</p>}
      </div>
      <div className="hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-[14px]">
          <input id="contact-consent" type="checkbox" checked={values.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={Boolean(errors.consent)} className="mt-0.5 size-4 accent-ink" />
          <span>
            I agree that PDThemes may process this message to reply to me, as described in the <Link href="/legal/privacy" className="link-underline">privacy policy</Link>.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-[13px] text-accent">{errors.consent}</p>}
      </div>
      {errors.form && <p role="alert" className="rounded-md border border-accent/40 bg-accent-soft px-4 py-3 text-[14px] text-accent-ink">{errors.form}</p>}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === "loading"} className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:bg-ink-3 disabled:opacity-60">
          {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Send message
        </button>
        <p className="text-[13px] text-stone-500">We reply within one business day.</p>
      </div>
    </form>
  );
}
