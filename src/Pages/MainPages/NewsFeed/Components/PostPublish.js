var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const PostPublish = ({ post, onUpdate }) => {
    var _a, _b, _c, _d;
    if (!post)
        return null;
    // try to read logged-in user from localStorage (adjust key if your app uses different key)
    const stored = (typeof window !== "undefined" && (localStorage.getItem("user") || localStorage.getItem("authUser") || localStorage.getItem("currentUser"))) ||
        null;
    let loggedUser = null;
    if (stored) {
        try {
            loggedUser = JSON.parse(stored);
        }
        catch (_e) {
            loggedUser = null;
        }
    }
    // local interactive state (initialize from post)
    const [likes, setLikes] = useState((_a = post.likes) !== null && _a !== void 0 ? _a : 0);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState((_b = post.comments) !== null && _b !== void 0 ? _b : []);
    const [commentText, setCommentText] = useState("");
    const [commentAuthor, setCommentAuthor] = useState(""); // input for commenter name
    const [shareCopied, setShareCopied] = useState(false);
    const [shares, setShares] = useState((_c = post.shares) !== null && _c !== void 0 ? _c : 0);
    const [views, setViews] = useState((_d = post.views) !== null && _d !== void 0 ? _d : 0);
    // Sync local interactive state when parent post updates
    useEffect(() => {
        var _a, _b, _c, _d;
        setLikes((_a = post.likes) !== null && _a !== void 0 ? _a : 0);
        setShares((_b = post.shares) !== null && _b !== void 0 ? _b : 0);
        setViews((_c = post.views) !== null && _c !== void 0 ? _c : 0);
        setComments((_d = post.comments) !== null && _d !== void 0 ? _d : []);
    }, [post === null || post === void 0 ? void 0 : post.id, post === null || post === void 0 ? void 0 : post.likes, post === null || post === void 0 ? void 0 : post.shares, post === null || post === void 0 ? void 0 : post.views, JSON.stringify((post === null || post === void 0 ? void 0 : post.comments) || [])]);
    // increment view on mount (persist)
    useEffect(() => {
        if (!post)
            return;
        setViews((v) => v + 1);
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(post.id, (prev) => { var _a; return ({ views: ((_a = prev.views) !== null && _a !== void 0 ? _a : 0) + 1 }); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLike = () => {
        const newLiked = !liked;
        const newLikes = newLiked ? (likes + 1) : Math.max(0, likes - 1);
        setLiked(newLiked);
        setLikes(newLikes);
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(post.id, (prev) => ({ likes: newLikes }));
    };
    const handleAddComment = () => {
        var _a, _b, _c;
        const txt = commentText.trim();
        if (!txt)
            return;
        // prefer logged-in user details
        const author = ((_a = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.name) === null || _a === void 0 ? void 0 : _a.trim()) || commentAuthor.trim() || "Anonymous";
        const username = (_b = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.username) === null || _b === void 0 ? void 0 : _b.trim();
        const avatar = (_c = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.avatar) !== null && _c !== void 0 ? _c : null;
        const newComment = {
            author,
            username,
            text: txt,
            avatar, // prefer logged user's avatar if available
            time: new Date().toLocaleString(),
        };
        const next = [newComment, ...comments];
        setComments(next);
        // persist to parent
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(post.id, (prev) => ({ comments: next }));
        setCommentText("");
        setCommentAuthor("");
        setShowComments(true);
    };
    const handleShare = () => __awaiter(void 0, void 0, void 0, function* () {
        // increment share immediately and persist
        const nextShares = (shares !== null && shares !== void 0 ? shares : 0) + 1;
        setShares(nextShares);
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(post.id, (prev) => ({ shares: nextShares }));
        const url = `${window.location.origin}${window.location.pathname}#post-${post.id}`;
        try {
            yield navigator.clipboard.writeText(url);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2000);
        }
        catch (_a) {
            // fallback: open native share if available
            if (navigator.share) {
                try {
                    yield navigator.share({ title: post.title, text: post.excerpt, url });
                }
                catch (_b) { }
            }
        }
    });
    // delete comment by index (only allowed for comment author / logged user)
    const handleDeleteComment = (index) => {
        if (!comments[index])
            return;
        const c = comments[index];
        const canDelete = loggedUser &&
            ((loggedUser.username && c.username && loggedUser.username === c.username) ||
                (loggedUser.name && loggedUser.name === c.author));
        // allow delete also if commenter is "Anonymous" and same name entered (optional)
        if (!canDelete) {
            // optionally allow authorless delete by confirmation (comment owner check recommended)
            if (!confirm("You are not the comment author. Do you want to delete this comment?"))
                return;
        }
        else {
            if (!confirm("Delete this comment?"))
                return;
        }
        const next = comments.filter((_, i) => i !== index);
        setComments(next);
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(post.id, (prev) => ({ comments: next }));
    };
    return (_jsxs("div", { id: `post-${post.id}`, className: "bg-white  p-6 mt-8  mx-auto w-[100%] transition-transform transform  border border-gray-200 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-gray-100", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden", children: (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.avatar) ? (_jsx("img", { src: loggedUser.avatar, alt: loggedUser.name || "User", className: "w-full h-full object-cover" })) : (_jsx("span", { className: "text-lg font-semibold text-gray-600", children: ((loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.name) || "U").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase() })) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-semibold text-gray-900 text-lg", children: (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.name) || "Anonymous User" }), (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.username) && (_jsxs("div", { className: "text-sm text-gray-500", children: ["@", loggedUser.username] })), _jsx("div", { className: "text-xs text-gray-400", children: new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) })] })] }), post.type === 'image' && post.featureImage && (_jsx("div", { className: "mb-5", children: _jsx("img", { src: post.featureImage, alt: "Post Image", className: "w-full max-h-96 object-cover rounded-lg" }) })), post.type === 'video' && post.videoUrl && (_jsx("div", { className: "mb-5", children: _jsx("video", { src: post.videoUrl, controls: true, className: "w-full max-h-96 object-cover rounded-lg" }) })), post.type === 'blog' && (_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-3 tracking-tight", children: post.title })), _jsx("div", { className: "mb-5", children: post.type === 'text' ? (_jsx("p", { className: "text-gray-800 text-lg leading-relaxed whitespace-pre-wrap", children: post.content })) : (_jsx("p", { className: "text-gray-600 leading-relaxed", children: post.excerpt || "No content available." })) }), post.tags && post.tags.length > 0 && (_jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: post.tags.map((tag, i) => (_jsxs("span", { className: "bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full font-medium", children: ["#", tag] }, i))) })), post.type === 'blog' && post.keywords && post.keywords.length > 0 && (_jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: post.keywords.map((keyword, i) => (_jsx("span", { className: "bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md", children: keyword }, i))) })), _jsx("div", { className: "mb-4", children: _jsxs("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.type === 'image' ? 'bg-green-100 text-green-800' :
                        post.type === 'video' ? 'bg-purple-100 text-purple-800' :
                            post.type === 'text' ? 'bg-blue-100 text-blue-800' :
                                'bg-orange-100 text-orange-800'}`, children: [post.type === 'image' && '📷 Image', post.type === 'video' && '🎥 Video', post.type === 'text' && '✍️ Post', post.type === 'blog' && '📝 Blog'] }) }), _jsxs("div", { className: "mt-4 flex items-center gap-3", children: [_jsxs("button", { onClick: handleLike, className: `flex items-center gap-2 px-4 py-2 rounded-md border ${liked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-700 hover:bg-gray-50'}`, "aria-pressed": liked, children: [_jsx("span", { children: liked ? "❤️" : "🤍" }), _jsx("span", { children: likes })] }), _jsxs("button", { onClick: () => setShowComments((s) => !s), className: "flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50", children: ["\uD83D\uDCAC", _jsx("span", { children: comments.length })] }), _jsxs("button", { onClick: handleShare, className: "flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50", children: ["\uD83D\uDD17", _jsx("span", { children: shareCopied ? "Copied" : `Share (${shares})` })] }), _jsx("button", { onClick: () => alert(post.content.replace(/<[^>]+>/g, "")), className: "ml-auto px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700", children: "Read More" })] }), showComments && (_jsxs("div", { className: "mt-4 border-t pt-4", children: [_jsxs("div", { className: "flex gap-2 mb-3", children: [loggedUser ? (_jsxs("div", { className: "w-40 px-3 py-2 border rounded flex items-center gap-2 bg-gray-50", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold overflow-hidden", children: loggedUser.avatar ? (_jsx("img", { src: loggedUser.avatar, alt: loggedUser.name, className: "w-full h-full object-cover" })) : ((loggedUser.name || "U").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase()) }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium", children: loggedUser.name || "User" }), loggedUser.username && _jsxs("div", { className: "text-xs text-gray-500", children: ["@", loggedUser.username] })] })] })) : (_jsx("input", { value: commentAuthor, onChange: (e) => setCommentAuthor(e.target.value), placeholder: "Your name (optional)", className: "w-40 px-3 py-2 border rounded" })), _jsx("input", { value: commentText, onChange: (e) => setCommentText(e.target.value), placeholder: "Write a comment...", className: "flex-1 px-3 py-2 border rounded" }), _jsx("button", { onClick: handleAddComment, className: "px-4 py-2 bg-blue-600 text-white rounded", children: "Post" })] }), _jsx("div", { className: "mt-3 space-y-3", children: comments.length === 0 ? (_jsx("p", { className: "text-sm text-gray-500", children: "No comments yet." })) : (comments.map((c, i) => (_jsxs("div", { className: "p-3 bg-gray-50 rounded flex gap-3 relative", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm text-gray-700 overflow-hidden", children: c.avatar ? (_jsx("img", { src: c.avatar, alt: c.author, className: "w-full h-full object-cover" })) : (c.author.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase()) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsxs("p", { className: "text-sm font-semibold", children: [c.author, " ", c.username && _jsxs("span", { className: "text-xs text-gray-400 ml-2", children: ["@", c.username] })] }), _jsx("p", { className: "text-xs text-gray-400", children: c.time })] }) }), _jsx("p", { className: "mt-2 text-sm", children: c.text })] }), _jsx("div", { className: "absolute right-3 top-3", children: _jsx("button", { onClick: () => handleDeleteComment(i), className: "text-xs text-red-600 hover:underline", children: "Delete" }) })] }, i)))) })] }))] }));
};
export default PostPublish;
