import { profile } from "../data/portfolio";

export function Footer() {
  const links = [
    { label: "GitHub", href: profile.github, external: true },
    { label: "LinkedIn", href: profile.linkedin, external: true },
    { label: "Email", href: `mailto:${profile.email}`, external: false },
  ];

  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="mt-1">Built with React, TypeScript, Tailwind CSS, Motion &amp; curiosity.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
