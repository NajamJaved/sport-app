import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import TeamProfile from "./TeamProfile";
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
const getUserName = () => { var _a; try {
    return ((_a = JSON.parse(localStorage.getItem('user') || '{}')) === null || _a === void 0 ? void 0 : _a.name) || 'User';
}
catch (_b) {
    return 'User';
} };
const getFollows = () => { try {
    return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}');
}
catch (_a) {
    return { clubs: [], teams: [], events: [] };
} };
const TeamsPage = () => {
    const [teams, setTeams] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [clubId, setClubId] = useState("");
    const [coach, setCoach] = useState("");
    const [city, setCity] = useState("");
    const [starterName, setStarterName] = useState("");
    const [starterPosition, setStarterPosition] = useState("");
    const [reserveName, setReserveName] = useState("");
    const [reservePosition, setReservePosition] = useState("");
    const [starters, setStarters] = useState([]);
    const [reserves, setReserves] = useState([]);
    const [sportFilter, setSportFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState('all');
    const [viewId, setViewId] = useState(null);
    useEffect(() => {
        const savedTeams = JSON.parse(localStorage.getItem("teams") || "[]");
        setTeams(savedTeams);
        const savedClubs = JSON.parse(localStorage.getItem("clubs") || "[]");
        setClubs(savedClubs.map((c) => ({ id: c.id, name: c.name })));
    }, []);
    const persist = (next) => { try {
        localStorage.setItem("teams", JSON.stringify(next));
    }
    catch (_a) { } };
    const addStarter = () => {
        const nm = starterName.trim();
        if (!nm)
            return;
        setStarters(prev => [...prev, { id: Date.now(), name: nm, position: starterPosition || undefined }]);
        setStarterName("");
        setStarterPosition("");
    };
    const addReserve = () => {
        const nm = reserveName.trim();
        if (!nm)
            return;
        setReserves(prev => [...prev, { id: Date.now(), name: nm, position: reservePosition || undefined }]);
        setReserveName("");
        setReservePosition("");
    };
    const onStarterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addStarter();
        }
    };
    const onReserveKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addReserve();
        }
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
    const openEdit = (team) => {
        var _a, _b, _c;
        setEditingId(team.id);
        setName(team.name);
        setSport(team.sport);
        setClubId((_a = team.clubId) !== null && _a !== void 0 ? _a : "");
        setCoach((_b = team.coach) !== null && _b !== void 0 ? _b : "");
        setCity((_c = team.city) !== null && _c !== void 0 ? _c : "");
        setStarters(team.starters);
        setReserves(team.reserves);
        setIsOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !sport || starters.length === 0)
            return;
        if (editingId) {
            const next = teams.map(t => t.id === editingId ? Object.assign(Object.assign({}, t), { name: name.trim(), sport, clubId: clubId === "" ? undefined : Number(clubId), starters,
                reserves, coach: coach.trim() || undefined, city: city.trim() || undefined }) : t);
            setTeams(next);
            persist(next);
        }
        else {
            const newTeam = {
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
    const handleDelete = (id) => {
        if (!confirm("Delete this team?"))
            return;
        const next = teams.filter(t => t.id !== id);
        setTeams(next);
        persist(next);
    };
    const handleProfileUpdate = (next) => {
        const updated = teams.map(t => t.id === next.id ? next : t);
        setTeams(updated);
        persist(updated);
        setViewId(null);
    };
    const { teams: followedTeams } = getFollows();
    const userName = getUserName();
    const filtered = useMemo(() => {
        return teams.filter(t => (!sportFilter || t.sport === sportFilter) &&
            (!search || t.name.toLowerCase().includes(search.toLowerCase()) || (t.city || "").toLowerCase().includes(search.toLowerCase())) &&
            (filterMode === 'all' || (filterMode === 'my' && t.ownerName === userName) || (filterMode === 'following' && followedTeams.includes(t.id))));
    }, [teams, sportFilter, search, filterMode, userName, followedTeams]);
    return (_jsx("div", { className: "max-w-6xl mx-auto p-4", children: viewId !== null ? (_jsx(TeamProfile, { team: teams.find(t => t.id === viewId), clubs: clubs, onBack: () => setViewId(null), onUpdate: handleProfileUpdate })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Teams" }), _jsx("p", { className: "text-gray-600", children: "Manage teams, starters and reserves" })] }), _jsx("button", { onClick: openCreate, className: "px-4 py-2 rounded bg-green-600 text-white", children: "+ Create Team" })] }), _jsxs("div", { className: "mt-4 flex flex-col sm:flex-row gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setFilterMode('all'), className: `px-3 py-1 rounded ${filterMode === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100'}`, children: "All" }), _jsx("button", { onClick: () => setFilterMode('my'), className: `px-3 py-1 rounded ${filterMode === 'my' ? 'bg-green-600 text-white' : 'bg-gray-100'}`, children: "My" }), _jsx("button", { onClick: () => setFilterMode('following'), className: `px-3 py-1 rounded ${filterMode === 'following' ? 'bg-green-600 text-white' : 'bg-gray-100'}`, children: "Following" })] }), _jsxs("select", { value: sportFilter, onChange: (e) => setSportFilter(e.target.value), className: "border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "All sports" }), ALL_SPORTS.map(s => _jsx("option", { value: s, children: s }, s))] }), _jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), className: "border rounded px-3 py-2 w-full sm:w-72", placeholder: "Search by name or city" })] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: filtered.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No teams yet." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map(t => {
                            var _a;
                            return (_jsxs("div", { className: "border rounded-lg p-4 cursor-pointer", onClick: () => setViewId(t.id), children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: t.name }), _jsxs("p", { className: "text-sm text-gray-600", children: [t.sport, t.city ? ` · ${t.city}` : ''] }), t.coach && _jsxs("p", { className: "text-sm", children: ["Coach: ", t.coach] }), t.clubId && _jsxs("p", { className: "text-sm", children: ["Linked Club: ", ((_a = clubs.find(c => c.id === t.clubId)) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown'] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: (e) => { e.stopPropagation(); openEdit(t); }, className: "text-blue-600 text-sm", children: "Edit" }), _jsx("button", { onClick: (e) => { e.stopPropagation(); handleDelete(t.id); }, className: "text-red-600 text-sm", children: "Delete" })] })] }), _jsxs("div", { className: "mt-3", children: [_jsxs("h4", { className: "font-medium", children: ["Starters (", t.starters.length, ")"] }), _jsx("ul", { className: "list-disc list-inside text-sm text-gray-700", children: t.starters.map(s => _jsxs("li", { children: [s.name, s.position ? ` — ${s.position}` : ''] }, s.id)) })] }), _jsxs("div", { className: "mt-3", children: [_jsxs("h4", { className: "font-medium", children: ["Reserves (", t.reserves.length, ")"] }), _jsx("ul", { className: "list-disc list-inside text-sm text-gray-700", children: t.reserves.map(r => _jsxs("li", { children: [r.name, r.position ? ` — ${r.position}` : ''] }, r.id)) })] })] }, t.id));
                        }) })) }), isOpen && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => { setIsOpen(false); resetForm(); } }), _jsxs("div", { className: "relative z-50 w-full max-w-3xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsxs("div", { className: "flex justify-between items-center p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: editingId ? 'Edit Team' : 'Create Team' }), _jsx("button", { onClick: () => { setIsOpen(false); resetForm(); }, className: "text-xl", children: "\u2715" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Team Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "e.g., Warriors", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sport" }), _jsxs("select", { value: sport, onChange: (e) => setSport(e.target.value), className: "w-full border rounded px-3 py-2", required: true, children: [_jsx("option", { value: "", children: "Select sport" }), ALL_SPORTS.map(s => _jsx("option", { value: s, children: s }, s))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Club (optional)" }), _jsxs("select", { value: clubId, onChange: (e) => setClubId(e.target.value === "" ? "" : Number(e.target.value)), className: "w-full border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "No club" }), clubs.map(c => _jsx("option", { value: c.id, children: c.name }, c.id))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Coach (optional)" }), _jsx("input", { value: coach, onChange: (e) => setCoach(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "Coach name" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "City (optional)" }), _jsx("input", { value: city, onChange: (e) => setCity(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "City" })] }), _jsxs("div", { className: "md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "border rounded-lg p-3", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Starters" }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("input", { value: starterName, onChange: (e) => setStarterName(e.target.value), onKeyDown: onStarterKeyDown, className: "flex-1 border rounded px-3 py-2", placeholder: "Player name" }), _jsx("input", { value: starterPosition, onChange: (e) => setStarterPosition(e.target.value), onKeyDown: onStarterKeyDown, className: "w-40 border rounded px-3 py-2", placeholder: "Position" }), _jsx("button", { type: "button", onClick: addStarter, className: "px-3 py-2 bg-green-600 text-white rounded", children: "Add" })] }), _jsx("ul", { className: "space-y-2", children: starters.map(s => (_jsxs("li", { className: "flex items-center justify-between bg-gray-50 border rounded px-3 py-2", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: s.name }), s.position && _jsx("p", { className: "text-xs text-gray-500", children: s.position })] }), _jsx("button", { type: "button", onClick: () => setStarters(prev => prev.filter(x => x.id !== s.id)), className: "text-red-600 text-sm", children: "Remove" })] }, s.id))) })] }), _jsxs("div", { className: "border rounded-lg p-3", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Reserves" }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("input", { value: reserveName, onChange: (e) => setReserveName(e.target.value), onKeyDown: onReserveKeyDown, className: "flex-1 border rounded px-3 py-2", placeholder: "Player name" }), _jsx("input", { value: reservePosition, onChange: (e) => setReservePosition(e.target.value), onKeyDown: onReserveKeyDown, className: "w-40 border rounded px-3 py-2", placeholder: "Position" }), _jsx("button", { type: "button", onClick: addReserve, className: "px-3 py-2 bg-blue-600 text-white rounded", children: "Add" })] }), _jsx("ul", { className: "space-y-2", children: reserves.map(r => (_jsxs("li", { className: "flex items-center justify-between bg-gray-50 border rounded px-3 py-2", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: r.name }), r.position && _jsx("p", { className: "text-xs text-gray-500", children: r.position })] }), _jsx("button", { type: "button", onClick: () => setReserves(prev => prev.filter(x => x.id !== r.id)), className: "text-red-600 text-sm", children: "Remove" })] }, r.id))) })] })] }), _jsxs("div", { className: "md:col-span-2 flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: resetForm, className: "px-4 py-2 rounded bg-gray-100", children: "Reset" }), _jsx("button", { type: "submit", className: "px-5 py-2 rounded bg-green-600 text-white", children: editingId ? 'Save Changes' : 'Create Team' })] })] })] })] }))] })) }));
};
export default TeamsPage;
