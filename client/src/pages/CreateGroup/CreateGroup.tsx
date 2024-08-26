import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import Lottie, { Options as LottieOptions } from "react-lottie";

import animationData from "@/assets/lotties/success.json";
import {
  useCreateGroupMutation,
  useCreateTeamsMutation,
  useSendNotificationMutation,
} from "../../gql/generated/schema";
import { Form } from "@/components/ui/form";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Progress } from "@/components/ui/progress";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NotificationTypeEnum } from "@/types/global";

const DEFAULT_GROUP = {
  name: "",
  challengeName: "",
  dates: {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  participants: [],
  ecoActionsIds: [],
  teams: [],
};

function CreateGroup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isTeamChallenge, setIsTeamChallenge] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  const [sendNotification] = useSendNotificationMutation();

  // Lottie options
  const defaultOptions: LottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {},
  };

  const formSchema = z.object({
    name: z.string().min(3, "3 caractères minium").max(150),
    challengeName: z.string().min(3, "3 caractères minium").max(150),
    dates: z
      .object({
        from: z.date(),
        to: z.date(),
      })
      .required(),
    ecoActionsIds: z
      .array(z.number())
      .min(step >= 2 ? 1 : 0, "Veuillez sélectionner au moins 1 éco-geste."),
    participants: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      )
      .min(step >= 3 ? 2 : 0, "Veuillez sélectionner au moins 2 participants."),
    teams: z
      .array(
        z.object({
          name: z.string().min(3, "3 caractères minium").max(150),
          userIds: z
            .array(z.number())
            .min(1, "Veuillez sélectionner au moins 1 participant."),
        })
      )
      .min(step >= 4 ? 2 : 0, "Veuillez composer au moins 2 équipes."),
  });

  // Queries
  const [createGroup, { loading: processing }] = useCreateGroupMutation();
  const [createTeams, { loading: processingTeams }] = useCreateTeamsMutation();

  const { currentUser } = useCurrentUser();

  const isPartner = currentUser?.subscriptionType === "partner";
  const maxSteps = isTeamChallenge ? 4 : 3;
  const progressValue = (100 / maxSteps) * step;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_GROUP,
    shouldFocusError: true,
  });

  const handleIsTeamChallenge = (value: boolean) => {
    setIsTeamChallenge(value);
  };

  const handleGoBackInStep = () => {
    setStep((prevStep) => (prevStep === 1 ? 1 : prevStep - 1));
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3 && !isTeamChallenge) {
      try {
        const createdGroup = await createGroup({
          variables: {
            data: {
              name: values.name,
              challengeName: values.challengeName,
              startDate: values.dates.from,
              endDate: values.dates.to,
              ecoActionsIds: values.ecoActionsIds,
              participants: values.participants.map(
                (participant) => participant.id
              ),
            },
          },
          // refetchQueries: [{ query: CreateGroupDocument }],
        });

        const createdGroupId = createdGroup.data?.createGroup?.id;

        // send notification to all participants
        values.participants.forEach(async (user) => {
          await sendNotification({
            variables: {
              data: {
                receiverId: user.id,
                type: NotificationTypeEnum.CHALLENGE_REQUEST,
                groupId: createdGroupId,
              },
            },
          });
        });

        setShowLottie(true);
        setTimeout(() => {
          setShowLottie(false);
          navigate(`/groups/${createdGroupId}`);
        }, 1500);

        return;
      } catch (err) {
        console.error("err", err);
      }
    } else {
      setStep(4);
    }

    if (step === 4 && isTeamChallenge) {
      try {
        const createdGroup = await createGroup({
          variables: {
            data: {
              name: values.name,
              challengeName: values.challengeName,
              startDate: values.dates.from,
              endDate: values.dates.to,
              ecoActionsIds: values.ecoActionsIds,
              participants: values.participants.map(
                (participant) => participant.id
              ),
            },
          },
          // refetchQueries: [{ query: CreateGroupDocument }],
        });

        const createdGroupId = createdGroup.data?.createGroup?.id;

        if (createdGroupId) {
          await createTeams({
            variables: {
              data: {
                groupId: createdGroupId,
                teams: values.teams,
              },
            },
          });

          // send notification to all participants
          values.participants.forEach(async (user) => {
            await sendNotification({
              variables: {
                data: {
                  receiverId: user.id,
                  type: NotificationTypeEnum.CHALLENGE_REQUEST,
                  groupId: createdGroupId,
                },
              },
            });
          });

          setShowLottie(true);
          setTimeout(() => {
            setShowLottie(false);
            navigate(`/groups/${createdGroupId}`);
          }, 1500);
        }
      } catch (err) {
        console.error("err", err);
      }
    }
  };

  return (
    <>
      {showLottie && (
        <div className="bg-white absolute inset-0 z-50">
          <Lottie options={defaultOptions} />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-3xl mx-auto"
        >
          <Progress
            value={progressValue}
            max={maxSteps}
            className="h-4 mt-2 mb-4"
          />
          {step === 1 && (
            <StepOne
              control={form.control}
              isPartner={isPartner}
              isTeamChallenge={isTeamChallenge}
              handleIsTeamChallenge={handleIsTeamChallenge}
            />
          )}
          {step === 2 && (
            <StepTwo
              control={form.control}
              handleGoBackInStep={handleGoBackInStep}
            />
          )}
          {step === 3 && (
            <StepThree
              control={form.control}
              isPartner={isPartner}
              isTeamChallenge={isTeamChallenge}
              handleGoBackInStep={handleGoBackInStep}
              friends={currentUser?.friends || []}
            />
          )}
          {step === 4 && isPartner && (
            <StepFour
              control={form.control}
              form={form}
              handleGoBackInStep={handleGoBackInStep}
              selectedParticipants={form.getValues("participants")}
            />
          )}
        </form>
      </Form>
    </>
  );
}

export default CreateGroup;
