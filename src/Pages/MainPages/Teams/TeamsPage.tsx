import React, { useEffect, useMemo, useState } from "react";
import TeamProfile from "./TeamProfile";

interface TeamMember {
    id: number;
    name: string;
    position?: string;
}

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
    "Table Tennis",
];

const getUserName = () => { try { return JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User'; } catch { return 'User'; } };
const getFollows = () => { try { return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}'); } catch { return { clubs: [], teams: [], events: [] }; } };

const TeamsPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [clubs, setClubs] = useState<{ id: number; name: string }[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [clubId, setClubId] = useState<number | "">("");
    const [coach, setCoach] = useState("");
    const [city, setCity] = useState("");

    const [starterName, setStarterName] = useState("");
    const [starterPosition, setStarterPosition] = useState("");
    const [reserveName, setReserveName] = useState("");
    const [reservePosition, setReservePosition] = useState("");

    const [starters, setStarters] = useState<TeamMember[]>([]);
    const [reserves, setReserves] = useState<TeamMember[]>([]);

    const [sportFilter, setSportFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState<'all' | 'my' | 'following'>('all');

    const [viewId, setViewId] = useState<number | null>(null);

    useEffect(() => {
        const savedTeams = JSON.parse(localStorage.getItem("teams") || "[]");
        setTeams(savedTeams);
        const savedClubs = JSON.parse(localStorage.getItem("clubs") || "[]");
        setClubs(savedClubs.map((c: any) => ({ id: c.id, name: c.name })));
    }, []);

    const persist = (next: Team[]) => { try { localStorage.setItem("teams", JSON.stringify(next)); } catch { } };

    const addStarter = () => {
        const nm = starterName.trim();
        if (!nm) return;
        setStarters(prev => [...prev, { id: Date.now(), name: nm, position: starterPosition || undefined }]);
        setStarterName("");
        setStarterPosition("");
    };

    const addReserve = () => {
        const nm = reserveName.trim();
        if (!nm) return;
        setReserves(prev => [...prev, { id: Date.now(), name: nm, position: reservePosition || undefined }]);
        setReserveName("");
        setReservePosition("");
    };

    const onStarterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { e.preventDefault(); addStarter(); }
    };
    const onReserveKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { e.preventDefault(); addReserve(); }
    };

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setSport("");
        setClubId("");
        setCoach("");
        setCity("");
        setStarters([]);
        setReserves([]);
        setStarterName("");
        setStarterPosition("");
        setReserveName("");
        setReservePosition("");
    };

    const openCreate = () => {
        resetForm();
        setIsOpen(true);
    };

    const openEdit = (team: Team) => {
        setEditingId(team.id);
        setName(team.name);
        setSport(team.sport);
        setClubId(team.clubId ?? "");
        setCoach(team.coach ?? "");
        setCity(team.city ?? "");
        setStarters(team.starters);
        setReserves(team.reserves);
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !sport || starters.length === 0) return;

        if (editingId) {
            const next = teams.map(t => t.id === editingId ? {
                ...t,
                name: name.trim(),
                sport,
                clubId: clubId === "" ? undefined : Number(clubId),
                starters,
                reserves,
                coach: coach.trim() || undefined,
                city: city.trim() || undefined,
            } : t);
            setTeams(next);
            persist(next);
        } else {
            const newTeam: Team = {
                id: Date.now(),
                name: name.trim(),
                sport,
                clubId: clubId === "" ? undefined : Number(clubId),
                starters,
                reserves,
                coach: coach.trim() || undefined,
                city: city.trim() || undefined,
                ownerName: getUserName(),
            };
            const next = [newTeam, ...teams];
            setTeams(next);
            persist(next);
        }

        setIsOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm("Delete this team?")) return;
        const next = teams.filter(t => t.id !== id);
        setTeams(next);
        persist(next);
    };

    const handleProfileUpdate = (next: Team) => {
        const updated = teams.map(t => t.id === next.id ? next : t);
        setTeams(updated);
        persist(updated);
        setViewId(null);
    };

    const { teams: followedTeams } = getFollows();
    const userName = getUserName();

    const filtered = useMemo(() => {
        return teams.filter(t =>
            (!sportFilter || t.sport === sportFilter) &&
            (!search || t.name.toLowerCase().includes(search.toLowerCase()) || (t.city || "").toLowerCase().includes(search.toLowerCase())) &&
            (filterMode === 'all' || (filterMode === 'my' && t.ownerName === userName) || (filterMode === 'following' && followedTeams.includes(t.id)))
        );
    }, [teams, sportFilter, search, filterMode, userName, followedTeams]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            {viewId !== null ? (
                <TeamProfile
                    team={teams.find(t => t.id === viewId)!}
                    clubs={clubs}
                    onBack={() => setViewId(null)}
                    onUpdate={handleProfileUpdate}
                />
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h1 className="text-2xl font-bold">Teams</h1>
                                <p className="text-gray-600">Manage teams, starters and reserves</p>
                            </div>
                            <button onClick={openCreate} className="px-4 py-2 rounded bg-green-600 text-white">+ Create Team</button>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <div className="flex gap-2">
                                <button onClick={() => setFilterMode('all')} className={`px-3 py-1 rounded ${filterMode === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>All</button>
                                <button onClick={() => setFilterMode('my')} className={`px-3 py-1 rounded ${filterMode === 'my' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>My</button>
                                <button onClick={() => setFilterMode('following')} className={`px-3 py-1 rounded ${filterMode === 'following' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Following</button>
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
                            <p className="text-gray-500">No teams yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filtered.map(t => (
                                    <div key={t.id} className="border rounded-lg p-4 cursor-pointer" onClick={() => setViewId(t.id)}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">{t.name}</h3>
                                                <p className="text-sm text-gray-600">{t.sport}{t.city ? ` · ${t.city}` : ''}</p>
                                                {t.coach && <p className="text-sm">Coach: {t.coach}</p>}
                                                {t.clubId && <p className="text-sm">Linked Club: {(clubs.find(c => c.id === t.clubId)?.name) || 'Unknown'}</p>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); openEdit(t); }} className="text-blue-600 text-sm">Edit</button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }} className="text-red-600 text-sm">Delete</button>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h4 className="font-medium">Starters ({t.starters.length})</h4>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {t.starters.map(s => <li key={s.id}>{s.name}{s.position ? ` — ${s.position}` : ''}</li>)}
                                            </ul>
                                        </div>
                                        <div className="mt-3">
                                            <h4 className="font-medium">Reserves ({t.reserves.length})</h4>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {t.reserves.map(r => <li key={r.id}>{r.name}{r.position ? ` — ${r.position}` : ''}</li>)}
                                            </ul>
                                        </div>
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
                                    <h2 className="text-lg font-semibold">{editingId ? 'Edit Team' : 'Create Team'}</h2>
                                    <button onClick={() => { setIsOpen(false); resetForm(); }} className="text-xl">✕</button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g., Warriors" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>

                                        <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full border rounded px-3 py-2" required>
                                            <option value="">Select sport</option>
                                            {ALL_SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Club (optional)</label>
                                        <select value={clubId} onChange={(e) => setClubId(e.target.value === "" ? "" : Number(e.target.value))} className="w-full border rounded px-3 py-2">
                                            <option value="">No club</option>
                                            {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Coach (optional)</label>
                                        <input value={coach} onChange={(e) => setCoach(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Coach name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City (optional)</label>
                                        <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="City" />
                                    </div>

                                    {/* Roster builder */}
                                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border rounded-lg p-3">
                                            <h3 className="font-semibold mb-2">Starters</h3>
                                            <div className="flex gap-2 mb-3">
                                                <input value={starterName} onChange={(e) => setStarterName(e.target.value)} onKeyDown={onStarterKeyDown} className="flex-1 border rounded px-3 py-2" placeholder="Player name" />
                                                <input value={starterPosition} onChange={(e) => setStarterPosition(e.target.value)} onKeyDown={onStarterKeyDown} className="w-40 border rounded px-3 py-2" placeholder="Position" />
                                                <button type="button" onClick={addStarter} className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
                                            </div>
                                            <ul className="space-y-2">
                                                {starters.map(s => (
                                                    <li key={s.id} className="flex items-center justify-between bg-gray-50 border rounded px-3 py-2">
                                                        <div>
                                                            <p className="font-medium">{s.name}</p>
                                                            {s.position && <p className="text-xs text-gray-500">{s.position}</p>}
                                                        </div>
                                                        <button type="button" onClick={() => setStarters(prev => prev.filter(x => x.id !== s.id))} className="text-red-600 text-sm">Remove</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="border rounded-lg p-3">
                                            <h3 className="font-semibold mb-2">Reserves</h3>
                                            <div className="flex gap-2 mb-3">
                                                <input value={reserveName} onChange={(e) => setReserveName(e.target.value)} onKeyDown={onReserveKeyDown} className="flex-1 border rounded px-3 py-2" placeholder="Player name" />
                                                <input value={reservePosition} onChange={(e) => setReservePosition(e.target.value)} onKeyDown={onReserveKeyDown} className="w-40 border rounded px-3 py-2" placeholder="Position" />
                                                <button type="button" onClick={addReserve} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
                                            </div>
                                            <ul className="space-y-2">
                                                {reserves.map(r => (
                                                    <li key={r.id} className="flex items-center justify-between bg-gray-50 border rounded px-3 py-2">
                                                        <div>
                                                            <p className="font-medium">{r.name}</p>
                                                            {r.position && <p className="text-xs text-gray-500">{r.position}</p>}
                                                        </div>
                                                        <button type="button" onClick={() => setReserves(prev => prev.filter(x => x.id !== r.id))} className="text-red-600 text-sm">Remove</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 flex justify-end gap-3">
                                        <button type="button" onClick={resetForm} className="px-4 py-2 rounded bg-gray-100">Reset</button>
                                        <button type="submit" className="px-5 py-2 rounded bg-green-600 text-white">{editingId ? 'Save Changes' : 'Create Team'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TeamsPage;
