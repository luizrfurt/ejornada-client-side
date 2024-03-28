import React, { useState } from 'react';
import NavbarComponent from '@/components/NavbarComponent';

const ToastPage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => {
    setShowToast(!showToast);
    if (!showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  return (
    <div>
      <button onClick={toggleToast}>Toggle toast</button>
      <NavbarComponent/>
    </div>
  );
};

export default ToastPage;
