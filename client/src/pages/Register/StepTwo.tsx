import { motion } from "framer-motion";

import { Formula } from "@/types/global";
import GlobeImg from "../../assets/images/register.png";
import RadioButtons, { Radio } from "../../components/RadioButtons";
import { Button } from "../../components/ui/button";
import StepBackButton from "../../components/StepBackButton";

type StepTwoProps = {
  radios: Radio[];
  selectedFormula: Formula;
  handleChangeFormula: (value: Formula) => void;
  handleGoBackInStep: () => void;
};

export const StepTwo = ({
  radios,
  selectedFormula,
  handleChangeFormula,
  handleGoBackInStep,
}: StepTwoProps) => {
  return (
    <motion.div
      key={2}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      exit={{ x: -300, opacity: 0 }}
      className="relative flex flex-col pt-8 items-center px-5 w-full"
    >
      <StepBackButton onClick={handleGoBackInStep} />
      <img src={GlobeImg} className="w-48" />
      <h2 className="text-xl font-bold my-8">Sélectionnez votre formule</h2>
      <RadioButtons
        radios={radios}
        selectedFormula={selectedFormula}
        onChange={(value) => handleChangeFormula(value as Formula)}
        defaultValue="free"
      />
      <p className="text-sm text-center mt-7">
        {selectedFormula === "partner"
          ? "Enregistrez votre entreprise, et créez des challenges en formant des équipes avec vos collaborateurs !"
          : "Participez à des challenges fun et écolo avec vos amis !"}
      </p>
      <Button type="submit" className="w-full mt-7">
        {selectedFormula === "partner" ? "Suivant" : "Je m'inscris"}
      </Button>
    </motion.div>
  );
};
