import React, { useState, useRef } from "react";
import PostTable from "./NewsFeed/Components/PostTable";
import TeamsPage from "./Teams/TeamsPage";
import ClubsPage from "./Clubs/ClubsPage";
import EventsPage from "./Events/EventsPage";
import CommonButton from "@/components/CommonButton";

interface Profile {
    name: string;
    followers: number;
    following: number;
    friends_count: number;
    bio: string;
    intro: {
        current_city: string;
        hometown: string;
        education: string[];
    };
    cover_photo: string;
    profile_photo: string;
}

interface Photo {
    title: string;
    url: string;
}

interface Friend {
    name: string;
}

interface Comment {
    user: string;
    comment: string;
}

interface Post {
    date: string;
    type: string;
    content: string;
    likes?: number;
    comments?: Comment[];
    source?: string;
}

interface Data {
    profile: Profile;
    tabs: string[];
    photos: Photo[];
    friends: Friend[];
    posts: Post[];
}

const initialData: Data = {
    profile: {

        name: "Title",
        followers: 188,
        following: 85,
        friends_count: 156,
        bio: "Going for a Youtuber",
        intro: {
            current_city: "Dubai, United Arab Emirates",
            hometown: "Lahore, Pakistan",
            education: [
                "Studying at PUCIT - Punjab University College of Information Technology",
                "Went to Allied Schools"
            ]
        },
        cover_photo: "", // empty by default
        profile_photo: "" // empty by default
    },
    tabs: ["Posts", "About", "Stats", "Photos", "Followers", "Events", "Teams", "Clubs"],
    photos: [
        { title: "LAH IS ENOUGH", url: "photo_url_1" },
        { title: "Other photos", url: "photo_url_2" }
    ],
    friends: [],
    posts: []
};

const ProfilePage: React.FC = () => {
    const [data, setData] = useState<Data>(initialData);
    const [activeTab, setActiveTab] = useState("Posts");
    const [editing, setEditing] = useState(false);

    const coverInputRef = useRef<HTMLInputElement | null>(null);
    const avatarInputRef = useRef<HTMLInputElement | null>(null);

    // temp form state for editing
    const [editName, setEditName] = useState(data.profile.name);
    const [editBio, setEditBio] = useState(data.profile.bio);
    const [editCurrentCity, setEditCurrentCity] = useState(data.profile.intro.current_city);
    const [editHometown, setEditHometown] = useState(data.profile.intro.hometown);
    const [editEducationText, setEditEducationText] = useState(data.profile.intro.education.join("\n"));

    const handleCoverClick = () => coverInputRef.current?.click();
    const handleAvatarClick = () => avatarInputRef.current?.click();

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setData((prev) => ({
            ...prev,
            profile: { ...prev.profile, cover_photo: url },
            photos: [{ title: "Cover Photo", url }, ...prev.photos],
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setData((prev) => ({
            ...prev,
            profile: { ...prev.profile, profile_photo: url },
            photos: [{ title: "Profile Photo", url }, ...prev.photos],
        }));
    };

    const startEdit = () => {
        setEditName(data.profile.name);
        setEditBio(data.profile.bio);
        setEditCurrentCity(data.profile.intro.current_city);
        setEditHometown(data.profile.intro.hometown);
        setEditEducationText(data.profile.intro.education.join("\n"));
        setEditing(true);
    };

    const saveEdit = () => {
        const eduArr = editEducationText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
        setData((prev) => ({
            ...prev,
            profile: {
                ...prev.profile,
                name: editName || "Title",
                bio: editBio,
                intro: {
                    ...prev.profile.intro,
                    current_city: editCurrentCity,
                    hometown: editHometown,
                    education: eduArr,
                },
            },
        }));
        setEditing(false);
    };

    const cancelEdit = () => {
        setEditing(false);
    };

    // Content renderer for tabs
    const renderContent = () => {
        switch (activeTab) {
            case "Posts":
                return (
                    <div className="space-y-4 mt-4">
                        {data.posts.map((post, i) => (
                            <div key={i} className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">{post.date}</p>
                                <p className="mt-2">{post.content}</p>
                                {post.likes !== undefined && (
                                    <p className="text-sm text-gray-600">👍 {post.likes} likes</p>
                                )}
                                {post.comments && post.comments.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm font-semibold">Comments:</p>
                                        {post.comments.map((c, idx) => (
                                            <p key={idx} className="text-sm text-gray-700">
                                                <span className="font-medium">{c.user}:</span>{" "}
                                                {c.comment}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case "About":
                return (
                    <div className="bg-white p-4 rounded-lg shadow mt-4">
                        <h2 className="font-semibold text-lg mb-2">Intro</h2>
                        <p>{data.profile.bio}</p>
                        <ul className="mt-2 list-disc ml-6 text-gray-700">
                            {data.profile.intro.education.map((edu, i) => (
                                <li key={i}>{edu}</li>
                            ))}
                        </ul>
                        <p>📍 Lives in {data.profile.intro.current_city}</p>
                        <p>🏠 From {data.profile.intro.hometown}</p>
                    </div>
                );
            case "Photos":
                // include uploaded cover/profile photos at top of gallery
                const photosToShow: Photo[] = [
                    ...(data.profile.cover_photo ? [{ title: "Cover Photo", url: data.profile.cover_photo }] : []),
                    ...(data.profile.profile_photo ? [{ title: "Profile Photo", url: data.profile.profile_photo }] : []),
                    ...data.photos,
                ];
                return (
                    <div className="bg-white p-4 rounded-lg shadow mt-4">
                        <h2 className="font-semibold text-lg mb-2">Photos</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {photosToShow.map((photo, i) => (
                                <img
                                    key={i}
                                    src={photo.url}
                                    alt={photo.title}
                                    className="rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                );
            case "Stats":

                const tablePosts = data.posts.map((p, i) => ({
                    id: i,
                    title: (p.content || "").slice(0, 60) || `Post ${i + 1}`,
                    likes: p.likes ?? 0,
                    shares: 0,
                    views: 0,
                    comments: p.comments ?? [],
                }));
                return <div className="p-4"><PostTable posts={tablePosts} /></div>;
            case "Followers":
                return <div className="p-4">👥 Groups content here...</div>;
            case "Events":
                return <div className="p-4"><EventsPage /></div>;
            case "Teams":
                return <div className="p-4"><TeamsPage /></div>;
            case "Clubs":
                return <div className="p-4"><ClubsPage /></div>;

            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Cover + Profile */}
            <div className="relative">
                <img
                    src={data.profile.cover_photo || "https://via.placeholder.com/1200x300?text=Cover+Photo"}
                    alt="Cover"
                    className="w-full h-60 object-cover"
                />
                <div className="absolute right-4 top-4">
                    <button
                        onClick={handleCoverClick}
                        className="bg-white px-3 py-2 rounded shadow-sm text-sm"
                    >
                        Upload Cover
                    </button>
                    <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverChange} style={{ display: "none" }} />
                </div>

                <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                    <div className="relative">
                        <img
                            src={data.profile.profile_photo || "https://via.placeholder.com/150?text=Avatar"}
                            alt="Profile"
                            className="w-36 h-36 rounded-full border-4 border-white object-cover"
                        />
                        <button
                            onClick={handleAvatarClick}
                            className="absolute right-0 bottom-0 bg-white p-1 rounded-full shadow"
                            title="Upload avatar"
                        >
                            ✎
                        </button>
                        <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                    </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="mt-20 px-6 flex items-start justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold">{data.profile.name}</h1>
                    <p className="text-gray-600">
                        {data.profile.followers} followers · {data.profile.following} following
                    </p>
                    <p className="text-gray-700 mt-1">{data.profile.bio}</p>
                </div>

                <div className="flex items-center gap-3">
                    {!editing ? (
                        <CommonButton
                            label="Edit Profile"
                            onClick={startEdit}
                            buttonTextStyle="px-4 py-2 bg-blue-600 text-white rounded"
                        />
                    ) : (
                        <div className="flex flex-col gap-2 bg-white p-3 rounded shadow">
                            <div className="flex gap-2">
                                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="px-3 py-2 border rounded" placeholder="Title" />
                                <input value={editBio} onChange={(e) => setEditBio(e.target.value)} className="px-3 py-2 border rounded" placeholder="Bio" />
                            </div>
                            <div className="flex gap-2">
                                <input value={editCurrentCity} onChange={(e) => setEditCurrentCity(e.target.value)} className="px-3 py-2 border rounded" placeholder="Current city" />
                                <input value={editHometown} onChange={(e) => setEditHometown(e.target.value)} className="px-3 py-2 border rounded" placeholder="Hometown" />
                            </div>
                            <textarea
                                value={editEducationText}
                                onChange={(e) => setEditEducationText(e.target.value)}
                                className="px-3 py-2 border rounded h-24"
                                placeholder="Education — one entry per line"
                            />
                            <div className="flex gap-2">
                                <CommonButton label="Save" onClick={saveEdit} buttonTextStyle="px-4 py-2 bg-green-600 text-white rounded" />
                                <CommonButton label="Cancel" onClick={cancelEdit} buttonTextStyle="px-4 py-2 bg-gray-200 rounded" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 border-t border-b bg-white">
                <div className="flex justify-center space-x-6 py-2 font-medium text-gray-700">
                    {data.tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 border-b-2 transition ${activeTab === tab
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-600 border-transparent hover:text-blue-600"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-6">{renderContent()}</div>
        </div>
    );
};

export default ProfilePage;
