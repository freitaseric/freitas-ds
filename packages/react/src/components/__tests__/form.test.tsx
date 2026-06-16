import { describe, expect, it, vi } from "vitest"
import { z } from "zod"

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormFieldController,
  FormItem,
  FormLabel,
  FormMessage,
  getCheckboxFieldProps,
  getInputFieldProps,
  getRadioGroupFieldProps,
  getSwitchFieldProps,
  Input,
  NativeSelect,
  RadioGroup,
  Switch,
  useForm
} from "../../index"
import { renderWithProvider, screen, userEvent, waitFor } from "../../test/test-utils"

type Values = {
  name: string
  type: string
  active: boolean
  channel: string
  newsletter: boolean
}

const defaultValues: Values = {
  name: "",
  type: "",
  active: false,
  channel: "",
  newsletter: false
}

function TestForm({ onSubmit }: { onSubmit: (values: Values) => void }) {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => onSubmit(value)
  })

  return (
    <Form form={form}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          form.handleSubmit()
        }}
      >
        <FormFieldController
          name="name"
          validators={{
            onSubmit: z.string().min(1, "Informe o nome.")
          }}
        >
          {(field) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...getInputFieldProps(field)} />
              </FormControl>
              <FormDescription>Informe o nome do produtor.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>

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
                  options={[{ value: "familiar", label: "Familiar" }]}
                  {...getInputFieldProps(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>

        <FormFieldController
          name="active"
          validators={{ onSubmit: z.literal(true, "Confirme o cadastro.") }}
        >
          {(field) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox {...getCheckboxFieldProps(field)} />
                </FormControl>
                <FormLabel>Cadastro ativo</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>

        <FormFieldController
          name="channel"
          validators={{ onSubmit: z.string().min(1, "Escolha um canal.") }}
        >
          {(field) => (
            <FormItem>
              <FormLabel>Canal</FormLabel>
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

        <FormFieldController name="newsletter">
          {(field) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Switch {...getSwitchFieldProps(field)} />
                </FormControl>
                <FormLabel>Receber comunicados</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        </FormFieldController>

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  )
}

describe("Form", () => {
  it("renderiza o formulário", () => {
    renderWithProvider(<TestForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText("Nome")).toBeInTheDocument()
    expect(screen.getByText("Informe o nome do produtor.")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument()
  })

  it("exibe erro obrigatório e aria-invalid", async () => {
    const user = userEvent.setup()

    renderWithProvider(<TestForm onSubmit={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: "Salvar" }))

    expect(await screen.findByText("Informe o nome.")).toBeInTheDocument()
    expect(screen.getByLabelText("Nome")).toHaveAttribute("aria-invalid", "true")
  })

  it("FormLabel required mostra indicador obrigatório acessível", () => {
    function RequiredLabelDemo() {
      const form = useForm({
        defaultValues: { name: "" },
        onSubmit: vi.fn()
      })

      return (
        <Form form={form}>
          <FormFieldController name="name">
            {(field) => (
              <FormItem>
                <FormLabel required>Nome completo</FormLabel>
                <FormControl>
                  <Input {...getInputFieldProps(field)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </FormFieldController>
        </Form>
      )
    }

    renderWithProvider(<RequiredLabelDemo />)

    expect(screen.getByLabelText(/nome completo.*obrigatório/i)).toBeInTheDocument()
    expect(screen.getByText("Nome completo").closest("label")).toHaveTextContent(
      "Nome completo * obrigatório"
    )
    expect(screen.getByText("*")).toHaveClass("text-error")
  })

  it("envia valores válidos", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    renderWithProvider(<TestForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Nome"), "Ana Paiva")
    await user.selectOptions(screen.getByLabelText("Tipo"), "familiar")
    await user.click(screen.getByRole("checkbox", { name: "Cadastro ativo" }))
    await user.click(screen.getByRole("radio", { name: "E-mail" }))
    await user.click(screen.getByRole("switch", { name: "Receber comunicados" }))
    await user.click(screen.getByRole("button", { name: "Salvar" }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Ana Paiva",
        type: "familiar",
        active: true,
        channel: "email",
        newsletter: true
      })
    })
  })
})
