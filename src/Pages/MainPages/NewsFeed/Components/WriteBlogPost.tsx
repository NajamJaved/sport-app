import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import PostPublish from "./PostPublish";
import PostTable from "./PostTable";

interface Post {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    keywords: string[];
    featureImage: string | null;
    type?: 'text' | 'image' | 'video' | 'blog';

    // persistent counters and comments
    likes?: number;
    shares?: number;
    views?: number;
    comments?: any[]; // stored comment objects (same shape as PostPublish CommentItem)
}

interface WriteBlogPostProps {
    onCreate?: (post: Post) => void;
}

const WriteBlogPost: React.FC<WriteBlogPostProps> = ({ onCreate }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectionRangeRef = useRef<Range | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [tags, setTags] = useState("");
    const [keywords, setKeywords] = useState("");
    const [featureImage, setFeatureImage] = useState<string | null>(null);

    // editor states
    const [isEditorFocused, setIsEditorFocused] = useState(false);
    const [showHTML, setShowHTML] = useState(false);
    const [blockFormat, setBlockFormat] = useState("p");

    // counters
    const [titleCount, setTitleCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0); // characters (including spaces)
    const [readingTime, setReadingTime] = useState(1);
    const [imageCount, setImageCount] = useState(0);
    const [videoCount, setVideoCount] = useState(0);

    // excerpt counter
    const EXCERPT_WORD_LIMIT = 150;
    const [excerptWordCount, setExcerptWordCount] = useState(0);

    const WORD_LIMIT = 2000;
    const CHAR_LIMIT = 2000;
    const TITLE_WORD_LIMIT = 80;

    // Default font sizes for block types
    const DEFAULT_FONT_SIZES: Record<string, number> = {
        h1: 42,
        h2: 38,
        h3: 32,
        h4: 24,
        h5: 20,
        h6: 18,
        p: 16,
    };

    // ✅ title counter
    useEffect(() => {
        const count = title.trim()
            ? title.trim().split(/\s+/).filter(Boolean).length
            : 0;
        setTitleCount(count);
    }, [title]);

    // excerpt counter
    useEffect(() => {
        const count = excerpt.trim()
            ? excerpt.trim().split(/\s+/).filter(Boolean).length
            : 0;
        setExcerptWordCount(count);
    }, [excerpt]);


    const stripHtml = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");

    useEffect(() => {
        // derive plain text from content (works for both visual and HTML editors)
        const textFromContent = content ? stripHtml(content) : "";
        const fallbackText = editorRef.current?.innerText || "";
        const text = textFromContent || fallbackText;

        const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
        const chars = text.length;
        setWordCount(words);
        setCharCount(chars);
        setReadingTime(Math.max(1, Math.ceil(words / 200)));

        // image/video counters (parse HTML content)
        const div = document.createElement("div");
        div.innerHTML = content || (editorRef.current?.innerHTML ?? "");
        setImageCount(div.querySelectorAll("img").length);
        setVideoCount(div.querySelectorAll("video").length);
    }, [content]);

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            selectionRangeRef.current = sel.getRangeAt(0).cloneRange();
        }
    };

    const restoreSelection = () => {
        const sel = window.getSelection();
        if (!sel) return;
        sel.removeAllRanges();
        if (selectionRangeRef.current) {
            sel.addRange(selectionRangeRef.current);
        } else if (editorRef.current) {
            const range = document.createRange();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            sel.addRange(range);
        }
    };

    // formatting helpers (supports both visual editor and HTML textarea view)
    const applyFormat = (command: string, value: string | null = null) => {
        // If in HTML textarea mode, modify raw HTML string
        if (showHTML && textareaRef.current) {
            const ta = textareaRef.current;
            const start = ta.selectionStart ?? 0;
            const end = ta.selectionEnd ?? 0;
            const before = content.slice(0, start);
            const selected = content.slice(start, end) || "";
            const after = content.slice(end);

            let replaced = selected;
            switch (command) {
                case "bold":
                    replaced = `<strong>${selected || "bold text"}</strong>`;
                    break;
                case "italic":
                    replaced = `<em>${selected || "italic text"}</em>`;
                    break;
                case "underline":
                    replaced = `<u>${selected || "underlined text"}</u>`;
                    break;
                case "createLink":
                    const url = value || prompt("Enter URL:", "https://") || "#";
                    replaced = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selected || url}</a>`;
                    break;
                case "formatBlock":
                    // value expected like "<h1>" or "<p>"
                    const tag = (value || "<p>").replace(/[<>]/g, "") || "p";
                    const size = DEFAULT_FONT_SIZES[tag] ?? DEFAULT_FONT_SIZES.p;
                    replaced = `<${tag} style="font-size:${size}px">${selected || "Heading"}</${tag}>`;
                    break;
                case "foreColor":
                    replaced = `<span style="color:${value}">${selected || "text"}</span>`;
                    break;
                case "fontSize":
                    replaced = `<span style="font-size:${value}px">${selected || "text"}</span>`;
                    break;
                case "insertOrderedList":
                    replaced = `<ol><li>${(selected || "Item").replace(/\n/g, "</li><li>")}</li></ol>`;
                    break;
                case "insertUnorderedList":
                    replaced = `<ul><li>${(selected || "Item").replace(/\n/g, "</li><li>")}</li></ul>`;
                    break;
                default:
                    // fallback: wrap in span
                    replaced = `<span>${selected || ""}</span>`;
            }

            const newContent = before + replaced + after;
            setContent(newContent);
            // update textarea value and restore selection around inserted content
            requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = before.length;
                    textareaRef.current.selectionEnd = before.length + replaced.length;
                    textareaRef.current.focus();
                }
            });
            return;
        }

        // Visual editor path: restore selection, execCommand, sync state
        restoreSelection();
        editorRef.current?.focus();
        if (command === "formatBlock" && value) {
            // apply block tag then set default font-size for that block
            document.execCommand("formatBlock", false, value);
            // find current block element and set font size
            const sel = window.getSelection();
            if (sel && sel.anchorNode) {
                const node = sel.anchorNode.nodeType === 3 ? (sel.anchorNode.parentElement as HTMLElement) : (sel.anchorNode as HTMLElement);
                const block = node?.closest("h1,h2,h3,h4,h5,h6,p,pre") as HTMLElement | null;
                if (block) {
                    const tag = block.tagName.toLowerCase();
                    const size = DEFAULT_FONT_SIZES[tag] ?? DEFAULT_FONT_SIZES.p;
                    block.style.fontSize = `${size}px`;
                }
            }
        } else if (command === "foreColor" && value) {
            document.execCommand("foreColor", false, value);
        } else if (command === "fontSize" && value) {
            document.execCommand("fontSize", false, "7");
            const editor = editorRef.current;
            if (editor) {
                const fonts = editor.querySelectorAll('font[size="7"]');
                fonts.forEach((f) => {
                    const span = document.createElement("span");
                    span.style.fontSize = `${value}px`;
                    span.innerHTML = f.innerHTML;
                    f.parentNode?.replaceChild(span, f);
                });
            }
        } else {
            document.execCommand(command, false, value);
        }
        setContent(editorRef.current?.innerHTML || "");
        saveSelection();
    };

    // keep content + stats in sync immediately when typing/pasting
    const handleInput = () => {
        const html = editorRef.current?.innerHTML || "";
        const text = editorRef.current?.innerText || "";
        setContent(html);

        // update counts immediately
        const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
        const chars = text.length;
        setWordCount(words);
        setCharCount(chars);
        setReadingTime(Math.max(1, Math.ceil(words / 200)));

        // update media counts
        const div = document.createElement("div");
        div.innerHTML = html;
        setImageCount(div.querySelectorAll("img").length);
        setVideoCount(div.querySelectorAll("video").length);

        updateBlockFormat();
    };

    // keep editor DOM and content state synchronized when toggling views or when content changes
    useEffect(() => {
        // on mount ensure editor has current content
        if (editorRef.current && !showHTML) {
            editorRef.current.innerHTML = content || "";
        }
    }, []);

    useEffect(() => {
        if (!showHTML && editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content || "";
        }
    }, [content, showHTML]);

    const updateBlockFormat = () => {
        const formatValue = document.queryCommandValue("formatBlock");
        if (formatValue) {
            setBlockFormat(formatValue.replace(/[<>]/g, "").toLowerCase());
        } else {
            setBlockFormat("p");
        }
    };

    const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tag = e.target.value;
        // formatBlock expects a tag like "<h1>" or "<p>"
        applyFormat("formatBlock", `<${tag}>`);
        setBlockFormat(tag);
    };

    const insertHTMLAtCaret = (html: string) => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        range.deleteContents();

        const el = document.createElement("div");
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node, lastNode;
        while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        if (lastNode) {
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        setContent(editorRef.current.innerHTML);
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (type === "image" && imageCount >= 4) {
            alert("You can upload a maximum of 4 images.");
            return;
        }
        if (type === "video" && videoCount >= 1) {
            alert("You can upload only 1 video.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            if (type === "image") {
                insertHTMLAtCaret(
                    `<img src="${base64}" alt="uploaded image" style="max-width:100%; height:auto;" />`
                );
            } else if (type === "video") {
                insertHTMLAtCaret(
                    `<video controls style="max-width:100%; height:auto;">
              <source src="${base64}" type="${file.type}" />
              Your browser does not support the video tag.
            </video>`
                );
            }
            if (fileInputRef.current) fileInputRef.current.value = "";
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = (type: "image" | "video") => {
        if (!fileInputRef.current) return;
        fileInputRef.current.dataset.type = type;
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const type = e.target.dataset.type as "image" | "video" | undefined;
        if (!type) return;
        onFileChange(e, type);
    };

    const handleFeatureImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setFeatureImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handlePublish = () => {
        const currentHtml = showHTML ? content : (editorRef.current?.innerHTML ?? content);
        const plain = stripHtml(currentHtml || "");

        if (!title.trim()) {
            alert("Please enter a title for the post.");
            return;
        }
        if (!plain.trim()) {
            alert("Post content cannot be empty.");
            return;
        }

        // recalc counts from currentHtml to ensure limits honored
        const wordsNow = plain.trim() ? plain.trim().split(/\s+/).filter(Boolean).length : 0;
        const charsNow = plain.length;
        if (wordsNow > WORD_LIMIT) {
            alert(`Post exceeds word limit (${WORD_LIMIT}). Current words: ${wordsNow}`);
            return;
        }
        if (charsNow > CHAR_LIMIT) {
            alert(`Post exceeds character limit (${CHAR_LIMIT}). Current chars: ${charsNow}`);
            return;
        }

        const parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
        const parsedKeywords = keywords
            .split(",")
            .map((k) => k.trim().replace(/^#/, ""))
            .filter(Boolean);

        const newPost: Post = {
            id: Date.now(),
            title: title.trim(),
            content: currentHtml,
            excerpt: excerpt.trim(),
            tags: parsedTags,
            keywords: parsedKeywords,
            featureImage,
            likes: 0,
            shares: 0,
            views: 0,
            comments: [],
            type: 'blog',
        };

        // send new post to parent if provided, otherwise fall back to local state (if exists)
        if (onCreate) {
            onCreate(newPost);
        } else {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (setPosts as any)?.((prev: Post[]) => [newPost, ...(prev || [])]);
            } catch { }
        }

        // reset editor and fields
        setTitle("");
        setContent("");
        setExcerpt("");
        setTags("");
        setKeywords("");
        setFeatureImage(null);
        setWordCount(0);
        setCharCount(0);
        if (editorRef.current) editorRef.current.innerHTML = "";
    };

    // ✅ disable publish conditions (includes excerpt limit and character limit)
    const remainingChars = CHAR_LIMIT - charCount;
    const isPublishDisabled =
        titleCount > TITLE_WORD_LIMIT ||
        wordCount > WORD_LIMIT ||
        remainingChars < 0 ||
        excerptWordCount > EXCERPT_WORD_LIMIT ||
        imageCount > 4 ||
        videoCount > 1;
    // debug: if publish unexpectedly disabled, log counts
    useEffect(() => {
        if (isPublishDisabled) {
            console.warn("Publish disabled:", { titleCount, wordCount, charCount, remainingChars, excerptWordCount, imageCount, videoCount });
        }
    }, [isPublishDisabled, titleCount, wordCount, charCount, remainingChars, excerptWordCount, imageCount, videoCount]);

    // helper to place caret at end of editor
    const placeCaretAtEnd = (el: HTMLElement) => {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    };

    const toggleShowHTML = () => {
        if (!showHTML) {
            // switching TO code view: make sure `content` reflects current editor DOM
            setContent(editorRef.current?.innerHTML || "");
            setShowHTML(true);
        } else {
            // switching BACK to visual editor: ensure editor DOM uses current `content`
            setShowHTML(false);
            // apply after render
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.innerHTML = content || "";
                    placeCaretAtEnd(editorRef.current);
                }
            }, 0);
        }
    };

    // helper to update a post by id — accepts object patch or updater function
    const updatePost = (id: number, patchOrFn: Partial<Post> | ((prev: Post) => Partial<Post>)) => {
        setPosts((prev) =>
            prev.map((p) => {
                if (p.id !== id) return p;
                const patch = typeof patchOrFn === "function" ? patchOrFn(p) : patchOrFn;
                return { ...p, ...patch };
            })
        );
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Post Form */}
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* Title with counter */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="w-full mb-1 px-4 py-2 border border-gray-400 rounded"
                />
                <p className="text-sm text-gray-500 mb-3">
                    Title words: {titleCount} / {TITLE_WORD_LIMIT}
                </p>

                {/* Feature Image */}
                <div className="mb-3">
                    <label className="block mb-1 font-semibold">Feature Image</label>
                    {featureImage ? (
                        <img
                            src={featureImage}
                            alt="Feature"
                            className="max-h-48 mb-2 rounded object-contain"
                        />
                    ) : (
                        <p className="mb-1 text-gray-500 italic">No feature image selected.</p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFeatureImageChange}
                        className="mb-2"
                    />
                </div>

                {/* Excerpt */}
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Post excerpt (short summary)"
                    className="w-full mb-1 px-4 py-2 border border-gray-400 rounded resize-none"
                    rows={3}
                />
                <p className={`text-sm mb-3 ${excerptWordCount > EXCERPT_WORD_LIMIT ? "text-red-600" : "text-gray-500"}`}>
                    Excerpt words: {excerptWordCount} / {EXCERPT_WORD_LIMIT}
                </p>

                {/* Tags */}
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="w-full mb-3 px-4 py-2 border border-gray-400 rounded"
                />

                {/* Keywords */}
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Keywords (comma separated, e.g. #keyword)"
                    className="w-full mb-3 px-4 py-2 border border-gray-400 rounded"
                />

                {/* Toolbar */}
                <div className="mb-3 flex flex-wrap items-center space-x-2">
                    {/* Headings dropdown */}
                    <select
                        onMouseDown={() => saveSelection()} // save selection before interacting
                        value={blockFormat}
                        onChange={handleBlockChange}
                        className="border rounded px-3 py-1"
                        title="Heading Style"
                    >
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
                        <option value="pre">Preformatted</option>
                    </select>

                    <button onMouseDown={(e) => { e.preventDefault(); saveSelection(); }} onClick={() => applyFormat("bold")} className="px-2 py-1 border rounded">B</button>
                    <button onMouseDown={(e) => { e.preventDefault(); saveSelection(); }} onClick={() => applyFormat("italic")} className="px-2 py-1 border rounded">I</button>
                    <button onMouseDown={(e) => { e.preventDefault(); saveSelection(); }} onClick={() => applyFormat("underline")} className="px-2 py-1 border rounded">U</button>
                    <button onClick={() => applyFormat("insertOrderedList")} className="px-2 py-1 border rounded">1.</button>
                    <button onClick={() => applyFormat("insertUnorderedList")} className="px-2 py-1 border rounded">•</button>

                    {/* Link */}
                    <button
                        onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
                        onClick={() => {
                            const url = prompt("Enter URL:", "https://");
                            if (url) applyFormat("createLink", url);
                        }}
                        className="px-2 py-1 border rounded"
                    >
                        🔗
                    </button>

                    {/* Image / Video */}
                    <button onMouseDown={(e) => { e.preventDefault(); saveSelection(); }} onClick={() => triggerFileInput("image")} className="px-2 py-1 border rounded">🖼️</button>
                    <button onMouseDown={(e) => { e.preventDefault(); saveSelection(); }} onClick={() => triggerFileInput("video")} className="px-2 py-1 border rounded">📹</button>

                    {/* Font size */}
                    <select
                        onMouseDown={() => saveSelection()}
                        onChange={(e) => applyFontSize(parseInt(e.target.value, 10))}
                        className="border rounded px-2 py-1"
                        title="Font Size"
                        defaultValue=""
                    >
                        <option value="" disabled>Font size</option>
                        <option value="12">12px</option>
                        <option value="14">14px</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                        <option value="22">22px</option>
                        <option value="24">24px</option>
                        <option value="26">26px</option>
                        <option value="28">28px</option>
                        <option value="30">30px</option>
                        <option value="32">32px</option>
                        <option value="34">34px</option>
                        <option value="36">36px</option>
                        <option value="40">40px</option>
                        <option value="44">44px</option>
                        <option value="48">48px</option>
                        <option value="52">52px</option>
                        <option value="56">56px</option>
                        <option value="60">60px</option>
                        <option value="64">64px</option>
                        <option value="68">68px</option>
                        <option value="72">72px</option>
                    </select>

                    {/* Color picker */}
                    <input
                        onMouseDown={() => saveSelection()}
                        type="color"
                        onChange={(e) => applyColor(e.target.value)}
                        title="Text color"
                        className="w-8 h-8 p-0 border rounded"
                    />

                    {/* Toggle HTML */}
                    <button onMouseDown={() => saveSelection()} onClick={toggleShowHTML} className="px-2 py-1 border rounded">{`</>`}</button>
                </div>

                {/* Rich Text Editor */}
                {!showHTML ? (
                    <div className="relative">
                        {!isEditorFocused && !content.trim() && (
                            <div className="absolute inset-0 pointer-events-none p-4 text-gray-400">
                                Write your post content here...
                            </div>
                        )}
                        <div
                            ref={editorRef}
                            contentEditable
                            spellCheck
                            onInput={handleInput}
                            onFocus={() => setIsEditorFocused(true)}
                            onBlur={() => setIsEditorFocused(false)}
                            className="min-h-[150px] p-4 border border-gray-300 rounded bg-white"
                            suppressContentEditableWarning
                            style={{ whiteSpace: "pre-wrap", outline: "none" }}
                            role="textbox"
                            aria-multiline="true"
                        />
                    </div>
                ) : (
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-40 p-3 border rounded resize-none"
                    />
                )}

                {/* File input */}
                <input
                    type="file"
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                />

                {/* ✅ Counters */}
                <div className="mt-3 text-sm space-y-1">
                    <p className={`${(wordCount > WORD_LIMIT || charCount > CHAR_LIMIT) ? "text-red-600" : "text-gray-600"}`}>
                        Word count: {wordCount} / {WORD_LIMIT} — Characters: {charCount} / {CHAR_LIMIT}
                    </p>
                    <p className="text-gray-600">Reading Time: {readingTime} min</p>
                    <p className="text-gray-600">Images: {imageCount} / 4</p>
                    <p className="text-gray-600">Videos: {videoCount} / 1</p>
                </div>

                {/* Publish */}
                <button
                    onClick={handlePublish}
                    disabled={isPublishDisabled}
                    className={`mt-6 w-full py-3 font-semibold rounded-md transition-colors duration-300 ${isPublishDisabled
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                >
                    Publish
                </button>
            </div>

            {/* All created posts (show newest first) */}
            {/* {posts.length > 0 && (
                <div className="max-w-3xl mx-auto mt-6 space-y-4">
                    {posts.map((p) => (
                        <PostPublish key={p.id} post={p} onUpdate={updatePost} />
                    ))}
                </div>
            )} */}

            {/* Posts Table */}
            {/* <div className="max-w-5xl mx-auto mt-10 overflow-auto">
                <PostTable posts={posts} onRowOpen={(id) => {
                    // increment view when opened from table
                    updatePost(id, (prev) => ({ views: (prev.views ?? 0) + 1 }));
                }} />
            </div> */}
        </div>
    );
};

export default WriteBlogPost;
