import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetPortal = DialogPrimitive.Portal

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/45",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
})

SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const sheetVariants = cva(
  [
    "fixed z-50 gap-4 bg-popover text-popover-foreground shadow-lg",
    "transition ease-in-out",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:duration-300 data-[state=open]:duration-500"
  ],
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 border-b border-border",
          "data-[state=closed]:slide-out-to-top",
          "data-[state=open]:slide-in-from-top"
        ],
        bottom: [
          "inset-x-0 bottom-0 border-t border-border",
          "data-[state=closed]:slide-out-to-bottom",
          "data-[state=open]:slide-in-from-bottom"
        ],
        left: [
          "inset-y-0 left-0 h-full w-3/4 border-r border-border sm:max-w-sm",
          "data-[state=closed]:slide-out-to-left",
          "data-[state=open]:slide-in-from-left"
        ],
        right: [
          "inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm",
          "data-[state=closed]:slide-out-to-right",
          "data-[state=open]:slide-in-from-right"
        ]
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
)

export type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> &
  VariantProps<typeof sheetVariants> & {
    showCloseButton?: boolean
  }

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, showCloseButton = true, ...props }, ref) => {
  return (
    <SheetPortal>
      <SheetOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}

        {showCloseButton ? (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70",
              "transition-opacity hover:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-ring/35",
              "disabled:pointer-events-none"
            )}
          >
            <X className="size-4" />
            <span className="sr-only">Fechar</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
})

SheetContent.displayName = DialogPrimitive.Content.displayName

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 text-left", className)} {...props} />
}

export function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("h3 text-on-surface", className)}
      {...props}
    />
  )
})

SheetTitle.displayName = DialogPrimitive.Title.displayName

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("body-sm text-muted", className)}
      {...props}
    />
  )
})

SheetDescription.displayName = DialogPrimitive.Description.displayName
