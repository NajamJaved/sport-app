import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const sizeMap: Record<NonNullable<ModalProps["size"]>, string> = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = "lg", className }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
            <div
                className="absolute inset-0 bg-black opacity-40"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title ?? "Modal"}
                className={`relative z-50 w-full ${sizeMap[size]} mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto ${className ?? ""}`}
            >
                <div className="flex justify-end p-3 border-b">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900 text-xl"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;