import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/85">
      <div className="narrato-shell py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-black text-slate-900">Narrato</h3>
            <p className="mt-2 text-sm text-slate-600">
              A modern social blogging platform for writers, thinkers, and
              developers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Explore
            </h4>
            <div className="mt-2 space-y-1 text-sm">
              <Link to="/" className="block text-slate-700 hover:text-teal-800">
                Home
              </Link>
              <Link
                to="/about"
                className="block text-slate-700 hover:text-teal-800"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-slate-700 hover:text-teal-800"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Account
            </h4>
            <div className="mt-2 space-y-1 text-sm">
              <Link
                to="/login"
                className="block text-slate-700 hover:text-teal-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-slate-700 hover:text-teal-800"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
          Copyright {new Date().getFullYear()} Narrato. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
