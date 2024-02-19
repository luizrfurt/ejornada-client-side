import React, { useState } from "react";

const PhoneInput: React.FC = () => {
  const [phone, setPhone] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  return (
    <div className="flowbite m-4">
      <label htmlFor="phone" className="block text-gray-700">Telefone:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={phone}
        onChange={handleChange}
        placeholder="Digite seu telefone"
        className="form-input mt-1 block w-full"
      />
      <p className="text-red-500">{phone.length < 10 ? "O telefone deve ter pelo menos 10 dígitos" : null}</p>
    </div>
  );
};

export default PhoneInput;
