import { useRef, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import {
  useCreateUserMutation,
  useIsEmailAlreadyUsedQuery,
  UsersDocument,
} from "../../gql/generated/schema";
import { Radio } from "../../components/RadioButtons";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { Form } from "../../components/ui/form";
import { Formula, User } from "../../types/global";

const DEFAULT_USER: Omit<User, "id"> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: undefined,
  role: "",
  subscriptionType: "",
};

const DEFAULT_FORMULA_RADIOS: Radio[] = [
  {
    id: "free",
    label: "Gratuit",
    type: "primary",
    value: "free",
  },
  {
    id: "partner",
    label: "Partenaire",
    type: "secondary",
    value: "partner",
    hint: "4,99€/mois",
  },
];

function Register() {
  const [createUser, { loading: processing }] = useCreateUserMutation();

  const [step, setStep] = useState<number>(1);
  const [selectedFormula, setSelectedFormula] = useState<Formula>("free");

  const formSchema = z.object({
    firstName: z.string().min(2, "2 caractères minimum").max(50),
    lastName: z.string().min(2, "2 caractères minimum").max(50),
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, "8 caractères minimum").max(50),
    company:
      step < 3
        ? z.string().max(50).optional()
        : z.string().min(2, "2 caractères minimum").max(50),
    subscriptionId: step < 3 ? z.string().optional() : z.string(),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_USER,
    shouldFocusError: true,
  });

  const { refetch: refetchIsEmailAlreadyUsed } = useIsEmailAlreadyUsedQuery({
    variables: { email: form.getValues("email") },
  });

  const handleGoBackInStep = () => {
    setStep((prevStep) => (prevStep === 1 ? 1 : prevStep - 1));
  };

  const handleChangeFormula = (value: Formula) => {
    setSelectedFormula(value);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step === 1) {
      const { data: isEmailAlreadyUsedData } = await refetchIsEmailAlreadyUsed({
        email: values.email,
      });

      const isEmailAlreadyUsed = isEmailAlreadyUsedData?.isEmailAlreadyUsed;

      isEmailAlreadyUsed
        ? form.setError("email", {
            type: "string",
            message: "Cet email existe déjà.",
          })
        : setStep(2);
      return;
    }

    if (step === 2 && selectedFormula === "partner") {
      setStep(3);
      return;
    }

    if (step === 3 && values.company === undefined) {
      form.setError("company", {
        type: "string",
        message: "Veuillez renseigner le nom de votre entreprise",
      });
      return;
    }

    if (step > 1) {
      try {
        await createUser({
          variables: {
            data: {
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
              company: values.company,
              subscriptionType: selectedFormula,
              subscriptionId: values.subscriptionId,
            },
          },
          refetchQueries: [{ query: UsersDocument }],
        });
        form.clearErrors();
        window.location.reload();
      } catch (err) {
        console.error("err", err);
        form.setError("email", {
          type: "string",
          message: "email déjà utilisé",
        });
        setStep(1);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={1}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="lg:h-full"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col items-center lg:justify-center h-full pb-10 max-w-xl mx-auto"
            ref={formRef}
            id="register-form"
          >
            {step === 1 && <StepOne control={form.control} />}
            {step === 2 && (
              <StepTwo
                radios={DEFAULT_FORMULA_RADIOS}
                selectedFormula={selectedFormula}
                handleChangeFormula={handleChangeFormula}
                handleGoBackInStep={handleGoBackInStep}
              />
            )}
            {step === 3 && (
              <StepThree
                control={form.control}
                email={form.getValues("email")}
                firstName={form.getValues("firstName")}
                lastName={form.getValues("lastName")}
                triggerSubmit={triggerSubmit}
                handleGoBackInStep={handleGoBackInStep}
              />
            )}
          </form>
        </Form>
      </motion.div>
    </AnimatePresence>
  );
}

export default Register;
