import type { AnyFieldApi, AnyFormApi } from "@tanstack/react-form"
import * as React from "react"

import { cn } from "../utils/cn"
import { Label, type LabelProps } from "./label"

type ReactFormApi = AnyFormApi & {
  Field: unknown
}

type FormContextValue = {
  form: ReactFormApi
}

type FormFieldContextValue = {
  field: AnyFieldApi
  name: string
}

type FormItemContextValue = {
  id: string
}

const FormContext = React.createContext<FormContextValue | null>(null)
const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)
const FormItemContext = React.createContext<FormItemContextValue | null>(null)

function useFormFieldContext() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)

  if (!fieldContext) {
    throw new Error("Form field components must be used inside <FormFieldController>.")
  }

  const fieldId = itemContext?.id ?? fieldContext.name
  const descriptionId = `${fieldId}-description`
  const messageId = `${fieldId}-message`
  const errors = fieldContext.field.state.meta.errors
  const error = errors.find(Boolean)

  return {
    ...fieldContext,
    fieldId,
    descriptionId,
    messageId,
    error,
    hasError: Boolean(error)
  }
}

function getErrorMessage(error: unknown): string | undefined {
  if (!error) {
    return undefined
  }

  if (typeof error === "string") {
    return error
  }

  if (Array.isArray(error)) {
    return getErrorMessage(error.find(Boolean))
  }

  if (typeof error === "object" && "message" in error) {
    return String(error.message)
  }

  return String(error)
}

export type FormProps = {
  form: ReactFormApi
  children: React.ReactNode
}

export function Form({ form, children }: FormProps) {
  return <FormContext.Provider value={{ form }}>{children}</FormContext.Provider>
}

export type FormFieldControllerProps = {
  form?: ReactFormApi
  name: string
  validators?: unknown
  children: (field: AnyFieldApi) => React.ReactNode
}

export function FormFieldController({
  form,
  name,
  validators,
  children
}: FormFieldControllerProps) {
  const context = React.useContext(FormContext)
  const formApi = form ?? context?.form

  if (!formApi) {
    throw new Error("FormFieldController requires a form prop or a parent <Form>.")
  }

  const Field = formApi.Field as (props: {
    name: string
    validators?: unknown
    children: (field: AnyFieldApi) => React.ReactNode
  }) => ReturnType<React.FunctionComponent>

  return (
    <Field name={name} validators={validators}>
      {(field) => (
        <FormFieldContext.Provider value={{ field, name }}>
          {children(field)}
        </FormFieldContext.Provider>
      )}
    </Field>
  )
}

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>

export function FormItem({ className, ...props }: FormItemProps) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("grid gap-1.5", className)} {...props} />
    </FormItemContext.Provider>
  )
}

export type FormLabelProps = LabelProps

export function FormLabel({ className, ...props }: FormLabelProps) {
  const { fieldId, hasError } = useFormFieldContext()

  return (
    <Label
      htmlFor={fieldId}
      className={cn(hasError && "text-destructive", className)}
      {...props}
    />
  )
}

export type FormControlProps = {
  children: React.ReactElement<{
    id?: string
    "aria-describedby"?: string
    "aria-invalid"?: boolean | "true" | "false"
  }>
}

export function FormControl({ children }: FormControlProps) {
  const { fieldId, descriptionId, messageId, hasError } = useFormFieldContext()
  const describedBy = hasError ? `${descriptionId} ${messageId}` : descriptionId

  return React.cloneElement(children, {
    id: children.props.id ?? fieldId,
    "aria-describedby": [children.props["aria-describedby"], describedBy]
      .filter(Boolean)
      .join(" "),
    "aria-invalid": hasError ? true : children.props["aria-invalid"]
  })
}

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { descriptionId } = useFormFieldContext()

  return (
    <p id={descriptionId} className={cn("caption text-muted", className)} {...props} />
  )
}

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children?: React.ReactNode
}

export function FormMessage({ className, children, ...props }: FormMessageProps) {
  const { messageId, error } = useFormFieldContext()
  const body = children ?? getErrorMessage(error)

  if (!body) {
    return null
  }

  return (
    <p
      id={messageId}
      className={cn("caption text-destructive", className)}
      role="alert"
      {...props}
    >
      {body}
    </p>
  )
}

export function getInputFieldProps(field: AnyFieldApi) {
  return {
    name: field.name,
    value: field.state.value ?? "",
    onBlur: field.handleBlur,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => field.handleChange(event.target.value)
  }
}

export function getSelectFieldProps(field: AnyFieldApi) {
  return {
    value: field.state.value ?? "",
    onValueChange: (value: string) => field.handleChange(value)
  }
}

export function getCheckboxFieldProps(field: AnyFieldApi) {
  return {
    checked: Boolean(field.state.value),
    onCheckedChange: (value: boolean | "indeterminate") =>
      field.handleChange(value === true)
  }
}

export function getRadioGroupFieldProps(field: AnyFieldApi) {
  return {
    value: field.state.value ?? "",
    onValueChange: (value: string) => field.handleChange(value)
  }
}

export function getSwitchFieldProps(field: AnyFieldApi) {
  return {
    checked: Boolean(field.state.value),
    onCheckedChange: (value: boolean) => field.handleChange(value)
  }
}

export function getDatePickerFieldProps(field: AnyFieldApi) {
  return {
    value: field.state.value,
    onValueChange: (value: Date | undefined) => field.handleChange(value)
  }
}

export { useForm } from "@tanstack/react-form"
