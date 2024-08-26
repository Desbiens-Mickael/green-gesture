import EcoActionForm from "@/components/EcoActionForm";
import {
  GetUserEcoActionsDocument,
  useCreateEcoActionMutation,
} from "@/gql/generated/schema";
import { useNavigate } from "react-router-dom";

const CreateEcoAction = () => {
  const navigate = useNavigate();
  const [createEcoAction] = useCreateEcoActionMutation();

  const handleCreate = async (values: any) => {
    try {
      await createEcoAction({
        variables: {
          data: {
            name: values.name,
            description: values.description,
            validationIds: values.validationIds,
          },
        },
        refetchQueries: [{ query: GetUserEcoActionsDocument }],
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/eco-actions");
    }
  };
  return (
    <>
      <h1 className=" font-bold text-center mt-10 mb-5 text-3xl">
        Crée ton propre éco-geste !
      </h1>
      <EcoActionForm handledata={handleCreate} />
    </>
  );
};

export default CreateEcoAction;
