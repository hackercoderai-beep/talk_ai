import {
  FormBase,
  type FormControlProps,
} from "@/components/form/form-base";
import { useFieldContext } from "@/components/form/form-context";
import { Input } from "@/components/ui/input";

type FormInputProps = FormControlProps & {
  type?: string;
  placeholder?: string;
};

export function FormInput({ type, placeholder, ...props }: FormInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Input
        aria-invalid={isInvalid}
        placeholder={placeholder}
        type={type}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        value={field.state.value}
      />
    </FormBase>
  );
}
