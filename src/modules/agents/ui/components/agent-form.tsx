"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BotIcon, SparklesIcon } from "lucide-react";
import { type FormEvent, useCallback } from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { agentsInsertSchema } from "@/modules/agents/schemas";
import type { AgentType } from "@/modules/agents/types";
import { useTRPC } from "@/trpc/client";

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentType;
};

function selectSubmitButtonState(state: {
  canSubmit: boolean;
  isSubmitting: boolean;
}) {
  return [state.canSubmit, state.isSubmitting] as const;
}

function getSubmitLabel(isEditMode: boolean, isPending: boolean) {
  if (isEditMode) {
    return "Save changes";
  }

  return isPending ? "Creating agent..." : "Create agent";
}

export function AgentForm(props: Props) {
  const { initialValues } = props;
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const isEdit = !!initialValues?.id;

  const createAgent = useMutation(trpc.agents.create.mutationOptions());

  const form = useForm({
    defaultValues: {
      instructions: initialValues?.instructions ?? "",
      name: initialValues?.name ?? "",
    },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        return;
      }

      await createAgent.mutateAsync(value);
      await queryClient.invalidateQueries({
        queryKey: trpc.agents.getMany.queryKey(),
      });
      props.onSuccess?.();
    },
    validators: {
      onSubmit: agentsInsertSchema,
    },
  });

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      await form.handleSubmit();
    },
    [form]
  );
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <form.Subscribe selector={selectSubmitButtonState}>
        {([canSubmit, isSubmitting]) => {
          const isPending = createAgent.isPending || isSubmitting;

          return (
            <>
              <form.Field name="name">
                {(field) => {
                  const displayName = field.state.value.trim() || "Your agent";

                  return (
                    <div className="flex flex-col gap-5">
                      <div className="relative flex items-center gap-4 overflow-hidden rounded-xl border bg-muted/30 p-4">
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-primary/10 to-transparent" />
                        <GeneratedAvatar
                          className="relative size-16 rounded-2xl shadow-sm ring-4 ring-background"
                          seed={displayName}
                          variant="botttsNeutral"
                        />
                        <div className="relative min-w-0 flex-1">
                          <Badge className="mb-2 gap-1" variant="secondary">
                            {isEdit ? (
                              <BotIcon aria-hidden="true" />
                            ) : (
                              <SparklesIcon aria-hidden="true" />
                            )}
                            {isEdit ? "Current identity" : "Live preview"}
                          </Badge>
                          <p className="truncate font-semibold text-base">
                            {displayName}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Your agent’s identity
                          </p>
                        </div>
                      </div>
                      <Field data-invalid={field.state.meta.errors.length > 0}>
                        <FieldLabel htmlFor={field.name}>Agent name</FieldLabel>
                        <Input
                          aria-invalid={field.state.meta.errors.length > 0}
                          autoComplete="off"
                          disabled={isPending}
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          // biome-ignore lint/performance/noJsxPropsBind: This adapts the input event to the field's value.
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          placeholder="e.g. Math tutor"
                          value={field.state.value}
                        />
                        <FieldDescription>
                          Pick a name that makes your agent easy to recognize.
                        </FieldDescription>
                        {!field.state.meta.isValid && (
                          <FieldError role="alert">
                            {field.state.meta.errors
                              .map((error) =>
                                typeof error === "string"
                                  ? error
                                  : error?.message
                              )
                              .filter((message): message is string =>
                                Boolean(message)
                              )
                              .join(", ")}
                          </FieldError>
                        )}
                      </Field>
                    </div>
                  );
                }}
              </form.Field>
              <FieldGroup>
                <form.Field name="instructions">
                  {(field) => (
                    <Field data-invalid={field.state.meta.errors.length > 0}>
                      <FieldLabel htmlFor={field.name}>Instructions</FieldLabel>
                      <Textarea
                        aria-invalid={field.state.meta.errors.length > 0}
                        className="min-h-32 resize-y"
                        disabled={isPending}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        // biome-ignore lint/performance/noJsxPropsBind: This adapts the textarea event to the field's value.
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="You are a helpful math assistant that can answer questions and help with assignments."
                        value={field.state.value}
                      />
                      <FieldDescription>
                        Clear instructions help your agent give more useful
                        responses.
                      </FieldDescription>
                      {!field.state.meta.isValid && (
                        <FieldError role="alert">
                          {field.state.meta.errors
                            .map((error) =>
                              typeof error === "string" ? error : error?.message
                            )
                            .filter((message): message is string =>
                              Boolean(message)
                            )
                            .join(", ")}
                        </FieldError>
                      )}
                    </Field>
                  )}
                </form.Field>
              </FieldGroup>
              {createAgent.error ? (
                <div
                  className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-destructive text-sm"
                  role="alert"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <BotIcon aria-hidden="true" className="size-4" />
                    {isEdit
                      ? "We couldn’t update your agent"
                      : "We couldn’t create your agent"}
                  </div>
                  {createAgent.error.message}
                </div>
              ) : null}
              <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                {props.onCancel ? (
                  <Button
                    disabled={isPending}
                    onClick={props.onCancel}
                    type="button"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  className="gap-2"
                  disabled={!canSubmit || isPending || isEdit}
                  type="submit"
                >
                  {isEdit ? (
                    <BotIcon aria-hidden="true" />
                  ) : (
                    <SparklesIcon aria-hidden="true" />
                  )}
                  {getSubmitLabel(isEdit, isPending)}
                </Button>
              </div>
            </>
          );
        }}
      </form.Subscribe>
    </form>
  );
}
