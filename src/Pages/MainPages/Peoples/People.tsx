import React, { useMemo, useState } from "react";
import CommonButton from "@/components/CommonButton";

interface Person {
    id: number;
    name: string;
    title?: string;
    location?: string;
    avatar?: string;
    mutuals?: number;
    status?: "none" | "requested" | "pending" | "connected"; // requested = incoming, pending = outgoing
}

const samplePeople: Person[] = [
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

type TabKey = "All" | "Connect" | "Pending" | "Requested" | "Connected";

const People: React.FC = () => {
    const [people, setPeople] = useState<Person[]>(samplePeople);
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<TabKey>("All");
    const [openProfile, setOpenProfile] = useState<Person | null>(null);
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
            if (activeTab === "Connect" && p.status !== "none") return false;
            if (activeTab === "Pending" && p.status !== "pending") return false;
            if (activeTab === "Requested" && p.status !== "requested") return false;
            if (activeTab === "Connected" && p.status !== "connected") return false;
            // search filter
            if (!q) return true;
            return (
                p.name.toLowerCase().includes(q) ||
                (p.title || "").toLowerCase().includes(q) ||
                (p.location || "").toLowerCase().includes(q)
            );
        });
    }, [people, query, activeTab]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const visible = filtered.slice((page - 1) * perPage, page * perPage);

    // send outgoing request
    const sendRequest = (id: number) => {
        setPeople(prev => prev.map(p => p.id === id ? { ...p, status: "pending" } : p));
    };
    // cancel outgoing request
    const cancelRequest = (id: number) => {
        setPeople(prev => prev.map(p => p.id === id ? { ...p, status: "none" } : p));
    };
    // accept incoming request -> connected
    const acceptRequest = (id: number) => {
        setPeople(prev => prev.map(p => p.id === id ? { ...p, status: "connected" } : p));
    };
    // decline incoming request
    const declineRequest = (id: number) => {
        setPeople(prev => prev.map(p => p.id === id ? { ...p, status: "none" } : p));
    };
    // remove connection
    const removeConnection = (id: number) => {
        setPeople(prev => prev.map(p => p.id === id ? { ...p, status: "none" } : p));
    };

    // handle tab click and reset page/search
    const onTab = (tab: TabKey) => { setActiveTab(tab); setPage(1); setQuery(""); };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">People</h2>

                <div className="flex items-center gap-2">
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        placeholder="Search name, title or location"
                        className="px-3 py-2 border rounded-md w-64"
                    />
                </div>
            </div>

            {/* Tabs with counts */}
            <div className="flex gap-2 mb-4 overflow-auto">
                <button
                    onClick={() => onTab("All")}
                    className={`px-4 py-2 rounded ${activeTab === "All" ? "bg-blue-600 text-white" : "bg-white border"}`}
                >
                    All ({counts.total})
                </button>
                <button
                    onClick={() => onTab("Connect")}
                    className={`px-4 py-2 rounded ${activeTab === "Connect" ? "bg-blue-600 text-white" : "bg-white border"}`}
                >
                    Connect ({counts.connect})
                </button>
                <button
                    onClick={() => onTab("Pending")}
                    className={`px-4 py-2 rounded ${activeTab === "Pending" ? "bg-blue-600 text-white" : "bg-white border"}`}
                >
                    Sent ({counts.pending})
                </button>
                <button
                    onClick={() => onTab("Requested")}
                    className={`px-4 py-2 rounded ${activeTab === "Requested" ? "bg-blue-600 text-white" : "bg-white border"}`}
                >
                    Requests ({counts.requested})
                </button>
                <button
                    onClick={() => onTab("Connected")}
                    className={`px-4 py-2 rounded ${activeTab === "Connected" ? "bg-blue-600 text-white" : "bg-white border"}`}
                >
                    Connected ({counts.connected})
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((p) => (
                    <div key={p.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden">
                                {p.avatar ? <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" /> : p.name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">{p.name}</h3>
                                    <span className="text-xs text-gray-400">·</span>
                                    <span className="text-xs text-gray-500">{p.mutuals} mutuals</span>
                                </div>
                                <p className="text-sm text-gray-600">{p.title}</p>
                                <p className="text-xs text-gray-400">{p.location}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2 items-center">
                            {p.status === "requested" ? (
                                <>
                                    <CommonButton
                                        label="Accept"
                                        onClick={() => acceptRequest(p.id)}
                                        buttonTextStyle="px-3 py-2 rounded-md text-sm font-medium bg-green-600 text-white w-full"
                                    />
                                    <CommonButton
                                        label="Decline"
                                        onClick={() => toggleConnect(p.id)}
                                        buttonTextStyle="px-3 py-2 rounded-md text-sm border w-28"
                                    />
                                </>
                            ) : p.status === "pending" ? (
                                <>
                                    <CommonButton
                                        label="Requested"
                                        buttonTextStyle="px-3 py-2 rounded-md text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-100 w-full"
                                    />
                                    <CommonButton
                                        label="Cancel"
                                        onClick={() => cancelRequest(p.id)}
                                        buttonTextStyle="px-3 py-2 rounded-md text-sm border w-28"
                                    />
                                </>
                            ) : (
                                <>
                                    <CommonButton
                                        label={p.status === "connected" ? "Connected" : "Connect"}
                                        onClick={() => (p.status === "connected" ? removeConnection(p.id) : sendRequest(p.id))}
                                        buttonTextStyle={`px-3 py-2 rounded-md text-sm font-medium w-full ${p.status === "connected" ? "bg-green-50 text-green-700 border border-green-100" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                                    />
                                    <CommonButton
                                        label="View"
                                        onClick={() => setOpenProfile(p)}
                                        buttonTextStyle="px-3 py-2 rounded-md text-sm border w-28"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} of {filtered.length}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <div className="px-3 py-1 border rounded">{page} / {pageCount}</div>
                    <button
                        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                        disabled={page === pageCount}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {openProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpenProfile(null)} />
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-2xl max-h-[80vh] overflow-auto">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">{openProfile.name}</h3>
                                <p className="text-sm text-gray-600">{openProfile.title}</p>
                                <p className="text-xs text-gray-400">{openProfile.location}</p>
                            </div>
                            <div className="flex gap-2">
                                {openProfile.status === "none" && (
                                    <button onClick={() => { sendRequest(openProfile.id); setOpenProfile(null); }} className="px-3 py-2 rounded bg-blue-600 text-white">Connect</button>
                                )}
                                {openProfile.status === "pending" && (
                                    <button onClick={() => { cancelRequest(openProfile.id); setOpenProfile(null); }} className="px-3 py-2 rounded border">Cancel</button>
                                )}
                                <button onClick={() => setOpenProfile(null)} className="px-3 py-2 rounded border">Close</button>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-700">
                            <p><strong>Mutual connections:</strong> {openProfile.mutuals}</p>
                            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at libero vitae arcu ultricies cursus.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default People;