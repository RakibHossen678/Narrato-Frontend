import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div className="grid min-h-[60vh] place-items-center text-center">
    <div className="space-y-3">
      <h1 className="text-4xl font-black">Lost in the archive</h1>
      <p className="text-slate-400">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-teal-300">
        Return to feed
      </Link>
    </div>
  </div>
);
