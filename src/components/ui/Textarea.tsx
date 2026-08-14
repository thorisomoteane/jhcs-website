import { cn } from "@/lib/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-forest-900">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-forest-900 placeholder:text-gray-400 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
