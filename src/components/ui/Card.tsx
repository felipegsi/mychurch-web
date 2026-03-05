import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn("rounded-3xl border border-zinc-200 bg-white shadow-sm", className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("space-y-2 p-6 pb-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLHeadingElement>>) {
  return <h3 className={cn("text-xl font-semibold text-zinc-950", className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cn("text-sm text-zinc-500", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}