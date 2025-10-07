import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import EventProfile from "./EventProfile";
const ALL_SPORTS = [
    "Football",
    "Cricket",
    "Hockey",
    "Basketball",
    "Volleyball",
    "Badminton",
    "Tennis",
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
const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [type, setType] = useState('Match');
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [hostClubId, setHostClubId] = useState("");
    const [description, setDescription] = useState("");
    const [participantText, setParticipantText] = useState("");
    const [participants, setParticipants] = useState([]);
    const [sportFilter, setSportFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState('all');
    const [viewId, setViewId] = useState(null);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("events") || "[]");
        setEvents(saved);
        const savedClubs = JSON.parse(localStorage.getItem("clubs") || "[]");
        setClubs(savedClubs.map((c) => ({ id: c.id, name: c.name })));
    }, []);
    const persist = (next) => localStorage.setItem("events", JSON.stringify(next));
    const addParticipant = () => {
        const v = participantText.trim();
        if (!v)
            return;
        setParticipants(prev => [...prev, v]);
        setParticipantText("");
    };
    const removeParticipant = (name) => setParticipants(prev => prev.filter(p => p !== name));
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
    const openEdit = (item) => {
        var _a;
        setEditingId(item.id);
        setName(item.name);
        setSport(item.sport);
        setType(item.type);
        setDate(item.date);
        setStartTime(item.startTime || "");
        setEndTime(item.endTime || "");
        setLocation(item.location);
        setHostClubId((_a = item.hostClubId) !== null && _a !== void 0 ? _a : "");
        setDescription(item.description || "");
        setParticipants(item.participants || []);
        setIsOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !sport || !date || !location.trim())
            return;
        if (editingId) {
            const next = events.map(ev => ev.id === editingId ? Object.assign(Object.assign({}, ev), { name: name.trim(), sport,
                type,
                date, startTime: startTime || undefined, endTime: endTime || undefined, location: location.trim(), hostClubId: hostClubId === "" ? undefined : Number(hostClubId), description: description.trim() || undefined, participants: participants.length ? participants : undefined }) : ev);
            setEvents(next);
            persist(next);
        }
        else {
            const newEvent = {
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
    const handleDelete = (id) => {
        if (!confirm("Delete this event?"))
            return;
        const next = events.filter(e => e.id !== id);
        setEvents(next);
        persist(next);
    };
    const handleProfileUpdate = (next) => {
        const updated = events.map(e => e.id === next.id ? next : e);
        setEvents(updated);
        persist(updated);
        setViewId(null);
    };
    const { events: followedEvents } = getFollows();
    const userName = getUserName();
    const filtered = useMemo(() => {
        return events.filter(e => (!sportFilter || e.sport === sportFilter) &&
            (!typeFilter || e.type === typeFilter) &&
            (!search || e.name.toLowerCase().includes(search.toLowerCase()) || (e.location || "").toLowerCase().includes(search.toLowerCase())) &&
            (filterMode === 'all' || (filterMode === 'my' && e.ownerName === userName) || (filterMode === 'following' && followedEvents.includes(e.id))));
    }, [events, sportFilter, typeFilter, search, filterMode, userName, followedEvents]);
    return (_jsx("div", { className: "max-w-6xl mx-auto p-4", children: viewId !== null ? (_jsx(EventProfile, { event: events.find(e => e.id === viewId), clubs: clubs, onBack: () => setViewId(null), onUpdate: handleProfileUpdate })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Events" }), _jsx("p", { className: "text-gray-600", children: "Matches, tournaments, trainings" })] }), _jsx("button", { onClick: openCreate, className: "px-4 py-2 rounded bg-purple-600 text-white", children: "+ Create Event" })] }), _jsxs("div", { className: "mt-4 flex flex-col sm:flex-row gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setFilterMode('all'), className: `px-3 py-1 rounded ${filterMode === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`, children: "All" }), _jsx("button", { onClick: () => setFilterMode('my'), className: `px-3 py-1 rounded ${filterMode === 'my' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`, children: "My" }), _jsx("button", { onClick: () => setFilterMode('following'), className: `px-3 py-1 rounded ${filterMode === 'following' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`, children: "Following" })] }), _jsxs("select", { value: sportFilter, onChange: (e) => setSportFilter(e.target.value), className: "border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "All sports" }), ALL_SPORTS.map(s => _jsx("option", { value: s, children: s }, s))] }), _jsxs("select", { value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), className: "border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "All types" }), ['Match', 'Tournament', 'Training', 'Other'].map(t => _jsx("option", { value: t, children: t }, t))] }), _jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), className: "border rounded px-3 py-2 w-full sm:w-72", placeholder: "Search by name or location" })] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: filtered.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No events yet." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map(e => {
                            var _a;
                            return (_jsxs("div", { className: "border rounded-lg p-4 cursor-pointer", onClick: () => setViewId(e.id), children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: e.name }), _jsxs("p", { className: "text-sm text-gray-600", children: [e.sport, " \u00B7 ", e.type, " \u00B7 ", e.date] }), _jsxs("p", { className: "text-sm", children: ["Location: ", e.location] }), e.hostClubId && _jsxs("p", { className: "text-sm", children: ["Host: ", ((_a = clubs.find(c => c.id === e.hostClubId)) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown'] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: (ev) => { ev.stopPropagation(); openEdit(e); }, className: "text-blue-600 text-sm", children: "Edit" }), _jsx("button", { onClick: (ev) => { ev.stopPropagation(); handleDelete(e.id); }, className: "text-red-600 text-sm", children: "Delete" })] })] }), e.description && _jsx("p", { className: "text-sm text-gray-700 mt-2", children: e.description }), e.participants && e.participants.length > 0 && (_jsxs("div", { className: "mt-2", children: [_jsxs("h4", { className: "font-medium", children: ["Participants (", e.participants.length, ")"] }), _jsx("ul", { className: "list-disc list-inside text-sm text-gray-700", children: e.participants.map(p => _jsx("li", { children: p }, p)) })] }))] }, e.id));
                        }) })) }), isOpen && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => { setIsOpen(false); resetForm(); } }), _jsxs("div", { className: "relative z-50 w-full max-w-3xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsxs("div", { className: "flex justify-between items-center p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: editingId ? 'Edit Event' : 'Create Event' }), _jsx("button", { onClick: () => { setIsOpen(false); resetForm(); }, className: "text-xl", children: "\u2715" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Event Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "e.g., City Cup Final", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sport" }), _jsxs("select", { value: sport, onChange: (e) => setSport(e.target.value), className: "w-full border rounded px-3 py-2", required: true, children: [_jsx("option", { value: "", children: "Select sport" }), ALL_SPORTS.map(s => _jsx("option", { value: s, children: s }, s))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type" }), _jsx("select", { value: type, onChange: (e) => setType(e.target.value), className: "w-full border rounded px-3 py-2", children: ['Match', 'Tournament', 'Training', 'Other'].map(t => _jsx("option", { value: t, children: t }, t)) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }), _jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "w-full border rounded px-3 py-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Time (optional)" }), _jsx("input", { type: "time", value: startTime, onChange: (e) => setStartTime(e.target.value), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End Time (optional)" }), _jsx("input", { type: "time", value: endTime, onChange: (e) => setEndTime(e.target.value), className: "w-full border rounded px-3 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Location" }), _jsx("input", { value: location, onChange: (e) => setLocation(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "Stadium / Ground", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Host Club (optional)" }), _jsxs("select", { value: hostClubId, onChange: (e) => setHostClubId(e.target.value === "" ? "" : Number(e.target.value)), className: "w-full border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "None" }), clubs.map(c => _jsx("option", { value: c.id, children: c.name }, c.id))] })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Participants (optional)" }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { value: participantText, onChange: (e) => setParticipantText(e.target.value), className: "flex-1 border rounded px-3 py-2", placeholder: "Team/Club name" }), _jsx("button", { type: "button", onClick: addParticipant, className: "px-3 py-2 bg-purple-600 text-white rounded", children: "Add" })] }), participants.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: participants.map(p => (_jsxs("span", { className: "inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm", children: [p, _jsx("button", { type: "button", onClick: () => removeParticipant(p), className: "text-purple-700", children: "\u00D7" })] }, p))) }))] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description (optional)" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), className: "w-full border rounded px-3 py-2", rows: 3, placeholder: "About the event" })] }), _jsxs("div", { className: "md:col-span-2 flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: resetForm, className: "px-4 py-2 rounded bg-gray-100", children: "Reset" }), _jsx("button", { type: "submit", className: "px-5 py-2 rounded bg-purple-600 text-white", children: editingId ? 'Save Changes' : 'Create Event' })] })] })] })] }))] })) }));
};
export default EventsPage;
