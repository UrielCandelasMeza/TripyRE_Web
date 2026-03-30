import { useToast } from "../context/ToastContext";
import Toast from "./Toast";

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            type={toast.type}
            text={toast.text}
            onClose={removeToast}
          />
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
