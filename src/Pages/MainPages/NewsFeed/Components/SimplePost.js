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
import { useState } from 'react';
const SimplePost = ({ onCreate, onClose, entity }) => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleAddTag = () => {
        const tag = currentTag.trim();
        if (tag && !tags.includes(tag) && tags.length < 5) {
            setTags([...tags, tag]);
            setCurrentTag('');
        }
    };
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
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
        if (!content.trim())
            return;
        setIsSubmitting(true);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        const newPost = {
            id: Date.now(),
            type: 'text',
            title: 'Text Post',
            content: content.trim(),
            excerpt: content.length > 100 ? content.substring(0, 100) + '...' : content,
            tags: tags,
            keywords: tags,
            featureImage: null,
            likes: 0,
            shares: 0,
            views: 0,
            comments: [],
            timestamp: new Date().toISOString(),
            entity,
            createdBy: getCreatedBy(),
        };
        onCreate(newPost);
        setIsSubmitting(false);
    });
    const characterCount = content.length;
    const maxCharacters = 1000;
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Create a Post" }), _jsx("p", { className: "text-gray-600", children: "Share your thoughts with the community" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "What's on your mind?" }), _jsx("textarea", { value: content, onChange: (e) => setContent(e.target.value), onKeyDown: handleKeyPress, placeholder: "Share your thoughts, ideas, or updates...", className: "w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", rows: 6, maxLength: maxCharacters }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsx("span", { className: "text-xs text-gray-500", children: "Press Ctrl+Enter to post" }), _jsxs("span", { className: `text-xs ${characterCount > maxCharacters * 0.8 ? 'text-orange-500' : 'text-gray-500'}`, children: [characterCount, "/", maxCharacters] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Add tags (optional)" }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { type: "text", value: currentTag, onChange: (e) => setCurrentTag(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleAddTag(), placeholder: "Add a tag...", className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", maxLength: 20 }), _jsx("button", { onClick: handleAddTag, disabled: !currentTag.trim() || tags.length >= 5, className: "px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: "Add" })] }), tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag, index) => (_jsxs("span", { className: "inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full", children: ["#", tag, _jsx("button", { onClick: () => handleRemoveTag(tag), className: "ml-1 text-blue-600 hover:text-blue-800 font-bold", children: "\u00D7" })] }, index))) })), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Maximum 5 tags allowed" })] }), _jsxs("div", { className: "flex gap-3 justify-end", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: !content.trim() || isSubmitting, className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), "Posting..."] })) : ('Post') })] })] }));
};
export default SimplePost;
