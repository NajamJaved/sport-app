import React, { useRef, useState, useEffect } from "react";
import ImageUpload from "../NewsFeed/Components/ImageUpload";
import VideoUpload from "../NewsFeed/Components/VideoUpload";
import SimplePost from "../NewsFeed/Components/SimplePost";

interface EventItem {
    id: number;
    name: string;
    sport: string;
    type: 'Match' | 'Tournament' | 'Training' | 'Other';
    date: string;
    startTime?: string;
    endTime?: string;
    location: string;
    hostClubId?: number;
    description?: string;
    participants?: string[];
    cover?: string;
    badge?: string;
}

interface EventProfileProps {
    event: EventItem;
    clubs: { id: number; name: string }[];
    onBack: () => void;
    onUpdate: (next: EventItem) => void;
}

const getFollows = () => { try { return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}'); } catch { return { clubs: [], teams: [], events: [] }; } };
const setFollows = (obj: any) => { try { localStorage.setItem('follows', JSON.stringify(obj)); } catch { } };

const EventProfile: React.FC<EventProfileProps> = ({ event, clubs, onBack, onUpdate }) => {
    const [draft, setDraft] = useState<EventItem>({ ...event, participants: event.participants || [] });

    const coverRef = useRef<HTMLInputElement | null>(null);
    const badgeRef = useRef<HTMLInputElement | null>(null);

    const [showImage, setShowImage] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showText, setShowText] = useState(false);

    const [posts, setPosts] = useState<any[]>([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(saved.filter((p: any) => p.entity?.type === 'event' && p.entity?.id === event.id));
    }, [event.id]);

    const handleCreatePost = (post: any) => {
        const all = JSON.parse(localStorage.getItem('posts') || '[]');
        const next = [post, ...all];
        localStorage.setItem('posts', JSON.stringify(next));
        setPosts((prev) => [post, ...prev]);
        setShowImage(false); setShowVideo(false); setShowText(false);
    };

    const pick = (ref: React.RefObject<HTMLInputElement>) => ref.current?.click();
    const setImg = (file: File, key: 'cover' | 'badge') => {
        const url = URL.createObjectURL(file);
        setDraft(prev => ({ ...prev, [key]: url }));
    };

    const [participant, setParticipant] = useState("");
    const addParticipant = () => {
        const v = participant.trim();
        if (!v) return;
        setDraft(p => ({ ...p, participants: [...(p.participants || []), v] }));
        setParticipant("");
    };

    const removeParticipant = (name: string) => setDraft(p => ({ ...p, participants: (p.participants || []).filter(x => x !== name) }));

    const handleSave = () => onUpdate(draft);

    const { events: followedEvents } = getFollows();
    const isFollowing = followedEvents.includes(event.id);
    const toggleFollow = () => {
        const next = getFollows();
        const set = new Set<number>(next.events);
        if (set.has(event.id)) set.delete(event.id); else set.add(event.id);
        next.events = Array.from(set);
        setFollows(next);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="relative">
                <img src={draft.cover || "https://via.placeholder.com/1200x300?text=Event+Cover"} alt="cover" className="w-full h-56 md:h-64 object-cover rounded-lg" />
                <button onClick={() => pick(coverRef)} className="absolute right-3 top-3 bg-white px-3 py-1 rounded shadow text-sm">Change Cover</button>
                <input ref={coverRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files && setImg(e.target.files[0], 'cover')} />
                <div className="absolute -bottom-8 left-6 flex items-end gap-3">
                    <div className="relative">
                        <img src={draft.badge || "https://via.placeholder.com/150?text=Badge"} alt="badge" className="w-24 h-24 rounded-full border-4 border-white object-cover" />
                        <button onClick={() => pick(badgeRef)} className="absolute right-0 bottom-0 bg-white p-1 rounded-full shadow" title="Change badge">✎</button>
                        <input ref={badgeRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files && setImg(e.target.files[0], 'badge')} />
                    </div>
                    <div className="mb-2">
                        <h1 className="text-2xl font-bold">{draft.name}</h1>
                        <p className="text-gray-600">{draft.sport} · {draft.type} · {draft.date}</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex gap-2">
                    <button onClick={() => setShowImage(true)} className="px-3 py-2 rounded bg-green-600 text-white">📷 Image</button>
                    <button onClick={() => setShowVideo(true)} className="px-3 py-2 rounded bg-purple-600 text-white">🎥 Video</button>
                    <button onClick={() => setShowText(true)} className="px-3 py-2 rounded bg-blue-600 text-white">✍️ Post</button>
                </div>
                <div className="flex gap-2">
                    <button onClick={onBack} className="px-4 py-2 rounded bg-gray-100">← Back</button>
                    <button onClick={handleSave} className="px-5 py-2 rounded bg-purple-600 text-white">Save Changes</button>
                    <button onClick={toggleFollow} className={`px-4 py-2 rounded ${isFollowing ? 'bg-gray-200' : 'bg-rose-600 text-white'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-white rounded-lg p-4 border">
                    <h2 className="font-semibold mb-2">About</h2>
                    <textarea value={draft.description || ''} onChange={(e) => setDraft(p => ({ ...p, description: e.target.value }))} rows={5} className="w-full border rounded px-3 py-2" placeholder="Describe the event" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select value={draft.type} onChange={(e) => setDraft(p => ({ ...p, type: e.target.value as EventItem['type'] }))} className="w-full border rounded px-3 py-2">
                                {['Match', 'Tournament', 'Training', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" value={draft.date} onChange={(e) => setDraft(p => ({ ...p, date: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                            <input type="time" value={draft.startTime || ''} onChange={(e) => setDraft(p => ({ ...p, startTime: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                            <input type="time" value={draft.endTime || ''} onChange={(e) => setDraft(p => ({ ...p, endTime: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input value={draft.location} onChange={(e) => setDraft(p => ({ ...p, location: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Host Club (optional)</label>
                            <select value={draft.hostClubId ?? ''} onChange={(e) => setDraft(p => ({ ...p, hostClubId: e.target.value === '' ? undefined : Number(e.target.value) }))} className="w-full border rounded px-3 py-2">
                                <option value="">None</option>
                                {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                    <h2 className="font-semibold mb-2">Participants</h2>
                    <div className="flex gap-2 mb-2">
                        <input value={participant} onChange={(e) => setParticipant(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Team/Club name" />
                        <button onClick={addParticipant} className="px-3 py-2 bg-purple-600 text-white rounded">Add</button>
                    </div>
                    {(draft.participants || []).length === 0 ? (
                        <p className="text-gray-500 text-sm">No participants added.</p>
                    ) : (
                        <ul className="space-y-1">
                            {(draft.participants || []).map(p => (
                                <li key={p} className="flex items-center justify-between text-sm bg-gray-50 border rounded px-3 py-1">
                                    <span>{p}</span>
                                    <button onClick={() => removeParticipant(p)} className="text-red-600">Remove</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Event Posts */}
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
                        <ImageUpload onCreate={handleCreatePost} onClose={() => setShowImage(false)} entity={{ type: 'event', id: event.id }} />
                    </div>
                </div>
            )}
            {showVideo && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowVideo(false)} />
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-end p-4"><button onClick={() => setShowVideo(false)} className="text-xl">✕</button></div>
                        <VideoUpload onCreate={handleCreatePost} onClose={() => setShowVideo(false)} entity={{ type: 'event', id: event.id }} />
                    </div>
                </div>
            )}
            {showText && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowText(false)} />
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-end p-4"><button onClick={() => setShowText(false)} className="text-xl">✕</button></div>
                        <SimplePost onCreate={handleCreatePost} onClose={() => setShowText(false)} entity={{ type: 'event', id: event.id }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventProfile;
