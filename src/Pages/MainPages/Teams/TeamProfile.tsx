import React, { useRef, useState, useEffect } from "react";
import ImageUpload from "../NewsFeed/Components/ImageUpload";
import VideoUpload from "../NewsFeed/Components/VideoUpload";
import SimplePost from "../NewsFeed/Components/SimplePost";

interface TeamMember { id: number; name: string; position?: string; }
interface Team {
    id: number;
    name: string;
    sport: string;
    clubId?: number;
    starters: TeamMember[];
    reserves: TeamMember[];
    coach?: string;
    city?: string;
    cover?: string;
    logo?: string;
    about?: string;
}

interface TeamProfileProps {
    team: Team;
    clubs: { id: number; name: string }[];
    onBack: () => void;
    onUpdate: (next: Team) => void;
}

const getFollows = () => { try { return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}'); } catch { return { clubs: [], teams: [], events: [] }; } };
const setFollows = (obj: any) => { try { localStorage.setItem('follows', JSON.stringify(obj)); } catch { } };

const TeamProfile: React.FC<TeamProfileProps> = ({ team, clubs, onBack, onUpdate }) => {
    const [draft, setDraft] = useState<Team>({ ...team });

    const coverInputRef = useRef<HTMLInputElement | null>(null);
    const logoInputRef = useRef<HTMLInputElement | null>(null);

    const [showImage, setShowImage] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showText, setShowText] = useState(false);

    const [posts, setPosts] = useState<any[]>([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(saved.filter((p: any) => p.entity?.type === 'team' && p.entity?.id === team.id));
    }, [team.id]);

    const handleCreatePost = (post: any) => {
        const all = JSON.parse(localStorage.getItem('posts') || '[]');
        const next = [post, ...all];
        localStorage.setItem('posts', JSON.stringify(next));
        setPosts((prev) => [post, ...prev]);
        setShowImage(false); setShowVideo(false); setShowText(false);
    };

    const pick = (ref: React.RefObject<HTMLInputElement>) => ref.current?.click();
    const setImage = (file: File, key: 'cover' | 'logo') => {
        const url = URL.createObjectURL(file);
        setDraft(prev => ({ ...prev, [key]: url }));
    };

    const addMember = (listKey: 'starters' | 'reserves', name: string, position?: string) => {
        const nm = name.trim();
        if (!nm) return;
        setDraft(prev => ({ ...prev, [listKey]: [...prev[listKey], { id: Date.now(), name: nm, position: position || undefined }] }));
    };

    const removeMember = (listKey: 'starters' | 'reserves', id: number) => setDraft(prev => ({ ...prev, [listKey]: prev[listKey].filter(m => m.id !== id) }));

    const [starterName, setStarterName] = useState("");
    const [starterPos, setStarterPos] = useState("");
    const [reserveName, setReserveName] = useState("");
    const [reservePos, setReservePos] = useState("");

    const handleSave = () => onUpdate(draft);

    const { teams: followedTeams } = getFollows();
    const isFollowing = followedTeams.includes(team.id);
    const toggleFollow = () => {
        const next = getFollows();
        const set = new Set<number>(next.teams);
        if (set.has(team.id)) set.delete(team.id); else set.add(team.id);
        next.teams = Array.from(set);
        setFollows(next);
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="relative">
                <img src={draft.cover || "https://via.placeholder.com/1200x300?text=Team+Cover"} alt="cover" className="w-full h-56 md:h-64 object-cover rounded-lg" />
                <button onClick={() => pick(coverInputRef)} className="absolute right-3 top-3 bg-white px-3 py-1 rounded shadow text-sm">Change Cover</button>
                <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files && setImage(e.target.files[0], 'cover')} />
                <div className="absolute -bottom-8 left-6 flex items-end gap-3">
                    <div className="relative">
                        <img src={draft.logo || "https://via.placeholder.com/150?text=Logo"} alt="logo" className="w-24 h-24 rounded-full border-4 border-white object-cover" />
                        <button onClick={() => pick(logoInputRef)} className="absolute right-0 bottom-0 bg-white p-1 rounded-full shadow" title="Change logo">✎</button>
                        <input ref={logoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files && setImage(e.target.files[0], 'logo')} />
                    </div>
                    <div className="mb-2">
                        <h1 className="text-2xl font-bold">{draft.name}</h1>
                        <p className="text-gray-600">{draft.sport}{draft.city ? ` · ${draft.city}` : ''}</p>
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
                    <button onClick={handleSave} className="px-5 py-2 rounded bg-green-600 text-white">Save Changes</button>
                    <button onClick={toggleFollow} className={`px-4 py-2 rounded ${isFollowing ? 'bg-gray-200' : 'bg-rose-600 text-white'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
                </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-white rounded-lg p-4 border">
                    <h2 className="font-semibold mb-2">About</h2>
                    <textarea value={draft.about || ''} onChange={(e) => setDraft(p => ({ ...p, about: e.target.value }))} rows={5} className="w-full border rounded px-3 py-2" placeholder="Describe your team" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
                            <input value={draft.coach || ''} onChange={(e) => setDraft(p => ({ ...p, coach: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input value={draft.city || ''} onChange={(e) => setDraft(p => ({ ...p, city: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Linked Club</label>
                            <select value={draft.clubId ?? ''} onChange={(e) => setDraft(p => ({ ...p, clubId: e.target.value === '' ? undefined : Number(e.target.value) }))} className="w-full border rounded px-3 py-2">
                                <option value="">None</option>
                                {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                    <h2 className="font-semibold mb-2">Add Members</h2>
                    <div className="border rounded p-3 mb-3">
                        <h3 className="font-medium mb-2">Starters</h3>
                        <div className="flex gap-2 mb-2">
                            <input value={starterName} onChange={(e) => setStarterName(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Name" />
                            <input value={starterPos} onChange={(e) => setStarterPos(e.target.value)} className="w-36 border rounded px-3 py-2" placeholder="Position" />
                            <button type="button" onClick={() => { addMember('starters', starterName, starterPos); setStarterName(''); setStarterPos(''); }} className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
                        </div>
                        <ul className="space-y-1">
                            {draft.starters.map(s => (
                                <li key={s.id} className="flex items-center justify-between text-sm bg-gray-50 border rounded px-3 py-1">
                                    <span>{s.name}{s.position ? ` — ${s.position}` : ''}</span>
                                    <button onClick={() => removeMember('starters', s.id)} className="text-red-600">Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border rounded p-3">
                        <h3 className="font-medium mb-2">Reserves</h3>
                        <div className="flex gap-2 mb-2">
                            <input value={reserveName} onChange={(e) => setReserveName(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Name" />
                            <input value={reservePos} onChange={(e) => setReservePos(e.target.value)} className="w-36 border rounded px-3 py-2" placeholder="Position" />
                            <button type="button" onClick={() => { addMember('reserves', reserveName, reservePos); setReserveName(''); setReservePos(''); }} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
                        </div>
                        <ul className="space-y-1">
                            {draft.reserves.map(r => (
                                <li key={r.id} className="flex items-center justify-between text-sm bg-gray-50 border rounded px-3 py-1">
                                    <span>{r.name}{r.position ? ` — ${r.position}` : ''}</span>
                                    <button onClick={() => removeMember('reserves', r.id)} className="text-red-600">Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Team Posts */}
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
                        <ImageUpload onCreate={handleCreatePost} onClose={() => setShowImage(false)} entity={{ type: 'team', id: team.id }} />
                    </div>
                </div>
            )}
            {showVideo && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowVideo(false)} />
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-end p-4"><button onClick={() => setShowVideo(false)} className="text-xl">✕</button></div>
                        <VideoUpload onCreate={handleCreatePost} onClose={() => setShowVideo(false)} entity={{ type: 'team', id: team.id }} />
                    </div>
                </div>
            )}
            {showText && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowText(false)} />
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-end p-4"><button onClick={() => setShowText(false)} className="text-xl">✕</button></div>
                        <SimplePost onCreate={handleCreatePost} onClose={() => setShowText(false)} entity={{ type: 'team', id: team.id }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamProfile;
