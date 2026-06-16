import {
  CheckboxField,
  Combobox,
  DatePicker,
  FormField,
  Input,
  NativeSelect,
  RadioGroup,
  Select,
  SwitchField,
  Textarea
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryGrid, StorySurface } from "../../story-helpers/story-layout"

const serviceTypes = [
  { value: "cadastro", label: "Cadastro" },
  { value: "visita", label: "Visita técnica" },
  { value: "orientacao", label: "Orientação" }
]

const producers = [
  { value: "joao", label: "João da Silva", description: "CPF: 000.000.000-00" },
  { value: "maria", label: "Maria dos Santos", description: "CPF: 111.111.111-11" },
  { value: "ana", label: "Ana Paiva", description: "Comunidade Malacacheta" }
]

const meta = {
  title: "Forms/Required Fields",
  parameters: {
    layout: "padded"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StoryGrid>
      <StorySurface>
        <FormField label="Nome completo" required>
          <Input placeholder="Nome do produtor" />
        </FormField>
      </StorySurface>

      <StorySurface>
        <FormField label="CPF" helperText="Informe somente números." required>
          <Input inputMode="numeric" placeholder="000.000.000-00" />
        </FormField>
      </StorySurface>

      <StorySurface>
        <FormField label="Localidade" required>
          <NativeSelect
            placeholder="Selecione"
            options={[
              { value: "boa-vista", label: "Boa Vista" },
              { value: "mucajai", label: "Mucajaí" }
            ]}
          />
        </FormField>
      </StorySurface>

      <StorySurface>
        <FormField label="Tipo de atendimento" required>
          <Select placeholder="Selecione" options={serviceTypes} />
        </FormField>
      </StorySurface>

      <StorySurface>
        <FormField label="Produtor atendido" required>
          <Combobox
            placeholder="Selecione o produtor"
            searchPlaceholder="Buscar produtor..."
            options={producers}
          />
        </FormField>
      </StorySurface>

      <StorySurface>
        <FormField label="Data do atendimento" required>
          <DatePicker />
        </FormField>
      </StorySurface>

      <StorySurface>
        <FormField label="Canal preferencial" required>
          <RadioGroup
            options={[
              { value: "email", label: "E-mail" },
              { value: "phone", label: "Telefone" }
            ]}
          />
        </FormField>
      </StorySurface>

      <StorySurface>
        <FormField label="Observações técnicas" required>
          <Textarea placeholder="Descreva o contexto do atendimento" />
        </FormField>
      </StorySurface>

      <StorySurface>
        <CheckboxField
          label="Aceito os termos"
          description="Confirmação obrigatória."
          required
        />
      </StorySurface>

      <StorySurface>
        <SwitchField
          label="Cadastro ativo"
          description="Ativa o registro para novas operações."
          required
        />
      </StorySurface>
    </StoryGrid>
  )
}
