import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DataTable,
  type DataTableColumn,
  DataView as FreitasDataView,
  FreitasProvider,
  Input,
  PageHeader,
  StatusBadge,
  type StatusBadgeStatus
} from "@freitas-ds/react"
import * as React from "react"

type Atendimento = {
  id: string
  produtor: string
  municipio: string
  status: StatusBadgeStatus
}

const atendimentos: Atendimento[] = [
  {
    id: "OS-1001",
    produtor: "João da Silva",
    municipio: "Boa Vista",
    status: "active"
  },
  {
    id: "OS-1002",
    produtor: "Maria dos Santos",
    municipio: "Mucajaí",
    status: "pending"
  }
]

const atendimentoColumns: Array<DataTableColumn<Atendimento>> = [
  { id: "id", header: "OS", accessor: "id", sortable: true },
  { id: "produtor", header: "Produtor", accessor: "produtor", sortable: true },
  { id: "municipio", header: "Município", accessor: "municipio" },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />
  }
]

export function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light")

  return (
    <FreitasProvider theme={{ seed: "#2563eb", mode }}>
      <main className="min-h-screen bg-surface p-6 text-on-surface">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <PageHeader
            eyebrow="Consumer Vite"
            title="Freitas DS em um app externo"
            description="Exemplo mínimo consumindo estilos e componentes pelos entrypoints públicos."
            actions={
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setMode((current) => (current === "light" ? "dark" : "light"))
                }
              >
                Usar tema {mode === "light" ? "escuro" : "claro"}
              </Button>
            }
          />

          <Card>
            <CardHeader>
              <h2 className="h3">Cadastro rápido</h2>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <label className="grid gap-1.5" htmlFor="consumer-name">
                  <span className="body-sm font-medium">Nome</span>
                  <Input id="consumer-name" placeholder="Digite seu nome" />
                </label>
                <Button type="button">Validar consumo</Button>
              </form>
            </CardContent>
          </Card>

          <FreitasDataView
            title="Atendimentos recentes"
            description="Uso mínimo de DataView e DataTable em um app consumidor."
            search={{ placeholder: "Buscar atendimento" }}
            pagination={{ page: 1, totalPages: 3 }}
          >
            <DataTable
              columns={atendimentoColumns}
              data={atendimentos}
              getRowId={(row) => row.id}
            />
          </FreitasDataView>
        </div>
      </main>
    </FreitasProvider>
  )
}
