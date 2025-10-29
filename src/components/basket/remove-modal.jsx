import React from "react";
import { Trash2, X } from "lucide-react";

const RemoveModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 m-0">
            <Trash2 className="w-5 h-5 text-red-500 " />
            Remove Item?
          </h3>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg bg-inherit"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-2 sm:p-3">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed m-0">
            Are you sure you want to remove{" "}
            <span className="font-bold text-red-400 m-0">{itemName}</span> from your
            basket? This action cannot be undone.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-20 px-8 sm:px-8 p-2 sm:p-3 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-2 py-1 bg-gray-800 text-sm sm:text-sm hover:bg-gray-700 text-white font-semibold rounded-lg transition-all border border-gray-700 hover:border-gray-600"
          >
            No, Keep It
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red- text-sm sm:text-sm 600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default RemoveModal;
