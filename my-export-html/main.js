var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// main.ts
__export(exports, {
  default: () => ExportHTMLPlugin
});
var import_obsidian = __toModule(require("obsidian"));
var GITHUB_CSS = `
/* Professional GitHub Style CSS */
* {
	box-sizing: border-box;
}

body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	line-height: 1.7;
	color: #24292f;
	background: #ffffff;
	margin: 0;
	padding: 0;
	display: flex;
	min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
	font-weight: 600;
	line-height: 1.25;
	margin-top: 24px;
	margin-bottom: 16px;
	color: #24292f;
}

h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover {
	color: #0969da;
}

h1 {
	font-size: 2em;
	border-bottom: 1px solid #d0d7de;
	padding-bottom: 0.3em;
	margin-top: 0;
}

h2 {
	font-size: 1.5em;
	border-bottom: 1px solid #d0d7de;
	padding-bottom: 0.3em;
}

h3 {
	font-size: 1.25em;
}

h4 {
	font-size: 1em;
}

h5 {
	font-size: 0.875em;
}

h6 {
	font-size: 0.85em;
	color: #656d76;
}

p {
	margin-top: 0;
	margin-bottom: 16px;
}

ul, ol {
	margin-top: 0;
	margin-bottom: 16px;
	padding-left: 2em;
}

li {
	margin-bottom: 4px;
}

ul li::marker {
	color: #0969da;
}

ol li::marker {
	color: #0969da;
}

code {
	background-color: #f6f8fa;
	border-radius: 6px;
	font-size: 85%;
	margin: 0;
	padding: 0.2em 0.4em;
	font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
	color: #24292f;
	border: 1px solid rgba(0, 0, 0, 0.05);
}

pre {
	background-color: #0d1117;
	border-radius: 6px;
	font-size: 85%;
	line-height: 1.45;
	overflow: auto;
	padding: 16px;
	margin-top: 0;
	margin-bottom: 16px;
	position: relative;
}

.code-block-wrapper pre {
	position: relative;
}

pre code {
	background: transparent;
	color: #c9d1d9;
	padding: 0;
	border: none;
	font-size: inherit;
	display: block;
}

.code-block-wrapper {
	position: relative;
	margin-bottom: 16px;
}

.copy-button, .copy-code-button {
	position: absolute !important;
	top: 8px !important;
	right: 8px !important;
	padding: 4px 8px;
	background-color: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 6px;
	color: #c9d1d9;
	font-size: 12px;
	cursor: pointer;
	transition: all 0.2s ease;
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 4px;
}

.copy-button:hover, .copy-code-button:hover {
	background-color: rgba(255, 255, 255, 0.2);
	border-color: rgba(255, 255, 255, 0.4);
}

.copy-button.copied, .copy-code-button.copied {
	background-color: #3fb950;
	border-color: #3fb950;
	color: #ffffff;
}

.copy-button svg, .copy-code-button svg {
	width: 16px;
	height: 16px;
}

.copy-button span, .copy-code-button span {
	font-size: 12px;
}

blockquote {
	border-left: 4px solid #636e72;
	background: #f9f9f9;
	color: #2d3436;
	padding: 12px 16px;
	margin: 0 0 16px 0;
	border-radius: 4px;
	line-height: 1.6;
}

blockquote p {
	margin-bottom: 8px;
}

blockquote p:last-child {
	margin-bottom: 0;
}

blockquote > :first-child {
	margin-top: 0;
}

blockquote > :last-child {
	margin-bottom: 0;
}

blockquote ul,
blockquote ol {
	padding-left: 1em;
	margin-bottom: 8px;
}

blockquote code {
	background-color: rgba(0, 0, 0, 0.05);
	border-radius: 3px;
	padding: 2px 6px;
	font-size: 85%;
}

blockquote pre {
	background-color: #0d1117;
	padding: 12px;
	border-radius: 6px;
	overflow: auto;
}

blockquote pre code {
	background: transparent;
	color: #c9d1d9;
	padding: 0;
}

img {
	max-width: 100%;
	box-sizing: content-box;
	background-color: #ffffff;
	border-radius: 6px;
	margin: 0;
	border: 1px solid #000000;
}

a {
	color: #0969da;
	text-decoration: none;
	transition: color 0.2s ease;
}

a:hover {
	color: #0550ae;
	text-decoration: underline;
}

.table-of-contents {
	background: #f6f8fa;
	padding: 24px;
	width: 320px;
	min-width: 200px;
	max-width: 800px;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	overflow-y: auto;
	overflow-x: hidden;
	box-shadow: 1px 0 0 #d0d7de inset;
	border-right: 1px solid #d0d7de;
	scroll-behavior: smooth;
	z-index: 100;
}

.table-of-contents::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

.table-of-contents::-webkit-scrollbar-track {
	background: #f6f8fa;
}

.table-of-contents::-webkit-scrollbar-thumb {
	background: #8c959f;
	border-radius: 4px;
}

.table-of-contents::-webkit-scrollbar-thumb:hover {
	background: #6e7681;
}

.table-of-contents h2 {
	margin-top: 0;
	font-size: 1.25em;
	border-bottom: 1px solid #d0d7de;
	padding-bottom: 0.3em;
	margin-bottom: 16px;
	color: #24292f;
	font-weight: 600;
}

.table-of-contents ul {
	list-style: none;
	padding-left: 0;
	margin: 0;
}

.table-of-contents li {
	margin-bottom: 8px;
	line-height: 1.5;
	word-wrap: break-word;
	overflow-wrap: break-word;
	white-space: normal;
}

.table-of-contents ul ul {
	margin-top: 4px;
	padding-left: 16px;
	border-left: 2px solid #d0d7de;
	margin-left: 8px;
}

.table-of-contents a {
	color: #24292f;
	text-decoration: none;
	display: block;
	padding: 4px 8px;
	border-radius: 6px;
	font-size: 0.9em;
	transition: all 0.2s ease;
	word-wrap: break-word;
	overflow-wrap: break-word;
	white-space: normal;
}

.table-of-contents a:hover {
	color: #0969da;
	background: #ffffff;
	text-decoration: none;
}

.resize-handle {
	position: fixed;
	top: 0;
	left: 320px;
	width: 8px;
	height: 100vh;
	cursor: col-resize;
	z-index: 101;
	transition: background-color 0.2s ease;
}

.resize-handle:hover,
.resize-handle.resizing {
	background-color: rgba(9, 105, 218, 0.3);
}

.resize-handle::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 2px;
	height: 40px;
	background-color: #d0d7de;
	border-radius: 2px;
}

.resize-handle:hover::after,
.resize-handle.resizing::after {
	background-color: #0969da;
}

.content-wrapper {
	margin-left: 320px;
	padding: 32px;
	flex: 1;
	background: #ffffff;
	transition: margin-left 0.1s ease;
}

.content-wrapper > *:first-child {
	margin-top: 0;
}

.content-wrapper > *:last-child {
	margin-bottom: 0;
}

hr {
	border: none;
	border-top: 1px solid #d0d7de;
	margin: 24px 0;
}

table {
	border-collapse: collapse;
	width: 100%;
	margin: 0 0 16px 0;
	border-radius: 6px;
	overflow: hidden;
}

table th {
	background: #f6f8fa;
	color: #24292f;
	padding: 8px 12px;
	text-align: left;
	font-weight: 600;
	border: 1px solid #d0d7de;
}

table td {
	padding: 8px 12px;
	border: 1px solid #d0d7de;
}

table tr:nth-child(even) {
	background-color: #f6f8fa;
}

table tr:hover {
	background-color: #f3f4f6;
}

@media (max-width: 768px) {
	.table-of-contents {
		width: 100%;
		position: relative;
		min-height: auto;
		border-right: none;
		border-bottom: 1px solid #d0d7de;
	}
	
	.resize-handle {
		display: none;
	}
	
	.content-wrapper {
		margin-left: 0;
		padding: 24px;
	}
	
	body {
		flex-direction: column;
	}
}

@page {
	margin: 2cm;
}

@media print {
	.table-of-contents {
		position: static;
		width: 100%;
		padding: 20px;
	}
	
	.resize-handle {
		display: none;
	}
	
	.content-wrapper {
		margin-left: 0;
		padding: 20px;
		max-width: none;
	}
	
	body {
		background: #ffffff;
	}
	
	.copy-button {
		display: none;
	}
}
`;
var DEFAULT_SETTINGS = {
  autoOpenFolder: true
};
var ExportHTMLPlugin = class extends import_obsidian.Plugin {
  async onload() {
    console.log("Export HTML plugin loaded");
    await this.loadSettings();
    this.addSettingTab(new ExportHTMLSettingTab(this.app, this));
    this.addCommand({
      id: "export-to-html",
      name: this.translate("Export to HTML..."),
      icon: "download",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (file && file.extension === "md") {
          if (!checking) {
            this.exportToHTML(file);
          }
          return true;
        }
        return false;
      }
    });
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
      if (file.extension === "md") {
        menu.addItem((item) => {
          item.setTitle(this.translate("Export to HTML...")).setIcon("download").onClick(async () => {
            this.exportToHTML(file);
          });
        });
      }
    }));
  }
  translate(key) {
    const locale = localStorage.getItem("language") || "en";
    const translations = {
      "Export to HTML...": {
        "zh-CN": "\u5BFC\u51FA\u4E3A HTML...",
        "zh": "\u5BFC\u51FA\u4E3A HTML...",
        en: "Export to HTML..."
      },
      "Exporting": {
        "zh-CN": "\u6B63\u5728\u5BFC\u51FA",
        "zh": "\u6B63\u5728\u5BFC\u51FA",
        en: "Exporting"
      },
      "Failed to export HTML": {
        "zh-CN": "\u5BFC\u51FA HTML \u5931\u8D25",
        "zh": "\u5BFC\u51FA HTML \u5931\u8D25",
        en: "Failed to export HTML"
      },
      "HTML exported successfully": {
        "zh-CN": "HTML \u5BFC\u51FA\u6210\u529F",
        "zh": "HTML \u5BFC\u51FA\u6210\u529F",
        en: "HTML exported successfully"
      },
      "Table of Contents": {
        "zh-CN": "\u76EE\u5F55",
        "zh": "\u76EE\u5F55",
        en: "Table of Contents"
      },
      "Auto-open folder after export": {
        "zh-CN": "\u5BFC\u51FA\u540E\u81EA\u52A8\u6253\u5F00\u6587\u4EF6\u5939",
        "zh": "\u5BFC\u51FA\u540E\u81EA\u52A8\u6253\u5F00\u6587\u4EF6\u5939",
        en: "Auto-open folder after export"
      },
      "Automatically open the folder containing the exported HTML file after successful export": {
        "zh-CN": "\u5BFC\u51FA\u6210\u529F\u540E\u81EA\u52A8\u6253\u5F00\u5305\u542B\u5BFC\u51FA HTML \u6587\u4EF6\u7684\u6587\u4EF6\u5939",
        "zh": "\u5BFC\u51FA\u6210\u529F\u540E\u81EA\u52A8\u6253\u5F00\u5305\u542B\u5BFC\u51FA HTML \u6587\u4EF6\u7684\u6587\u4EF6\u5939",
        en: "Automatically open the folder containing the exported HTML file after successful export"
      }
    };
    const translation = translations[key];
    return (translation == null ? void 0 : translation[locale]) || (translation == null ? void 0 : translation.en) || key;
  }
  async exportToHTML(file) {
    try {
      const content = await this.app.vault.read(file);
      const htmlContent = await this.convertMarkdownToHTML(content, file);
      const electron = require("electron");
      const path = require("path");
      const adapter = this.app.vault.adapter;
      const basePath = adapter.getBasePath();
      let defaultPath;
      if (file.parent && file.parent.path) {
        defaultPath = path.join(basePath, file.parent.path, file.basename + ".html");
      } else {
        defaultPath = path.join(basePath, file.basename + ".html");
      }
      const { canceled, filePath } = await electron.remote.dialog.showSaveDialog({
        defaultPath,
        filters: [
          { name: "HTML Files", extensions: ["html"] },
          { name: "All Files", extensions: ["*"] }
        ]
      });
      if (!canceled && filePath) {
        const fs = require("fs/promises");
        await fs.writeFile(filePath, htmlContent, "utf-8");
        new import_obsidian.Notice(`${this.translate("HTML exported successfully")}: ${filePath}`);
        if (this.settings.autoOpenFolder) {
          const path2 = require("path");
          const folderPath = path2.dirname(filePath);
          const { shell } = require("electron");
          shell.openPath(folderPath);
        }
      }
    } catch (error) {
      console.error("Error exporting HTML:", error);
      new import_obsidian.Notice(this.translate("Failed to export HTML"));
    }
  }
  async convertMarkdownToHTML(markdown, file) {
    const imageLinks = this.extractImageLinks(markdown);
    const tempDiv = document.createElement("div");
    await import_obsidian.MarkdownRenderer.renderMarkdown(markdown, tempDiv, file.path, this);
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingsData = [];
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
        heading.setAttribute("id", heading.id);
      }
      headingsData.push({
        level: parseInt(heading.tagName.charAt(1)),
        id: heading.id,
        text: heading.textContent || ""
      });
    });
    let html = await this.convertImagesToBase64(tempDiv.innerHTML, file, imageLinks);
    html = this.wrapCodeBlocks(html);
    const documentTitle = file.basename;
    let toc = '<div class="table-of-contents">';
    toc += `<h2>${documentTitle}</h2>`;
    toc += this.generateNestedTOC(headingsData);
    toc += "</div>";
    let htmlWithIds = html;
    const copyScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
	const copyButtons = document.querySelectorAll('.copy-button, .copy-code-button');
	
	copyButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			const wrapper = this.closest('.code-block-wrapper');
			if (!wrapper) return;
			
			const pre = wrapper.querySelector('pre');
			const code = pre.querySelector('code');
			if (!code) return;
			
			const textToCopy = code.textContent;
			
			navigator.clipboard.writeText(textToCopy).then(() => {
				const originalHTML = this.innerHTML;
				this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copied!</span>';
				this.classList.add('copied');
				
				setTimeout(() => {
					this.innerHTML = originalHTML;
					this.classList.remove('copied');
				}, 2000);
			}).catch(err => {
				const textArea = document.createElement('textarea');
				textArea.value = textToCopy;
				textArea.style.position = 'fixed';
				textArea.style.left = '-999999px';
				document.body.appendChild(textArea);
				textArea.select();
				try {
					document.execCommand('copy');
					const originalHTML = this.innerHTML;
					this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copied!</span>';
					this.classList.add('copied');
					
					setTimeout(() => {
						this.innerHTML = originalHTML;
						this.classList.remove('copied');
					}, 2000);
				} catch (err) {
					console.error('Failed to copy:', err);
				}
				document.body.removeChild(textArea);
			});
		});
	});
});
<\/script>
`;
    const resizeScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
	const toc = document.querySelector('.table-of-contents');
	const contentWrapper = document.querySelector('.content-wrapper');
	const resizeHandle = document.querySelector('.resize-handle');
	
	if (!toc || !contentWrapper || !resizeHandle) return;
	
	let isResizing = false;
	
	resizeHandle.addEventListener('mousedown', function(e) {
		isResizing = true;
		resizeHandle.classList.add('resizing');
		document.body.style.cursor = 'col-resize';
		document.body.style.userSelect = 'none';
		e.preventDefault();
	});
	
	document.addEventListener('mousemove', function(e) {
		if (!isResizing) return;
		
		const newWidth = e.clientX;
		const min = 200;
		const max = 800;
		
		if (newWidth >= min && newWidth <= max) {
			toc.style.width = newWidth + 'px';
			contentWrapper.style.marginLeft = newWidth + 'px';
			resizeHandle.style.left = newWidth + 'px';
		}
	});
	
	document.addEventListener('mouseup', function() {
		if (isResizing) {
			isResizing = false;
			resizeHandle.classList.remove('resizing');
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
		}
	});
});
<\/script>
`;
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${file.basename}</title>
	<style>${GITHUB_CSS}</style>
</head>
<body>
	${toc}
	<div class="resize-handle"></div>
	<div class="content-wrapper">
		${htmlWithIds}
	</div>
	${copyScript}
	${resizeScript}
</body>
</html>
`;
    return fullHTML;
  }
  generateNestedTOC(headings) {
    if (headings.length === 0) {
      return "<ul></ul>";
    }
    let toc = "<ul>";
    const stack = [0];
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const level = heading.level;
      while (stack.length > 1 && stack[stack.length - 1] >= level) {
        toc += "</li></ul>";
        stack.pop();
      }
      if (level > stack[stack.length - 1]) {
        toc += "<ul>";
        stack.push(level);
      } else if (i > 0) {
        toc += "</li>";
      }
      toc += `<li><a href="#${heading.id}">${heading.text}</a>`;
    }
    while (stack.length > 1) {
      toc += "</li></ul>";
      stack.pop();
    }
    toc += "</li></ul>";
    return toc;
  }
  wrapCodeBlocks(html) {
    const wrapped = html.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, `<div class="code-block-wrapper"><pre$1>$2</pre></div>`);
    return wrapped;
  }
  extractImageLinks(markdown) {
    const imageLinks = [];
    const markdownImgRegex = /!\[([^\]]*)\]\(([^)]+)\)|!\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = markdownImgRegex.exec(markdown)) !== null) {
      if (match[2]) {
        const src = match[2].split("|")[0].split("?")[0];
        imageLinks.push(src);
      }
      if (match[3]) {
        const src = match[3].split("|")[0].split("?")[0];
        imageLinks.push(src);
      }
    }
    return imageLinks;
  }
  async convertImagesToBase64(html, file, imageLinks = []) {
    var _a;
    let processedHtml = html;
    const processedImages = new Map();
    const processingImages = new Set();
    for (const imgSrc of imageLinks) {
      const cleanSrc = imgSrc.split("?")[0].split("#")[0];
      const extension = ((_a = cleanSrc.split(".").pop()) == null ? void 0 : _a.toLowerCase()) || "";
      const imageExtensions = ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "ico", "avif", "heic"];
      if (!imageExtensions.includes(extension)) {
        continue;
      }
      if (cleanSrc.startsWith("data:")) {
        continue;
      }
      try {
        if (processedImages.has(cleanSrc) || processingImages.has(cleanSrc)) {
          continue;
        }
        processingImages.add(cleanSrc);
        const base64Data = await this.getImageBase64(cleanSrc, file);
        processingImages.delete(cleanSrc);
        if (base64Data) {
          const mimeType = this.getMimeType(base64Data.extension);
          const dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
          processedImages.set(cleanSrc, dataUrl);
        }
      } catch (error) {
      }
    }
    const imgRegex = /<img src="([^"]+)"(?: alt="([^"]*)")?(?: title="([^"]*)")?\s*\/?>/g;
    const imgMatches = [];
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      imgMatches.push({
        full: match[0],
        src: match[1],
        alt: match[2] || "",
        index: match.index
      });
    }
    const replacements = [];
    for (const img of imgMatches) {
      if (img.src.startsWith("data:")) {
        continue;
      }
      try {
        let dataUrl = null;
        if (processedImages.has(img.src)) {
          dataUrl = processedImages.get(img.src);
        } else if (processingImages.has(img.src)) {
          continue;
        } else {
          processingImages.add(img.src);
          const base64Data = await this.getImageBase64(img.src, file);
          processingImages.delete(img.src);
          if (base64Data) {
            const mimeType = this.getMimeType(base64Data.extension);
            dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
            processedImages.set(img.src, dataUrl);
          }
        }
        if (dataUrl) {
          const newImgTag = `<img src="${dataUrl}" alt="${img.alt}" />`;
          replacements.push({
            start: img.index,
            end: img.index + img.full.length,
            replacement: newImgTag
          });
        }
      } catch (error) {
      }
    }
    if (replacements.length > 0) {
      replacements.sort((a, b) => b.start - a.start);
      for (const rep of replacements) {
        processedHtml = processedHtml.substring(0, rep.start) + rep.replacement + processedHtml.substring(rep.end);
      }
    }
    const embedRegex = /<span[^>]*class="[^"]*internal-embed[^"]*"[^>]*>[\s\S]*?<\/span>/g;
    const embedMatches = [];
    const matches = Array.from(processedHtml.matchAll(embedRegex));
    for (const match2 of matches) {
      const fullMatch = match2[0];
      const srcMatch = fullMatch.match(/src="([^"]+)"/);
      const altMatch = fullMatch.match(/alt="([^"]+)"/);
      if (srcMatch) {
        embedMatches.push({
          full: fullMatch,
          src: srcMatch[1],
          alt: altMatch ? altMatch[1] : "",
          index: match2.index
        });
      }
    }
    const embedReplacements = [];
    for (const embed of embedMatches) {
      if (embed.src && !embed.src.startsWith("data:")) {
        try {
          let dataUrl = null;
          if (processedImages.has(embed.src)) {
            dataUrl = processedImages.get(embed.src);
          } else if (processingImages.has(embed.src)) {
            continue;
          } else {
            processingImages.add(embed.src);
            const base64Data = await this.getImageBase64(embed.src, file);
            processingImages.delete(embed.src);
            if (base64Data) {
              const mimeType = this.getMimeType(base64Data.extension);
              dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
              processedImages.set(embed.src, dataUrl);
            }
          }
          if (dataUrl) {
            const newImgTag = `<img src="${dataUrl}" alt="${embed.alt || ""}" />`;
            embedReplacements.push({
              start: embed.index,
              end: embed.index + embed.full.length,
              replacement: newImgTag
            });
          }
        } catch (error) {
        }
      }
    }
    if (embedReplacements.length > 0) {
      embedReplacements.sort((a, b) => b.start - a.start);
      for (const rep of embedReplacements) {
        processedHtml = processedHtml.substring(0, rep.start) + rep.replacement + processedHtml.substring(rep.end);
      }
    }
    return processedHtml;
  }
  async getImageBase64(src, file) {
    if (src.startsWith("data:")) {
      return null;
    }
    const decodedSrc = decodeURIComponent(src);
    const cleanSrc = decodedSrc.split("?")[0].split("#")[0];
    let imageFile = null;
    imageFile = this.app.metadataCache.getFirstLinkpathDest(cleanSrc, file.path);
    if (!imageFile) {
      imageFile = this.app.metadataCache.getFirstLinkpathDest(src, file.path);
    }
    if (!imageFile) {
      const path = require("path");
      const fileDir = path.dirname(file.path);
      const resolvedPath = path.normalize(path.join(fileDir, cleanSrc));
      imageFile = this.app.vault.getAbstractFileByPath(resolvedPath);
    }
    if (!imageFile) {
      imageFile = this.app.vault.getAbstractFileByPath(cleanSrc);
    }
    if (!imageFile) {
      return null;
    }
    if (imageFile && imageFile instanceof import_obsidian.TFile && ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp"].includes(imageFile.extension.toLowerCase())) {
      try {
        const buffer = await this.app.vault.readBinary(imageFile);
        const base64 = this.arrayBufferToBase64(buffer);
        return { base64, extension: imageFile.extension };
      } catch (error) {
        return null;
      }
    }
    return null;
  }
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let base64 = "";
    const chunkSize = 32768;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      base64 += String.fromCharCode.apply(null, chunk);
    }
    return btoa(base64);
  }
  getMimeType(extension) {
    const mimeTypes = {
      "png": "image/png",
      "jpg": "image/jpeg",
      "jpeg": "image/jpeg",
      "gif": "image/gif",
      "svg": "image/svg+xml",
      "webp": "image/webp"
    };
    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }
  onunload() {
    console.log("Export HTML plugin unloaded");
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var ExportHTMLSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName(this.plugin.translate("Auto-open folder after export")).setDesc(this.plugin.translate("Automatically open the folder containing the exported HTML file after successful export")).addToggle((toggle) => toggle.setValue(this.plugin.settings.autoOpenFolder).onChange(async (value) => {
      this.plugin.settings.autoOpenFolder = value;
      await this.plugin.saveSettings();
    }));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
