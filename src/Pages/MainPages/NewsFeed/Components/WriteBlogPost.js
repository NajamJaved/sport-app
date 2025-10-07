import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
const WriteBlogPost = ({ onCreate }) => {
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    const selectionRangeRef = useRef(null);
    const textareaRef = useRef(null);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [tags, setTags] = useState("");
    const [keywords, setKeywords] = useState("");
    const [featureImage, setFeatureImage] = useState(null);
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
    const DEFAULT_FONT_SIZES = {
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
    const stripHtml = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");
    useEffect(() => {
        var _a, _b, _c;
        // derive plain text from content (works for both visual and HTML editors)
        const textFromContent = content ? stripHtml(content) : "";
        const fallbackText = ((_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.innerText) || "";
        const text = textFromContent || fallbackText;
        const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
        const chars = text.length;
        setWordCount(words);
        setCharCount(chars);
        setReadingTime(Math.max(1, Math.ceil(words / 200)));
        // image/video counters (parse HTML content)
        const div = document.createElement("div");
        div.innerHTML = content || ((_c = (_b = editorRef.current) === null || _b === void 0 ? void 0 : _b.innerHTML) !== null && _c !== void 0 ? _c : "");
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
        if (!sel)
            return;
        sel.removeAllRanges();
        if (selectionRangeRef.current) {
            sel.addRange(selectionRangeRef.current);
        }
        else if (editorRef.current) {
            const range = document.createRange();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            sel.addRange(range);
        }
    };
    // formatting helpers (supports both visual editor and HTML textarea view)
    const applyFormat = (command, value = null) => {
        var _a, _b, _c, _d, _e, _f;
        // If in HTML textarea mode, modify raw HTML string
        if (showHTML && textareaRef.current) {
            const ta = textareaRef.current;
            const start = (_a = ta.selectionStart) !== null && _a !== void 0 ? _a : 0;
            const end = (_b = ta.selectionEnd) !== null && _b !== void 0 ? _b : 0;
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
                    const size = (_c = DEFAULT_FONT_SIZES[tag]) !== null && _c !== void 0 ? _c : DEFAULT_FONT_SIZES.p;
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
        (_d = editorRef.current) === null || _d === void 0 ? void 0 : _d.focus();
        if (command === "formatBlock" && value) {
            // apply block tag then set default font-size for that block
            document.execCommand("formatBlock", false, value);
            // find current block element and set font size
            const sel = window.getSelection();
            if (sel && sel.anchorNode) {
                const node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode;
                const block = node === null || node === void 0 ? void 0 : node.closest("h1,h2,h3,h4,h5,h6,p,pre");
                if (block) {
                    const tag = block.tagName.toLowerCase();
                    const size = (_e = DEFAULT_FONT_SIZES[tag]) !== null && _e !== void 0 ? _e : DEFAULT_FONT_SIZES.p;
                    block.style.fontSize = `${size}px`;
                }
            }
        }
        else if (command === "foreColor" && value) {
            document.execCommand("foreColor", false, value);
        }
        else if (command === "fontSize" && value) {
            document.execCommand("fontSize", false, "7");
            const editor = editorRef.current;
            if (editor) {
                const fonts = editor.querySelectorAll('font[size="7"]');
                fonts.forEach((f) => {
                    var _a;
                    const span = document.createElement("span");
                    span.style.fontSize = `${value}px`;
                    span.innerHTML = f.innerHTML;
                    (_a = f.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(span, f);
                });
            }
        }
        else {
            document.execCommand(command, false, value);
        }
        setContent(((_f = editorRef.current) === null || _f === void 0 ? void 0 : _f.innerHTML) || "");
        saveSelection();
    };
    // keep content + stats in sync immediately when typing/pasting
    const handleInput = () => {
        var _a, _b;
        const html = ((_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML) || "";
        const text = ((_b = editorRef.current) === null || _b === void 0 ? void 0 : _b.innerText) || "";
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
        }
        else {
            setBlockFormat("p");
        }
    };
    const handleBlockChange = (e) => {
        const tag = e.target.value;
        // formatBlock expects a tag like "<h1>" or "<p>"
        applyFormat("formatBlock", `<${tag}>`);
        setBlockFormat(tag);
    };
    const insertHTMLAtCaret = (html) => {
        if (!editorRef.current)
            return;
        editorRef.current.focus();
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
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
    const onFileChange = (e, type) => {
        const file = e.target.files && e.target.files[0];
        if (!file)
            return;
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
            var _a;
            const base64 = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            if (type === "image") {
                insertHTMLAtCaret(`<img src="${base64}" alt="uploaded image" style="max-width:100%; height:auto;" />`);
            }
            else if (type === "video") {
                insertHTMLAtCaret(`<video controls style="max-width:100%; height:auto;">
              <source src="${base64}" type="${file.type}" />
              Your browser does not support the video tag.
            </video>`);
            }
            if (fileInputRef.current)
                fileInputRef.current.value = "";
        };
        reader.readAsDataURL(file);
    };
    const triggerFileInput = (type) => {
        if (!fileInputRef.current)
            return;
        fileInputRef.current.dataset.type = type;
        fileInputRef.current.click();
    };
    const handleFileInputChange = (e) => {
        const type = e.target.dataset.type;
        if (!type)
            return;
        onFileChange(e, type);
    };
    const handleFeatureImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            setFeatureImage((_a = event.target) === null || _a === void 0 ? void 0 : _a.result);
        };
        reader.readAsDataURL(file);
    };
    const handlePublish = () => {
        var _a, _b;
        const currentHtml = showHTML ? content : ((_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML) !== null && _b !== void 0 ? _b : content);
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
        const newPost = {
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
        }
        else {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setPosts === null || setPosts === void 0 ? void 0 : setPosts((prev) => [newPost, ...(prev || [])]);
            }
            catch (_c) { }
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
        if (editorRef.current)
            editorRef.current.innerHTML = "";
    };
    // ✅ disable publish conditions (includes excerpt limit and character limit)
    const remainingChars = CHAR_LIMIT - charCount;
    const isPublishDisabled = titleCount > TITLE_WORD_LIMIT ||
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
    const placeCaretAtEnd = (el) => {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel === null || sel === void 0 ? void 0 : sel.removeAllRanges();
        sel === null || sel === void 0 ? void 0 : sel.addRange(range);
    };
    const toggleShowHTML = () => {
        var _a;
        if (!showHTML) {
            // switching TO code view: make sure `content` reflects current editor DOM
            setContent(((_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML) || "");
            setShowHTML(true);
        }
        else {
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
    const updatePost = (id, patchOrFn) => {
        setPosts((prev) => prev.map((p) => {
            if (p.id !== id)
                return p;
            const patch = typeof patchOrFn === "function" ? patchOrFn(p) : patchOrFn;
            return Object.assign(Object.assign({}, p), patch);
        }));
    };
    return (_jsx("div", { className: "p-6 bg-gray-100 min-h-screen", children: _jsxs("div", { className: "max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md", children: [_jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Enter post title", className: "w-full mb-1 px-4 py-2 border border-gray-400 rounded" }), _jsxs("p", { className: "text-sm text-gray-500 mb-3", children: ["Title words: ", titleCount, " / ", TITLE_WORD_LIMIT] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "block mb-1 font-semibold", children: "Feature Image" }), featureImage ? (_jsx("img", { src: featureImage, alt: "Feature", className: "max-h-48 mb-2 rounded object-contain" })) : (_jsx("p", { className: "mb-1 text-gray-500 italic", children: "No feature image selected." })), _jsx("input", { type: "file", accept: "image/*", onChange: handleFeatureImageChange, className: "mb-2" })] }), _jsx("textarea", { value: excerpt, onChange: (e) => setExcerpt(e.target.value), placeholder: "Post excerpt (short summary)", className: "w-full mb-1 px-4 py-2 border border-gray-400 rounded resize-none", rows: 3 }), _jsxs("p", { className: `text-sm mb-3 ${excerptWordCount > EXCERPT_WORD_LIMIT ? "text-red-600" : "text-gray-500"}`, children: ["Excerpt words: ", excerptWordCount, " / ", EXCERPT_WORD_LIMIT] }), _jsx("input", { type: "text", value: tags, onChange: (e) => setTags(e.target.value), placeholder: "Tags (comma separated)", className: "w-full mb-3 px-4 py-2 border border-gray-400 rounded" }), _jsx("input", { type: "text", value: keywords, onChange: (e) => setKeywords(e.target.value), placeholder: "Keywords (comma separated, e.g. #keyword)", className: "w-full mb-3 px-4 py-2 border border-gray-400 rounded" }), _jsxs("div", { className: "mb-3 flex flex-wrap items-center space-x-2", children: [_jsxs("select", { onMouseDown: () => saveSelection(), value: blockFormat, onChange: handleBlockChange, className: "border rounded px-3 py-1", title: "Heading Style", children: [_jsx("option", { value: "p", children: "Paragraph" }), _jsx("option", { value: "h1", children: "Heading 1" }), _jsx("option", { value: "h2", children: "Heading 2" }), _jsx("option", { value: "h3", children: "Heading 3" }), _jsx("option", { value: "h4", children: "Heading 4" }), _jsx("option", { value: "h5", children: "Heading 5" }), _jsx("option", { value: "h6", children: "Heading 6" }), _jsx("option", { value: "pre", children: "Preformatted" })] }), _jsx("button", { onMouseDown: (e) => { e.preventDefault(); saveSelection(); }, onClick: () => applyFormat("bold"), className: "px-2 py-1 border rounded", children: "B" }), _jsx("button", { onMouseDown: (e) => { e.preventDefault(); saveSelection(); }, onClick: () => applyFormat("italic"), className: "px-2 py-1 border rounded", children: "I" }), _jsx("button", { onMouseDown: (e) => { e.preventDefault(); saveSelection(); }, onClick: () => applyFormat("underline"), className: "px-2 py-1 border rounded", children: "U" }), _jsx("button", { onClick: () => applyFormat("insertOrderedList"), className: "px-2 py-1 border rounded", children: "1." }), _jsx("button", { onClick: () => applyFormat("insertUnorderedList"), className: "px-2 py-1 border rounded", children: "\u2022" }), _jsx("button", { onMouseDown: (e) => { e.preventDefault(); saveSelection(); }, onClick: () => {
                                const url = prompt("Enter URL:", "https://");
                                if (url)
                                    applyFormat("createLink", url);
                            }, className: "px-2 py-1 border rounded", children: "\uD83D\uDD17" }), _jsx("button", { onMouseDown: (e) => { e.preventDefault(); saveSelection(); }, onClick: () => triggerFileInput("image"), className: "px-2 py-1 border rounded", children: "\uD83D\uDDBC\uFE0F" }), _jsx("button", { onMouseDown: (e) => { e.preventDefault(); saveSelection(); }, onClick: () => triggerFileInput("video"), className: "px-2 py-1 border rounded", children: "\uD83D\uDCF9" }), _jsxs("select", { onMouseDown: () => saveSelection(), onChange: (e) => applyFontSize(parseInt(e.target.value, 10)), className: "border rounded px-2 py-1", title: "Font Size", defaultValue: "", children: [_jsx("option", { value: "", disabled: true, children: "Font size" }), _jsx("option", { value: "12", children: "12px" }), _jsx("option", { value: "14", children: "14px" }), _jsx("option", { value: "16", children: "16px" }), _jsx("option", { value: "18", children: "18px" }), _jsx("option", { value: "20", children: "20px" }), _jsx("option", { value: "22", children: "22px" }), _jsx("option", { value: "24", children: "24px" }), _jsx("option", { value: "26", children: "26px" }), _jsx("option", { value: "28", children: "28px" }), _jsx("option", { value: "30", children: "30px" }), _jsx("option", { value: "32", children: "32px" }), _jsx("option", { value: "34", children: "34px" }), _jsx("option", { value: "36", children: "36px" }), _jsx("option", { value: "40", children: "40px" }), _jsx("option", { value: "44", children: "44px" }), _jsx("option", { value: "48", children: "48px" }), _jsx("option", { value: "52", children: "52px" }), _jsx("option", { value: "56", children: "56px" }), _jsx("option", { value: "60", children: "60px" }), _jsx("option", { value: "64", children: "64px" }), _jsx("option", { value: "68", children: "68px" }), _jsx("option", { value: "72", children: "72px" })] }), _jsx("input", { onMouseDown: () => saveSelection(), type: "color", onChange: (e) => applyColor(e.target.value), title: "Text color", className: "w-8 h-8 p-0 border rounded" }), _jsx("button", { onMouseDown: () => saveSelection(), onClick: toggleShowHTML, className: "px-2 py-1 border rounded", children: `</>` })] }), !showHTML ? (_jsxs("div", { className: "relative", children: [!isEditorFocused && !content.trim() && (_jsx("div", { className: "absolute inset-0 pointer-events-none p-4 text-gray-400", children: "Write your post content here..." })), _jsx("div", { ref: editorRef, contentEditable: true, spellCheck: true, onInput: handleInput, onFocus: () => setIsEditorFocused(true), onBlur: () => setIsEditorFocused(false), className: "min-h-[150px] p-4 border border-gray-300 rounded bg-white", suppressContentEditableWarning: true, style: { whiteSpace: "pre-wrap", outline: "none" }, role: "textbox", "aria-multiline": "true" })] })) : (_jsx("textarea", { ref: textareaRef, value: content, onChange: (e) => setContent(e.target.value), className: "w-full h-40 p-3 border rounded resize-none" })), _jsx("input", { type: "file", accept: "image/*,video/*", ref: fileInputRef, onChange: handleFileInputChange, style: { display: "none" } }), _jsxs("div", { className: "mt-3 text-sm space-y-1", children: [_jsxs("p", { className: `${(wordCount > WORD_LIMIT || charCount > CHAR_LIMIT) ? "text-red-600" : "text-gray-600"}`, children: ["Word count: ", wordCount, " / ", WORD_LIMIT, " \u2014 Characters: ", charCount, " / ", CHAR_LIMIT] }), _jsxs("p", { className: "text-gray-600", children: ["Reading Time: ", readingTime, " min"] }), _jsxs("p", { className: "text-gray-600", children: ["Images: ", imageCount, " / 4"] }), _jsxs("p", { className: "text-gray-600", children: ["Videos: ", videoCount, " / 1"] })] }), _jsx("button", { onClick: handlePublish, disabled: isPublishDisabled, className: `mt-6 w-full py-3 font-semibold rounded-md transition-colors duration-300 ${isPublishDisabled
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"}`, children: "Publish" })] }) }));
};
export default WriteBlogPost;
