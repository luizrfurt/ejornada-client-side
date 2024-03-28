import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { HiFingerPrint } from "react-icons/hi";
import { cpf } from "cpf-cnpj-validator";

interface Props {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

const InputCpfComponent: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, "");
    const isValid = cpf.isValid(cleanedValue);

    setError(!isValid);
    onChange(e.target.value, isValid);
  };

  const formatCPF = (cpf: string): string => {
    if (!cpf) return "";
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextInput
        icon={HiFingerPrint}
        type="text"
        value={formatCPF(value)}
        onChange={handleChange}
        maxLength={14}
      />
      {error && (
        <p
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "4px",
          }}
          className="text-sm text-red-500"
        >
          CPF inválido
        </p>
      )}
    </div>
  );
};

export default InputCpfComponent;
