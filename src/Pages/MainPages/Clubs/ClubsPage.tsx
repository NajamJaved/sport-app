import React, { useEffect, useMemo, useState } from "react";
import ClubProfile from "./ClubProfile";

interface Club {
    id: number;
    name: string;
    sport: string;
    city: string;
    foundedYear?: number;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
    cover?: string;
    logo?: string;
    gallery?: string[];
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    ownerName?: string;
}

const ALL_SPORTS = [
    "Football",
    "Cricket",
    "Hockey",
    "Basketball",
    "Volleyball",
    "Tennis",
    "Table Tennis",
    "Badminton",
    "Rugby",
    "Baseball",
    "Futsal",
    "Handball",
    "Swimming",
    "Athletics",
    "Boxing",
    "MMA",
    "Wrestling",
    "Cycling",
    "Squash",
    "Golf"
];

const getUserName = () => { try { return JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User'; } catch { return 'User'; } };
const getFollows = () => { try { return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}'); } catch { return { clubs: [], teams: [], events: [] }; } };

const ClubsPage: React.FC = () => {
    const [clubs, setClubs] = useState<Club[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [city, setCity] = useState("");
    const [foundedYear, setFoundedYear] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");

    const [sportFilter, setSportFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState<'all' | 'my' | 'following'>('all');

    const [viewId, setViewId] = useState<number | null>(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("clubs") || "[]");
        setClubs(saved);
    }, []);

    const persist = (next: Club[]) => { try { localStorage.setItem("clubs", JSON.stringify(next)); } catch {} };

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setSport("");
        setCity("");
        setFoundedYear("");
        setDescription("");
        setContactEmail("");
        setContactPhone("");
    };

    const openCreate = () => {
        resetForm();
        setIsOpen(true);
    };

    const openEdit = (club: Club) => {
        setEditingId(club.id);
        setName(club.name);
        setSport(club.sport);
        setCity(club.city);
        setFoundedYear(club.foundedYear ?? "");
        setDescription(club.description ?? "");
        setContactEmail(club.contactEmail ?? "");
        setContactPhone(club.contactPhone ?? "");
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !sport || !city.trim()) return;

        if (editingId) {
            const next = clubs.map(c => c.id === editingId ? {
                ...c,
                name: name.trim(),
                sport,
                city: city.trim(),
                foundedYear: foundedYear ? Number(foundedYear) : undefined,
                description: description.trim() || undefined,
                contactEmail: contactEmail.trim() || undefined,
                contactPhone: contactPhone.trim() || undefined,
            } : c);
            setClubs(next);
            persist(next);
        } else {
            const newClub: Club = {
                id: Date.now(),
                name: name.trim(),
                sport,
                city: city.trim(),
                foundedYear: foundedYear ? Number(foundedYear) : undefined,
                description: description.trim() || undefined,
                contactEmail: contactEmail.trim() || undefined,
                contactPhone: contactPhone.trim() || undefined,
                ownerName: getUserName(),
            };
            const next = [newClub, ...clubs];
            setClubs(next);
            persist(next);
        }

        setIsOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm("Delete this club?")) return;
        const next = clubs.filter(c => c.id !== id);
        setClubs(next);
        persist(next);
    };

    const handleProfileUpdate = (next: Club) => {
        const updated = clubs.map(c => c.id === next.id ? next : c);
        setClubs(updated);
        persist(updated);
        setViewId(null);
    };

    const { clubs: followedClubs } = getFollows();
    const userName = getUserName();

    const filtered = useMemo(() => {
        return clubs.filter(c =>
            (!sportFilter || c.sport === sportFilter) &&
            (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase())) &&
            (filterMode === 'all' || (filterMode === 'my' && c.ownerName === userName) || (filterMode === 'following' && followedClubs.includes(c.id)))
        );
    }, [clubs, sportFilter, search, filterMode, userName, followedClubs]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            {viewId !== null ? (
                <ClubProfile
                    club={clubs.find(c => c.id === viewId)!}
                    onBack={() => setViewId(null)}
                    onUpdate={handleProfileUpdate}
                />
            ) : (
            <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Clubs</h1>
                        <p className="text-gray-600">All sports clubs</p>
                    </div>
                    <button onClick={openCreate} className="px-4 py-2 rounded bg-blue-600 text-white">+ Create Club</button>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <div className="flex gap-2">
                        <button onClick={() => setFilterMode('all')} className={`px-3 py-1 rounded ${filterMode==='all'?'bg-blue-600 text-white':'bg-gray-100'}`}>All</button>
                        <button onClick={() => setFilterMode('my')} className={`px-3 py-1 rounded ${filterMode==='my'?'bg-blue-600 text-white':'bg-gray-100'}`}>My</button>
                        <button onClick={() => setFilterMode('following')} className={`px-3 py-1 rounded ${filterMode==='following'?'bg-blue-600 text-white':'bg-gray-100'}`}>Following</button>
                    </div>
                    <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)} className="border rounded px-3 py-2">
                        <option value="">All sports</option>
                        {ALL_SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded px-3 py-2 w-full sm:w-72" placeholder="Search by name or city" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                {filtered.length === 0 ? (
                    <p className="text-gray-500">No clubs yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map(c => (
                            <div key={c.id} className="border rounded-lg p-4 cursor-pointer" onClick={() => setViewId(c.id)}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">{c.name}</h3>
                                        <p className="text-sm text-gray-600">{c.sport} · {c.city}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={(e) => { e.stopPropagation(); openEdit(c); }} className="text-blue-600 text-sm">Edit</button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }} className="text-red-600 text-sm">Delete</button>
                                    </div>
                                </div>
                                {c.foundedYear && <p className="text-sm mt-1">Founded: {c.foundedYear}</p>}
                                {c.description && <p className="text-sm text-gray-700 mt-2">{c.description}</p>}
                                {(c.contactEmail || c.contactPhone) && (
                                    <div className="text-xs text-gray-500 mt-2">
                                        {c.contactEmail && <p>Email: {c.contactEmail}</p>}
                                        {c.contactPhone && <p>Phone: {c.contactPhone}</p>}
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
                    <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">{editingId ? 'Edit Club' : 'Create Club'}</h2>
                            <button onClick={() => { setIsOpen(false); resetForm(); }} className="text-xl">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g., Lahore United" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                                <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full border rounded px-3 py-2" required>
                                    <option value="">Select sport</option>
                                    {ALL_SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g., Lahore" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
                                <input type="number" value={foundedYear} onChange={(e) => setFoundedYear(e.target.value ? Number(e.target.value) : "")} className="w-full border rounded px-3 py-2" placeholder="e.g., 1998" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} placeholder="About the club (optional)" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                                <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="03xx-xxxxxxx" />
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-3">
                                <button type="button" onClick={resetForm} className="px-4 py-2 rounded bg-gray-100">Reset</button>
                                <button type="submit" className="px-5 py-2 rounded bg-blue-600 text-white">{editingId ? 'Save Changes' : 'Add Club'}</button>
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

export default ClubsPage;
