import {
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const rows = [
  {
    id: "OS-1021",
    producer: "João da Silva",
    service: "Visita técnica",
    status: "completed" as const
  },
  {
    id: "OS-1022",
    producer: "Maria dos Santos",
    service: "Cadastro",
    status: "pending" as const
  },
  {
    id: "OS-1023",
    producer: "Ana Paiva",
    service: "Orientação",
    status: "active" as const
  }
]

const meta = {
  title: "Data Display/Table",
  component: Table,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj

export const Attendances: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OS</TableHead>
            <TableHead>Produtor</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.producer}</TableCell>
              <TableCell>{row.service}</TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
