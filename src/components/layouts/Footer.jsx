import { Link } from "react-router";

const Footer = () => {
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
              Account
            </h4>
            <div className="mt-2 space-y-1 text-sm">
              <Link
                to="/login"
                className="block text-slate-300 hover:text-cyan-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-slate-300 hover:text-cyan-200"
              >
                Register
              </Link>
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
