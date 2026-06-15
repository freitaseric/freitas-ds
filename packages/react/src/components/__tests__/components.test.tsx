import { Bell, Home } from "lucide-react"
import { describe, expect, it, vi } from "vitest"

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
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Checkbox,
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  EmptyState,
  FilterBar,
  FilterBarItem,
  FormField,
  FreitasProvider,
  getInitials,
  Input,
  Kbd,
  Label,
  NativeSelect,
  PageHeader,
  Pagination,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  SearchInput,
  Select,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNavItem,
  SidebarSection,
  Skeleton,
  Spinner,
  StatusBadge,
  Switch,
  SwitchField,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
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
  Topbar,
  UserMenu
} from "../../index"
import {
  render,
  renderWithProvider,
  screen,
  userEvent,
  waitFor,
  within
} from "../../test/test-utils"

describe("componentes estruturais", () => {
  it("aplica tema pelo FreitasProvider", async () => {
    render(
      <FreitasProvider theme={{ seed: "#16a34a", mode: "dark" }}>
        <span>Conteúdo</span>
      </FreitasProvider>
    )

    expect(screen.getByText("Conteúdo")).toBeInTheDocument()
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("data-fds-theme", "dark")
    })
  })

  it("renderiza AppShell, Topbar, Sidebar e Toolbar", () => {
    renderWithProvider(
      <AppShell
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <SidebarBrand title="Freitas" description="Design system" icon={<Home />} />
            </SidebarHeader>
            <SidebarContent>
              <SidebarSection title="Menu">
                <SidebarNavItem active>Dashboard</SidebarNavItem>
              </SidebarSection>
            </SidebarContent>
            <SidebarFooter>Rodapé</SidebarFooter>
          </Sidebar>
        }
        topbar={
          <Topbar
            start={<span>Início</span>}
            center={<span>Centro</span>}
            end={<Button>Nova ação</Button>}
          />
        }
      >
        <AppShellContent>
          <Toolbar>
            <ToolbarSection>
              <ToolbarTitle title="Relatórios" description="Indicadores gerais" />
            </ToolbarSection>
            <ToolbarActions>
              <Button variant="outline">Exportar</Button>
            </ToolbarActions>
          </Toolbar>
        </AppShellContent>
      </AppShell>
    )

    expect(screen.getByText("Freitas")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Dashboard" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Nova ação" })).toBeInTheDocument()
    expect(screen.getByText("Relatórios")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Exportar" })).toBeInTheDocument()
  })

  it("renderiza PageHeader, Card, EmptyState, Alert e ActionBar", async () => {
    const clear = vi.fn()
    const user = userEvent.setup()

    renderWithProvider(
      <>
        <PageHeader
          eyebrow="Admin"
          title="Dashboard"
          description="Visão geral"
          actions={<Button>Adicionar</Button>}
        />
        <Card>
          <CardHeader>
            <h2>Resumo</h2>
            <p>Últimos dados</p>
          </CardHeader>
          <CardContent>
            <Alert tone="success" title="Tudo certo" description="Operação concluída" />
            <EmptyState title="Nada encontrado" description="Tente outro filtro" />
          </CardContent>
          <CardFooter>Atualizado agora</CardFooter>
        </Card>
        <ActionBar selectedCount={2} onClearSelection={clear}>
          <Button>Arquivar</Button>
        </ActionBar>
      </>
    )

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveTextContent("Tudo certo")
    expect(screen.getByText("Nada encontrado")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Limpar seleção" }))
    expect(clear).toHaveBeenCalledTimes(1)
  })

  it("não renderiza ActionBar sem seleção", () => {
    const { container } = renderWithProvider(
      <ActionBar selectedCount={0}>Ações</ActionBar>
    )

    expect(container).toBeEmptyDOMElement()
  })
})

describe("componentes básicos de interface", () => {
  it("renderiza Button, Badge, StatusBadge, Avatar, Kbd, Skeleton, Spinner e Separator", () => {
    renderWithProvider(
      <>
        <Button variant="primary">Salvar</Button>
        <Button asChild variant="ghost">
          <a href="/docs">Documentação</a>
        </Button>
        <Badge tone="info">Novo</Badge>
        <StatusBadge status="completed" />
        <Avatar>
          <AvatarFallback>{getInitials("Eric Freitas")}</AvatarFallback>
        </Avatar>
        <Kbd>Ctrl</Kbd>
        <Skeleton data-testid="skeleton" />
        <Spinner />
        <Separator data-testid="separator" />
      </>
    )

    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Documentação" })).toHaveAttribute(
      "href",
      "/docs"
    )
    expect(screen.getByText("Novo")).toBeInTheDocument()
    expect(screen.getByText("Concluído")).toBeInTheDocument()
    expect(screen.getByText("EF")).toBeInTheDocument()
    expect(screen.getByText("Ctrl")).toBeInTheDocument()
    expect(screen.getByTestId("skeleton")).toHaveAttribute("aria-hidden", "true")
    expect(screen.getByRole("status", { name: "Carregando" })).toBeInTheDocument()
    expect(screen.getByTestId("separator")).toHaveAttribute("role", "none")
  })

  it("renderiza Breadcrumb e Table com semântica", () => {
    renderWithProvider(
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pedidos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <TableContainer>
          <TableScrollArea>
            <Table>
              <TableCaption>Lista de pedidos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Pedido 1</TableCell>
                  <TableCell>Aberto</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableScrollArea>
        </TableContainer>
      </>
    )

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument()
    expect(screen.getByText("Pedidos")).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Nome" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Pedido 1" })).toBeInTheDocument()
  })
})

describe("campos e formulários", () => {
  it("conecta Label, FormField, Input e Textarea com erro acessível", async () => {
    const user = userEvent.setup()

    renderWithProvider(
      <>
        <FormField
          id="name"
          label="Nome"
          helperText="Nome completo"
          required
          error="Nome obrigatório"
        >
          <Input />
        </FormField>
        <Label htmlFor="bio">Biografia</Label>
        <Textarea id="bio" placeholder="Descreva" />
      </>
    )

    const input = screen.getByLabelText("Nome *")
    expect(input).toBeRequired()
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByRole("alert")).toHaveTextContent("Nome obrigatório")

    await user.type(screen.getByLabelText("Biografia"), "Texto longo")
    expect(screen.getByLabelText("Biografia")).toHaveValue("Texto longo")
  })

  it("exercita Checkbox, CheckboxField, Switch, SwitchField e RadioGroup", async () => {
    const user = userEvent.setup()
    const radioChange = vi.fn()

    renderWithProvider(
      <>
        <Checkbox aria-label="Aceitar termos" />
        <CheckboxField label="Receber novidades" description="Por e-mail" />
        <Switch aria-label="Modo escuro" />
        <SwitchField label="Ativar alertas" description="Notificações do sistema" />
        <RadioGroup
          onValueChange={radioChange}
          defaultValue="email"
          options={[
            { value: "email", label: "E-mail" },
            { value: "sms", label: "SMS" }
          ]}
        />
      </>
    )

    await user.click(screen.getByRole("checkbox", { name: "Aceitar termos" }))
    expect(screen.getByRole("checkbox", { name: "Aceitar termos" })).toBeChecked()

    await user.click(screen.getByRole("switch", { name: "Modo escuro" }))
    expect(screen.getByRole("switch", { name: "Modo escuro" })).toBeChecked()

    await user.click(screen.getByRole("radio", { name: "SMS" }))
    expect(radioChange).toHaveBeenCalledWith("sms")
  })

  it("exercita NativeSelect, Select, Combobox e SearchInput", async () => {
    const user = userEvent.setup()
    const selectChange = vi.fn()
    const comboChange = vi.fn()
    const searchChange = vi.fn()

    renderWithProvider(
      <>
        <NativeSelect
          aria-label="Estado"
          options={[
            { value: "rr", label: "Roraima" },
            { value: "am", label: "Amazonas" }
          ]}
        />
        <Select
          placeholder="Selecione status"
          onValueChange={selectChange}
          options={[
            { value: "open", label: "Aberto" },
            { value: "closed", label: "Fechado" }
          ]}
        />
        <Combobox
          placeholder="Selecione produtor"
          searchPlaceholder="Buscar produtor"
          onValueChange={comboChange}
          options={[
            { value: "ana", label: "Ana" },
            { value: "bruno", label: "Bruno" }
          ]}
        />
        <SearchInput placeholder="Buscar item" onValueChange={searchChange} />
      </>
    )

    await user.selectOptions(screen.getByRole("combobox", { name: "Estado" }), "am")
    expect(screen.getByRole("combobox", { name: "Estado" })).toHaveValue("am")

    await user.click(screen.getAllByRole("combobox")[1])
    await user.click(await screen.findByRole("option", { name: "Fechado" }))
    expect(selectChange).toHaveBeenCalledWith("closed")

    await user.click(screen.getByRole("button", { name: "Selecione produtor" }))
    await user.type(screen.getByPlaceholderText("Buscar produtor"), "Bru")
    await user.click(await screen.findByText("Bruno"))
    expect(comboChange).toHaveBeenCalledWith("bruno")

    await user.type(screen.getByPlaceholderText("Buscar item"), "abc")
    expect(searchChange).toHaveBeenLastCalledWith("abc")
    await user.click(screen.getByRole("button", { name: "Limpar busca" }))
    expect(searchChange).toHaveBeenLastCalledWith("")
  })
})

describe("overlays e navegação", () => {
  it("abre Dialog, AlertDialog, Sheet, Popover, DropdownMenu, Tooltip e UserMenu", async () => {
    const user = userEvent.setup()
    const confirm = vi.fn()
    const profile = vi.fn()

    renderWithProvider(
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Abrir diálogo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar cadastro</DialogTitle>
              <DialogDescription>Atualize os dados.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar edição</Button>
              </DialogClose>
              <Button>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Excluir</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancelButton>Cancelar</AlertDialogCancelButton>
              <AlertDialogActionButton onClick={confirm}>
                Confirmar
              </AlertDialogActionButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button>Abrir painel</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Escolha os parâmetros.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancelar filtros</Button>
              </SheetClose>
              <Button>Aplicar</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverAnchor>Âncora</PopoverAnchor>
          <PopoverTrigger asChild>
            <Button>Mais opções</Button>
          </PopoverTrigger>
          <PopoverContent>Conteúdo do popover</PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={profile}>
                Perfil
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuCheckboxItem checked>Receber alertas</DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup value="compacto">
                <DropdownMenuRadioItem value="compacto">Compacto</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Mais</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Subitem</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip content="Notificações" delayDuration={0}>
          <Button aria-label="Abrir notificações">
            <Bell />
          </Button>
        </Tooltip>

        <UserMenu name="Eric Freitas" email="eric@example.com" />
      </>
    )

    await user.click(screen.getByRole("button", { name: "Abrir diálogo" }))
    expect(screen.getByRole("dialog", { name: "Editar cadastro" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Fechar" }))

    await user.click(screen.getByRole("button", { name: "Excluir" }))
    await user.click(await screen.findByRole("button", { name: "Confirmar" }))
    expect(confirm).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole("button", { name: "Abrir painel" }))
    expect(screen.getByRole("dialog", { name: "Filtros" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Fechar" }))

    await user.click(screen.getByRole("button", { name: "Mais opções" }))
    expect(await screen.findByText("Conteúdo do popover")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Menu" }))
    await user.click(await screen.findByRole("menuitem", { name: /Perfil/ }))
    expect(profile).toHaveBeenCalledTimes(1)

    await user.hover(screen.getByRole("button", { name: "Abrir notificações" }))
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Notificações")

    await user.click(screen.getByRole("button", { name: /Eric Freitas/ }))
    expect(
      await screen.findByRole("menuitem", { name: /Configurações/ })
    ).toBeInTheDocument()
  })

  it("exercita CommandMenu, Pagination e Tabs", async () => {
    const user = userEvent.setup()
    const runCommand = vi.fn()
    const pageChange = vi.fn()

    renderWithProvider(
      <>
        <CommandMenu
          defaultOpen
          groups={[
            {
              label: "Navegação",
              items: [
                {
                  value: "dashboard",
                  label: "Abrir dashboard",
                  description: "Ir para a página inicial",
                  shortcut: ["⌘", "K"],
                  onSelect: runCommand
                }
              ]
            }
          ]}
        />
        <Pagination page={2} totalPages={5} onPageChange={pageChange} />
        <Tabs defaultValue="dados">
          <TabsList>
            <TabsTrigger value="dados">Dados</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="dados">Conteúdo de dados</TabsContent>
          <TabsContent value="logs">Conteúdo de logs</TabsContent>
        </Tabs>
      </>
    )

    await user.type(
      screen.getByPlaceholderText("Buscar comando, tela ou ação..."),
      "dash"
    )
    await user.click(screen.getByText("Abrir dashboard"))
    expect(runCommand).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole("button", { name: "Próxima página" }))
    expect(pageChange).toHaveBeenCalledWith(3)

    await user.click(screen.getByRole("tab", { name: "Logs" }))
    expect(screen.getByText("Conteúdo de logs")).toBeInTheDocument()
  })
})

describe("filtros", () => {
  it("renderiza FilterBar e FilterBarItem", () => {
    renderWithProvider(
      <FilterBar label="Filtros ativos">
        <FilterBarItem label="Status">
          <Badge>Aberto</Badge>
        </FilterBarItem>
      </FilterBar>
    )

    expect(screen.getByText("Filtros ativos")).toBeInTheDocument()
    const filterItem = screen.getByText("Status").parentElement
    expect(filterItem).not.toBeNull()
    expect(within(filterItem as HTMLElement).getByText("Aberto")).toBeInTheDocument()
  })
})
