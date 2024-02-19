import React, { useState } from "react";
import { HiPhone } from "react-icons/hi";
import { TextInput } from "flowbite-react";

interface Props {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

const InputPhoneComponent: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const cleanedValue = inputValue.replace(/\D/g, "");

    let formattedValue = "";

    if (cleanedValue.length <= 2) {
      formattedValue = cleanedValue;
    } else if (cleanedValue.length <= 6) {
      formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length <= 10) {
      formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(
        2,
        6
      )}-${cleanedValue.slice(6)}`;
    } else {
      formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(
        2,
        7
      )}-${cleanedValue.slice(7, 11)}`;
    }

    const isValid = cleanedValue.length === 11 || cleanedValue.length === 10;
    onChange(formattedValue, isValid);
    setError(!isValid);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextInput
        icon={HiPhone}
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={15}
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
          Telefone inválido
        </p>
      )}
    </div>
  );
};

export default InputPhoneComponent;
