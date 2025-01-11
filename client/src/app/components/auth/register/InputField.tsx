interface InputFieldProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconSrc: string;
  autoComplete: string;
}

export default function InputField({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  iconSrc,
  autoComplete,
}: InputFieldProps) {
  return (
    <span className="w-full h-12 flex items-center border border-secondary-gray rounded-lg p-3 bg-secondary-white">
      {iconSrc.length > 1 ? (
        <img src={iconSrc} alt="Icon" className="mr-2 mt-2 select-none" />
      ) : null}
      <input
        autoComplete={autoComplete}
        id={id}
        className="h-12 focus:outline-none bg-transparent w-full"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </span>
  );
}
