import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type, text) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type, text }]);
      setTimeout(() => removeToast(id), 4000);
    },
    [removeToast]
  );

  const showMessage = useCallback((text) => addToast("message", text), [addToast]);
  const showError = useCallback((text) => addToast("error", text), [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, showMessage, showError, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
