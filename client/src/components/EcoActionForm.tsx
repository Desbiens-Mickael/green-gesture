import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomSelectMultiple from "@/components/CustomSelectMultiple";
import { zodResolver } from "@hookform/resolvers/zod";
import { EcoActionType, EcoActionUpdateType } from "@/types/global";
import {
  GetUserEcoActionsDocument,
  useDeleteEcoActionMutation,
} from "@/gql/generated/schema";
import { useNavigate } from "react-router-dom";

interface EcoActionFormProps {
  ecoActionId?: number;
  ecoAction?: EcoActionType;
  handledata: (values: EcoActionUpdateType) => Promise<void>;
  mode?: "create" | "update";
}

const EcoActionForm = ({
  ecoActionId,
  ecoAction,
  handledata,
  mode = "create",
}: EcoActionFormProps) => {
  const navigate = useNavigate();
  const [deleteEcoAction] = useDeleteEcoActionMutation({
    refetchQueries: [GetUserEcoActionsDocument],
  });

  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Le nom doit faire plus de 3 caractères")
      .max(150, "Le nom doit faire moins de 150 caractères"),
    description: z
      .string()
      .min(2, "La description doit faire plus de 2 caractères"),
    validationIds: z
      .array(z.number())
      .min(4, "Vous devez sélectionner au minimum 4 validations")
      .max(4, "Vous ne pouvez pas sélectionner plus de 4 validations"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ecoAction?.name || "",
      description: ecoAction?.description || "",
      validationIds: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await handledata(values);

      const toastMsg =
        mode === "create" ? "Éco-geste crée" : "Éco-geste modifié";
      toast.success(toastMsg);
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  const handleRemoveEcoAction = async () => {
    try {
      const confirm = window.confirm("Voulez-vous supprimer cette action ?");
      if (!confirm || ecoActionId === undefined) return;
      await deleteEcoAction({
        variables: {
          ecoActionId,
        },
      });
      toast.success("Éco-geste supprimé");
      navigate("/eco-actions");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 max-w-3xl mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nettoyer la plage - Un éco-geste pour sauver nos océans"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Ma super description..." {...field} />
                </FormControl>
                <FormDescription>
                  Explique le but de ton éco-action et comment les utilisateurs
                  peuvent y participer.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validationIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <CustomSelectMultiple
                    field={field}
                    validations={ecoAction?.validations}
                  />
                </FormControl>
                <FormDescription>
                  Sélectionne les différents points à gagner pour cette
                  éco-action.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <Button type="submit" className="w-full">
              {mode === "create" ? "Créer" : "Modifier"}
            </Button>
            {mode === "update" && (
              <Button
                type="button"
                className="w-full"
                variant="destructive"
                onClick={handleRemoveEcoAction}
              >
                Supprimer
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default EcoActionForm;
