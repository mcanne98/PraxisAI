"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContact } from "@/app/actions";
import { idleState } from "@/lib/forms/types";
import { interestAreas, organizationSizes } from "@/lib/validation/options";
import {
  AntiSpamFields,
  Checkbox,
  DeliveryNotice,
  FormStatusMessage,
  FormValuesProvider,
  SelectField,
  SubmitButton,
  TextArea,
  TextField,
  fieldError,
} from "./fields";

export function ContactForm({ deliveryEnabled }: { deliveryEnabled: boolean }) {
  const [state, action] = useActionState(submitContact, idleState);
  const err = (n: string) => fieldError(state, n);

  if (state.status === "success") {
    return <FormStatusMessage state={state} />;
  }

  return (
    <FormValuesProvider state={state}>
      <form key={JSON.stringify(state)} action={action} noValidate className="relative space-y-6" aria-describedby="contact-required-note">
        <DeliveryNotice enabled={deliveryEnabled} />
        <p id="contact-required-note" className="text-sm text-ink-muted">
          Fields marked{" "}
          <span aria-hidden className="text-red-700">
            *
          </span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField name="fullName" label="Full name" required autoComplete="name" maxLength={120} error={err("fullName")} />
          <TextField name="email" type="email" label="Business email" required autoComplete="email" maxLength={254} error={err("email")} />
          <TextField
            name="organization"
            label="Organization"
            required
            autoComplete="organization"
            maxLength={160}
            error={err("organization")}
          />
          <TextField name="jobTitle" label="Job title" autoComplete="organization-title" maxLength={120} error={err("jobTitle")} />
          <SelectField name="interest" label="Area of interest" required options={interestAreas} error={err("interest")} />
          <SelectField name="organizationSize" label="Organization size" options={organizationSizes} error={err("organizationSize")} />
        </div>
        <TextArea
          name="message"
          label="How can we help?"
          required
          maxLength={4000}
          hint="A few sentences on your goals or challenge is plenty. Please don’t include confidential or sensitive personal information."
          error={err("message")}
        />
        <div className="space-y-4">
          <Checkbox name="consentContact" required error={err("consentContact")}>
            I agree that Praxis Intelligence may use these details to respond to my inquiry, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-blue-ink underline underline-offset-2">
              privacy notice
            </Link>
            .{" "}
            <span className="text-red-700" aria-hidden>
              *
            </span>
          </Checkbox>
          <Checkbox name="consentMarketing">
            I would also like to receive occasional insights and updates by email. You can unsubscribe at any time. (optional)
          </Checkbox>
        </div>
        <AntiSpamFields />
        <FormStatusMessage state={state} />
        <SubmitButton className="w-full sm:w-auto">Send message</SubmitButton>
      </form>
    </FormValuesProvider>
  );
}
