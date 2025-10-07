import React from "react";

interface Post {
    id: number;
    title: string;
    excerpt: string;
    likes?: number;
    shares?: number;
    views?: number;
    comments?: any[];
}

interface PostTableProps {
    posts: Post[];
    onRowOpen?: (id: number) => void; // called when user opens/view from table
}

const PostTable: React.FC<PostTableProps> = ({ posts, onRowOpen }) => {
    return (
        <table className="min-w-full bg-white border rounded">
            <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Likes</th>
                    <th className="px-4 py-2">Comments</th>
                    <th className="px-4 py-2">Shares</th>
                    <th className="px-4 py-2">Views</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {posts.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                            No posts
                        </td>
                    </tr>
                ) : (
                    posts.map((p) => (
                        <tr key={p.id} className="border-t">
                            <td className="px-4 py-3">{p.title}</td>
                            <td className="px-4 py-3">{p.likes ?? 0}</td>
                            <td className="px-4 py-3">{(p.comments && p.comments.length) ?? 0}</td>
                            <td className="px-4 py-3">{p.shares ?? 0}</td>
                            <td className="px-4 py-3">{p.views ?? 0}</td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => onRowOpen?.(p.id)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded"
                                >
                                    Open
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default PostTable;
