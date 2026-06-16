import * as ToastPrimitive from "@radix-ui/react-toast"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"

export type ToastTone = "default" | "success" | "warning" | "info" | "danger" | "error"

const toneClasses: Record<Exclude<ToastTone, "error">, string> = {
  default: "border-border bg-popover text-popover-foreground",
  success: "border-success/30 bg-success-container text-on-success-container",
  warning: "border-warning/30 bg-warning-container text-on-warning-container",
  info: "border-info/30 bg-info-container text-on-info-container",
  danger: "border-error/30 bg-error-container text-on-error-container"
}

function normalizeTone(tone: ToastTone = "default") {
  return tone === "error" ? "danger" : tone
}

export const ToastProvider = ToastPrimitive.Provider
export const ToastAction = ToastPrimitive.Action

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex max-h-screen w-full flex-col-reverse gap-2 p-4",
        "sm:inset-auto sm:bottom-4 sm:right-4 sm:max-w-sm",
        className
      )}
      {...props}
    />
  )
})

ToastViewport.displayName = ToastPrimitive.Viewport.displayName

export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  tone?: ToastTone
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, tone = "default", role, ...props }, ref) => {
  const currentTone = normalizeTone(tone)
  const semanticRole =
    role ?? (currentTone === "danger" || currentTone === "warning" ? "alert" : "status")

  return (
    <ToastPrimitive.Root
      ref={ref}
      role={semanticRole}
      className={cn(
        "group pointer-events-auto relative grid w-full gap-2 overflow-hidden rounded-fds-lg border p-4 pr-11 shadow-lg",
        "transition-all duration-200",
        "data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
        "data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full",
        "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-80",
        "sm:data-[state=open]:slide-in-from-right-full",
        toneClasses[currentTone],
        className
      )}
      {...props}
    />
  )
})

Toast.displayName = ToastPrimitive.Root.displayName

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn("body-sm font-semibold leading-5", className)}
      {...props}
    />
  )
})

ToastTitle.displayName = ToastPrimitive.Title.displayName

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn("body-sm opacity-90", className)}
      {...props}
    />
  )
})

ToastDescription.displayName = ToastPrimitive.Description.displayName

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(
  (
    { className, "aria-label": ariaLabel = "Fechar notificação", children, ...props },
    ref
  ) => {
    return (
      <ToastPrimitive.Close
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          "absolute right-3 top-3 rounded-sm opacity-75 transition-opacity hover:opacity-100",
          "focus:outline-none focus:ring-2 focus:ring-ring/35",
          "disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {children ?? <X aria-hidden="true" className="size-4" />}
      </ToastPrimitive.Close>
    )
  }
)

ToastClose.displayName = ToastPrimitive.Close.displayName
