import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", title = "") => {
    const id = ++toastId;
    const autoTitle =
      type === "success" ? "Success" : type === "error" ? "Error" : "Info";

    setToasts((prev) => [
      ...prev,
      { id, message, type, title: title || autoTitle },
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 4000);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const success = useCallback(
    (msg, title) => addToast(msg, "success", title),
    [addToast]
  );
  const error = useCallback(
    (msg, title) => addToast(msg, "error", title),
    [addToast]
  );
  const info = useCallback(
    (msg, title) => addToast(msg, "info", title),
    [addToast]
  );

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type} ${toast.exiting ? "exiting" : ""}`}
          >
            <span className="toast-icon">{icons[toast.type]}</span>
            <div className="toast-body">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
            <div className="toast-progress" />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
