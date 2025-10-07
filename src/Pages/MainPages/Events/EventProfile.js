import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import ImageUpload from "../NewsFeed/Components/ImageUpload";
import VideoUpload from "../NewsFeed/Components/VideoUpload";
import SimplePost from "../NewsFeed/Components/SimplePost";
const getFollows = () => { try {
    return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}');
}
catch (_a) {
    return { clubs: [], teams: [], events: [] };
} };
const setFollows = (obj) => { try {
    localStorage.setItem('follows', JSON.stringify(obj));
}
catch (_a) { } };
const EventProfile = ({ event, clubs, onBack, onUpdate }) => {
    var _a;
    const [draft, setDraft] = useState(Object.assign(Object.assign({}, event), { participants: event.participants || [] }));
    const coverRef = useRef(null);
    const badgeRef = useRef(null);
    const [showImage, setShowImage] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showText, setShowText] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(saved.filter((p) => { var _a, _b; return ((_a = p.entity) === null || _a === void 0 ? void 0 : _a.type) === 'event' && ((_b = p.entity) === null || _b === void 0 ? void 0 : _b.id) === event.id; }));
    }, [event.id]);
    const handleCreatePost = (post) => {
        const all = JSON.parse(localStorage.getItem('posts') || '[]');
        const next = [post, ...all];
        localStorage.setItem('posts', JSON.stringify(next));
        setPosts((prev) => [post, ...prev]);
        setShowImage(false);
        setShowVideo(false);
        setShowText(false);
    };
    const pick = (ref) => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.click(); };
    const setImg = (file, key) => {
        const url = URL.createObjectURL(file);
        setDraft(prev => (Object.assign(Object.assign({}, prev), { [key]: url })));
    };
    const [participant, setParticipant] = useState("");
    const addParticipant = () => {
        const v = participant.trim();
        if (!v)
            return;
        setDraft(p => (Object.assign(Object.assign({}, p), { participants: [...(p.participants || []), v] })));
        setParticipant("");
    };
    const removeParticipant = (name) => setDraft(p => (Object.assign(Object.assign({}, p), { participants: (p.participants || []).filter(x => x !== name) })));
    const handleSave = () => onUpdate(draft);
    const { events: followedEvents } = getFollows();
    const isFollowing = followedEvents.includes(event.id);
    const toggleFollow = () => {
        const next = getFollows();
        const set = new Set(next.events);
        if (set.has(event.id))
            set.delete(event.id);
        else
            set.add(event.id);
        next.events = Array.from(set);
        setFollows(next);
    };
    return (_jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: draft.cover || "https://via.placeholder.com/1200x300?text=Event+Cover", alt: "cover", className: "w-full h-56 md:h-64 object-cover rounded-lg" }), _jsx("button", { onClick: () => pick(coverRef), className: "absolute right-3 top-3 bg-white px-3 py-1 rounded shadow text-sm", children: "Change Cover" }), _jsx("input", { ref: coverRef, type: "file", accept: "image/*", style: { display: 'none' }, onChange: (e) => e.target.files && setImg(e.target.files[0], 'cover') }), _jsxs("div", { className: "absolute -bottom-8 left-6 flex items-end gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: draft.badge || "https://via.placeholder.com/150?text=Badge", alt: "badge", className: "w-24 h-24 rounded-full border-4 border-white object-cover" }), _jsx("button", { onClick: () => pick(badgeRef), className: "absolute right-0 bottom-0 bg-white p-1 rounded-full shadow", title: "Change badge", children: "\u270E" }), _jsx("input", { ref: badgeRef, type: "file", accept: "image/*", style: { display: 'none' }, onChange: (e) => e.target.files && setImg(e.target.files[0], 'badge') })] }), _jsxs("div", { className: "mb-2", children: [_jsx("h1", { className: "text-2xl font-bold", children: draft.name }), _jsxs("p", { className: "text-gray-600", children: [draft.sport, " \u00B7 ", draft.type, " \u00B7 ", draft.date] })] })] })] }), _jsxs("div", { className: "mt-12 flex flex-wrap gap-2 items-center justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setShowImage(true), className: "px-3 py-2 rounded bg-green-600 text-white", children: "\uD83D\uDCF7 Image" }), _jsx("button", { onClick: () => setShowVideo(true), className: "px-3 py-2 rounded bg-purple-600 text-white", children: "\uD83C\uDFA5 Video" }), _jsx("button", { onClick: () => setShowText(true), className: "px-3 py-2 rounded bg-blue-600 text-white", children: "\u270D\uFE0F Post" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: onBack, className: "px-4 py-2 rounded bg-gray-100", children: "\u2190 Back" }), _jsx("button", { onClick: handleSave, className: "px-5 py-2 rounded bg-purple-600 text-white", children: "Save Changes" }), _jsx("button", { onClick: toggleFollow, className: `px-4 py-2 rounded ${isFollowing ? 'bg-gray-200' : 'bg-rose-600 text-white'}`, children: isFollowing ? 'Following' : 'Follow' })] })] }), _jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "md:col-span-2 bg-white rounded-lg p-4 border", children: [_jsx("h2", { className: "font-semibold mb-2", children: "About" }), _jsx("textarea", { value: draft.description || '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { description: e.target.value }))), rows: 5, className: "w-full border rounded px-3 py-2", placeholder: "Describe the event" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type" }), _jsx("select", { value: draft.type, onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { type: e.target.value }))), className: "w-full border rounded px-3 py-2", children: ['Match', 'Tournament', 'Training', 'Other'].map(t => _jsx("option", { value: t, children: t }, t)) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }), _jsx("input", { type: "date", value: draft.date, onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { date: e.target.value }))), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start" }), _jsx("input", { type: "time", value: draft.startTime || '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { startTime: e.target.value }))), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End" }), _jsx("input", { type: "time", value: draft.endTime || '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { endTime: e.target.value }))), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Location" }), _jsx("input", { value: draft.location, onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { location: e.target.value }))), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Host Club (optional)" }), _jsxs("select", { value: (_a = draft.hostClubId) !== null && _a !== void 0 ? _a : '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { hostClubId: e.target.value === '' ? undefined : Number(e.target.value) }))), className: "w-full border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "None" }), clubs.map(c => _jsx("option", { value: c.id, children: c.name }, c.id))] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 border", children: [_jsx("h2", { className: "font-semibold mb-2", children: "Participants" }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { value: participant, onChange: (e) => setParticipant(e.target.value), className: "flex-1 border rounded px-3 py-2", placeholder: "Team/Club name" }), _jsx("button", { onClick: addParticipant, className: "px-3 py-2 bg-purple-600 text-white rounded", children: "Add" })] }), (draft.participants || []).length === 0 ? (_jsx("p", { className: "text-gray-500 text-sm", children: "No participants added." })) : (_jsx("ul", { className: "space-y-1", children: (draft.participants || []).map(p => (_jsxs("li", { className: "flex items-center justify-between text-sm bg-gray-50 border rounded px-3 py-1", children: [_jsx("span", { children: p }), _jsx("button", { onClick: () => removeParticipant(p), className: "text-red-600", children: "Remove" })] }, p))) }))] })] }), _jsxs("div", { className: "mt-6 bg-white rounded-lg p-4 border", children: [_jsx("h2", { className: "font-semibold mb-3", children: "Posts" }), posts.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No posts yet." })) : (_jsx("div", { className: "space-y-3", children: posts.map(p => (_jsxs("div", { className: "border rounded p-3", children: [_jsxs("div", { className: "text-xs text-gray-500 mb-1", children: [new Date(p.timestamp).toLocaleString(), " \u00B7 ", p.createdBy] }), p.type === 'text' && _jsx("p", { className: "text-gray-800", children: p.content }), p.type === 'image' && p.featureImage && (_jsx("img", { src: p.featureImage, alt: "post", className: "w-full max-h-80 object-cover rounded" })), p.type === 'video' && p.videoUrl && (_jsx("video", { src: p.videoUrl, controls: true, className: "w-full max-h-80 object-cover rounded" }))] }, p.id))) }))] }), showImage && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => setShowImage(false) }), _jsxs("div", { className: "relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { onClick: () => setShowImage(false), className: "text-xl", children: "\u2715" }) }), _jsx(ImageUpload, { onCreate: handleCreatePost, onClose: () => setShowImage(false), entity: { type: 'event', id: event.id } })] })] })), showVideo && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => setShowVideo(false) }), _jsxs("div", { className: "relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { onClick: () => setShowVideo(false), className: "text-xl", children: "\u2715" }) }), _jsx(VideoUpload, { onCreate: handleCreatePost, onClose: () => setShowVideo(false), entity: { type: 'event', id: event.id } })] })] })), showText && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => setShowText(false) }), _jsxs("div", { className: "relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { onClick: () => setShowText(false), className: "text-xl", children: "\u2715" }) }), _jsx(SimplePost, { onCreate: handleCreatePost, onClose: () => setShowText(false), entity: { type: 'event', id: event.id } })] })] }))] }));
};
export default EventProfile;
