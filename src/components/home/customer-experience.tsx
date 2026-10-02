"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, CreditCard, Download, KeyRound, LifeBuoy, RefreshCw, RotateCw } from "lucide-react";
import { experience } from "@/content/pages/home";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Tabbed walkthrough of the Freemius purchase and licensing experience.
 * The previews are illustrative UI compositions, not screenshots of Freemius.
 */
export function CustomerExperience() {
  const [active, setActive] = useState(0);
  const tab = experience.tabs[active];

  return (
    <section className="bg-paper-2/60 section" aria-labelledby="experience-title" id="experience">
      <div className="container-x">
        <SectionHeading eyebrow={experience.eyebrow} title={<span id="experience-title">{experience.title}</span>} lead={experience.lead} />
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4">
            <div role="tablist" aria-orientation="vertical" aria-label="Customer experience topics" className="no-scrollbar -mx-(--gutter) flex gap-1 overflow-x-auto px-(--gutter) lg:mx-0 lg:flex-col lg:px-0">
              <LayoutGroup id="experience-tabs">
                {experience.tabs.map((t, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      id={`exp-tab-${t.id}`}
                      aria-selected={on}
                      aria-controls={`exp-panel-${t.id}`}
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn("relative flex shrink-0 items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-medium transition-colors lg:rounded-md", on ? "text-ink" : "text-stone-500 hover:text-ink")}
                    >
                      {on && <motion.span layoutId="exp-pill" className="absolute inset-0 rounded-full bg-paper shadow-card lg:rounded-md" transition={{ duration: 0.35, ease }} />}
                      <span className="relative font-mono text-[11px] text-stone-400">0{i + 1}</span>
                      <span className="relative">{t.label}</span>
                    </button>
                  );
                })}
              </LayoutGroup>
            </div>
            <p className="mt-6 hidden max-w-[36ch] text-[13px] leading-relaxed text-stone-500 lg:block">{experience.note}</p>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <div className="grid overflow-hidden rounded-xl border border-stone-200 bg-paper shadow-card md:grid-cols-[1fr_1.2fr]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab.id}
                  id={`exp-panel-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`exp-tab-${tab.id}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease }}
                  className="flex flex-col justify-center p-6 sm:p-8"
                >
                  <p className="eyebrow">{tab.label}</p>
                  <h3 className="mt-3 font-display text-2xl sm:text-3xl">{tab.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-stone-600">{tab.body}</p>
                </motion.div>
              </AnimatePresence>
              <div className="relative min-h-[300px] border-t border-stone-200 bg-paper-2 p-5 md:border-l md:border-t-0 sm:p-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={tab.ui} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }} transition={{ duration: 0.35, ease }} className="h-full">
                    <Preview kind={tab.ui} />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.12em] text-stone-400">Illustrative preview</span>
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-stone-500 lg:hidden">{experience.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-md border border-stone-200 bg-paper p-4 text-[13px] shadow-card", className)}>{children}</div>;
}

function Row({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-stone-200 py-2 first:border-t-0">
      <span className="text-stone-500">{label}</span>
      <span className={cn("flex items-center gap-1.5 font-medium", ok && "text-moss")}>
        {ok && <Check className="size-3.5" />} {value}
      </span>
    </div>
  );
}

function Preview({ kind }: { kind: string }) {
  switch (kind) {
    case "checkout":
      return (
        <Card>
          <div className="flex items-center justify-between">
            <span className="font-medium">Kontor — Studio</span>
            <span className="font-mono">$109 / year</span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded border border-stone-200 px-3 py-2 text-stone-500"><CreditCard className="size-4" /> •••• •••• •••• 4242</div>
          <div className="mt-2 grid grid-cols-2 gap-2"><span className="rounded border border-stone-200 px-3 py-2 text-stone-500">MM / YY</span><span className="rounded border border-stone-200 px-3 py-2 text-stone-500">CVC</span></div>
          <Row label="Sites" value="5" />
          <Row label="VAT (DE 19%)" value="handled" ok />
          <button type="button" tabIndex={-1} className="mt-3 w-full rounded-full bg-ink py-2.5 font-medium text-paper">Pay $109</button>
        </Card>
      );
    case "licenses":
      return (
        <Card>
          <div className="flex items-center gap-2 font-medium"><KeyRound className="size-4 text-stone-500" /> sk_••••••••••3f9a</div>
          <Row label="studio-site.de" value="Active" ok />
          <Row label="client-one.com" value="Active" ok />
          <Row label="staging.client-one.com" value="Deactivate" />
          <Row label="Slots used" value="3 of 5" />
        </Card>
      );
    case "downloads":
      return (
        <Card>
          {["2.1.0 · current", "2.0.4", "2.0.3", "1.9.2"].map((v, i) => (
            <div key={v} className="flex items-center justify-between border-t border-stone-200 py-2 first:border-t-0"><span className={cn("font-mono", i === 0 && "font-medium")}>{v}</span><span className="flex items-center gap-1 text-stone-500"><Download className="size-3.5" /> zip</span></div>
          ))}
        </Card>
      );
    case "updates":
      return (
        <Card className="bg-[#f0f0f1]">
          <p className="font-semibold">WordPress Updates</p>
          <div className="mt-3 rounded border border-stone-300 bg-white p-3">
            <div className="flex items-center justify-between"><span className="font-medium">Kontor</span><span className="rounded bg-sun-soft px-2 py-0.5 font-mono text-[11px]">2.0.4 → 2.1.0</span></div>
            <p className="mt-1 text-stone-500">New Clay style variation, careers feed block, iOS header fix.</p>
            <button type="button" tabIndex={-1} className="mt-3 flex items-center gap-1.5 rounded bg-[#2271b1] px-3 py-1.5 font-medium text-white"><RefreshCw className="size-3.5" /> Update now</button>
          </div>
        </Card>
      );
    case "renewals":
      return (
        <Card>
          <div className="flex items-center gap-2 font-medium"><RotateCw className="size-4 text-stone-500" /> Subscription</div>
          <Row label="Plan" value="Studio · annual" />
          <Row label="Next renewal" value="18 Sep 2027" />
          <Row label="Reminder" value="7 days before" ok />
          <Row label="Auto-renew" value="On · cancel any time" />
        </Card>
      );
    default:
      return (
        <Card>
          <div className="flex items-center gap-2 font-medium"><LifeBuoy className="size-4 text-stone-500" /> New support request</div>
          <div className="mt-3 rounded border border-stone-200 px-3 py-2 text-stone-500">License key · sk_••••3f9a</div>
          <div className="mt-2 rounded border border-stone-200 px-3 py-2 text-stone-500">Site URL · https://studio-site.de</div>
          <div className="mt-2 rounded border border-stone-200 px-3 py-6 text-stone-400">Describe the issue…</div>
          <Row label="Priority" value="Active license" ok />
        </Card>
      );
  }
}
