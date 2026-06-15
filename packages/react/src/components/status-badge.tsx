import { Badge, type BadgeProps } from "./badge"

export type StatusBadgeStatus =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "canceled"
  | "draft"
  | "blocked"
  | "archived"

const statusConfig: Record<
  StatusBadgeStatus,
  {
    label: string
    tone: NonNullable<BadgeProps["tone"]>
  }
> = {
  active: {
    label: "Ativo",
    tone: "success"
  },
  inactive: {
    label: "Inativo",
    tone: "neutral"
  },
  pending: {
    label: "Pendente",
    tone: "warning"
  },
  completed: {
    label: "Concluído",
    tone: "success"
  },
  canceled: {
    label: "Cancelado",
    tone: "danger"
  },
  draft: {
    label: "Rascunho",
    tone: "info"
  },
  blocked: {
    label: "Bloqueado",
    tone: "danger"
  },
  archived: {
    label: "Arquivado",
    tone: "secondary"
  }
}

export type StatusBadgeProps = Omit<BadgeProps, "tone"> & {
  status: StatusBadgeStatus
  label?: string
  tone?: BadgeProps["tone"]
}

export function StatusBadge({
  status,
  label,
  tone,
  variant = "soft",
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge tone={tone ?? config.tone} variant={variant} {...props}>
      {label ?? config.label}
    </Badge>
  )
}
