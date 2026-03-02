import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, id, label, name, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <label className="flex w-full flex-col gap-2" htmlFor={inputId}>
        {label ? <span className="text-sm font-medium text-zinc-700">{label}</span> : null}
        <input
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950",
            error && "border-red-400 focus:border-red-500",
            className,
          )}
          {...props}
        />
        {error ? (
          <span className="text-sm text-red-500">{error}</span>
        ) : helperText ? (
          <span className="text-sm text-zinc-500">{helperText}</span>
        ) : null}
      </label>
    );
  },
);

Input.displayName = "Input";
