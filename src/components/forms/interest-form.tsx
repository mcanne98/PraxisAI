"use client";

import { useActionState } from "react";
import { submitInterest } from "@/app/actions";
import { idleState } from "@/lib/forms/types";
import {
  AntiSpamFields,
  Checkbox,
  DeliveryNotice,
  FormStatusMessage,
  FormValuesProvider,
  SelectField,
  SubmitButton,
  TextField,
  fieldError,
} from "./fields";

export function InterestForm({ topics, deliveryEnabled }: { topics: readonly string[]; deliveryEnabled: boolean }) {
  const [state, action] = useActionState(submitInterest, idleState);
  const err = (n: string) => fieldError(state, n);

  if (state.status === "success") return <FormStatusMessage state={state} />;

  return (
    <FormValuesProvider state={state}>
      <form key={JSON.stringify(state)} action={action} noValidate className="relative space-y-5">
        <DeliveryNotice enabled={deliveryEnabled} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="email" type="email" label="Email" required autoComplete="email" error={err("email")} />
          <SelectField name="topic" label="I’m interested in" required options={topics} error={err("topic")} />
        </div>
        <Checkbox name="consentMarketing" required error={err("consentMarketing")}>
          Yes, email me when new Praxis Academy courses, workshops or resources become available. I can unsubscribe at any time.{" "}
          <span className="text-red-700" aria-hidden>
            *
          </span>
        </Checkbox>
        <AntiSpamFields />
        <FormStatusMessage state={state} />
        <SubmitButton>Register interest</SubmitButton>
      </form>
    </FormValuesProvider>
  );
}
