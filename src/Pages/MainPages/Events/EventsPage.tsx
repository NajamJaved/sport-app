import React, { useEffect, useMemo, useState } from "react";
import EventProfile from "./EventProfile";

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
    participants?: string[]; // team names or clubs
    cover?: string;
    badge?: string; // small logo/badge
    ownerName?: string;
}

const ALL_SPORTS = [
    "Football",
    "Cricket",
    "Hockey",
    "Basketball",
    "Volleyball",
    "Badminton",
    "Tennis",
];

const getUserName = () => { try { return JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User'; } catch { return 'User'; } };
const getFollows = () => { try { return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}'); } catch { return { clubs: [], teams: [], events: [] }; } };

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [clubs, setClubs] = useState<{ id: number; name: string }[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [type, setType] = useState<EventItem['type']>('Match');
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [hostClubId, setHostClubId] = useState<number | "">("");
    const [description, setDescription] = useState("");

    const [participantText, setParticipantText] = useState("");
    const [participants, setParticipants] = useState<string[]>([]);

    const [sportFilter, setSportFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState<'all' | 'my' | 'following'>('all');

    const [viewId, setViewId] = useState<number | null>(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("events") || "[]");
        setEvents(saved);
        const savedClubs = JSON.parse(localStorage.getItem("clubs") || "[]");
        setClubs(savedClubs.map((c: any) => ({ id: c.id, name: c.name })));
    }, []);

    const persist = (next: EventItem[]) => localStorage.setItem("events", JSON.stringify(next));

    const addParticipant = () => {
        const v = participantText.trim();
        if (!v) return;
        setParticipants(prev => [...prev, v]);
        setParticipantText("");
    };

    const removeParticipant = (name: string) => setParticipants(prev => prev.filter(p => p !== name));

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setSport("");
        setType('Match');
        setDate("");
        setStartTime("");
        setEndTime("");
        setLocation("");
        setHostClubId("");
        setDescription("");
        setParticipants([]);
        setParticipantText("");
    };

    const openCreate = () => {
        resetForm();
        setIsOpen(true);
    };

    const openEdit = (item: EventItem) => {
        setEditingId(item.id);
        setName(item.name);
        setSport(item.sport);
        setType(item.type);
        setDate(item.date);
        setStartTime(item.startTime || "");
        setEndTime(item.endTime || "");
        setLocation(item.location);
        setHostClubId(item.hostClubId ?? "");
        setDescription(item.description || "");
        setParticipants(item.participants || []);
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !sport || !date || !location.trim()) return;

        if (editingId) {
            const next = events.map(ev => ev.id === editingId ? {
                ...ev,
                name: name.trim(),
                sport,
                type,
                date,
                startTime: startTime || undefined,
                endTime: endTime || undefined,
                location: location.trim(),
                hostClubId: hostClubId === "" ? undefined : Number(hostClubId),
                description: description.trim() || undefined,
                participants: participants.length ? participants : undefined,
            } : ev);
            setEvents(next);
            persist(next);
        } else {
            const newEvent: EventItem = {
                id: Date.now(),
                name: name.trim(),
                sport,
                type,
                date,
                startTime: startTime || undefined,
                endTime: endTime || undefined,
                location: location.trim(),
                hostClubId: hostClubId === "" ? undefined : Number(hostClubId),
                description: description.trim() || undefined,
                participants: participants.length ? participants : undefined,
                ownerName: getUserName(),
            };
            const next = [newEvent, ...events];
            setEvents(next);
            persist(next);
        }

        setIsOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm("Delete this event?")) return;
        const next = events.filter(e => e.id !== id);
        setEvents(next);
        persist(next);
    };

    const handleProfileUpdate = (next: EventItem) => {
        const updated = events.map(e => e.id === next.id ? next : e);
        setEvents(updated);
        persist(updated);
        setViewId(null);
    };

    const { events: followedEvents } = getFollows();
    const userName = getUserName();

    const filtered = useMemo(() => {
        return events.filter(e =>
            (!sportFilter || e.sport === sportFilter) &&
            (!typeFilter || e.type === typeFilter) &&
            (!search || e.name.toLowerCase().includes(search.toLowerCase()) || (e.location || "").toLowerCase().includes(search.toLowerCase())) &&
            (filterMode === 'all' || (filterMode === 'my' && e.ownerName === userName) || (filterMode === 'following' && followedEvents.includes(e.id)))
        );
    }, [events, sportFilter, typeFilter, search, filterMode, userName, followedEvents]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            {viewId !== null ? (
                <EventProfile
                    event={events.find(e => e.id === viewId)!}
                    clubs={clubs}
                    onBack={() => setViewId(null)}
                    onUpdate={handleProfileUpdate}
                />
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h1 className="text-2xl font-bold">Events</h1>
                                <p className="text-gray-600">Matches, tournaments, trainings</p>
                            </div>
                            <button onClick={openCreate} className="px-4 py-2 rounded bg-purple-600 text-white">+ Create Event</button>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <div className="flex gap-2">
                                <button onClick={() => setFilterMode('all')} className={`px-3 py-1 rounded ${filterMode === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>All</button>
                                <button onClick={() => setFilterMode('my')} className={`px-3 py-1 rounded ${filterMode === 'my' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>My</button>
                                <button onClick={() => setFilterMode('following')} className={`px-3 py-1 rounded ${filterMode === 'following' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Following</button>
                            </div>
                            <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)} className="border rounded px-3 py-2">
                                <option value="">All sports</option>
                                {ALL_SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border rounded px-3 py-2">
                                <option value="">All types</option>
                                {['Match', 'Tournament', 'Training', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded px-3 py-2 w-full sm:w-72" placeholder="Search by name or location" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        {filtered.length === 0 ? (
                            <p className="text-gray-500">No events yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filtered.map(e => (
                                    <div key={e.id} className="border rounded-lg p-4 cursor-pointer" onClick={() => setViewId(e.id)}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">{e.name}</h3>
                                                <p className="text-sm text-gray-600">{e.sport} · {e.type} · {e.date}</p>
                                                <p className="text-sm">Location: {e.location}</p>
                                                {e.hostClubId && <p className="text-sm">Host: {(clubs.find(c => c.id === e.hostClubId)?.name) || 'Unknown'}</p>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={(ev) => { ev.stopPropagation(); openEdit(e); }} className="text-blue-600 text-sm">Edit</button>
                                                <button onClick={(ev) => { ev.stopPropagation(); handleDelete(e.id); }} className="text-red-600 text-sm">Delete</button>
                                            </div>
                                        </div>
                                        {e.description && <p className="text-sm text-gray-700 mt-2">{e.description}</p>}
                                        {e.participants && e.participants.length > 0 && (
                                            <div className="mt-2">
                                                <h4 className="font-medium">Participants ({e.participants.length})</h4>
                                                <ul className="list-disc list-inside text-sm text-gray-700">
                                                    {e.participants.map(p => <li key={p}>{p}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {isOpen && (
                        <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                            <div className="absolute inset-0 bg-black opacity-40" onClick={() => { setIsOpen(false); resetForm(); }} />
                            <div className="relative z-50 w-full max-w-3xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h2 className="text-lg font-semibold">{editingId ? 'Edit Event' : 'Create Event'}</h2>
                                    <button onClick={() => { setIsOpen(false); resetForm(); }} className="text-xl">✕</button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g., City Cup Final" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                                        <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full border rounded px-3 py-2" required>
                                            <option value="">Select sport</option>
                                            {ALL_SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                        <select value={type} onChange={(e) => setType(e.target.value as EventItem['type'])} className="w-full border rounded px-3 py-2">
                                            {['Match', 'Tournament', 'Training', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-3 py-2" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time (optional)</label>
                                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full border rounded px-3 py-2" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time (optional)</label>
                                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full border rounded px-3 py-2" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Stadium / Ground" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Host Club (optional)</label>
                                        <select value={hostClubId} onChange={(e) => setHostClubId(e.target.value === "" ? "" : Number(e.target.value))} className="w-full border rounded px-3 py-2">
                                            <option value="">None</option>
                                            {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Participants (optional)</label>
                                        <div className="flex gap-2 mb-2">
                                            <input value={participantText} onChange={(e) => setParticipantText(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Team/Club name" />
                                            <button type="button" onClick={addParticipant} className="px-3 py-2 bg-purple-600 text-white rounded">Add</button>
                                        </div>
                                        {participants.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {participants.map(p => (
                                                    <span key={p} className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                                        {p}
                                                        <button type="button" onClick={() => removeParticipant(p)} className="text-purple-700">×</button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} placeholder="About the event" />
                                    </div>

                                    <div className="md:col-span-2 flex justify-end gap-3">
                                        <button type="button" onClick={resetForm} className="px-4 py-2 rounded bg-gray-100">Reset</button>
                                        <button type="submit" className="px-5 py-2 rounded bg-purple-600 text-white">{editingId ? 'Save Changes' : 'Create Event'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EventsPage;
