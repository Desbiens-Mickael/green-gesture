import { Control } from "react-hook-form";
import { Link } from "react-router-dom";

import RegisterImg from "../../assets/images/register.png";
import { Button } from "../../components/ui/button";
import CustomFormField from "../../components/CustomFormField";

type StepOneProps = {
  control: Control<
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      company?: string | undefined;
    },
    any
  >;
};

export const StepOne = ({ control }: StepOneProps) => {
  return (
    <>
      <img src={RegisterImg} className="w-[260px]" />
      <h1 className="text-2xl font-bold my-3">S'inscrire</h1>
      <div className="space-y-5 w-full px-8">
        <CustomFormField
          control={control}
          label="Votre prénom"
          name="firstName"
          placeholder="Tom"
        />
        <CustomFormField
          control={control}
          label="Votre nom"
          name="lastName"
          placeholder="Sawyer"
        />
        <CustomFormField
          control={control}
          label="Votre adresse email"
          name="email"
          type="email"
          placeholder="tom-sawyer@gmail.com"
        />
        <CustomFormField
          control={control}
          label="Votre mot de passe"
          name="password"
          type="password"
          placeholder="mot de passe"
          isPassword={true}
        />
        <Button type="submit" className="w-full">
          Suivant
        </Button>
      </div>
      <p className="text-xs">
        Déjà inscrit ?
        <Button
          asChild={true}
          className="text-xs p-1"
          type="button"
          variant="link"
        >
          <Link to="/login">Se connecter</Link>
        </Button>
      </p>
    </>
  );
};
