import { createFormHook } from "@tanstack/react-form";
import { FormCheckbox } from "@/components/form/form-checkbox";
import {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
} from "@/components/form/form-context";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { ResetButton } from "@/components/form/reset-button";
import { SubmitButton } from "@/components/form/submit-button";

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Checkbox: FormCheckbox,
    Input: FormInput,
    Select: FormSelect,
    Textarea: FormTextarea,
  },
  fieldContext,
  formComponents: {
    ResetButton,
    SubmitButton,
  },
  formContext,
});

export { useAppForm, useFieldContext, useFormContext, withForm };
