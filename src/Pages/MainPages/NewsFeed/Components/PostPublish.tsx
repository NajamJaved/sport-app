import React, { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    keywords: string[];
    featureImage: string | null;
    type: 'image' | 'video' | 'text' | 'blog';
    videoUrl?: string;
    likes?: number;
    shares?: number;
    views?: number;
    comments?: CommentItem[];
}

interface CommentItem {
    author: string;
    username?: string;
    text: string;
    avatar?: string | null;
    time: string;
}

interface PostPublishProps {
    post: Post | null;
    onUpdate?: (id: number, patchOrFn: Partial<Post> | ((prev: Post) => Partial<Post>)) => void;
}

const PostPublish: React.FC<PostPublishProps> = ({ post, onUpdate }) => {
    if (!post) return null;

    // try to read logged-in user from localStorage (adjust key if your app uses different key)
    const stored =
        (typeof window !== "undefined" && (localStorage.getItem("user") || localStorage.getItem("authUser") || localStorage.getItem("currentUser"))) ||
        null;
    let loggedUser: { name?: string; username?: string; avatar?: string } | null = null;
    if (stored) {
        try {
            loggedUser = JSON.parse(stored);
        } catch {
            loggedUser = null;
        }
    }

    // local interactive state (initialize from post)
    const [likes, setLikes] = useState<number>(post.likes ?? 0);
    const [liked, setLiked] = useState<boolean>(false);
    const [showComments, setShowComments] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentItem[]>(post.comments ?? []);
    const [commentText, setCommentText] = useState<string>("");
    const [commentAuthor, setCommentAuthor] = useState<string>(""); // input for commenter name
    const [shareCopied, setShareCopied] = useState<boolean>(false);
    const [shares, setShares] = useState<number>(post.shares ?? 0);
    const [views, setViews] = useState<number>(post.views ?? 0);

    // Sync local interactive state when parent post updates
    useEffect(() => {
        setLikes(post.likes ?? 0);
        setShares(post.shares ?? 0);
        setViews(post.views ?? 0);
        setComments(post.comments ?? []);
    }, [post?.id, post?.likes, post?.shares, post?.views, JSON.stringify(post?.comments || [])]);

    // increment view on mount (persist)
    useEffect(() => {
        if (!post) return;
        setViews((v) => v + 1);
        onUpdate?.(post.id, (prev) => ({ views: (prev.views ?? 0) + 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = () => {
        const newLiked = !liked;
        const newLikes = newLiked ? (likes + 1) : Math.max(0, likes - 1);
        setLiked(newLiked);
        setLikes(newLikes);
        onUpdate?.(post!.id, (prev) => ({ likes: newLikes }));
    };

    const handleAddComment = () => {
        const txt = commentText.trim();
        if (!txt) return;
        // prefer logged-in user details
        const author = loggedUser?.name?.trim() || commentAuthor.trim() || "Anonymous";
        const username = loggedUser?.username?.trim();
        const avatar = loggedUser?.avatar ?? null;
        const newComment: CommentItem = {
            author,
            username,
            text: txt,
            avatar, // prefer logged user's avatar if available
            time: new Date().toLocaleString(),
        };
        const next = [newComment, ...comments];
        setComments(next);
        // persist to parent
        onUpdate?.(post!.id, (prev) => ({ comments: next }));
        setCommentText("");
        setCommentAuthor("");
        setShowComments(true);
    };

    const handleShare = async () => {
        // increment share immediately and persist
        const nextShares = (shares ?? 0) + 1;
        setShares(nextShares);
        onUpdate?.(post!.id, (prev) => ({ shares: nextShares }));

        const url = `${window.location.origin}${window.location.pathname}#post-${post.id}`;
        try {
            await navigator.clipboard.writeText(url);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2000);
        } catch {
            // fallback: open native share if available
            if ((navigator as any).share) {
                try {
                    await (navigator as any).share({ title: post.title, text: post.excerpt, url });
                } catch { }
            }
        }
    };

    // delete comment by index (only allowed for comment author / logged user)
    const handleDeleteComment = (index: number) => {
        if (!comments[index]) return;
        const c = comments[index];
        const canDelete =
            loggedUser &&
            ((loggedUser.username && c.username && loggedUser.username === c.username) ||
                (loggedUser.name && loggedUser.name === c.author));
        // allow delete also if commenter is "Anonymous" and same name entered (optional)
        if (!canDelete) {
            // optionally allow authorless delete by confirmation (comment owner check recommended)
            if (!confirm("You are not the comment author. Do you want to delete this comment?")) return;
        } else {
            if (!confirm("Delete this comment?")) return;
        }

        const next = comments.filter((_, i) => i !== index);
        setComments(next);
        onUpdate?.(post!.id, (prev) => ({ comments: next }));
    };

    return (
        <div id={`post-${post.id}`} className="bg-white  p-6 mt-8  mx-auto w-[100%] transition-transform transform  border border-gray-200 rounded-lg">
            {/* User Header Section - Like Facebook */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {loggedUser?.avatar ? (
                        <img
                            src={loggedUser.avatar}
                            alt={loggedUser.name || "User"}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-lg font-semibold text-gray-600">
                            {(loggedUser?.name || "U").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase()}
                        </span>
                    )}
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-lg">
                        {loggedUser?.name || "Anonymous User"}
                    </div>
                    {loggedUser?.username && (
                        <div className="text-sm text-gray-500">
                            @{loggedUser.username}
                        </div>
                    )}
                    <div className="text-xs text-gray-400">
                        {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            </div>

            {/* Content Display based on Post Type */}
            {post.type === 'image' && post.featureImage && (
                <div className="mb-5">
                    <img
                        src={post.featureImage}
                        alt="Post Image"
                        className="w-full max-h-96 object-cover rounded-lg"
                    />
                </div>
            )}

            {post.type === 'video' && post.videoUrl && (
                <div className="mb-5">
                    <video
                        src={post.videoUrl}
                        controls
                        className="w-full max-h-96 object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Title - Only show for blog posts */}
            {post.type === 'blog' && (
                <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                    {post.title}
                </h2>
            )}

            {/* Content/Excerpt */}
            <div className="mb-5">
                {post.type === 'text' ? (
                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </p>
                ) : (
                    <p className="text-gray-600 leading-relaxed">
                        {post.excerpt || "No content available."}
                    </p>
                )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Keywords - Only show for blog posts */}
            {post.type === 'blog' && post.keywords && post.keywords.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {post.keywords.map((keyword, i) => (
                        <span
                            key={i}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            )}

            {/* Post Type Badge */}
            <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.type === 'image' ? 'bg-green-100 text-green-800' :
                    post.type === 'video' ? 'bg-purple-100 text-purple-800' :
                        post.type === 'text' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                    }`}>
                    {post.type === 'image' && '📷 Image'}
                    {post.type === 'video' && '🎥 Video'}
                    {post.type === 'text' && '✍️ Post'}
                    {post.type === 'blog' && '📝 Blog'}
                </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex items-center gap-3">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md border ${liked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    aria-pressed={liked}
                >
                    <span>{liked ? "❤️" : "🤍"}</span>
                    <span>{likes}</span>
                </button>

                <button
                    onClick={() => setShowComments((s) => !s)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50"
                >
                    💬
                    <span>{comments.length}</span>
                </button>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50"
                >
                    🔗
                    <span>{shareCopied ? "Copied" : `Share (${shares})`}</span>
                </button>

                <button
                    onClick={() => alert(post.content.replace(/<[^>]+>/g, ""))}
                    className="ml-auto px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                >
                    Read More
                </button>
            </div>

            {/* Comments area */}
            {showComments && (
                <div className="mt-4 border-t pt-4">
                    <div className="flex gap-2 mb-3">
                        {loggedUser ? (
                            <div className="w-40 px-3 py-2 border rounded flex items-center gap-2 bg-gray-50">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold overflow-hidden">
                                    {loggedUser.avatar ? (
                                        <img src={loggedUser.avatar} alt={loggedUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        (loggedUser.name || "U").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase()
                                    )}
                                </div>
                                <div className="text-sm">
                                    <div className="font-medium">{loggedUser.name || "User"}</div>
                                    {loggedUser.username && <div className="text-xs text-gray-500">@{loggedUser.username}</div>}
                                </div>
                            </div>
                        ) : (
                            <input
                                value={commentAuthor}
                                onChange={(e) => setCommentAuthor(e.target.value)}
                                placeholder="Your name (optional)"
                                className="w-40 px-3 py-2 border rounded"
                            />
                        )}
                        <input
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 px-3 py-2 border rounded"
                        />
                        <button
                            onClick={handleAddComment}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Post
                        </button>
                    </div>

                    <div className="mt-3 space-y-3">
                        {comments.length === 0 ? (
                            <p className="text-sm text-gray-500">No comments yet.</p>
                        ) : (
                            comments.map((c, i) => (
                                <div key={i} className="p-3 bg-gray-50 rounded flex gap-3 relative">
                                    {/* avatar placeholder with initials */}
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm text-gray-700 overflow-hidden">
                                        {c.avatar ? (
                                            <img src={c.avatar} alt={c.author} className="w-full h-full object-cover" />
                                        ) : (
                                            c.author.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase()
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {c.author} {c.username && <span className="text-xs text-gray-400 ml-2">@{c.username}</span>}
                                                </p>
                                                <p className="text-xs text-gray-400">{c.time}</p>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm">{c.text}</p>
                                    </div>
                                    {/* delete button - visible to comment author (or after confirm) */}
                                    <div className="absolute right-3 top-3">
                                        <button
                                            onClick={() => handleDeleteComment(i)}
                                            className="text-xs text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostPublish;
