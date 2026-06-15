import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react"
import type * as React from "react"

import { cn } from "../utils/cn"

export type AlertTone = "neutral" | "info" | "success" | "warning" | "danger"

const alertToneClasses: Record<AlertTone, string> = {
  neutral: "border-border bg-muted text-on-surface",
  info: "border-info/30 bg-info-container text-on-info-container",
  success: "border-success/30 bg-success-container text-on-success-container",
  warning: "border-warning/30 bg-warning-container text-on-warning-container",
  danger: "border-error/30 bg-error-container text-on-error-container"
}

const iconToneClasses: Record<AlertTone, string> = {
  neutral: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-error"
}

const defaultIcons: Record<AlertTone, React.ReactNode> = {
  neutral: <Info className="size-4" />,
  info: <Info className="size-4" />,
  success: <CircleCheck className="size-4" />,
  warning: <CircleAlert className="size-4" />,
  danger: <CircleX className="size-4" />
}

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone
  title?: string
  description?: string
  icon?: React.ReactNode | false
}

export function Alert({
  className,
  tone = "info",
  title,
  description,
  icon,
  children,
  ...props
}: AlertProps) {
  const currentIcon = icon === false ? null : (icon ?? defaultIcons[tone])

  return (
    <div
      role="status"
      className={cn(
        "relative flex gap-3 rounded-fds-lg border p-4",
        alertToneClasses[tone],
        className
      )}
      {...props}
    >
      {currentIcon ? (
        <div className={cn("mt-0.5 shrink-0", iconToneClasses[tone])}>{currentIcon}</div>
      ) : null}

      <div className="min-w-0 flex-1">
        {title ? <h3 className="body-sm font-semibold leading-5">{title}</h3> : null}

        {description ? (
          <p className={cn("body-sm", title && "mt-1")}>{description}</p>
        ) : null}

        {children ? (
          <div className={title || description ? "mt-2" : ""}>{children}</div>
        ) : null}
      </div>
    </div>
  )
}
