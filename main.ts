import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, Menu, Vault, FileSystemAdapter, MarkdownRenderer, Component } from 'obsidian';

const GITHUB_CSS = `
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
	border-left: 4px solid #d0d7de;
	background: #f6f8fa;
	color: #24292f;
	padding: 0 16px;
	margin: 0 0 16px 0;
}

blockquote p:last-child {
	margin-bottom: 0;
}

img {
	max-width: 100%;
	box-sizing: content-box;
	background-color: #ffffff;
	border-radius: 6px;
	margin: 0;
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
	min-height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	overflow: auto;
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
	white-space: nowrap;
}

.table-of-contents li {
	margin-bottom: 8px;
	line-height: 1.5;
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
	max-width: 800px;
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

export default class ExportHTMLPlugin extends Plugin implements Component {
	async onload() {
		console.log('Export HTML plugin loaded');

		// Add right-click menu item
		this.addCommand({
			id: 'export-to-html',
			name: this.translate('Export to HTML...'),
			icon: 'download',
			checkCallback: (checking: boolean) => {
				const file = this.app.workspace.getActiveFile();
				if (file && file.extension === 'md') {
					if (!checking) {
						this.exportToHTML(file);
					}
					return true;
				}
				return false;
			}
		});

		// Add file explorer context menu
		this.registerEvent(
			this.app.workspace.on('file-menu', (menu: Menu, file: TFile) => {
				if (file.extension === 'md') {
					menu.addItem((item) => {
						item
							.setTitle(this.translate('Export to HTML...'))
							.setIcon('download')
							.onClick(async () => {
								this.exportToHTML(file);
							});
					});
				}
			})
		);
	}

	translate(key: string): string {
		const locale = (this.app.vault as any).getConfig('locale') || 'en';
		const translations: { [key: string]: { [lang: string]: string } } = {
			'Export to HTML...': {
				'zh-CN': '导出为HTML...',
				en: 'Export to HTML...'
			},
			'Exporting': {
				'zh-CN': '正在导出',
				en: 'Exporting'
			},
			'Failed to export HTML': {
				'zh-CN': '导出HTML失败',
				en: 'Failed to export HTML'
			},
			'HTML exported successfully': {
				'zh-CN': 'HTML导出成功',
				en: 'HTML exported successfully'
			},
			'Table of Contents': {
				'zh-CN': '目录',
				en: 'Table of Contents'
			}
		};
		const translation = translations[key];
		return translation?.[locale] || translation?.en || key;
	}

	async exportToHTML(file: TFile) {
		try {
			const content = await this.app.vault.read(file);
			const htmlContent = await this.convertMarkdownToHTML(content, file);
			
			// Show save dialog using Electron's remote dialog API
			const electron = require('electron');
			const path = require('path');
			const adapter = this.app.vault.adapter as FileSystemAdapter;
			const basePath = adapter.getBasePath();
			
			// Build default path: same directory as the current file, with .html extension
			let defaultPath: string;
			if (file.parent && file.parent.path) {
				defaultPath = path.join(basePath, file.parent.path, file.basename + '.html');
			} else {
				defaultPath = path.join(basePath, file.basename + '.html');
			}
			
			const { canceled, filePath } = await electron.remote.dialog.showSaveDialog({
				defaultPath: defaultPath,
				filters: [
					{ name: 'HTML Files', extensions: ['html'] },
					{ name: 'All Files', extensions: ['*'] }
				]
			});

			if (!canceled && filePath) {
				// Save the HTML file using Node.js fs/promises
				const fs = require('fs/promises');
				await fs.writeFile(filePath, htmlContent, 'utf-8');
				new Notice(`${this.translate('HTML exported successfully')}: ${filePath}`);
			}
		} catch (error) {
			console.error('Error exporting HTML:', error);
			new Notice(this.translate('Failed to export HTML'));
		}
	}

	async convertMarkdownToHTML(markdown: string, file: TFile): Promise<string> {
		// Create a temporary div to render markdown
		const tempDiv = document.createElement('div');
		
		// Use Obsidian's markdown renderer (static method)
		await MarkdownRenderer.renderMarkdown(markdown, tempDiv, file.path, this);
		
		// Extract headings and add IDs first
		const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const headingsData: any[] = [];
		
		headings.forEach((heading, index) => {
			// Add ID if not present
			if (!heading.id) {
				heading.id = `heading-${index}`;
				heading.setAttribute('id', heading.id);
			}
			
			headingsData.push({
				level: parseInt(heading.tagName.charAt(1)),
				id: heading.id,
				text: heading.textContent || ''
			});
		});

		// Process images: convert to base64
		let html = await this.convertImagesToBase64(tempDiv.innerHTML, file);
		
		// Wrap code blocks
		html = this.wrapCodeBlocks(html);

		// Use filename as document title
		const documentTitle = file.basename;

		// Generate table of contents with proper nesting
		let toc = '<div class="table-of-contents">';
		toc += `<h2>${documentTitle}</h2>`;
		toc += this.generateNestedTOC(headingsData);
		toc += '</div>';

		// Get the processed HTML with IDs
		let htmlWithIds = html;

		// JavaScript for copy functionality
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
</script>
`;

		// JavaScript for resize functionality
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
</script>
`;

		// Build full HTML document
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

	generateNestedTOC(headings: any[]): string {
		if (headings.length === 0) {
			return '<ul></ul>';
		}

		let toc = '<ul>';
		const stack: number[] = [0]; // 记录当前层级

		for (let i = 0; i < headings.length; i++) {
			const heading = headings[i];
			const level = heading.level;
			
			// 找到当前标题应该所在的层级
			while (stack.length > 1 && stack[stack.length - 1] >= level) {
				toc += '</li></ul>';
				stack.pop();
			}
			
			// 如果是新层级，添加 ul
			if (level > stack[stack.length - 1]) {
				toc += '<ul>';
				stack.push(level);
			} else if (i > 0) {
				// 同一层级，关闭前一个 li
				toc += '</li>';
			}
			
			// 添加当前标题
			toc += `<li><a href="#${heading.id}">${heading.text}</a>`;
		}

		// 关闭所有剩余的标签
		while (stack.length > 1) {
			toc += '</li></ul>';
			stack.pop();
		}
		toc += '</li></ul>';

		return toc;
	}

	wrapCodeBlocks(html: string): string {
		// Wrap pre tags with code-block-wrapper
		// Match both simple and complex pre structures
		const wrapped = html.replace(
			/<pre([^>]*)>([\s\S]*?)<\/pre>/g,
			`<div class="code-block-wrapper"><pre$1>$2</pre></div>`
		);
		return wrapped;
	}

	async convertImagesToBase64(html: string, file: TFile): Promise<string> {
		let processedHtml = html;

		// 处理 <img> 标签
		const imgRegex = /<img src="([^"]+)"(?: alt="([^"]*)")?(?: title="([^"]*)")?\s*\/?>/g;
		let imgMatch;
		const imgMatches: { full: string; src: string; alt: string }[] = [];

		while ((imgMatch = imgRegex.exec(html)) !== null) {
			imgMatches.push({
				full: imgMatch[0],
				src: imgMatch[1],
				alt: imgMatch[2] || ''
			});
		}

		// 处理所有匹配的图片
		for (const img of imgMatches) {
			// Skip if already a data URL
			if (img.src.startsWith('data:')) {
				continue;
			}

			try {
				const base64Data = await this.getImageBase64(img.src, file);
				
				if (base64Data) {
					const mimeType = this.getMimeType(base64Data.extension);
					const dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
					const newImgTag = `<img src="${dataUrl}" alt="${img.alt}" />`;
					processedHtml = processedHtml.replace(img.full, newImgTag);
				}
			} catch (error) {
				console.error('Error converting image to base64:', error);
			}
		}

		// 处理 Obsidian 的 internal-embed span 标签
		// 匹配所有 class 包含 internal-embed 的 span 标签
		const embedRegex = /<span[^>]*class="[^"]*internal-embed[^"]*"[^>]*>[\s\S]*?<\/span>/g;
		let embedMatch;
		const embedMatches: { full: string; src?: string; alt?: string }[] = [];

		// 先收集所有匹配项
		while ((embedMatch = embedRegex.exec(processedHtml)) !== null) {
			const fullMatch = embedMatch[0];
			
			// 从 span 标签中提取 src 和 alt 属性
			const srcMatch = fullMatch.match(/src="([^"]+)"/);
			const altMatch = fullMatch.match(/alt="([^"]+)"/);
			
			if (srcMatch) {
				embedMatches.push({
					full: fullMatch,
					src: srcMatch[1],
					alt: altMatch ? altMatch[1] : ''
				});
			}
		}

		// 处理所有匹配的图片 - 从后往前替换，避免索引偏移问题
		for (let i = embedMatches.length - 1; i >= 0; i--) {
			const embed = embedMatches[i];
			if (embed.src) {
				try {
					const base64Data = await this.getImageBase64(embed.src, file);
					
					if (base64Data) {
						const mimeType = this.getMimeType(base64Data.extension);
						const dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
						// 将 span 替换为 img 标签
						const newImgTag = `<img src="${dataUrl}" alt="${embed.alt || ''}" />`;
						
						// 使用 indexOf 和 substring 进行精确替换
						const startIndex = processedHtml.indexOf(embed.full);
						if (startIndex !== -1) {
							processedHtml = processedHtml.substring(0, startIndex) + newImgTag + processedHtml.substring(startIndex + embed.full.length);
						}
					}
				} catch (error) {
					console.error('Error converting embed to base64:', error);
				}
			}
		}

		return processedHtml;
	}

	async getImageBase64(src: string, file: TFile): Promise<{ base64: string; extension: string } | null> {
		// Skip if already a data URL
		if (src.startsWith('data:')) {
			return null;
		}

		// Handle Obsidian internal links (decode URI component)
		const decodedSrc = decodeURIComponent(src);
		
		// Remove query parameters and hash
		const cleanSrc = decodedSrc.split('?')[0].split('#')[0];
		
		// Try to find the image file
		let imageFile: TFile | null = null;
		
		// Try direct path first using Obsidian's metadata cache
		imageFile = this.app.metadataCache.getFirstLinkpathDest(cleanSrc, file.path);
		
		// If not found, try with original src
		if (!imageFile) {
			imageFile = this.app.metadataCache.getFirstLinkpathDest(src, file.path);
		}

		// 如果还是找不到，尝试使用相对路径解析
		if (!imageFile) {
			const path = require('path');
			const fileDir = path.dirname(file.path);
			const resolvedPath = path.normalize(path.join(fileDir, cleanSrc));
			
			// 尝试从 vault 中获取文件
			imageFile = this.app.vault.getAbstractFileByPath(resolvedPath) as TFile;
		}

		// 如果还是找不到，尝试直接使用 src 作为路径
		if (!imageFile) {
			imageFile = this.app.vault.getAbstractFileByPath(cleanSrc) as TFile;
		}

		if (imageFile && imageFile instanceof TFile && 
			['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp'].includes(imageFile.extension.toLowerCase())) {
			try {
				// Read image content
				const buffer = await this.app.vault.readBinary(imageFile);
				// Convert buffer to base64
				const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
				return { base64, extension: imageFile.extension };
			} catch (error) {
				console.error('Error reading image file:', error);
				return null;
			}
		}

		return null;
	}

	getMimeType(extension: string): string {
		const mimeTypes: { [key: string]: string } = {
			'png': 'image/png',
			'jpg': 'image/jpeg',
			'jpeg': 'image/jpeg',
			'gif': 'image/gif',
			'svg': 'image/svg+xml',
			'webp': 'image/webp'
		};
		return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
	}

	onunload() {
		console.log('Export HTML plugin unloaded');
	}
}