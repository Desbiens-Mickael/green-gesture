import EcoActionForm from "@/components/EcoActionForm";
import {
  GetEcoActionbyIdDocument,
  useGetEcoActionbyIdQuery,
  useUpdateEcoActionMutation,
} from "@/gql/generated/schema";
import { useNavigate, useParams } from "react-router-dom";
import { EcoActionUpdateType } from "@/types/global";

const EditeEcoAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useGetEcoActionbyIdQuery({
    variables: { EcoActionId: Number(id) },
  });
  const ecoAction = data?.getEcoActionbyId;

  const [updateEcoAction] = useUpdateEcoActionMutation();

  const handleUpdate = async ({
    name,
    description,
    validationIds,
  }: EcoActionUpdateType) => {
    try {
      await updateEcoAction({
        variables: {
          updateEcoActionId: parseInt(id || "", 10),
          data: {
            name,
            description,
            validationIds,
          },
        },
        update(cache, { data }) {
          const updatedEcoAction = data?.updateEcoAction;
          if (updatedEcoAction) {
            cache.writeQuery({
              query: GetEcoActionbyIdDocument,
              variables: { EcoActionId: Number(id) },
              data: { getEcoActionbyId: updatedEcoAction },
            });
          }
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/eco-actions");
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {" "}
      <h1 className=" font-bold text-center mt-10 mb-5 text-3xl">
        Modifie ton éco-geste !
      </h1>{" "}
      <EcoActionForm
        ecoAction={ecoAction}
        handledata={handleUpdate}
        mode="update"
      />
    </>
  );
};

export default EditeEcoAction;
