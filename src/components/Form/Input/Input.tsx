import type { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  onBlur,
  formText,
  success,
  disabled,
}: InputProps<TFieldValue>) => {
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <div className="mb-4">
      {/* Label */}
      <label className="block mb-1 font-medium text-gray-700">
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        {...register(name)}
        onBlur={onblurHandler}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-md focus:outline-none
          ${error ? "border-red-500 focus:border-red-600" : ""}
          ${success ? "border-green-500 focus:border-green-600" : ""}
          ${!error && !success ? "border-gray-300 focus:border-sky-500" : ""}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

      {/* Success */}
      {success && (
        <p className="text-green-600 text-sm mt-1">{success}</p>
      )}

      {/* Extra form text */}
      {formText && (
        <p className="text-gray-500 text-sm mt-1">{formText}</p>
      )}
    </div>
  );
};

export default Input;
