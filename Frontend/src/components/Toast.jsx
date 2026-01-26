import { createPortal } from "react-dom";

const Toast = ({ type = "success", message, onClose }) => {
  return createPortal(
    <div className="fixed bottom-6 right-6 z-9999">
      <div
        className={`
          flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl
          text-sm font-medium animate-slideIn
          ${type === "success" && "bg-emerald-500 text-white shadow-emerald-500/40"}
          ${type === "error" && "bg-red-500 text-white shadow-red-500/40"}
          ${type === "info" && "bg-indigo-600 text-white shadow-indigo-500/40"}
        `}
      >
        <span>{message}</span>

        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
