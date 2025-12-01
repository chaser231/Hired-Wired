"use client";

import { useEffect, useCallback } from "react";
import { Icon } from "@/components/atoms";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: ModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full mx-[20px] max-h-[90vh] overflow-y-auto ${className}`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-[30px] border-b border-gray-200">
            <h2 id="modal-title" className="text-h2">{title}</h2>
            <button
              onClick={onClose}
              className="p-[8px] hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <Icon type="close" size={16} />
            </button>
          </div>
        )}
        
        {/* Body */}
        <div className="p-[30px]">
          {children}
        </div>
      </div>
    </div>
  );
}

