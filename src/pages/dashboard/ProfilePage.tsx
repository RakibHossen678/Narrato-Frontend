import { Helmet } from "react-helmet-async";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { useAuthStore } from "../../stores/auth.store";

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-5">
      <Helmet>
        <title>{user.name} | Profile</title>
      </Helmet>
      <Card className="flex items-center gap-4">
        <Avatar name={user.name} src={user.avatarUrl} />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-slate-400 light:text-slate-600">
            {user.email}
          </p>
          <p className="mt-2 text-sm text-slate-300 light:text-slate-700">
            {user.bio || "No bio yet."}
          </p>
        </div>
      </Card>
    </div>
  );
};
