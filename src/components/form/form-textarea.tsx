import {
  FormBase,
  type FormControlProps,
} from "@/components/form/form-base";
import { useFieldContext } from "@/components/form/form-context";
import { Textarea } from "@/components/ui/textarea";

export function FormTextarea(props: FormControlProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Textarea
        aria-invalid={isInvalid}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        value={field.state.value}
      />
    </FormBase>
  );
}
