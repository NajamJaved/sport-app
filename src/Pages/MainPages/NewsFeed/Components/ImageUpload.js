var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
const ImageUpload = ({ onCreate, onClose, entity }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const handleImageSelect = (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                setImagePreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                setImagePreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const getCreatedBy = () => {
        var _a;
        try {
            return ((_a = JSON.parse(localStorage.getItem('user') || '{}')) === null || _a === void 0 ? void 0 : _a.name) || 'User';
        }
        catch (_b) {
            return 'User';
        }
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedImage)
            return;
        setIsUploading(true);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        const newPost = {
            id: Date.now(),
            type: 'image',
            title: 'Image Post',
            content: caption || 'Shared an image',
            excerpt: caption || 'Shared an image',
            tags: ['image'],
            keywords: ['photo', 'image'],
            featureImage: imagePreview,
            likes: 0,
            shares: 0,
            views: 0,
            comments: [],
            timestamp: new Date().toISOString(),
            entity, // optional: { type, id }
            createdBy: getCreatedBy(),
        };
        onCreate(newPost);
        setIsUploading(false);
    });
    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Share an Image" }), _jsx("p", { className: "text-gray-600", children: "Upload and share your favorite moments" })] }), _jsx("div", { className: "mb-6", children: !imagePreview ? (_jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer", onClick: () => { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, onDrop: handleDrop, onDragOver: handleDragOver, children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDCF7" }), _jsx("p", { className: "text-lg font-medium text-gray-700 mb-2", children: "Click to upload or drag and drop" }), _jsx("p", { className: "text-sm text-gray-500", children: "PNG, JPG, GIF up to 10MB" }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageSelect, className: "hidden" })] })) : (_jsxs("div", { className: "relative", children: [_jsx("img", { src: imagePreview, alt: "Preview", className: "w-full max-h-96 object-cover rounded-lg" }), _jsx("button", { onClick: removeImage, className: "absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors", children: "\u2715" })] })) }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Add a caption (optional)" }), _jsx("textarea", { value: caption, onChange: (e) => setCaption(e.target.value), placeholder: "What's on your mind about this image?", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", rows: 3 })] }), _jsxs("div", { className: "flex gap-3 justify-end", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: !selectedImage || isUploading, className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2", children: isUploading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), "Uploading..."] })) : ('Share Image') })] })] }));
};
export default ImageUpload;
