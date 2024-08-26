import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { useState } from "react";
import { Button } from "./ui/button";

type PaymentFormProps = {
  triggerSubmit: () => void;
  isFormValid: boolean;
};

const PaymentForm = ({ triggerSubmit, isFormValid }: PaymentFormProps) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [success, setSuccess] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();
  const handlePayment = async () => {
    if (!stripe || !elements || !isFormValid) {
      return;
    }

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/register",
      },
      redirect: "if_required",
    });

    if (error) {
      setSuccess(false);
      setMessage(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setSuccess(true);
      setMessage("Paiement effectué avec succès");
      triggerSubmit();
      setProcessing(false);
      return;
    }

    setSuccess(false);
    setMessage("Etat de paiement inattendu");
    setProcessing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-5">
      <PaymentElement />
      {processing ? (
        <p className="text-center mt-2">Paiement en cours...</p>
      ) : (
        <Button
          onClick={handlePayment}
          disabled={processing}
          className="w-full mt-8"
          type="submit"
          form="register-form"
        >
          Je procède au paiement
        </Button>
      )}
      {message && (
        <p
          className={`text-center font-bold ${
            success ? "text-green-500" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PaymentForm;
