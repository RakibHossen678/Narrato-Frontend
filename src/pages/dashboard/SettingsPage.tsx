import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "../../components/ui/Button";
import { FormGroup } from "../../components/ui/FormGroup";
import { Input } from "../../components/ui/Input";
import { useAuthStore } from "../../stores/auth.store";

export const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const [bio, setBio] = useState(user?.bio ?? "");

  if (!user || !accessToken || !refreshToken) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Settings | Narrato</title>
      </Helmet>
      <h1 className="text-3xl font-black">Profile settings</h1>
      <FormGroup label="Bio">
        <Input value={bio} onChange={(event) => setBio(event.target.value)} />
      </FormGroup>
      <Button
        type="button"
        onClick={() => setAuth({ ...user, bio }, accessToken, refreshToken)}
      >
        Save locally
      </Button>
    </div>
  );
};
