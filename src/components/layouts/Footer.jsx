import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer = () => {
  const socials = [
    { label: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com" },
    { label: "Twitter", icon: FiTwitter, href: "https://twitter.com" },
    { label: "GitHub", icon: FiGithub, href: "https://github.com" },
  ];

  return (
    <footer className="mt-10 border-t border-[#26324a] bg-[#0c1425]/95">
      <div className="narrato-shell py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-black text-slate-100">Narrato</h3>
            <p className="mt-2 text-sm text-slate-300">
              A modern social blogging platform for writers, thinkers, and
              developers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Explore
            </h4>
            <div className="mt-2 space-y-1 text-sm">
              <Link to="/" className="block text-slate-300 hover:text-cyan-200">
                Home
              </Link>
              <Link
                to="/about"
                className="block text-slate-300 hover:text-cyan-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-slate-300 hover:text-cyan-200"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Connect
            </h4>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <Motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[#314560] bg-[#13223a] px-3 py-2 font-semibold text-slate-200"
                    whileHover={{ y: -2, borderColor: "#2dd4bf" }}
                    aria-label={`Open ${item.label}`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#26324a] pt-4 text-xs text-slate-400">
          Copyright {new Date().getFullYear()} Narrato. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
