import React, { useRef, useState, useEffect } from "react";
import ImageUpload from "../NewsFeed/Components/ImageUpload";
import VideoUpload from "../NewsFeed/Components/VideoUpload";
import SimplePost from "../NewsFeed/Components/SimplePost";

interface Club {
    id: number;
    name: string;
    sport: string;
    city: string;
    foundedYear?: number;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
    cover?: string; // cover image URL
    logo?: string;  // logo/profile image URL
    gallery?: string[];
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
}

interface ClubProfileProps {
    club: Club;
    onBack: () => void;
    onUpdate: (next: Club) => void;
}

const getFollows = () => { try { return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}'); } catch { return { clubs: [], teams: [], events: [] }; } };
const setFollows = (obj: any) => { try { localStorage.setItem('follows', JSON.stringify(obj)); } catch { } };

const ClubProfile: React.FC<ClubProfileProps> = ({ club, onBack, onUpdate }) => {
    const [draft, setDraft] = useState<Club>({ ...club, gallery: club.gallery || [] });

    const coverInputRef = useRef<HTMLInputElement | null>(null);
    const logoInputRef = useRef<HTMLInputElement | null>(null);
    const galleryInputRef = useRef<HTMLInputElement | null>(null);

    const [showImage, setShowImage] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showText, setShowText] = useState(false);

    const [posts, setPosts] = useState<any[]>([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(saved.filter((p: any) => p.entity?.type === 'club' && p.entity?.id === club.id));
    }, [club.id]);

    const handleCreatePost = (post: any) => {
        const all = JSON.parse(localStorage.getItem('posts') || '[]');
        const next = [post, ...all];
        localStorage.setItem('posts', JSON.stringify(next));
        setPosts((prev) => [post, ...prev]);
        setShowImage(false); setShowVideo(false); setShowText(false);
    };

    const pickFile = (ref: React.RefObject<HTMLInputElement>) => ref.current?.click();

    const handleImageFile = (file: File, key: 'cover' | 'logo') => {
        const url = URL.createObjectURL(file);
        setDraft(prev => ({ ...prev, [key]: url }));
    };

    const handleGalleryFiles = (files: FileList | null) => {
        if (!files || !files.length) return;
        const urls: string[] = [];
        Array.from(files).forEach(f => urls.push(URL.createObjectURL(f)));
        setDraft(prev => ({ ...prev, gallery: [...(prev.gallery || []), ...urls] }));
    };

    const removeGalleryItem = (url: string) => {
        setDraft(prev => ({ ...prev, gallery: (prev.gallery || []).filter(u => u !== url) }));
    };

    const handleSave = () => {
        onUpdate(draft);
    };

    const { clubs: followedClubs, teams: ft, events: fe } = getFollows();
    const isFollowing = followedClubs.includes(club.id);
    const toggleFollow = () => {
        const next = getFollows();
        const set = new Set<number>(next.clubs);
        if (set.has(club.id)) set.delete(club.id); else set.add(club.id);
        next.clubs = Array.from(set);
        setFollows(next);
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="relative">
                <img
                    src={draft.cover || "https://via.placeholder.com/1200x300?text=Club+Cover"}
                    alt="cover"
                    className="w-full h-56 md:h-64 object-cover rounded-lg"
                />
                <button
                    onClick={() => pickFile(coverInputRef)}
                    className="absolute right-3 top-3 bg-white px-3 py-1 rounded shadow text-sm"
                >
                    Change Cover
                </button>
                <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files && handleImageFile(e.target.files[0], 'cover')}
                />

                <div className="absolute -bottom-8 left-6 flex items-end gap-3">
                    <div className="relative">
                        <img
                            src={draft.logo || "https://via.placeholder.com/150?text=Logo"}
                            alt="logo"
                            className="w-24 h-24 rounded-full border-4 border-white object-cover"
                        />
                        <button
                            onClick={() => pickFile(logoInputRef)}
                            className="absolute right-0 bottom-0 bg-white p-1 rounded-full shadow"
                            title="Change logo"
                        >
                            ✎
                        </button>
                        <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => e.target.files && handleImageFile(e.target.files[0], 'logo')}
                        />
                    </div>
                    <div className="mb-2">
                        <h1 className="text-2xl font-bold">{draft.name}</h1>
                        <p className="text-gray-600">{draft.sport} · {draft.city}{draft.foundedYear ? ` · Since ${draft.foundedYear}` : ''}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-12 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex gap-2">
                    <button onClick={() => setShowImage(true)} className="px-3 py-2 rounded bg-green-600 text-white">📷 Image</button>
                    <button onClick={() => setShowVideo(true)} className="px-3 py-2 rounded bg-purple-600 text-white">🎥 Video</button>
                    <button onClick={() => setShowText(true)} className="px-3 py-2 rounded bg-blue-600 text-white">✍️ Post</button>
                </div>
                <div className="flex gap-2">
                    <button onClick={onBack} className="px-4 py-2 rounded bg-gray-100">← Back</button>
                    <button onClick={handleSave} className="px-5 py-2 rounded bg-blue-600 text-white">Save Changes</button>
                    <button onClick={toggleFollow} className={`px-4 py-2 rounded ${isFollowing ? 'bg-gray-200' : 'bg-rose-600 text-white'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
                </div>
            </div>

            {/* About & Contacts */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-white rounded-lg p-4 border">
                    <h2 className="font-semibold mb-2">About</h2>
                    <textarea
                        value={draft.description || ''}
                        onChange={(e) => setDraft(prev => ({ ...prev, description: e.target.value }))}
                        rows={5}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Describe your club"
                    />
                </div>
                <div className="bg-white rounded-lg p-4 border">
                    <h2 className="font-semibold mb-2">Contacts</h2>
                    <div className="space-y-2">
                        <input value={draft.contactEmail || ''} onChange={(e) => setDraft(p => ({ ...p, contactEmail: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Email" />
                        <input value={draft.contactPhone || ''} onChange={(e) => setDraft(p => ({ ...p, contactPhone: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Phone" />
                        <input value={draft.website || ''} onChange={(e) => setDraft(p => ({ ...p, website: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Website" />
                        <input value={draft.facebook || ''} onChange={(e) => setDraft(p => ({ ...p, facebook: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Facebook" />
                        <input value={draft.instagram || ''} onChange={(e) => setDraft(p => ({ ...p, instagram: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Instagram" />
                        <input value={draft.twitter || ''} onChange={(e) => setDraft(p => ({ ...p, twitter: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Twitter/X" />
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <div className="mt-6 bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold">Gallery</h2>
                    <button onClick={() => pickFile(galleryInputRef)} className="px-3 py-1 rounded bg-gray-100">Upload Images</button>
                </div>
                <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => handleGalleryFiles(e.target.files)}
                />
                {(draft.gallery || []).length === 0 ? (
                    <p className="text-gray-500">No images yet.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {(draft.gallery || []).map((url) => (
                            <div key={url} className="relative group">
                                <img src={url} alt="g" className="w-full h-32 object-cover rounded" />
                                <button onClick={() => removeGalleryItem(url)} className="hidden group-hover:block absolute right-2 top-2 bg-white px-2 py-1 rounded text-xs">Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Posts for this Club */}
            <div className="mt-6 bg-white rounded-lg p-4 border">
                <h2 className="font-semibold mb-3">Posts</h2>
                {posts.length === 0 ? (
                    <p className="text-gray-500">No posts yet.</p>
                ) : (
                    <div className="space-y-3">
                        {posts.map(p => (
                            <div key={p.id} className="border rounded p-3">
                                <div className="text-xs text-gray-500 mb-1">{new Date(p.timestamp).toLocaleString()} · {p.createdBy}</div>
                                {p.type === 'text' && <p className="text-gray-800">{p.content}</p>}
                                {p.type === 'image' && p.featureImage && (
                                    <img src={p.featureImage} alt="post" className="w-full max-h-80 object-cover rounded" />
                                )}
                                {p.type === 'video' && p.videoUrl && (
                                    <video src={p.videoUrl} controls className="w-full max-h-80 object-cover rounded" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {showImage && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowImage(false)} />
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-end p-4"><button onClick={() => setShowImage(false)} className="text-xl">✕</button></div>
                        <ImageUpload onCreate={handleCreatePost} onClose={() => setShowImage(false)} entity={{ type: 'club', id: club.id }} />
                    </div>
                </div>
            )}
            {showVideo && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowVideo(false)} />
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-end p-4"><button onClick={() => setShowVideo(false)} className="text-xl">✕</button></div>
                        <VideoUpload onCreate={handleCreatePost} onClose={() => setShowVideo(false)} entity={{ type: 'club', id: club.id }} />
                    </div>
                </div>
            )}
            {showText && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowText(false)} />
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-end p-4"><button onClick={() => setShowText(false)} className="text-xl">✕</button></div>
                        <SimplePost onCreate={handleCreatePost} onClose={() => setShowText(false)} entity={{ type: 'club', id: club.id }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClubProfile;
