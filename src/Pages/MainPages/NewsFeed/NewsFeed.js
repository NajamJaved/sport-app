import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import WriteMassage from './Components/WriteBlogPost';
import PostPublish from './Components/PostPublish';
import ImageUpload from './Components/ImageUpload';
import VideoUpload from './Components/VideoUpload';
import SimplePost from './Components/SimplePost';
import Modal from "@/components/Modal"; // ensure path and casing match
import CommonButton from "@/components/CommonButton";
const getFollows = () => { try {
    return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}');
}
catch (_a) {
    return { clubs: [], teams: [], events: [] };
} };
const NewsFeed = () => {
    const [showWriter, setShowWriter] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showVideoUpload, setShowVideoUpload] = useState(false);
    const [showSimplePost, setShowSimplePost] = useState(false);
    const [posts, setPosts] = useState([]);
    // followed data
    const [followed, setFollowed] = useState({ clubs: [], teams: [], events: [] });
    const [clubs, setClubs] = useState([]);
    const [teams, setTeams] = useState([]);
    const [events, setEvents] = useState([]);
    // Load posts and followed on component mount
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(savedPosts);
        setFollowed(getFollows());
        setClubs(JSON.parse(localStorage.getItem('clubs') || '[]'));
        setTeams(JSON.parse(localStorage.getItem('teams') || '[]'));
        setEvents(JSON.parse(localStorage.getItem('events') || '[]'));
    }, []);
    const updatePost = (id, patchOrFn) => {
        setPosts((prev) => {
            const updated = prev.map((p) => {
                if (p.id !== id)
                    return p;
                const patch = typeof patchOrFn === "function" ? patchOrFn(p) : patchOrFn;
                return Object.assign(Object.assign({}, p), patch);
            });
            localStorage.setItem('posts', JSON.stringify(updated));
            return updated;
        });
    };
    const handleCreatePost = (post) => {
        setPosts((prev) => {
            const newPosts = [post, ...prev];
            localStorage.setItem('posts', JSON.stringify(newPosts));
            return newPosts;
        });
        setShowWriter(false);
        setShowImageUpload(false);
        setShowVideoUpload(false);
        setShowSimplePost(false);
    };
    const nameById = (list, id) => { var _a; return ((_a = list.find((x) => x.id === id)) === null || _a === void 0 ? void 0 : _a.name) || `#${id}`; };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6", children: [_jsx("aside", { className: "lg:col-span-3 hidden lg:block", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "bg-white rounded-lg border p-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Following" }), _jsxs("div", { className: "text-sm text-gray-600 mb-1", children: ["Followers (", followed.clubs.length, ")"] }), followed.clubs.length === 0 ? (_jsx("p", { className: "text-xs text-gray-500 mb-2", children: "No followers" })) : (_jsx("ul", { className: "mb-2 list-disc list-inside text-sm", children: followed.clubs.slice(0, 6).map((id) => (_jsx("li", { children: nameById(clubs, id) }, `fc-${id}`))) })), _jsxs("div", { className: "text-sm text-gray-600 mb-1", children: ["Clubs (", followed.clubs.length, ")"] }), followed.clubs.length === 0 ? (_jsx("p", { className: "text-xs text-gray-500 mb-2", children: "No followed clubs" })) : (_jsx("ul", { className: "mb-2 list-disc list-inside text-sm", children: followed.clubs.slice(0, 6).map((id) => (_jsx("li", { children: nameById(clubs, id) }, `fc-${id}`))) })), _jsxs("div", { className: "text-sm text-gray-600 mb-1", children: ["Teams (", followed.teams.length, ")"] }), followed.teams.length === 0 ? (_jsx("p", { className: "text-xs text-gray-500 mb-2", children: "No followed teams" })) : (_jsx("ul", { className: "mb-2 list-disc list-inside text-sm", children: followed.teams.slice(0, 6).map((id) => (_jsx("li", { children: nameById(teams, id) }, `ft-${id}`))) })), _jsxs("div", { className: "text-sm text-gray-600 mb-1", children: ["Events (", followed.events.length, ")"] }), followed.events.length === 0 ? (_jsx("p", { className: "text-xs text-gray-500", children: "No followed events" })) : (_jsx("ul", { className: "list-disc list-inside text-sm", children: followed.events.slice(0, 6).map((id) => (_jsx("li", { children: nameById(events, id) }, `fe-${id}`))) }))] }), _jsx("div", { className: "bg-white rounded-lg border p-4", children: "Shortcuts" })] }) }), _jsxs("main", { className: "lg:col-span-6 w-full", children: [_jsx("div", { className: 'bg-white border rounded-lg p-4 mb-4', children: _jsxs("div", { className: 'flex flex-wrap gap-3 items-center justify-between', children: [_jsxs("button", { onClick: () => setShowImageUpload(true), className: "flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDCF7" }), _jsx("span", { children: "Image" })] }), _jsxs("button", { onClick: () => setShowVideoUpload(true), className: "flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm", children: [_jsx("span", { className: "text-lg", children: "\uD83C\uDFA5" }), _jsx("span", { children: "Video" })] }), _jsxs("button", { onClick: () => setShowSimplePost(true), className: "flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm", children: [_jsx("span", { className: "text-lg", children: "\u270D\uFE0F" }), _jsx("span", { children: "Post" })] }), _jsx("div", { children: _jsx(CommonButton, { label: "Write Blog", onClick: () => setShowWriter((s) => !s), buttonTextStyle: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" }) })] }) }), _jsx("div", { className: "space-y-4", children: posts.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No posts yet" })) : (posts.map((p) => (_jsx(PostPublish, { post: p, onUpdate: updatePost }, p.id)))) })] }), _jsx("aside", { className: "lg:col-span-3 hidden lg:block", children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "bg-white rounded-lg border p-4", children: "Right Sidebar" }), _jsx("div", { className: "bg-white rounded-lg border p-4", children: "Sponsored" })] }) })] }) }), _jsx(Modal, { isOpen: showImageUpload, onClose: () => setShowImageUpload(false), title: "Upload Image", size: "md", children: _jsx(ImageUpload, { onCreate: handleCreatePost, onClose: () => setShowImageUpload(false) }) }), _jsx(Modal, { isOpen: showVideoUpload, onClose: () => setShowVideoUpload(false), title: "Upload Video", size: "md", children: _jsx(VideoUpload, { onCreate: handleCreatePost, onClose: () => setShowVideoUpload(false) }) }), _jsx(Modal, { isOpen: showSimplePost, onClose: () => setShowSimplePost(false), title: "Create Post", size: "md", children: _jsx(SimplePost, { onCreate: handleCreatePost, onClose: () => setShowSimplePost(false) }) }), _jsx(Modal, { isOpen: showWriter, onClose: () => setShowWriter(false), title: "Write Blog", size: "lg", children: _jsx(WriteMassage, { onCreate: handleCreatePost }) })] }));
};
export default NewsFeed;
