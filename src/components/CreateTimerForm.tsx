import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const createTimerFormDataSchema = z
  .object({
    minutes: z.number().min(0).max(60),
    seconds: z.number().min(0).max(60),
  })
  .refine((arg) => {
    return arg.minutes > 0 || arg.seconds > 0;
  });

type CreateTimerFormData = z.infer<typeof createTimerFormDataSchema>;

type CreateTimerFormProps = {
  className?: string;
  onSubmit: SubmitHandler<CreateTimerFormData>;
};

function CreateTimerForm(props: CreateTimerFormProps) {
  const { register, handleSubmit } = useForm<CreateTimerFormData>({
    resolver: zodResolver(createTimerFormDataSchema),
    defaultValues: { minutes: 0, seconds: 0 },
  });
  return (
    <form className={props.className} onSubmit={handleSubmit(props.onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Create a new timer</CardTitle>
          <CardDescription>
            Enter minutes and seconds to create a timer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="input-minutes" aria-description="Minutes">
                Minutes
              </FieldLabel>
              <Input
                id="input-minutes"
                data-testid="input-minutes"
                type="number"
                {...register("minutes", { valueAsNumber: true })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-seconds" aria-description="Seconds">
                Seconds
              </FieldLabel>
              <Input
                id="input-seconds"
                data-testid="input-seconds"
                type="number"
                {...register("seconds", { valueAsNumber: true })}
              />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" data-testid="button-create">
            Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export type { CreateTimerFormProps, CreateTimerFormData };
export { CreateTimerForm, createTimerFormDataSchema };
