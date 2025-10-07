import React, { useState } from 'react';

interface EntityMeta { type: 'club' | 'team' | 'event'; id: number; }

interface SimplePostProps {
    onCreate: (post: any) => void;
    onClose: () => void;
    entity?: EntityMeta;
}

const SimplePost: React.FC<SimplePostProps> = ({ onCreate, onClose, entity }) => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddTag = () => {
        const tag = currentTag.trim();
        if (tag && !tags.includes(tag) && tags.length < 5) {
            setTags([...tags, tag]);
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    const getCreatedBy = () => {
        try { return JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User'; } catch { return 'User'; }
    };

    const handleSubmit = async () => {
        if (!content.trim()) return;

        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const newPost = {
            id: Date.now(),
            type: 'text',
            title: 'Text Post',
            content: content.trim(),
            excerpt: content.length > 100 ? content.substring(0, 100) + '...' : content,
            tags: tags,
            keywords: tags,
            featureImage: null,
            likes: 0,
            shares: 0,
            views: 0,
            comments: [],
            timestamp: new Date().toISOString(),
            entity,
            createdBy: getCreatedBy(),
        };

        onCreate(newPost);
        setIsSubmitting(false);
    };

    const characterCount = content.length;
    const maxCharacters = 1000;

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create a Post</h2>
                <p className="text-gray-600">Share your thoughts with the community</p>
            </div>

            {/* Content Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's on your mind?
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Share your thoughts, ideas, or updates..."
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={6}
                    maxLength={maxCharacters}
                />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                        Press Ctrl+Enter to post
                    </span>
                    <span className={`text-xs ${characterCount > maxCharacters * 0.8 ? 'text-orange-500' : 'text-gray-500'}`}>
                        {characterCount}/{maxCharacters}
                    </span>
                </div>
            </div>

            {/* Tags Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add tags (optional)
                </label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Add a tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={20}
                    />
                    <button
                        onClick={handleAddTag}
                        disabled={!currentTag.trim() || tags.length >= 5}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Add
                    </button>
                </div>

                {/* Display Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                            >
                                #{tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                    Maximum 5 tags allowed
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!content.trim() || isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Posting...
                        </>
                    ) : (
                        'Post'
                    )}
                </button>
            </div>
        </div>
    );
};

export default SimplePost;
