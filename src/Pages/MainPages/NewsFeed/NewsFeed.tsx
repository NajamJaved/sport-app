import React, { useState, useEffect } from 'react'
import WriteMassage from './Components/WriteBlogPost'
import PostPublish from './Components/PostPublish';
import ImageUpload from './Components/ImageUpload';
import VideoUpload from './Components/VideoUpload';
import SimplePost from './Components/SimplePost';
import Modal from "@/components/Modal"; // ensure path and casing match
import CommonButton from "@/components/CommonButton";

const getFollows = () => { try { return JSON.parse(localStorage.getItem('follows') || '{"clubs":[],"teams":[],"events":[]}'); } catch { return { clubs: [], teams: [], events: [] }; } };

const NewsFeed = () => {
    const [showWriter, setShowWriter] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showVideoUpload, setShowVideoUpload] = useState(false);
    const [showSimplePost, setShowSimplePost] = useState(false);

    const [posts, setPosts] = useState<any[]>([]);

    // followed data
    const [followed, setFollowed] = useState<{ clubs: number[]; teams: number[]; events: number[] }>({ clubs: [], teams: [], events: [] });
    const [clubs, setClubs] = useState<any[]>([]);
    const [teams, setTeams] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);

    // Load posts and followed on component mount
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(savedPosts);
        setFollowed(getFollows());
        setClubs(JSON.parse(localStorage.getItem('clubs') || '[]'));
        setTeams(JSON.parse(localStorage.getItem('teams') || '[]'));
        setEvents(JSON.parse(localStorage.getItem('events') || '[]'));
    }, []);

    const updatePost = (id: number, patchOrFn: Partial<any> | ((prev: any) => Partial<any>)) => {
        setPosts((prev) => {
            const updated = prev.map((p) => {
                if (p.id !== id) return p;
                const patch = typeof patchOrFn === "function" ? patchOrFn(p) : patchOrFn;
                return { ...p, ...patch };
            });

            localStorage.setItem('posts', JSON.stringify(updated));
            return updated;
        });
    };

    const handleCreatePost = (post: any) => {
        setPosts((prev) => {
            const newPosts = [post, ...prev];
            localStorage.setItem('posts', JSON.stringify(newPosts));
            return newPosts;
        });

        setShowWriter(false);
        setShowImageUpload(false);
        setShowVideoUpload(false);
        setShowSimplePost(false);
    };

    const nameById = (list: any[], id: number) => list.find((x) => x.id === id)?.name || `#${id}`;

    return (
        <>
            {/* Container: 3-column responsive layout like Facebook */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                    {/* Left Sidebar */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="space-y-3">
                            <div className="bg-white rounded-lg border p-4">
                                <h3 className="font-semibold mb-2">Following</h3>
                                <div className="text-sm text-gray-600 mb-1">Followers ({followed.clubs.length})</div>
                                {followed.clubs.length === 0 ? (
                                    <p className="text-xs text-gray-500 mb-2">No followers</p>
                                ) : (
                                    <ul className="mb-2 list-disc list-inside text-sm">
                                        {followed.clubs.slice(0, 6).map((id) => (
                                            <li key={`fc-${id}`}>{nameById(clubs, id)}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className="text-sm text-gray-600 mb-1">Clubs ({followed.clubs.length})</div>
                                {followed.clubs.length === 0 ? (
                                    <p className="text-xs text-gray-500 mb-2">No followed clubs</p>
                                ) : (
                                    <ul className="mb-2 list-disc list-inside text-sm">
                                        {followed.clubs.slice(0, 6).map((id) => (
                                            <li key={`fc-${id}`}>{nameById(clubs, id)}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className="text-sm text-gray-600 mb-1">Teams ({followed.teams.length})</div>
                                {followed.teams.length === 0 ? (
                                    <p className="text-xs text-gray-500 mb-2">No followed teams</p>
                                ) : (
                                    <ul className="mb-2 list-disc list-inside text-sm">
                                        {followed.teams.slice(0, 6).map((id) => (
                                            <li key={`ft-${id}`}>{nameById(teams, id)}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className="text-sm text-gray-600 mb-1">Events ({followed.events.length})</div>
                                {followed.events.length === 0 ? (
                                    <p className="text-xs text-gray-500">No followed events</p>
                                ) : (
                                    <ul className="list-disc list-inside text-sm">
                                        {followed.events.slice(0, 6).map((id) => (
                                            <li key={`fe-${id}`}>{nameById(events, id)}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="bg-white rounded-lg border p-4">Shortcuts</div>
                        </div>
                    </aside>

                    {/* Center Feed */}
                    <main className="lg:col-span-6 w-full">
                        {/* Create Buttons Card */}
                        <div className='bg-white border rounded-lg p-4 mb-4'>
                            <div className='flex flex-wrap gap-3 items-center justify-between'>
                                <button
                                    onClick={() => setShowImageUpload(true)}
                                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    <span className="text-lg">📷</span>
                                    <span>Image</span>
                                </button>

                                <button
                                    onClick={() => setShowVideoUpload(true)}
                                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                                >
                                    <span className="text-lg">🎥</span>
                                    <span>Video</span>
                                </button>

                                <button
                                    onClick={() => setShowSimplePost(true)}
                                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    <span className="text-lg">✍️</span>
                                    <span>Post</span>
                                </button>

                                <div>
                                    <CommonButton
                                        label="Write Blog"
                                        onClick={() => setShowWriter((s) => !s)}

                                        buttonTextStyle="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* All created posts (center feed) */}
                        <div className="space-y-4">
                            {posts.length === 0 ? (
                                <p className="text-center text-gray-500">No posts yet</p>
                            ) : (
                                posts.map((p) => (
                                    <PostPublish key={p.id} post={p} onUpdate={updatePost} />
                                ))
                            )}
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="space-y-3">
                            <div className="bg-white rounded-lg border p-4">Right Sidebar</div>
                            <div className="bg-white rounded-lg border p-4">Sponsored</div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Image Upload Modal */}
            <Modal isOpen={showImageUpload} onClose={() => setShowImageUpload(false)} title="Upload Image" size="md">
                <ImageUpload onCreate={handleCreatePost} onClose={() => setShowImageUpload(false)} />
            </Modal>

            {/* Video Upload Modal */}
            <Modal isOpen={showVideoUpload} onClose={() => setShowVideoUpload(false)} title="Upload Video" size="md">
                <VideoUpload onCreate={handleCreatePost} onClose={() => setShowVideoUpload(false)} />
            </Modal>

            {/* Simple Post Modal */}
            <Modal isOpen={showSimplePost} onClose={() => setShowSimplePost(false)} title="Create Post" size="md">
                <SimplePost onCreate={handleCreatePost} onClose={() => setShowSimplePost(false)} />
            </Modal>

            {/* Writer area (toggle) - Original Blog Modal */}
            <Modal isOpen={showWriter} onClose={() => setShowWriter(false)} title="Write Blog" size="lg">
                <WriteMassage onCreate={handleCreatePost} />
            </Modal>
        </>
    )
}

export default NewsFeed