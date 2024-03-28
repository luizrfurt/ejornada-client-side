import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { HiIdentification } from "react-icons/hi";
import { cnpj } from "cpf-cnpj-validator";

interface Props {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

const InputCnpjComponent: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, "");
    const formattedCnpj = formatCnpj(cleanedValue);
    const isValid = cnpj.isValid(cleanedValue);

    setError(!isValid);
    onChange(formattedCnpj, isValid);
  };
  
  const formatCnpj = (cnpj: string): string => {
    if (!cnpj) {
      return '';
    }
    return cnpj
      .replace(/\D/g, "")
      .slice(0, 14)
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2");
  };
  
  return (
    <div style={{ position: "relative" }}>
      <TextInput
        icon={HiIdentification}
        type="text"
        value={formatCnpj(value)}
        onChange={handleChange}
        maxLength={18}
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
          CNPJ inválido
        </p>
      )}
    </div>
  );
};

export default InputCnpjComponent;
