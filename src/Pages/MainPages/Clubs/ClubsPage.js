import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import ClubProfile from "./ClubProfile";
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
const ClubsPage = () => {
    const [clubs, setClubs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [city, setCity] = useState("");
    const [foundedYear, setFoundedYear] = useState("");
    const [description, setDescription] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [sportFilter, setSportFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState('all');
    const [viewId, setViewId] = useState(null);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("clubs") || "[]");
        setClubs(saved);
    }, []);
    const persist = (next) => { try {
        localStorage.setItem("clubs", JSON.stringify(next));
    }
    catch (_a) { } };
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
    const openEdit = (club) => {
        var _a, _b, _c, _d;
        setEditingId(club.id);
        setName(club.name);
        setSport(club.sport);
        setCity(club.city);
        setFoundedYear((_a = club.foundedYear) !== null && _a !== void 0 ? _a : "");
        setDescription((_b = club.description) !== null && _b !== void 0 ? _b : "");
        setContactEmail((_c = club.contactEmail) !== null && _c !== void 0 ? _c : "");
        setContactPhone((_d = club.contactPhone) !== null && _d !== void 0 ? _d : "");
        setIsOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !sport || !city.trim())
            return;
        if (editingId) {
            const next = clubs.map(c => c.id === editingId ? Object.assign(Object.assign({}, c), { name: name.trim(), sport, city: city.trim(), foundedYear: foundedYear ? Number(foundedYear) : undefined, description: description.trim() || undefined, contactEmail: contactEmail.trim() || undefined, contactPhone: contactPhone.trim() || undefined }) : c);
            setClubs(next);
            persist(next);
        }
        else {
            const newClub = {
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
    const handleDelete = (id) => {
        if (!confirm("Delete this club?"))
            return;
        const next = clubs.filter(c => c.id !== id);
        setClubs(next);
        persist(next);
    };
    const handleProfileUpdate = (next) => {
        const updated = clubs.map(c => c.id === next.id ? next : c);
        setClubs(updated);
        persist(updated);
        setViewId(null);
    };
    const { clubs: followedClubs } = getFollows();
    const userName = getUserName();
    const filtered = useMemo(() => {
        return clubs.filter(c => (!sportFilter || c.sport === sportFilter) &&
            (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase())) &&
            (filterMode === 'all' || (filterMode === 'my' && c.ownerName === userName) || (filterMode === 'following' && followedClubs.includes(c.id))));
    }, [clubs, sportFilter, search, filterMode, userName, followedClubs]);
    return (_jsx("div", { className: "max-w-6xl mx-auto p-4", children: viewId !== null ? (_jsx(ClubProfile, { club: clubs.find(c => c.id === viewId), onBack: () => setViewId(null), onUpdate: handleProfileUpdate })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Clubs" }), _jsx("p", { className: "text-gray-600", children: "All sports clubs" })] }), _jsx("button", { onClick: openCreate, className: "px-4 py-2 rounded bg-blue-600 text-white", children: "+ Create Club" })] }), _jsxs("div", { className: "mt-4 flex flex-col sm:flex-row gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setFilterMode('all'), className: `px-3 py-1 rounded ${filterMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`, children: "All" }), _jsx("button", { onClick: () => setFilterMode('my'), className: `px-3 py-1 rounded ${filterMode === 'my' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`, children: "My" }), _jsx("button", { onClick: () => setFilterMode('following'), className: `px-3 py-1 rounded ${filterMode === 'following' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`, children: "Following" })] }), _jsxs("select", { value: sportFilter, onChange: (e) => setSportFilter(e.target.value), className: "border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "All sports" }), ALL_SPORTS.map(s => _jsx("option", { value: s, children: s }, s))] }), _jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), className: "border rounded px-3 py-2 w-full sm:w-72", placeholder: "Search by name or city" })] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: filtered.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No clubs yet." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map(c => (_jsxs("div", { className: "border rounded-lg p-4 cursor-pointer", onClick: () => setViewId(c.id), children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: c.name }), _jsxs("p", { className: "text-sm text-gray-600", children: [c.sport, " \u00B7 ", c.city] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: (e) => { e.stopPropagation(); openEdit(c); }, className: "text-blue-600 text-sm", children: "Edit" }), _jsx("button", { onClick: (e) => { e.stopPropagation(); handleDelete(c.id); }, className: "text-red-600 text-sm", children: "Delete" })] })] }), c.foundedYear && _jsxs("p", { className: "text-sm mt-1", children: ["Founded: ", c.foundedYear] }), c.description && _jsx("p", { className: "text-sm text-gray-700 mt-2", children: c.description }), (c.contactEmail || c.contactPhone) && (_jsxs("div", { className: "text-xs text-gray-500 mt-2", children: [c.contactEmail && _jsxs("p", { children: ["Email: ", c.contactEmail] }), c.contactPhone && _jsxs("p", { children: ["Phone: ", c.contactPhone] })] }))] }, c.id))) })) }), isOpen && (_jsxs("div", { className: "fixed inset-0 z-40 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: () => { setIsOpen(false); resetForm(); } }), _jsxs("div", { className: "relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto", children: [_jsxs("div", { className: "flex justify-between items-center p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: editingId ? 'Edit Club' : 'Create Club' }), _jsx("button", { onClick: () => { setIsOpen(false); resetForm(); }, className: "text-xl", children: "\u2715" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Club Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "e.g., Lahore United", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sport" }), _jsxs("select", { value: sport, onChange: (e) => setSport(e.target.value), className: "w-full border rounded px-3 py-2", required: true, children: [_jsx("option", { value: "", children: "Select sport" }), ALL_SPORTS.map(s => _jsx("option", { value: s, children: s }, s))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "City" }), _jsx("input", { value: city, onChange: (e) => setCity(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "e.g., Lahore", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Founded Year" }), _jsx("input", { type: "number", value: foundedYear, onChange: (e) => setFoundedYear(e.target.value ? Number(e.target.value) : ""), className: "w-full border rounded px-3 py-2", placeholder: "e.g., 1998" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), className: "w-full border rounded px-3 py-2", rows: 3, placeholder: "About the club (optional)" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Contact Email" }), _jsx("input", { type: "email", value: contactEmail, onChange: (e) => setContactEmail(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "email@example.com" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Contact Phone" }), _jsx("input", { value: contactPhone, onChange: (e) => setContactPhone(e.target.value), className: "w-full border rounded px-3 py-2", placeholder: "03xx-xxxxxxx" })] }), _jsxs("div", { className: "md:col-span-2 flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: resetForm, className: "px-4 py-2 rounded bg-gray-100", children: "Reset" }), _jsx("button", { type: "submit", className: "px-5 py-2 rounded bg-blue-600 text-white", children: editingId ? 'Save Changes' : 'Add Club' })] })] })] })] }))] })) }));
};
export default ClubsPage;
