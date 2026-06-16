import {
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  Form,
  FormControl,
  FormDescription,
  FormFieldController,
  FormItem,
  FormLabel,
  FormMessage,
  getCheckboxFieldProps,
  getDatePickerFieldProps,
  getInputFieldProps,
  getRadioGroupFieldProps,
  getSelectFieldProps,
  getSwitchFieldProps,
  Input,
  NativeSelect,
  RadioGroup,
  Switch,
  Textarea,
  useForm
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { z } from "zod"

const meta = {
  title: "Forms/Form",
  parameters: {
    layout: "padded"
  }
} satisfies Meta

export default meta

type Story = StoryObj

type FormValues = {
  name: string
  notes: string
  type: string
  active: boolean
  channel: string
  newsletter: boolean
  producer: string
  scheduledAt?: Date
}

const defaultValues: FormValues = {
  name: "",
  notes: "",
  type: "",
  active: false,
  channel: "",
  newsletter: false,
  producer: "",
  scheduledAt: undefined
}

function FormShell({
  children,
  onSubmit
}: {
  children: () => React.ReactNode
  onSubmit?: (values: FormValues) => void
}) {
  const [submitted, setSubmitted] = React.useState<FormValues | null>(null)
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      setSubmitted(value)
      onSubmit?.(value)
    }
  })

  return (
    <Form form={form}>
      <form
        className="grid max-w-xl gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          form.handleSubmit()
        }}
      >
        {children()}

        <Button type="submit">Salvar</Button>

        {submitted ? (
          <p className="body-sm text-muted" role="status">
            Formulário enviado para {submitted.name || "produtor sem nome"}.
          </p>
        ) : null}
      </form>
    </Form>
  )
}

function NameField() {
  return (
    <FormFieldController
      name="name"
      validators={{
        onSubmit: z.string().min(1, "Informe o nome do produtor.")
      }}
    >
      {(field) => (
        <FormItem>
          <FormLabel required>Nome</FormLabel>
          <FormControl>
            <Input placeholder="Nome completo" {...getInputFieldProps(field)} />
          </FormControl>
          <FormDescription>Informe o nome usado no cadastro.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    </FormFieldController>
  )
}

export const BasicValidation: Story = {
  render: () => <FormShell>{() => <NameField />}</FormShell>
}

export const WithTextarea: Story = {
  render: () => (
    <FormShell>
      {() => (
        <>
          <NameField />
          <FormFieldController name="notes">
            {(field) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva detalhes do atendimento"
                    {...getInputFieldProps(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </FormFieldController>
        </>
      )}
    </FormShell>
  )
}

export const WithSelect: Story = {
  render: () => (
    <FormShell>
      {() => (
        <FormFieldController
          name="type"
          validators={{ onSubmit: z.string().min(1, "Selecione o tipo.") }}
        >
          {(field) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <NativeSelect
                  placeholder="Selecione"
                  options={[
                    { value: "familiar", label: "Agricultura familiar" },
                    { value: "empresarial", label: "Agricultura empresarial" }
                  ]}
                  {...getInputFieldProps(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>
      )}
    </FormShell>
  )
}

export const WithCheckbox: Story = {
  render: () => (
    <FormShell>
      {() => (
        <FormFieldController
          name="active"
          validators={{
            onSubmit: z.literal(true, "Confirme que o cadastro está ativo.")
          }}
        >
          {(field) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox {...getCheckboxFieldProps(field)} />
                </FormControl>
                <FormLabel>Cadastro ativo</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>
      )}
    </FormShell>
  )
}

export const WithRadioGroup: Story = {
  render: () => (
    <FormShell>
      {() => (
        <FormFieldController
          name="channel"
          validators={{ onSubmit: z.string().min(1, "Escolha um canal.") }}
        >
          {(field) => (
            <FormItem>
              <FormLabel>Canal preferencial</FormLabel>
              <FormControl>
                <RadioGroup
                  options={[
                    { value: "email", label: "E-mail" },
                    { value: "phone", label: "Telefone" }
                  ]}
                  {...getRadioGroupFieldProps(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>
      )}
    </FormShell>
  )
}

export const WithSwitch: Story = {
  render: () => (
    <FormShell>
      {() => (
        <FormFieldController name="newsletter">
          {(field) => (
            <FormItem>
              <div className="flex items-center justify-between gap-4 rounded-fds-md border border-border p-3">
                <div>
                  <FormLabel>Receber comunicados</FormLabel>
                  <FormDescription>Enviaremos avisos sobre atendimentos.</FormDescription>
                </div>
                <FormControl>
                  <Switch {...getSwitchFieldProps(field)} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>
      )}
    </FormShell>
  )
}

export const WithDatePicker: Story = {
  render: () => (
    <FormShell>
      {() => (
        <FormFieldController
          name="scheduledAt"
          validators={{
            onSubmit: z.date("Informe a data do atendimento.")
          }}
        >
          {(field) => (
            <FormItem>
              <FormLabel required>Data do atendimento</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder="Selecione a data"
                  {...getDatePickerFieldProps(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>
      )}
    </FormShell>
  )
}

export const SubmitSuccess: Story = {
  render: () => (
    <FormShell>
      {() => (
        <>
          <NameField />
          <FormFieldController
            name="producer"
            validators={{ onSubmit: z.string().min(1, "Selecione o produtor.") }}
          >
            {(field) => (
              <FormItem>
                <FormLabel>Produtor</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione o produtor"
                    searchPlaceholder="Buscar produtor"
                    options={[
                      { value: "joao", label: "João da Silva" },
                      { value: "maria", label: "Maria dos Santos" }
                    ]}
                    {...getSelectFieldProps(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </FormFieldController>
        </>
      )}
    </FormShell>
  )
}
