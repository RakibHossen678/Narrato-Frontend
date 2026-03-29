import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/api/useAuthApi";
import { Button } from "../../components/ui/Button";
import { FormGroup } from "../../components/ui/FormGroup";
import { Input } from "../../components/ui/Input";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register.mutateAsync({ name, email, password });
    navigate("/login");
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 light:border-slate-200 light:bg-white"
    >
      <h1 className="text-2xl font-black">Create account</h1>
      <FormGroup label="Name">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormGroup>
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
          minLength={8}
        />
      </FormGroup>
      <Button type="submit" disabled={register.isPending}>
        Register
      </Button>
      <p className="text-sm text-slate-400">
        Already a member?{" "}
        <Link to="/login" className="text-teal-300">
          Sign in
        </Link>
      </p>
    </form>
  );
};
