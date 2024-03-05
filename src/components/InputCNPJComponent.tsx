import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { HiOutlineIdentification } from "react-icons/hi";

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
    const isValid = isValidCnpj(cleanedValue);

    setError(!isValid);
    onChange(formattedCnpj, isValid);
  };

  const isValidCnpj = (value: string) => {
    if (value.length !== 14) return false;
    const cnpjNumbers = value.replace(/\D/g, "");
    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = Array.from(cnpjNumbers.substr(0, 12)).reduce(
      (acc, digit, index) => acc + parseInt(digit) * weights[index],
      0
    );
    const remainder = sum % 11;
    const firstDigit = remainder < 2 ? 0 : 11 - remainder;
    const firstDigitValid = parseInt(cnpjNumbers.charAt(12)) === firstDigit;
  
    if (!firstDigitValid) return false;
  
    const newWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const newSum = Array.from(cnpjNumbers.substr(0, 13)).reduce(
      (acc, digit, index) => acc + parseInt(digit) * newWeights[index],
      0
    );
    const newRemainder = newSum % 11;
    const secondDigit = newRemainder < 2 ? 0 : 11 - newRemainder;
    const secondDigitValid = parseInt(cnpjNumbers.charAt(13)) === secondDigit;
  
    return secondDigitValid;
  };
  
  
  const formatCnpj = (cnpj: string): string => {
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
        icon={HiOutlineIdentification}
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
