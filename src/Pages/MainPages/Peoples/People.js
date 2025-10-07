import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import CommonButton from "@/components/CommonButton";
const samplePeople = [
    { id: 1, name: "Ayesha Khan", title: "Frontend Engineer", location: "Lahore, PK", mutuals: 8, avatar: "", status: "none" },
    { id: 2, name: "Mohammad Ali", title: "Product Manager", location: "Karachi, PK", mutuals: 3, avatar: "", status: "none" },
    { id: 3, name: "Sara Ahmed", title: "UI/UX Designer", location: "Islamabad, PK", mutuals: 5, avatar: "", status: "connected" },
    { id: 4, name: "Hassan Riaz", title: "Backend Engineer", location: "Dubai, AE", mutuals: 2, avatar: "", status: "none" },
    { id: 5, name: "Zoya Malik", title: "Data Scientist", location: "Lahore, PK", mutuals: 4, avatar: "", status: "requested" }, // incoming request
    { id: 6, name: "Bilal Khan", title: "DevOps Engineer", location: "Islamabad, PK", mutuals: 1, avatar: "", status: "none" },
    { id: 7, name: "Fatima Noor", title: "Data Analyst", location: "Karachi, PK", mutuals: 6, avatar: "", status: "none" },
    { id: 8, name: "Owais Sheikh", title: "Mobile Developer", location: "Lahore, PK", mutuals: 2, avatar: "", status: "connected" },
    { id: 9, name: "Mehwish Tariq", title: "QA Engineer", location: "Peshawar, PK", mutuals: 0, avatar: "", status: "none" },
    { id: 10, name: "Usman Iqbal", title: "Fullstack Developer", location: "Lahore, PK", mutuals: 7, avatar: "", status: "none" },
    { id: 11, name: "Nadia Sami", title: "Product Designer", location: "Karachi, PK", mutuals: 3, avatar: "", status: "pending" }, // outgoing request
    { id: 12, name: "Tariq Javed", title: "Platform Engineer", location: "Islamabad, PK", mutuals: 2, avatar: "", status: "none" },
    { id: 13, name: "Sania Mir", title: "Researcher", location: "Lahore, PK", mutuals: 4, avatar: "", status: "none" },
    { id: 14, name: "Adeel Shah", title: "System Architect", location: "Karachi, PK", mutuals: 5, avatar: "", status: "connected" },
    { id: 15, name: "Rida Khan", title: "Marketing Lead", location: "Islamabad, PK", mutuals: 2, avatar: "", status: "none" },
];
const People = () => {
    const [people, setPeople] = useState(samplePeople);
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [openProfile, setOpenProfile] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;
    const counts = useMemo(() => {
        const total = people.length;
        const connect = people.filter(p => p.status === "none").length;
        const pending = people.filter(p => p.status === "pending").length; // outgoing
        const requested = people.filter(p => p.status === "requested").length; // incoming
        const connected = people.filter(p => p.status === "connected").length;
        return { total, connect, pending, requested, connected };
    }, [people]);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return people.filter((p) => {
            // tab filter
            if (activeTab === "Connect" && p.status !== "none")
                return false;
            if (activeTab === "Pending" && p.status !== "pending")
                return false;
            if (activeTab === "Requested" && p.status !== "requested")
                return false;
            if (activeTab === "Connected" && p.status !== "connected")
                return false;
            // search filter
            if (!q)
                return true;
            return (p.name.toLowerCase().includes(q) ||
                (p.title || "").toLowerCase().includes(q) ||
                (p.location || "").toLowerCase().includes(q));
        });
    }, [people, query, activeTab]);
    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const visible = filtered.slice((page - 1) * perPage, page * perPage);
    // send outgoing request
    const sendRequest = (id) => {
        setPeople(prev => prev.map(p => p.id === id ? Object.assign(Object.assign({}, p), { status: "pending" }) : p));
    };
    // cancel outgoing request
    const cancelRequest = (id) => {
        setPeople(prev => prev.map(p => p.id === id ? Object.assign(Object.assign({}, p), { status: "none" }) : p));
    };
    // accept incoming request -> connected
    const acceptRequest = (id) => {
        setPeople(prev => prev.map(p => p.id === id ? Object.assign(Object.assign({}, p), { status: "connected" }) : p));
    };
    // decline incoming request
    const declineRequest = (id) => {
        setPeople(prev => prev.map(p => p.id === id ? Object.assign(Object.assign({}, p), { status: "none" }) : p));
    };
    // remove connection
    const removeConnection = (id) => {
        setPeople(prev => prev.map(p => p.id === id ? Object.assign(Object.assign({}, p), { status: "none" }) : p));
    };
    // handle tab click and reset page/search
    const onTab = (tab) => { setActiveTab(tab); setPage(1); setQuery(""); };
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "People" }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("input", { value: query, onChange: (e) => { setQuery(e.target.value); setPage(1); }, placeholder: "Search name, title or location", className: "px-3 py-2 border rounded-md w-64" }) })] }), _jsxs("div", { className: "flex gap-2 mb-4 overflow-auto", children: [_jsxs("button", { onClick: () => onTab("All"), className: `px-4 py-2 rounded ${activeTab === "All" ? "bg-blue-600 text-white" : "bg-white border"}`, children: ["All (", counts.total, ")"] }), _jsxs("button", { onClick: () => onTab("Connect"), className: `px-4 py-2 rounded ${activeTab === "Connect" ? "bg-blue-600 text-white" : "bg-white border"}`, children: ["Connect (", counts.connect, ")"] }), _jsxs("button", { onClick: () => onTab("Pending"), className: `px-4 py-2 rounded ${activeTab === "Pending" ? "bg-blue-600 text-white" : "bg-white border"}`, children: ["Sent (", counts.pending, ")"] }), _jsxs("button", { onClick: () => onTab("Requested"), className: `px-4 py-2 rounded ${activeTab === "Requested" ? "bg-blue-600 text-white" : "bg-white border"}`, children: ["Requests (", counts.requested, ")"] }), _jsxs("button", { onClick: () => onTab("Connected"), className: `px-4 py-2 rounded ${activeTab === "Connected" ? "bg-blue-600 text-white" : "bg-white border"}`, children: ["Connected (", counts.connected, ")"] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: visible.map((p) => (_jsxs("div", { className: "bg-white rounded-lg shadow p-4 flex flex-col", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden", children: p.avatar ? _jsx("img", { src: p.avatar, alt: p.name, className: "w-full h-full object-cover" }) : p.name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase() }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-semibold", children: p.name }), _jsx("span", { className: "text-xs text-gray-400", children: "\u00B7" }), _jsxs("span", { className: "text-xs text-gray-500", children: [p.mutuals, " mutuals"] })] }), _jsx("p", { className: "text-sm text-gray-600", children: p.title }), _jsx("p", { className: "text-xs text-gray-400", children: p.location })] })] }), _jsx("div", { className: "mt-4 flex gap-2 items-center", children: p.status === "requested" ? (_jsxs(_Fragment, { children: [_jsx(CommonButton, { label: "Accept", onClick: () => acceptRequest(p.id), buttonTextStyle: "px-3 py-2 rounded-md text-sm font-medium bg-green-600 text-white w-full" }), _jsx(CommonButton, { label: "Decline", onClick: () => toggleConnect(p.id), buttonTextStyle: "px-3 py-2 rounded-md text-sm border w-28" })] })) : p.status === "pending" ? (_jsxs(_Fragment, { children: [_jsx(CommonButton, { label: "Requested", buttonTextStyle: "px-3 py-2 rounded-md text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-100 w-full" }), _jsx(CommonButton, { label: "Cancel", onClick: () => cancelRequest(p.id), buttonTextStyle: "px-3 py-2 rounded-md text-sm border w-28" })] })) : (_jsxs(_Fragment, { children: [_jsx(CommonButton, { label: p.status === "connected" ? "Connected" : "Connect", onClick: () => (p.status === "connected" ? removeConnection(p.id) : sendRequest(p.id)), buttonTextStyle: `px-3 py-2 rounded-md text-sm font-medium w-full ${p.status === "connected" ? "bg-green-50 text-green-700 border border-green-100" : "bg-blue-600 text-white hover:bg-blue-700"}` }), _jsx(CommonButton, { label: "View", onClick: () => setOpenProfile(p), buttonTextStyle: "px-3 py-2 rounded-md text-sm border w-28" })] })) })] }, p.id))) }), _jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-500", children: ["Showing ", (page - 1) * perPage + 1, " - ", Math.min(page * perPage, filtered.length), " of ", filtered.length] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setPage((p) => Math.max(1, p - 1)), disabled: page === 1, className: "px-3 py-1 border rounded disabled:opacity-50", children: "Prev" }), _jsxs("div", { className: "px-3 py-1 border rounded", children: [page, " / ", pageCount] }), _jsx("button", { onClick: () => setPage((p) => Math.min(pageCount, p + 1)), disabled: page === pageCount, className: "px-3 py-1 border rounded disabled:opacity-50", children: "Next" })] })] }), openProfile && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-50", onClick: () => setOpenProfile(null) }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-2xl max-h-[80vh] overflow-auto", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold", children: openProfile.name }), _jsx("p", { className: "text-sm text-gray-600", children: openProfile.title }), _jsx("p", { className: "text-xs text-gray-400", children: openProfile.location })] }), _jsxs("div", { className: "flex gap-2", children: [openProfile.status === "none" && (_jsx("button", { onClick: () => { sendRequest(openProfile.id); setOpenProfile(null); }, className: "px-3 py-2 rounded bg-blue-600 text-white", children: "Connect" })), openProfile.status === "pending" && (_jsx("button", { onClick: () => { cancelRequest(openProfile.id); setOpenProfile(null); }, className: "px-3 py-2 rounded border", children: "Cancel" })), _jsx("button", { onClick: () => setOpenProfile(null), className: "px-3 py-2 rounded border", children: "Close" })] })] }), _jsxs("div", { className: "mt-4 text-sm text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Mutual connections:" }), " ", openProfile.mutuals] }), _jsx("p", { className: "mt-2", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at libero vitae arcu ultricies cursus." })] })] })] }))] }));
};
export default People;
