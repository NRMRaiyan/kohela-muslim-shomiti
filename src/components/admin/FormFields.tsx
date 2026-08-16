import { SubmitButton } from "./SubmitButton";

export function TextField({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold block mb-1.5">
        {label} {required && <span className="text-[var(--color-brick)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
      />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  required,
  rows = 4,
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold block mb-1.5">
        {label} {required && <span className="text-[var(--color-brick)]">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
      />
    </div>
  );
}

export function SelectField({
  name,
  label,
  defaultValue,
  options,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold block mb-1.5">
        {label} {required && <span className="text-[var(--color-brick)]">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-semibold">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="w-4 h-4 rounded accent-[var(--color-forest)]"
      />
      {label}
    </label>
  );
}

export function FormActions({ cancelHref }: { cancelHref: string }) {
  return (
    <div className="flex gap-3 pt-2">
      <SubmitButton />
      <a
        href={cancelHref}
        className="px-5 py-2.5 rounded-full text-sm font-semibold border border-[var(--color-sage-line)] hover:bg-[var(--color-paper-warm)]"
      >
        Cancel
      </a>
    </div>
  );
}
