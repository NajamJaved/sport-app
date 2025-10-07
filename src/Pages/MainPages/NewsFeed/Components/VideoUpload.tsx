import React, { useState, useRef } from 'react';

interface EntityMeta { type: 'club' | 'team' | 'event'; id: number; }

interface VideoUploadProps {
    onCreate: (post: any) => void;
    onClose: () => void;
    entity?: EntityMeta;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onCreate, onClose, entity }) => {
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedVideo(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setVideoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedVideo(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setVideoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const getCreatedBy = () => {
        try { return JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User'; } catch { return 'User'; }
    };

    const handleSubmit = async () => {
        if (!selectedVideo) return;

        setIsUploading(true);
        setUploadProgress(0);
        
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const newPost = {
            id: Date.now(),
            type: 'video',
            title: 'Video Post',
            content: caption || 'Shared a video',
            excerpt: caption || 'Shared a video',
            tags: ['video'],
            keywords: ['video', 'media'],
            featureImage: null,
            videoUrl: videoPreview,
            likes: 0,
            shares: 0,
            views: 0,
            comments: [],
            timestamp: new Date().toISOString(),
            entity,
            createdBy: getCreatedBy(),
        };

        onCreate(newPost);
        setIsUploading(false);
        setUploadProgress(0);
    };

    const removeVideo = () => {
        setSelectedVideo(null);
        setVideoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Share a Video</h2>
                <p className="text-gray-600">Upload and share your favorite videos</p>
            </div>

            {/* Video Upload Area */}
            <div className="mb-6">
                {!videoPreview ? (
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="text-6xl mb-4">🎥</div>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                            MP4, AVI, MOV up to 100MB
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleVideoSelect}
                            className="hidden"
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <video
                            src={videoPreview}
                            controls
                            className="w-full max-h-96 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                            {selectedVideo && (
                                <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                    {formatFileSize(selectedVideo.size)}
                                </div>
                            )}
                            <button
                                onClick={removeVideo}
                                className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Caption Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add a caption (optional)
                </label>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's on your mind about this video?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                />
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
                    disabled={!selectedVideo || isUploading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    {isUploading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Uploading...
                        </>
                    ) : (
                        'Share Video'
                    )}
                </button>
            </div>
        </div>
    );
};

export default VideoUpload;
