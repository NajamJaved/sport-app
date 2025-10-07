import React, { useState, useRef } from 'react';

interface EntityMeta { type: 'club' | 'team' | 'event'; id: number; }

interface ImageUploadProps {
    onCreate: (post: any) => void;
    onClose: () => void;
    entity?: EntityMeta; // optional entity context
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onCreate, onClose, entity }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
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
        if (!selectedImage) return;

        setIsUploading(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newPost = {
            id: Date.now(),
            type: 'image',
            title: 'Image Post',
            content: caption || 'Shared an image',
            excerpt: caption || 'Shared an image',
            tags: ['image'],
            keywords: ['photo', 'image'],
            featureImage: imagePreview,
            likes: 0,
            shares: 0,
            views: 0,
            comments: [],
            timestamp: new Date().toISOString(),
            entity, // optional: { type, id }
            createdBy: getCreatedBy(),
        };

        onCreate(newPost);
        setIsUploading(false);
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Share an Image</h2>
                <p className="text-gray-600">Upload and share your favorite moments</p>
            </div>

            {/* Image Upload Area */}
            <div className="mb-6">
                {!imagePreview ? (
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="text-6xl mb-4">📷</div>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-h-96 object-cover rounded-lg"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>

            {/* Caption Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add a caption (optional)
                </label>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's on your mind about this image?"
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
                    disabled={!selectedImage || isUploading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    {isUploading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Uploading...
                        </>
                    ) : (
                        'Share Image'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ImageUpload;
