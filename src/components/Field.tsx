import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type CommonProps = {
  label: string;
  textarea?: false;
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = {
  label: string;
  textarea: true;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type FieldProps = CommonProps | TextareaProps;

export default function Field(props: FieldProps) {
  const { label, textarea } = props;
  const [focused, setFocused] = useState(false);

  const sharedClasses = [
    "w-full rounded-md bg-surface-1/60 px-3.5 py-2.5 text-sm text-fg outline-none transition-all",
    "border placeholder:text-fg-dim",
    focused
      ? "border-brand-cyan ring-[3px] ring-brand-cyan/30"
      : "border-border hover:border-border-hover",
  ].join(" ");

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-fg-muted">{label}</span>
      {textarea ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${sharedClasses} min-h-[100px] resize-y`}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClasses}
        />
      )}
    </label>
  );
}
