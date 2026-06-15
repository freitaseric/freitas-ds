import {
  ActionBar,
  Alert,
  AlertDialog,
  AlertDialogActionButton,
  AlertDialogCancelButton,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AppShell,
  AppShellContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CheckboxField,
  Combobox,
  CommandMenu,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  EmptyState,
  FilterBar,
  FilterBarItem,
  FormField,
  FreitasProvider,
  Input,
  Kbd,
  NativeSelect,
  PageHeader,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  SearchInput,
  Select,
  Separator,
  Skeleton,
  Spinner,
  StatusBadge,
  SwitchField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toolbar,
  ToolbarActions,
  ToolbarSection,
  ToolbarTitle,
  Tooltip,
  UserMenu
} from "@freitas-ds/react"
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
  Users
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  attendances,
  groupedProducers,
  organizationTypes,
  personTypes,
  producers,
  serviceTypes,
  statusOptions
} from "./data/demo-data"
import { DemoSidebar } from "./layout/demo-sidebar"
import { DemoTopbar } from "./layout/demo-topbar"
import { comboboxActionButton } from "./lib/demo-helpers"

export function App() {
  const [seed, setSeed] = useState("#2563eb")
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [page, setPage] = useState(2)

  const [attendanceQuery, setAttendanceQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedCount, setSelectedCount] = useState(2)

  const [commandOpen, setCommandOpen] = useState(false)

  const commandGroups = [
    {
      label: "Navegação",
      items: [
        {
          value: "dashboard",
          label: "Dashboard",
          description: "Ir para a visão geral do sistema.",
          icon: <LayoutDashboard className="size-4" />,
          keywords: ["início", "home", "painel"],
          onSelect: () => alert("Abrir Dashboard")
        },
        {
          value: "produtores",
          label: "Produtores",
          description: "Consultar e gerenciar produtores rurais.",
          icon: <Users className="size-4" />,
          keywords: ["cadastro", "pessoa", "rural"],
          onSelect: () => alert("Abrir Produtores")
        },
        {
          value: "atendimentos",
          label: "Atendimentos",
          description: "Listar protocolos e visitas técnicas.",
          icon: <FileText className="size-4" />,
          keywords: ["protocolo", "visita", "técnica"],
          onSelect: () => alert("Abrir Atendimentos")
        },
        {
          value: "relatorios",
          label: "Relatórios",
          description: "Visualizar indicadores e exportações.",
          icon: <BarChart3 className="size-4" />,
          keywords: ["dados", "indicadores", "exportar"],
          onSelect: () => alert("Abrir Relatórios")
        }
      ]
    },
    {
      label: "Ações rápidas",
      items: [
        {
          value: "novo-atendimento",
          label: "Novo atendimento",
          description: "Criar um novo registro de atendimento.",
          icon: <Plus className="size-4" />,
          shortcut: ["N", "A"],
          keywords: ["criar", "registrar", "protocolo"],
          onSelect: () => alert("Criar novo atendimento")
        },
        {
          value: "novo-produtor",
          label: "Novo produtor",
          description: "Cadastrar um novo produtor rural.",
          icon: <Plus className="size-4" />,
          shortcut: ["N", "P"],
          keywords: ["cadastro", "pessoa", "cpf"],
          onSelect: () => alert("Criar novo produtor")
        }
      ]
    },
    {
      label: "Sistema",
      items: [
        {
          value: "configuracoes",
          label: "Configurações",
          description: "Abrir preferências e parâmetros do sistema.",
          icon: <Settings className="size-4" />,
          shortcut: ["⌘", ","],
          keywords: ["preferências", "ajustes"],
          onSelect: () => alert("Abrir Configurações")
        }
      ]
    }
  ]

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCommandShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"

      if (!isCommandShortcut) {
        return
      }

      event.preventDefault()
      setCommandOpen((current) => !current)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const filteredAttendances = attendances.filter((attendance) => {
    const query = attendanceQuery.trim().toLowerCase()

    const matchesQuery =
      !query ||
      attendance.id.toLowerCase().includes(query) ||
      attendance.producer.toLowerCase().includes(query) ||
      attendance.location.toLowerCase().includes(query) ||
      attendance.type.toLowerCase().includes(query)

    const matchesStatus = statusFilter === "todos" || attendance.status === statusFilter

    return matchesQuery && matchesStatus
  })

  return (
    <FreitasProvider theme={{ seed, mode }}>
      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        groups={commandGroups}
        placeholder="Buscar tela, ação ou configuração..."
      />
      <AppShell
        sidebar={<DemoSidebar />}
        topbar={<DemoTopbar onOpenCommand={() => setCommandOpen(true)} />}
      >
        <AppShellContent>
          <PageHeader
            eyebrow="FREITAS DS / v0.1"
            title="Design system plug-and-play"
            description="Componentes prontos, tipografia semântica e tokens flexíveis. A aplicação define a identidade visual por seed ou manualmente."
            actions={
              <>
                <Button>Nova tela</Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Ações</Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Projeto</DropdownMenuLabel>

                    <DropdownMenuItem>
                      Duplicar tela
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      Exportar
                      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem tone="danger">Excluir tela</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            }
          />

          <Card>
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="h3">Tema dinâmico</h2>
                  <p className="body-sm text-muted">
                    Troque a seed color e alterne entre tema claro e escuro.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="body-sm text-muted" htmlFor="seed">
                    Seed
                  </label>

                  <input
                    id="seed"
                    type="color"
                    value={seed}
                    onChange={(event) => setSeed(event.target.value)}
                    className="h-9 w-12 cursor-pointer rounded-fds-md border border-input bg-transparent"
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setMode((current) => (current === "light" ? "dark" : "light"))
                    }
                  >
                    {mode === "light" ? "Tema escuro" : "Tema claro"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">NAVEGAÇÃO</p>
              <h2 className="h2">Tabs e menus de ação</h2>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Visão geral</TabsTrigger>
                  <TabsTrigger value="forms">Formulários</TabsTrigger>
                  <TabsTrigger value="data">Dados</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="rounded-fds-lg border border-border p-4">
                    <h3 className="h3">Visão geral</h3>
                    <p className="mt-2 body-sm text-muted">
                      Use Tabs para alternar áreas relacionadas sem sair da página.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="forms">
                  <div className="rounded-fds-lg border border-border p-4">
                    <h3 className="h3">Formulários</h3>
                    <p className="mt-2 body-sm text-muted">
                      Inputs, selects, comboboxes, checkboxes, radios e switches.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="data">
                  <div className="rounded-fds-lg border border-border p-4">
                    <h3 className="h3">Dados</h3>
                    <p className="mt-2 body-sm text-muted">
                      Tabelas, status badges e paginação para dashboards administrativos.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Mais opções</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Exemplo</DropdownMenuLabel>
                  <DropdownMenuItem>Editar seção</DropdownMenuItem>
                  <DropdownMenuItem>Copiar link</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem tone="danger">Remover seção</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">OVERLAY</p>
              <h2 className="h2">Dialog, AlertDialog, Tooltip e Popover</h2>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Cadastro rápido</Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo produtor</DialogTitle>
                      <DialogDescription>
                        Cadastre rapidamente um produtor para continuar o atendimento.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                      <FormField label="Nome completo" required>
                        <Input placeholder="Ex: João da Silva" />
                      </FormField>

                      <FormField label="CPF">
                        <Input placeholder="000.000.000-00" />
                      </FormField>

                      <FormField label="Localidade">
                        <Input placeholder="Ex: Serra Grande 1" />
                      </FormField>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>

                      <Button>Salvar produtor</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="danger">Excluir atendimento</Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir atendimento?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Essa ação não pode ser desfeita. O atendimento será removido da
                        listagem e não ficará disponível para consulta.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancelButton>Cancelar</AlertDialogCancelButton>

                      <AlertDialogActionButton>Sim, excluir</AlertDialogActionButton>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Filtros rápidos</Button>
                  </PopoverTrigger>

                  <PopoverContent align="start">
                    <div className="grid gap-4">
                      <div>
                        <h3 className="body-sm font-semibold">Filtros</h3>
                        <p className="caption text-muted">
                          Ajuste a visualização dos atendimentos.
                        </p>
                      </div>

                      <FormField label="Status">
                        <Select
                          placeholder="Selecione o status"
                          options={[
                            { value: "todos", label: "Todos" },
                            {
                              value: "pendentes",
                              label: "Pendentes"
                            },
                            {
                              value: "concluidos",
                              label: "Concluídos"
                            }
                          ]}
                        />
                      </FormField>

                      <Button size="sm">Aplicar filtros</Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Tooltip content="Esse botão mostra uma dica contextual">
                  <Button variant="outline">Passe o mouse</Button>
                </Tooltip>
              </div>
            </CardContent>

            <CardFooter>
              <Button>Salvar alterações</Button>
              <Button variant="outline">Cancelar</Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <p className="caption mono text-muted">COMPONENTE</p>
                <h2 className="h3">Button</h2>
              </CardHeader>

              <CardContent>
                <p className="body-sm text-muted">
                  Botões usam papéis semânticos, não cores fixas.
                </p>
              </CardContent>

              <CardFooter>
                <Button>Salvar</Button>
                <Button variant="outline">Cancelar</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <p className="caption mono text-muted">TEMA</p>
                <h2 className="h3">Seed color</h2>
              </CardHeader>

              <CardContent>
                <p className="body-sm text-muted">
                  Troque a cor acima e veja o sistema inteiro reagir sem alterar os
                  componentes.
                </p>
              </CardContent>

              <CardFooter>
                <Button variant="secondary">Secundário</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <p className="caption mono text-muted">TIPOGRAFIA</p>
                <h2 className="h3">Classes</h2>
              </CardHeader>

              <CardContent>
                <p className="body-sm text-muted">
                  Títulos e textos usam classes como .h1, .h2, .body, .caption e .mono.
                </p>
              </CardContent>

              <CardFooter>
                <Button variant="tertiary">Ver padrão</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">FORMULÁRIOS</p>
              <h2 className="h2">Campos com acessibilidade integrada</h2>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Nome completo"
                  helperText="Informe o nome completo do produtor."
                  required
                >
                  <Input placeholder="Ex: João da Silva" />
                </FormField>

                <FormField label="CPF" error="CPF inválido">
                  <Input placeholder="000.000.000-00" />
                </FormField>

                <FormField
                  label="Localidade"
                  helperText="Ex: Serra Grande 1, Taboca, Confiança 2."
                >
                  <Input placeholder="Digite a localidade" />
                </FormField>

                <FormField label="Observações">
                  <Textarea placeholder="Digite informações adicionais do atendimento..." />
                </FormField>
              </div>
            </CardContent>

            <CardFooter>
              <Button>Salvar cadastro</Button>
              <Button variant="outline">Cancelar</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">SELECTS</p>
              <h2 className="h2">Seleção simples e seleção com busca</h2>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Tipo de organização"
                  helperText="Use NativeSelect para listas pequenas, fixas e simples."
                >
                  <NativeSelect
                    placeholder="Selecione o tipo"
                    options={organizationTypes}
                  />
                </FormField>

                <FormField
                  label="Tipo de atendimento"
                  helperText="Use Select para listas simples com visual customizado."
                >
                  <Select placeholder="Selecione o atendimento" options={serviceTypes} />
                </FormField>

                <FormField
                  label="Produtor atendido"
                  helperText="Use Combobox para busca por nome, CPF ou localidade."
                  className="md:col-span-2"
                >
                  <Combobox
                    placeholder="Selecione o produtor"
                    searchPlaceholder="Buscar por nome, CPF ou localidade..."
                    emptyMessage="Nenhum produtor encontrado."
                    options={producers}
                    actions={
                      <button
                        type="button"
                        className={comboboxActionButton()}
                        onClick={() => {
                          alert("Aqui você abriria o cadastro rápido de produtor.")
                        }}
                      >
                        + Cadastrar novo produtor
                      </button>
                    }
                  />
                </FormField>

                <FormField
                  label="Produtor por região"
                  helperText="O Combobox também pode agrupar opções."
                  className="md:col-span-2"
                >
                  <Combobox
                    placeholder="Selecione por região"
                    searchPlaceholder="Buscar produtor dentro das regiões..."
                    emptyMessage="Nenhum produtor encontrado nessa busca."
                    options={groupedProducers}
                    actions={
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          className={comboboxActionButton()}
                          onClick={() => {
                            alert("Aqui você abriria a tela de produtores.")
                          }}
                        >
                          Ver produtores
                        </button>

                        <button
                          type="button"
                          className={comboboxActionButton("text-primary")}
                          onClick={() => {
                            alert("Aqui você cadastraria um novo produtor.")
                          }}
                        >
                          Novo produtor
                        </button>
                      </div>
                    }
                  />
                </FormField>
              </div>
            </CardContent>

            <CardFooter>
              <Button>Confirmar atendimento</Button>
              <Button variant="outline">Limpar</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">CONTROLES</p>
              <h2 className="h2">Checkbox, radio e switch</h2>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="grid gap-4">
                  <CheckboxField
                    label="Produtor possui CAF/DAP"
                    description="Marque quando o produtor possuir cadastro ativo."
                    name="hasDocument"
                  />

                  <CheckboxField
                    label="Atendimento prioritário"
                    description="Use para casos urgentes ou encaminhados oficialmente."
                    name="priority"
                  />
                </div>

                <div className="grid gap-4">
                  <SwitchField
                    label="Receber notificações"
                    description="Permite enviar avisos sobre andamento do atendimento."
                    name="notifications"
                  />

                  <SwitchField
                    label="Cadastro ativo"
                    description="Cadastros inativos não aparecem nas buscas principais."
                    name="active"
                    defaultChecked
                  />
                </div>

                <FormField
                  label="Tipo de pessoa"
                  helperText="RadioGroup serve para escolhas exclusivas."
                  className="md:col-span-2"
                >
                  <RadioGroup options={personTypes} defaultValue="fisica" />
                </FormField>
              </div>
            </CardContent>

            <CardFooter>
              <Button>Salvar controles</Button>
              <Button variant="outline">Cancelar</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">FEEDBACK</p>
              <h2 className="h2">Estados, avisos e carregamento</h2>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5">
                <div className="flex flex-wrap gap-2">
                  <Badge>Neutro</Badge>
                  <Badge tone="primary">Primário</Badge>
                  <Badge tone="success">Ativo</Badge>
                  <Badge tone="warning">Pendente</Badge>
                  <Badge tone="info">Informação</Badge>
                  <Badge tone="danger">Erro</Badge>
                  <Badge tone="primary" variant="outline">
                    Outline
                  </Badge>
                  <Badge tone="success" variant="solid">
                    Solid
                  </Badge>
                </div>

                <div className="grid gap-3">
                  <Alert
                    tone="success"
                    title="Cadastro salvo"
                    description="As informações do produtor foram registradas com sucesso."
                  />

                  <Alert
                    tone="warning"
                    title="Documento pendente"
                    description="O produtor ainda precisa apresentar a documentação complementar."
                  />

                  <Alert
                    tone="danger"
                    title="Erro no formulário"
                    description="Revise os campos obrigatórios antes de continuar."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-fds-lg border border-border p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Spinner tone="primary" />
                      <span className="body-sm font-medium">Carregando dados</span>
                    </div>

                    <div className="grid gap-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>

                  <EmptyState
                    title="Nenhum atendimento encontrado"
                    description="Quando novos atendimentos forem cadastrados, eles aparecerão nesta área."
                    action={<Button variant="outline">Criar atendimento</Button>}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button>
                <Spinner size="sm" />
                Processar
              </Button>

              <Button variant="outline">Ver detalhes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">LISTAGEM</p>
              <h2 className="h2">Toolbar, filtros, tabela e ações em lote</h2>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4">
                <Toolbar>
                  <ToolbarSection>
                    <ToolbarTitle
                      title="Atendimentos"
                      description="Busque, filtre e gerencie registros administrativos."
                    />

                    <SearchInput
                      value={attendanceQuery}
                      onValueChange={setAttendanceQuery}
                      placeholder="Buscar protocolo, produtor ou localidade..."
                      containerClassName="w-full sm:max-w-sm"
                    />
                  </ToolbarSection>

                  <ToolbarActions>
                    <Button variant="outline">Exportar</Button>
                    <Button>Novo atendimento</Button>
                  </ToolbarActions>
                </Toolbar>

                <FilterBar>
                  <FilterBarItem label="Status">
                    <NativeSelect
                      placeholder="Selecione"
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      options={statusOptions}
                    />
                  </FilterBarItem>

                  <FilterBarItem label="Período">
                    <Select
                      placeholder="Selecione"
                      defaultValue="mes-atual"
                      options={[
                        { value: "hoje", label: "Hoje" },
                        { value: "semana", label: "Esta semana" },
                        { value: "mes-atual", label: "Mês atual" },
                        { value: "ano", label: "Ano atual" }
                      ]}
                    />
                  </FilterBarItem>

                  <FilterBarItem label="Técnico">
                    <Combobox
                      placeholder="Selecione"
                      searchPlaceholder="Buscar técnico..."
                      options={[
                        {
                          value: "eric",
                          label: "Eric Freitas",
                          description: "Técnico responsável"
                        },
                        {
                          value: "maria",
                          label: "Maria Santos",
                          description: "Equipe de campo"
                        }
                      ]}
                    />
                  </FilterBarItem>

                  <FilterBarItem label="Localidade">
                    <SearchInput placeholder="Ex: Taboca" clearable={false} />
                  </FilterBarItem>
                </FilterBar>

                <ActionBar
                  selectedCount={selectedCount}
                  onClearSelection={() => setSelectedCount(0)}
                >
                  <Button variant="outline" size="sm">
                    Arquivar
                  </Button>

                  <Button variant="danger" size="sm">
                    Excluir
                  </Button>
                </ActionBar>

                <TableContainer>
                  <TableScrollArea>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Protocolo</TableHead>
                          <TableHead>Produtor</TableHead>
                          <TableHead>Localidade</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {filteredAttendances.length > 0 ? (
                          filteredAttendances.map((attendance) => (
                            <TableRow key={attendance.id}>
                              <TableCell>
                                <span className="mono caption text-muted">
                                  {attendance.id}
                                </span>
                              </TableCell>

                              <TableCell>
                                <span className="font-medium">{attendance.producer}</span>
                              </TableCell>

                              <TableCell>{attendance.location}</TableCell>

                              <TableCell>{attendance.type}</TableCell>

                              <TableCell>
                                <StatusBadge status={attendance.status} />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <EmptyState
                                title="Nenhum atendimento encontrado"
                                description="Tente ajustar a busca ou alterar os filtros aplicados."
                                action={
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setAttendanceQuery("")
                                      setStatusFilter("todos")
                                    }}
                                  >
                                    Limpar filtros
                                  </Button>
                                }
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableScrollArea>
                </TableContainer>

                <Pagination page={page} totalPages={8} onPageChange={setPage} />
              </div>
            </CardContent>

            <CardFooter>
              <Button>Novo atendimento</Button>
              <Button variant="outline">Exportar dados</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">UTILITÁRIOS</p>
              <h2 className="h2">Avatar, UserMenu, Kbd e Separator</h2>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Usuário" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>

                  <Avatar>
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>

                  <Avatar className="size-12">
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>

                  <Separator orientation="vertical" className="h-10" />

                  <div className="flex flex-wrap items-center gap-1.5">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                    <span className="caption text-muted">Abrir comando rápido</span>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap items-center gap-3">
                  <UserMenu
                    name="Eric Freitas"
                    email="ericfreitas371@gmail.com"
                    items={[
                      {
                        label: "Perfil",
                        icon: <User className="size-4" />
                      },
                      {
                        label: "Configurações",
                        icon: <Settings className="size-4" />,
                        shortcut: "⌘,"
                      }
                    ]}
                    footerItems={[
                      {
                        label: "Sair",
                        icon: <LogOut className="size-4" />,
                        tone: "danger"
                      }
                    ]}
                  />

                  <p className="body-sm text-muted">
                    O UserMenu combina Avatar, Button e DropdownMenu.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button variant="outline">Ver padrões</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <p className="caption mono text-muted">COMMAND MENU</p>
              <h2 className="h2">Busca global e ações rápidas</h2>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4">
                <p className="body-sm text-muted">
                  Use o Command Menu para navegar entre telas e executar ações rápidas sem
                  depender apenas da sidebar.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" onClick={() => setCommandOpen(true)}>
                    <Search className="size-4" />
                    Abrir Command Menu
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <Kbd>Ctrl</Kbd>
                    <Kbd>K</Kbd>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AppShellContent>
      </AppShell>
    </FreitasProvider>
  )
}
