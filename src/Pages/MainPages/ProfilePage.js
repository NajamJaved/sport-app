import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import PostTable from "./NewsFeed/Components/PostTable";
import TeamsPage from "./Teams/TeamsPage";
import ClubsPage from "./Clubs/ClubsPage";
import EventsPage from "./Events/EventsPage";
import CommonButton from "@/components/CommonButton";
const initialData = {
    profile: {
        name: "Title",
        followers: 188,
        following: 85,
        friends_count: 156,
        bio: "Going for a Youtuber",
        intro: {
            current_city: "Dubai, United Arab Emirates",
            hometown: "Lahore, Pakistan",
            education: [
                "Studying at PUCIT - Punjab University College of Information Technology",
                "Went to Allied Schools"
            ]
        },
        cover_photo: "", // empty by default
        profile_photo: "" // empty by default
    },
    tabs: ["Posts", "About", "Stats", "Photos", "Followers", "Events", "Teams", "Clubs"],
    photos: [
        { title: "LAH IS ENOUGH", url: "photo_url_1" },
        { title: "Other photos", url: "photo_url_2" }
    ],
    friends: [],
    posts: []
};
const ProfilePage = () => {
    const [data, setData] = useState(initialData);
    const [activeTab, setActiveTab] = useState("Posts");
    const [editing, setEditing] = useState(false);
    const coverInputRef = useRef(null);
    const avatarInputRef = useRef(null);
    // temp form state for editing
    const [editName, setEditName] = useState(data.profile.name);
    const [editBio, setEditBio] = useState(data.profile.bio);
    const [editCurrentCity, setEditCurrentCity] = useState(data.profile.intro.current_city);
    const [editHometown, setEditHometown] = useState(data.profile.intro.hometown);
    const [editEducationText, setEditEducationText] = useState(data.profile.intro.education.join("\n"));
    const handleCoverClick = () => { var _a; return (_a = coverInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); };
    const handleAvatarClick = () => { var _a; return (_a = avatarInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); };
    const handleCoverChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const url = URL.createObjectURL(file);
        setData((prev) => (Object.assign(Object.assign({}, prev), { profile: Object.assign(Object.assign({}, prev.profile), { cover_photo: url }), photos: [{ title: "Cover Photo", url }, ...prev.photos] })));
    };
    const handleAvatarChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const url = URL.createObjectURL(file);
        setData((prev) => (Object.assign(Object.assign({}, prev), { profile: Object.assign(Object.assign({}, prev.profile), { profile_photo: url }), photos: [{ title: "Profile Photo", url }, ...prev.photos] })));
    };
    const startEdit = () => {
        setEditName(data.profile.name);
        setEditBio(data.profile.bio);
        setEditCurrentCity(data.profile.intro.current_city);
        setEditHometown(data.profile.intro.hometown);
        setEditEducationText(data.profile.intro.education.join("\n"));
        setEditing(true);
    };
    const saveEdit = () => {
        const eduArr = editEducationText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
        setData((prev) => (Object.assign(Object.assign({}, prev), { profile: Object.assign(Object.assign({}, prev.profile), { name: editName || "Title", bio: editBio, intro: Object.assign(Object.assign({}, prev.profile.intro), { current_city: editCurrentCity, hometown: editHometown, education: eduArr }) }) })));
        setEditing(false);
    };
    const cancelEdit = () => {
        setEditing(false);
    };
    // Content renderer for tabs
    const renderContent = () => {
        switch (activeTab) {
            case "Posts":
                return (_jsx("div", { className: "space-y-4 mt-4", children: data.posts.map((post, i) => (_jsxs("div", { className: "bg-white rounded-lg shadow p-4", children: [_jsx("p", { className: "text-sm text-gray-500", children: post.date }), _jsx("p", { className: "mt-2", children: post.content }), post.likes !== undefined && (_jsxs("p", { className: "text-sm text-gray-600", children: ["\uD83D\uDC4D ", post.likes, " likes"] })), post.comments && post.comments.length > 0 && (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "text-sm font-semibold", children: "Comments:" }), post.comments.map((c, idx) => (_jsxs("p", { className: "text-sm text-gray-700", children: [_jsxs("span", { className: "font-medium", children: [c.user, ":"] }), " ", c.comment] }, idx)))] }))] }, i))) }));
            case "About":
                return (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow mt-4", children: [_jsx("h2", { className: "font-semibold text-lg mb-2", children: "Intro" }), _jsx("p", { children: data.profile.bio }), _jsx("ul", { className: "mt-2 list-disc ml-6 text-gray-700", children: data.profile.intro.education.map((edu, i) => (_jsx("li", { children: edu }, i))) }), _jsxs("p", { children: ["\uD83D\uDCCD Lives in ", data.profile.intro.current_city] }), _jsxs("p", { children: ["\uD83C\uDFE0 From ", data.profile.intro.hometown] })] }));
            case "Photos":
                // include uploaded cover/profile photos at top of gallery
                const photosToShow = [
                    ...(data.profile.cover_photo ? [{ title: "Cover Photo", url: data.profile.cover_photo }] : []),
                    ...(data.profile.profile_photo ? [{ title: "Profile Photo", url: data.profile.profile_photo }] : []),
                    ...data.photos,
                ];
                return (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow mt-4", children: [_jsx("h2", { className: "font-semibold text-lg mb-2", children: "Photos" }), _jsx("div", { className: "grid grid-cols-3 gap-3", children: photosToShow.map((photo, i) => (_jsx("img", { src: photo.url, alt: photo.title, className: "rounded-lg" }, i))) })] }));
            case "Stats":
                const tablePosts = data.posts.map((p, i) => {
                    var _a, _b;
                    return ({
                        id: i,
                        title: (p.content || "").slice(0, 60) || `Post ${i + 1}`,
                        likes: (_a = p.likes) !== null && _a !== void 0 ? _a : 0,
                        shares: 0,
                        views: 0,
                        comments: (_b = p.comments) !== null && _b !== void 0 ? _b : [],
                    });
                });
                return _jsx("div", { className: "p-4", children: _jsx(PostTable, { posts: tablePosts }) });
            case "Followers":
                return _jsx("div", { className: "p-4", children: "\uD83D\uDC65 Groups content here..." });
            case "Events":
                return _jsx("div", { className: "p-4", children: _jsx(EventsPage, {}) });
            case "Teams":
                return _jsx("div", { className: "p-4", children: _jsx(TeamsPage, {}) });
            case "Clubs":
                return _jsx("div", { className: "p-4", children: _jsx(ClubsPage, {}) });
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "bg-gray-100 min-h-screen", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: data.profile.cover_photo || "https://via.placeholder.com/1200x300?text=Cover+Photo", alt: "Cover", className: "w-full h-60 object-cover" }), _jsxs("div", { className: "absolute right-4 top-4", children: [_jsx("button", { onClick: handleCoverClick, className: "bg-white px-3 py-2 rounded shadow-sm text-sm", children: "Upload Cover" }), _jsx("input", { ref: coverInputRef, type: "file", accept: "image/*", onChange: handleCoverChange, style: { display: "none" } })] }), _jsx("div", { className: "absolute bottom-0 left-6 transform translate-y-1/2", children: _jsxs("div", { className: "relative", children: [_jsx("img", { src: data.profile.profile_photo || "https://via.placeholder.com/150?text=Avatar", alt: "Profile", className: "w-36 h-36 rounded-full border-4 border-white object-cover" }), _jsx("button", { onClick: handleAvatarClick, className: "absolute right-0 bottom-0 bg-white p-1 rounded-full shadow", title: "Upload avatar", children: "\u270E" }), _jsx("input", { ref: avatarInputRef, type: "file", accept: "image/*", onChange: handleAvatarChange, style: { display: "none" } })] }) })] }), _jsxs("div", { className: "mt-20 px-6 flex items-start justify-between gap-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: data.profile.name }), _jsxs("p", { className: "text-gray-600", children: [data.profile.followers, " followers \u00B7 ", data.profile.following, " following"] }), _jsx("p", { className: "text-gray-700 mt-1", children: data.profile.bio })] }), _jsx("div", { className: "flex items-center gap-3", children: !editing ? (_jsx(CommonButton, { label: "Edit Profile", onClick: startEdit, buttonTextStyle: "px-4 py-2 bg-blue-600 text-white rounded" })) : (_jsxs("div", { className: "flex flex-col gap-2 bg-white p-3 rounded shadow", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { value: editName, onChange: (e) => setEditName(e.target.value), className: "px-3 py-2 border rounded", placeholder: "Title" }), _jsx("input", { value: editBio, onChange: (e) => setEditBio(e.target.value), className: "px-3 py-2 border rounded", placeholder: "Bio" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { value: editCurrentCity, onChange: (e) => setEditCurrentCity(e.target.value), className: "px-3 py-2 border rounded", placeholder: "Current city" }), _jsx("input", { value: editHometown, onChange: (e) => setEditHometown(e.target.value), className: "px-3 py-2 border rounded", placeholder: "Hometown" })] }), _jsx("textarea", { value: editEducationText, onChange: (e) => setEditEducationText(e.target.value), className: "px-3 py-2 border rounded h-24", placeholder: "Education \u2014 one entry per line" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(CommonButton, { label: "Save", onClick: saveEdit, buttonTextStyle: "px-4 py-2 bg-green-600 text-white rounded" }), _jsx(CommonButton, { label: "Cancel", onClick: cancelEdit, buttonTextStyle: "px-4 py-2 bg-gray-200 rounded" })] })] })) })] }), _jsx("div", { className: "mt-4 border-t border-b bg-white", children: _jsx("div", { className: "flex justify-center space-x-6 py-2 font-medium text-gray-700", children: data.tabs.map((tab, i) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-4 py-2 border-b-2 transition ${activeTab === tab
                            ? "text-blue-600 border-blue-600"
                            : "text-gray-600 border-transparent hover:text-blue-600"}`, children: tab }, i))) }) }), _jsx("div", { className: "px-6", children: renderContent() })] }));
};
export default ProfilePage;
