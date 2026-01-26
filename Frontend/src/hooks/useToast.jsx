import { useState } from "react";

const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (type, message, duration = 2500) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return { toast, showToast, hideToast: () => setToast(null) };
};

export default useToast;
