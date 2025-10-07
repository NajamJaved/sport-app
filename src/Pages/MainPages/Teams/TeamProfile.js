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
const TeamProfile = ({ team, clubs, onBack, onUpdate }) => {
    var _a;
    const [draft, setDraft] = useState(Object.assign({}, team));
    const coverInputRef = useRef(null);
    const logoInputRef = useRef(null);
    const [showImage, setShowImage] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showText, setShowText] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(saved.filter((p) => { var _a, _b; return ((_a = p.entity) === null || _a === void 0 ? void 0 : _a.type) === 'team' && ((_b = p.entity) === null || _b === void 0 ? void 0 : _b.id) === team.id; }));
    }, [team.id]);
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
    const setImage = (file, key) => {
        const url = URL.createObjectURL(file);
        setDraft(prev => (Object.assign(Object.assign({}, prev), { [key]: url })));
    };
    const addMember = (listKey, name, position) => {
        const nm = name.trim();
        if (!nm)
            return;
        setDraft(prev => (Object.assign(Object.assign({}, prev), { [listKey]: [...prev[listKey], { id: Date.now(), name: nm, position: position || undefined }] })));
    };
    const removeMember = (listKey, id) => setDraft(prev => (Object.assign(Object.assign({}, prev), { [listKey]: prev[listKey].filter(m => m.id !== id) })));
    const [starterName, setStarterName] = useState("");
    const [starterPos, setStarterPos] = useState("");
    const [reserveName, setReserveName] = useState("");
    const [reservePos, setReservePos] = useState("");
    const handleSave = () => onUpdate(draft);
    const { teams: followedTeams } = getFollows();
    const isFollowing = followedTeams.includes(team.id);
    const toggleFollow = () => {
        const next = getFollows();
        const set = new Set(next.teams);
        if (set.has(team.id))
            set.delete(team.id);
        else
            set.add(team.id);
        next.teams = Array.from(set);
        setFollows(next);
    };
    return (_jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: draft.cover || "https://via.placeholder.com/1200x300?text=Team+Cover", alt: "cover", className: "w-full h-56 md:h-64 object-cover rounded-lg" }), _jsx("button", { onClick: () => pick(coverInputRef), className: "absolute right-3 top-3 bg-white px-3 py-1 rounded shadow text-sm", children: "Change Cover" }), _jsx("input", { ref: coverInputRef, type: "file", accept: "image/*", style: { display: 'none' }, onChange: (e) => e.target.files && setImage(e.target.files[0], 'cover') }), _jsxs("div", { className: "absolute -bottom-8 left-6 flex items-end gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: draft.logo || "https://via.placeholder.com/150?text=Logo", alt: "logo", className: "w-24 h-24 rounded-full border-4 border-white object-cover" }), _jsx("button", { onClick: () => pick(logoInputRef), className: "absolute right-0 bottom-0 bg-white p-1 rounded-full shadow", title: "Change logo", children: "\u270E" }), _jsx("input", { ref: logoInputRef, type: "file", accept: "image/*", style: { display: 'none' }, onChange: (e) => e.target.files && setImage(e.target.files[0], 'logo') })] }), _jsxs("div", { className: "mb-2", children: [_jsx("h1", { className: "text-2xl font-bold", children: draft.name }), _jsxs("p", { className: "text-gray-600", children: [draft.sport, draft.city ? ` · ${draft.city}` : ''] })] })] })] }), _jsxs("div", { className: "mt-12 flex flex-wrap gap-2 items-center justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setShowImage(true), className: "px-3 py-2 rounded bg-green-600 text-white", children: "\uD83D\uDCF7 Image" }), _jsx("button", { onClick: () => setShowVideo(true), className: "px-3 py-2 rounded bg-purple-600 text-white", children: "\uD83C\uDFA5 Video" }), _jsx("button", { onClick: () => setShowText(true), className: "px-3 py-2 rounded bg-blue-600 text-white", children: "\u270D\uFE0F Post" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: onBack, className: "px-4 py-2 rounded bg-gray-100", children: "\u2190 Back" }), _jsx("button", { onClick: handleSave, className: "px-5 py-2 rounded bg-green-600 text-white", children: "Save Changes" }), _jsx("button", { onClick: toggleFollow, className: `px-4 py-2 rounded ${isFollowing ? 'bg-gray-200' : 'bg-rose-600 text-white'}`, children: isFollowing ? 'Following' : 'Follow' })] })] }), _jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "md:col-span-2 bg-white rounded-lg p-4 border", children: [_jsx("h2", { className: "font-semibold mb-2", children: "About" }), _jsx("textarea", { value: draft.about || '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { about: e.target.value }))), rows: 5, className: "w-full border rounded px-3 py-2", placeholder: "Describe your team" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Coach" }), _jsx("input", { value: draft.coach || '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { coach: e.target.value }))), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "City" }), _jsx("input", { value: draft.city || '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { city: e.target.value }))), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Linked Club" }), _jsxs("select", { value: (_a = draft.clubId) !== null && _a !== void 0 ? _a : '', onChange: (e) => setDraft(p => (Object.assign(Object.assign({}, p), { clubId: e.target.value === '' ? undefined : Number(e.target.value) }))), className: "w-full border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "None" }), clubs.map(c => _jsx("option", { value: c.id, children: c.name }, c.id))] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 border", children: [_jsx("h2", { className: "font-semibold mb-2", children: "Add Members" }), _jsxs("div", { className: "border rounded p-3 mb-3", children: [_jsx("h3", { className: "font-medium mb-2", children: "Starters" }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { value: starterName, onChange: (e) => setStarterName(e.target.value), className: "flex-1 border rounded px-3 py-2", placeholder: "Name" }), _jsx("input", { value: starterPos, onChange: (e) => setStarterPos(e.target.value), className: "w-36 border rounded px-3 py-2", placeholder: "Position" }), _jsx("button", { type: "button", onClick: () => { addMember('starters', starterName, starterPos); setStarterName(''); setStarterPos(''); }, className: "px-3 py-2 bg-green-600 text-white rounded", children: "Add" })] }), _jsx("ul", { className: "space-y-1", children: draft.starters.map(s => (_jsxs("li", { className: "flex items-center justify-between text-sm bg-gray-50 border rounded px-3 py-1", children: [_jsxs("span", { children: [s.name, s.position ? ` — ${s.position}` : ''] }), _jsx("button", { onClick: () => removeMember('starters', s.id), className: "text-red-600", children: "Remove" })] }, s.id))) })] }), _jsxs("div", { className: "border rounded p-3", children: [_jsx("h3", { className: "font-medium mb-2", children: "Reserves" }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { value: reserveName, onChange: (e) => setReserveName(e.target.value), className: "flex-1 border rounded px-3 py-2", placeholder: "Name" }), _jsx("input", { value: reservePos, onChange: (e) => setReservePos(e.target.value), className: "w-36 border rounded px-3 py-2", placeholder: "Position" }), _jsx("button", { type: "button", onClick: () => { addMember('reserves', reserveName, reservePos); setReserveName(''); setReservePos(''); }, className: "px-3 py-2 bg-blue-600 text-white rounded", children: "Add" })] }), _jsx("ul", { className: "space-y-1", children: draft.reserves.map(r => (_jsxs("li", { className: "flex items-center justify-between text-sm bg-gray-50 border rounded px-3 py-1", children: [_jsxs("span", { children: [r.name, r.position ? ` — ${r.position}` : ''] }), _jsx("button", { onClick: () => removeMember('reserves', r.id), className: "text-red-600", children: "Remove" })] }, r.id))) })] })] })] }), _jsxs("div", { className: "mt-6 bg-white rounded-lg p-4 border", children: [_jsx("h2", { className: "font-semibold mb-3", children: "Posts" }), posts.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No posts yet." })) : (_jsx("div", { className: "space-y-3", children: posts.map(p => (_jsxs("div", { className: "border rounded p-3", children: [_jsxs("div", { className: "text-xs text-gray-500 mb-1", children: [new Date(p.timestamp).toLocaleString(), " \u00B7 ", p.createdBy] }), p.type === 'text' && _jsx("p", { className: "text-gray-800", children: p.content }), p.type === 'image' && p.featureImage && (_jsx("img", { src: p.featureImage, alt: "post", className: "w-full max-h-80 object-cover rounded" })), p.type === 'video' && p.videoUrl && (_jsx("video", { src: p.videoUrl, controls: true, className: "w-full max-h-80 object-cover rounded" }))] }, p.id))) }))] }), showImage && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => setShowImage(false) }), _jsxs("div", { className: "relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { onClick: () => setShowImage(false), className: "text-xl", children: "\u2715" }) }), _jsx(ImageUpload, { onCreate: handleCreatePost, onClose: () => setShowImage(false), entity: { type: 'team', id: team.id } })] })] })), showVideo && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => setShowVideo(false) }), _jsxs("div", { className: "relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { onClick: () => setShowVideo(false), className: "text-xl", children: "\u2715" }) }), _jsx(VideoUpload, { onCreate: handleCreatePost, onClose: () => setShowVideo(false), entity: { type: 'team', id: team.id } })] })] })), showText && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => setShowText(false) }), _jsxs("div", { className: "relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { onClick: () => setShowText(false), className: "text-xl", children: "\u2715" }) }), _jsx(SimplePost, { onCreate: handleCreatePost, onClose: () => setShowText(false), entity: { type: 'team', id: team.id } })] })] }))] }));
};
export default TeamProfile;
