export const organizationTypes = [
  { value: "associacao", label: "Associação" },
  { value: "cooperativa", label: "Cooperativa" },
  { value: "sindicato", label: "Sindicato" },
  { value: "empresa", label: "Empresa privada" }
]

export const serviceTypes = [
  { value: "cadastro", label: "Cadastro" },
  { value: "visita-tecnica", label: "Visita técnica" },
  { value: "emissao-documento", label: "Emissão de documento" },
  { value: "orientacao", label: "Orientação" }
]

export const statusOptions = [
  { value: "todos", label: "Todos" },
  { value: "active", label: "Ativo" },
  { value: "pending", label: "Pendente" },
  { value: "completed", label: "Concluído" },
  { value: "draft", label: "Rascunho" }
]

export const personTypes = [
  {
    value: "fisica",
    label: "Pessoa física",
    description: "Produtor individual, com CPF."
  },
  {
    value: "juridica",
    label: "Pessoa jurídica",
    description: "Associação, cooperativa, empresa ou entidade com CNPJ."
  }
]

export const producers = [
  {
    value: "joao-silva",
    label: "João da Silva",
    description: "CPF: 000.000.000-00 · Serra Grande 1"
  },
  {
    value: "maria-santos",
    label: "Maria dos Santos",
    description: "CPF: 111.111.111-11 · Taboca"
  },
  {
    value: "antonio-freitas",
    label: "Antônio Freitas",
    description: "CPF: 222.222.222-22 · Confiança 2"
  },
  {
    value: "ana-paiva",
    label: "Ana Paiva",
    description: "CPF: 333.333.333-33 · Malacacheta"
  }
]

export const groupedProducers = [
  {
    label: "Serra Grande",
    options: [
      {
        value: "joao-silva",
        label: "João da Silva",
        description: "CPF: 000.000.000-00 · Serra Grande 1"
      },
      {
        value: "antonio-freitas",
        label: "Antônio Freitas",
        description: "CPF: 222.222.222-22 · Serra Grande 2"
      }
    ]
  },
  {
    label: "Comunidades indígenas",
    options: [
      {
        value: "ana-paiva",
        label: "Ana Paiva",
        description: "CPF: 333.333.333-33 · Malacacheta"
      },
      {
        value: "maria-santos",
        label: "Maria dos Santos",
        description: "CPF: 111.111.111-11 · Canauanim"
      }
    ]
  }
]

export const attendances = [
  {
    id: "ATD-2026-001",
    producer: "João da Silva",
    location: "Serra Grande 1",
    type: "Visita técnica",
    status: "completed" as const
  },
  {
    id: "ATD-2026-002",
    producer: "Maria dos Santos",
    location: "Taboca",
    type: "Cadastro",
    status: "pending" as const
  },
  {
    id: "ATD-2026-003",
    producer: "Antônio Freitas",
    location: "Confiança 2",
    type: "Orientação",
    status: "active" as const
  },
  {
    id: "ATD-2026-004",
    producer: "Ana Paiva",
    location: "Malacacheta",
    type: "Emissão de documento",
    status: "draft" as const
  }
]
