import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/api/useAuthApi";
import { Button } from "../../components/ui/Button";
import { FormGroup } from "../../components/ui/FormGroup";
import { Input } from "../../components/ui/Input";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useLogin();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login.mutateAsync({ email, password });
    navigate("/");
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 light:border-slate-200 light:bg-white"
    >
      <h1 className="text-2xl font-black">Welcome Back</h1>
      <FormGroup label="Email">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup label="Password">
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" disabled={login.isPending}>
        Sign in
      </Button>
      <p className="text-sm text-slate-400">
        No account?{" "}
        <Link to="/register" className="text-teal-300">
          Create one
        </Link>
      </p>
    </form>
  );
};
