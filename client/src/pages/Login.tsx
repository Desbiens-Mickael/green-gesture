import { Link, useNavigate } from "react-router-dom";

import RegisterImg from "../assets/images/register.png";
import { useLoginMutation } from "../gql/generated/schema";
import client from "../gql/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string(),
});

const DEFAULT_USER = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const [loginUser] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_USER,
    shouldFocusError: true,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await loginUser({
        variables: {
          loginData: { email: values.email, password: values.password },
        },
      });
      window.localStorage.setItem("gg_logged", "isLogged");
      form.clearErrors();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("err", err);
      form.setError("root", {
        type: "string",
        message: "Identifiants invalides",
      });
    } finally {
      client.resetStore();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center h-full justify-center max-w-xl mx-auto"
      >
        <>
          <img src={RegisterImg} className="w-[260px]" />
          <h1 className="text-2xl font-bold my-3">Se connecter</h1>
          <div className="space-y-5 w-full px-8">
            <CustomFormField
              control={form.control}
              label="Votre adresse email"
              name="email"
              type="email"
              placeholder="tom-sawyer@gmail.com"
              data-testid="email"
            />
            <CustomFormField
              control={form.control}
              label="Votre mot de passe"
              name="password"
              type="password"
              placeholder="mot de passe"
              data-testid="password"
              isPassword={true}
            />
            {form.formState.errors.root && (
              <p className="text-xs text-destructive text-center">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button type="submit" className="w-full">
              Je me connecte
            </Button>
          </div>
          <p className="text-xs">
            Pas encore inscrit ?
            <Button
              asChild={true}
              className="text-xs p-1"
              type="button"
              variant="link"
            >
              <Link to="/register">S'inscrire</Link>
            </Button>
          </p>
        </>
      </form>
    </Form>
  );
}

export default Login;
