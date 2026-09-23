import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { contact, profile } from "../data/portfolio";
import { cx } from "../lib/utils";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { Magnetic } from "./ui/Magnetic";
import { Reveal } from "./ui/Reveal";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const fieldClass =
  "mt-2 block w-full rounded-lg border border-line-strong bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

const STATUS_MESSAGES: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent: "Thanks, your message was sent. I'll reply by email.",
  mailto: "Your email app should open with the message filled in. If it didn't, write to me at the address on the left.",
  error: "The message could not be sent. Please email me directly at the address on the left.",
};

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // With an endpoint configured (Formspree, Getform, Web3Forms...) the message is posted there.
    if (FORM_ENDPOINT) {
      setStatus("sending");
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    // Without one, fall back to the visitor's own email app so the form still works.
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  };

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail aria-hidden="true" className="h-5 w-5" /> },
    { label: "LinkedIn", value: "linkedin.com/in/hemant-bhumireddy", href: profile.linkedin, icon: <LinkedinIcon className="h-5 w-5" />, external: true },
    { label: "GitHub", value: "github.com/hemant350", href: profile.github, icon: <GithubIcon className="h-5 w-5" />, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <h2 id="contact-title" className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {contact.heading}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{contact.body}</p>

            <ul className="mt-8 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-12 items-center gap-4 rounded-xl px-3 py-2 -mx-3 transition-colors hover:bg-surface"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-surface text-accent">
                      {link.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted">{link.label}</span>
                      <span className="block break-all text-sm font-medium group-hover:text-accent">{link.value}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex min-h-12 items-center gap-4 px-0 py-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-surface text-accent">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Location</span>
                  <span className="block text-sm font-medium">{profile.location}</span>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-2xl border bg-surface/60 p-6 sm:p-8">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium">
                  Name
                </label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required className={fieldClass} placeholder="Your name" />
              </div>
              <div className="mt-5">
                <label htmlFor="contact-email" className="text-sm font-medium">
                  Email
                </label>
                <input id="contact-email" name="email" type="email" autoComplete="email" required className={fieldClass} placeholder="you@company.com" />
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Message
                </label>
                <textarea id="contact-message" name="message" rows={5} required className={cx(fieldClass, "resize-y")} placeholder="How can I help?" />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-solid px-6 text-sm font-semibold text-on-solid shadow-[0_10px_30px_-10px_rgb(var(--glow-rgb)_/_0.75)] transition-[filter,opacity] hover:brightness-110 disabled:opacity-60"
                  >
                    <Send aria-hidden="true" className="h-4 w-4" />
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </Magnetic>
                <p role="status" aria-live="polite" className={cx("text-sm", status === "error" ? "text-red-500" : "text-muted")}>
                  {status !== "idle" && status !== "sending" ? STATUS_MESSAGES[status] : ""}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
