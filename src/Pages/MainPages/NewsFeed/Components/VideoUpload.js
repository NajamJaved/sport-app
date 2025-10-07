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
const VideoUpload = ({ onCreate, onClose, entity }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);
    const handleVideoSelect = (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedVideo(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                setVideoPreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedVideo(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                setVideoPreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
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
        if (!selectedVideo)
            return;
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);
        yield new Promise(resolve => setTimeout(resolve, 2000));
        const newPost = {
            id: Date.now(),
            type: 'video',
            title: 'Video Post',
            content: caption || 'Shared a video',
            excerpt: caption || 'Shared a video',
            tags: ['video'],
            keywords: ['video', 'media'],
            featureImage: null,
            videoUrl: videoPreview,
            likes: 0,
            shares: 0,
            views: 0,
            comments: [],
            timestamp: new Date().toISOString(),
            entity,
            createdBy: getCreatedBy(),
        };
        onCreate(newPost);
        setIsUploading(false);
        setUploadProgress(0);
    });
    const removeVideo = () => {
        setSelectedVideo(null);
        setVideoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Share a Video" }), _jsx("p", { className: "text-gray-600", children: "Upload and share your favorite videos" })] }), _jsx("div", { className: "mb-6", children: !videoPreview ? (_jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer", onClick: () => { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, onDrop: handleDrop, onDragOver: handleDragOver, children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDFA5" }), _jsx("p", { className: "text-lg font-medium text-gray-700 mb-2", children: "Click to upload or drag and drop" }), _jsx("p", { className: "text-sm text-gray-500", children: "MP4, AVI, MOV up to 100MB" }), _jsx("input", { ref: fileInputRef, type: "file", accept: "video/*", onChange: handleVideoSelect, className: "hidden" })] })) : (_jsxs("div", { className: "relative", children: [_jsx("video", { src: videoPreview, controls: true, className: "w-full max-h-96 object-cover rounded-lg" }), _jsxs("div", { className: "absolute top-2 right-2 flex gap-2", children: [selectedVideo && (_jsx("div", { className: "bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs", children: formatFileSize(selectedVideo.size) })), _jsx("button", { onClick: removeVideo, className: "bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors", children: "\u2715" })] })] })) }), isUploading && (_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex justify-between text-sm text-gray-600 mb-2", children: [_jsx("span", { children: "Uploading..." }), _jsxs("span", { children: [uploadProgress, "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all duration-300", style: { width: `${uploadProgress}%` } }) })] })), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Add a caption (optional)" }), _jsx("textarea", { value: caption, onChange: (e) => setCaption(e.target.value), placeholder: "What's on your mind about this video?", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", rows: 3 })] }), _jsxs("div", { className: "flex gap-3 justify-end", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: !selectedVideo || isUploading, className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2", children: isUploading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), "Uploading..."] })) : ('Share Video') })] })] }));
};
export default VideoUpload;
