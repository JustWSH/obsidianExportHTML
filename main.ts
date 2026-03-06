import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, Menu, Vault, FileSystemAdapter, MarkdownRenderer, Component } from 'obsidian';
import { KATEX_JS_BASE64, KATEX_CSS_BASE64 } from './katex-constants';

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
	overflow-x: hidden;
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
	background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
	border-radius: 8px;
	font-size: 14px;
	line-height: 1.6;
	overflow: auto;
	padding: 20px 16px;
	margin-top: 0;
	margin-bottom: 16px;
	position: relative;
	max-width: 100%;
	border: 1px solid #e2e8f0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.code-block-wrapper {
	position: relative;
	margin-bottom: 16px;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid #e2e8f0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.code-block-wrapper pre {
	position: relative;
	overflow-x: auto;
	overflow-y: scroll;
	margin: 0;
	border-radius: 0;
	border: none;
	box-shadow: none;
	padding: 20px 16px 20px 64px;
	background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
	min-height: 60px;
}

pre code {
	background: transparent;
	color: #334155;
	padding: 0;
	border: none;
	font-size: inherit;
	display: block;
	white-space: pre;
	word-wrap: normal;
	overflow-x: auto;
	font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace;
	line-height: 1.6;
}

.code-block-wrapper .line-numbers {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 52px;
	background: linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%);
	border-right: 1px solid #cbd5e1;
	padding: 20px 0;
	text-align: right;
	color: #94a3b8;
	font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace;
	font-size: 14px;
	line-height: 1.6;
	overflow: hidden;
	user-select: none;
	pointer-events: none;
	z-index: 1;
}

.code-block-wrapper .line-numbers span {
	display: block;
	padding-right: 8px;
	height: 22.4px;
}

.code-block-wrapper pre::-webkit-scrollbar {
	width: 0px;
	height: 6px;
}

.code-block-wrapper pre::-webkit-scrollbar-track {
	background: transparent;
}

.code-block-wrapper pre::-webkit-scrollbar-thumb {
	background: #cbd5e1;
	border-radius: 3px;
}

.code-block-wrapper pre::-webkit-scrollbar-thumb:hover {
	background: #94a3b8;
}

.code-block-wrapper pre::-webkit-scrollbar-corner {
	background: transparent;
}

.code-block-wrapper pre:hover::-webkit-scrollbar {
	width: 6px;
}

.copy-button, .copy-code-button {
	position: absolute !important;
	top: 8px !important;
	right: 8px !important;
	padding: 4px 8px;
	background-color: rgba(255, 255, 255, 0.8);
	border: 1px solid #e2e8f0;
	border-radius: 6px;
	color: #475569;
	font-size: 12px;
	cursor: pointer;
	transition: all 0.2s ease;
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 4px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.copy-button:hover, .copy-code-button:hover {
	background-color: #ffffff;
	border-color: #cbd5e1;
	color: #334155;
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
	max-width: 100%;
	overflow-x: hidden;
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

interface ExportHTMLPluginSettings {
	autoOpenFolder: boolean;
}

const DEFAULT_SETTINGS: ExportHTMLPluginSettings = {
	autoOpenFolder: true
};

export default class ExportHTMLPlugin extends Plugin implements Component {
	settings: ExportHTMLPluginSettings;

	async onload() {
		console.log('Export HTML plugin loaded');
		
		await this.loadSettings();
		
		this.addSettingTab(new ExportHTMLSettingTab(this.app, this));

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
		const locale = localStorage.getItem('language') || 'en';
		const translations: { [key: string]: { [lang: string]: string } } = {
			'Export to HTML...': {
				'zh-CN': '导出为 HTML...',
				'zh': '导出为 HTML...',
				en: 'Export to HTML...'
			},
			'Exporting': {
				'zh-CN': '正在导出',
				'zh': '正在导出',
				en: 'Exporting'
			},
			'Failed to export HTML': {
				'zh-CN': '导出 HTML 失败',
				'zh': '导出 HTML 失败',
				en: 'Failed to export HTML'
			},
			'HTML exported successfully': {
				'zh-CN': 'HTML 导出成功',
				'zh': 'HTML 导出成功',
				en: 'HTML exported successfully'
			},
			'Table of Contents': {
				'zh-CN': '目录',
				'zh': '目录',
				en: 'Table of Contents'
			},
			'Auto-open folder after export': {
				'zh-CN': '导出后自动打开文件夹',
				'zh': '导出后自动打开文件夹',
				en: 'Auto-open folder after export'
			},
			'Automatically open the folder containing the exported HTML file after successful export': {
				'zh-CN': '导出成功后自动打开包含导出 HTML 文件的文件夹',
				'zh': '导出成功后自动打开包含导出 HTML 文件的文件夹',
				en: 'Automatically open the folder containing the exported HTML file after successful export'
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
				
				// Auto-open folder if setting is enabled
				if (this.settings.autoOpenFolder) {
					const path = require('path');
					const folderPath = path.dirname(filePath);
					const { shell } = require('electron');
					shell.openPath(folderPath);
				}
			}
		} catch (error) {
			console.error('Error exporting HTML:', error);
			new Notice(this.translate('Failed to export HTML'));
		}
	}

	async convertMarkdownToHTML(markdown: string, file: TFile): Promise<string> {
		// 先在 Markdown 源码层面提取所有图片引用
		const imageLinks = this.extractImageLinks(markdown);
		
		// 检测是否包含数学公式
		const hasMath = this.detectMathFormulas(markdown);
		
		// 保护数学公式，防止Obsidian渲染
		let protectedMarkdown = markdown;
		const mathPlaceholders: string[] = [];
		
		if (hasMath) {
			// 保护块级公式 $$...$$
			protectedMarkdown = protectedMarkdown.replace(/\$\$([\s\S]+?)\$\$/g, (match, latex) => {
				const placeholder = `MATH_BLOCK_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`$$${latex}$$`);
				return placeholder;
			});
			
			// 保护行内公式 $...$
			protectedMarkdown = protectedMarkdown.replace(/\$([^$\n]+?)\$/g, (match, latex) => {
				const placeholder = `MATH_INLINE_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`$${latex}$`);
				return placeholder;
			});
			
			// 保护 \(...\)
			protectedMarkdown = protectedMarkdown.replace(/\\\(([^)]+?)\\\)/g, (match, latex) => {
				const placeholder = `MATH_INLINE_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`\\(${latex}\\)`);
				return placeholder;
			});
			
			// 保护 \[...\]
			protectedMarkdown = protectedMarkdown.replace(/\\\[([\s\S]+?)\\\]/g, (match, latex) => {
				const placeholder = `MATH_BLOCK_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`\\[${latex}\\]`);
				return placeholder;
			});
			
			console.log('Protected', mathPlaceholders.length, 'math formulas');
		}
		
		// Create a temporary div to render markdown
		const tempDiv = document.createElement('div');
		
		// Use Obsidian's markdown renderer (static method)
		await MarkdownRenderer.renderMarkdown(protectedMarkdown, tempDiv, file.path, this);
		
		console.log('After Obsidian render, HTML length:', tempDiv.innerHTML.length);
		console.log('First 500 chars:', tempDiv.innerHTML.substring(0, 500));
		
		// 恢复数学公式占位符
		if (hasMath) {
			let html = tempDiv.innerHTML;
			console.log('Before restore, looking for placeholders...');
			console.log('Has MATH_INLINE_PLACEHOLDER:', html.includes('MATH_INLINE_PLACEHOLDER'));
			console.log('Has MATH_BLOCK_PLACEHOLDER:', html.includes('MATH_BLOCK_PLACEHOLDER'));
			
			mathPlaceholders.forEach((latex, index) => {
			const blockPlaceholder = `MATH_BLOCK_PLACEHOLDER_${index}_END`;
			const inlinePlaceholder = `MATH_INLINE_PLACEHOLDER_${index}_END`;
			if (latex.startsWith('$$') || latex.startsWith('\\[')) {
				// 块级公式 - 提取纯LaTeX代码（去掉分隔符）
				let pureLatex = latex;
				if (latex.startsWith('$$')) {
					pureLatex = latex.slice(2, -2);
				} else if (latex.startsWith('\\[')) {
					pureLatex = latex.slice(2, -2);
				}
				const escapedBlock = blockPlaceholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
				const regex = new RegExp(escapedBlock, 'g');
				html = html.replace(regex, `<div class="math-display">${pureLatex}</div>`);
			} else {
				// 行内公式 - 提取纯LaTeX代码（去掉分隔符）
				let pureLatex = latex;
				if (latex.startsWith('$')) {
					pureLatex = latex.slice(1, -1);
				} else if (latex.startsWith('\\(')) {
					pureLatex = latex.slice(2, -2);
				}
				const escapedInline = inlinePlaceholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
				const regex = new RegExp(escapedInline, 'g');
				html = html.replace(regex, `<span class="math-inline">${pureLatex}</span>`);
			}
		});
			
			console.log('After restore, has math-display:', html.includes('math-display'));
			console.log('After restore, has math-inline:', html.includes('math-inline'));
			tempDiv.innerHTML = html;
		}
		
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
		let html = await this.convertImagesToBase64(tempDiv.innerHTML, file, imageLinks);
		
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

		// JavaScript for copy functionality and line number sync
		const copyScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
	// Copy functionality
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
	
	// Sync line numbers scroll with code block
	const codeBlocks = document.querySelectorAll('.code-block-wrapper');
	codeBlocks.forEach(block => {
		const pre = block.querySelector('pre');
		const lineNumbers = block.querySelector('.line-numbers');
		
		if (pre && lineNumbers) {
			pre.addEventListener('scroll', function() {
				lineNumbers.scrollTop = pre.scrollTop;
			});
		}
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
		let mathJaxCSS = '';
		
		console.log('hasMath:', hasMath);
		
		if (hasMath) {
			console.log('Adding KaTeX library (fully inline, offline)');
			
			// 使用内联的KaTeX库（完全离线，Base64编码）
			mathJaxCSS = `<script>
// 解码Base64并执行KaTeX
const katexJS = atob("${KATEX_JS_BASE64}");
const katexCSS = atob("${KATEX_CSS_BASE64}");

// 创建并执行KaTeX JS
const script = document.createElement('script');
script.textContent = katexJS;
document.head.appendChild(script);

// 添加KaTeX CSS
const style = document.createElement('style');
style.textContent = katexCSS;
document.head.appendChild(style);
</script>
<style>
/* 覆盖字体为系统字体 */
.katex {
    font-family: "Times New Roman", Times, serif !important;
    font-size: 1.1em;
}

.katex * {
    font-family: "Times New Roman", Times, serif !important;
}
</style>
<script>
// 渲染数学公式
window.addEventListener('DOMContentLoaded', function() {
    console.log('=== KaTeX Debug Info ===');
    
    // 查找所有数学公式容器
    const displayMaths = document.querySelectorAll('.math-display');
    const inlineMaths = document.querySelectorAll('.math-inline');
    
    console.log('Found display math elements:', displayMaths.length);
    console.log('Found inline math elements:', inlineMaths.length);
    
    // 渲染块级公式
    displayMaths.forEach((el, index) => {
        const latex = el.textContent;
        console.log('Rendering display math #' + index + ':', latex.substring(0, 50));
        try {
            katex.render(latex, el, {
                displayMode: true,
                throwOnError: false,
                output: 'html'
            });
        } catch (e) {
            console.error('Error rendering display math:', e);
            el.textContent = latex;
        }
    });
    
    // 渲染行内公式
    inlineMaths.forEach((el, index) => {
        const latex = el.textContent;
        console.log('Rendering inline math #' + index + ':', latex.substring(0, 50));
        try {
            katex.render(latex, el, {
                displayMode: false,
                throwOnError: false,
                output: 'html'
            });
        } catch (e) {
            console.error('Error rendering inline math:', e);
            el.textContent = latex;
        }
    });
    
    console.log('=== KaTeX rendering complete ===');
});
</script>`;
		}
		
		const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${file.basename}</title>
	<style>${GITHUB_CSS}</style>
	${mathJaxCSS}
</head>
<body>
	${toc}
	<div class="resize-handle"></div>
	<div class="content-wrapper">
		${htmlWithIds}
	</div>
	${copyScript}
	${resizeScript}
	<script>
	// 详细的MathJax调试信息
	window.addEventListener('DOMContentLoaded', function() {
		console.log('=== MathJax Debug Info ===');
		
		// 查找所有MathJax容器
		const mjxContainers = document.querySelectorAll('mjx-container');
		console.log('Found mjx-container elements:', mjxContainers.length);
		
		if (mjxContainers.length > 0) {
			mjxContainers.forEach((container, index) => {
				console.log('\\n--- mjx-container #' + index + ' ---');
				console.log('Tag:', container.tagName);
				console.log('Class:', container.className);
				console.log('Jax attribute:', container.getAttribute('jax'));
				console.log('Display attribute:', container.getAttribute('display'));
				
				// 检查计算样式
				const computedStyle = window.getComputedStyle(container);
				console.log('Display:', computedStyle.display);
				console.log('Visibility:', computedStyle.visibility);
				console.log('Opacity:', computedStyle.opacity);
				console.log('Font-family:', computedStyle.fontFamily);
				console.log('Font-size:', computedStyle.fontSize);
				console.log('Color:', computedStyle.color);
				console.log('Width:', container.offsetWidth + 'px');
				console.log('Height:', container.offsetHeight + 'px');
				console.log('OffsetTop:', container.offsetTop + 'px');
				console.log('OffsetLeft:', container.offsetLeft + 'px');
				
				// 检查子元素
				const mjxMath = container.querySelector('mjx-math');
				if (mjxMath) {
					console.log('Has mjx-math child: YES');
					const mathStyle = window.getComputedStyle(mjxMath);
					console.log('mjx-math display:', mathStyle.display);
					console.log('mjx-math visibility:', mathStyle.visibility);
				} else {
					console.log('Has mjx-math child: NO');
				}
				
				// 检查mjx-c元素
				const mjxCElements = container.querySelectorAll('mjx-c');
				console.log('Number of mjx-c elements:', mjxCElements.length);
				if (mjxCElements.length > 0) {
					const firstC = mjxCElements[0];
					const cStyle = window.getComputedStyle(firstC);
					console.log('First mjx-c display:', cStyle.display);
					console.log('First mjx-c visibility:', cStyle.visibility);
					console.log('First mjx-c ::before content:', window.getComputedStyle(firstC, '::before').content);
				}
				
				// 输出HTML结构（前500字符）
				console.log('HTML structure:', container.outerHTML.substring(0, 500));
			});
		} else {
			console.log('No mjx-container elements found!');
			// 查找所有可能包含数学公式的元素
			const mathSpans = document.querySelectorAll('[class*="math"]');
			console.log('Found elements with "math" in class:', mathSpans.length);
			mathSpans.forEach((span, idx) => {
				console.log('Math span #' + idx + ':', span.outerHTML.substring(0, 200));
			});
		}
		
		console.log('\\n=== End of MathJax Debug Info ===');
	});
	</script>
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
		// Wrap pre tags with code-block-wrapper and add line numbers
		const wrapped = html.replace(
			/<pre([^>]*)>([\s\S]*?)<\/pre>/g,
			(match, attributes, content) => {
				// 计算行数：从 content 中提取实际的文本行
				// 先移除 HTML 标签，只保留文本内容
				const textContent = content.replace(/<[^>]*>/g, '');
				// 解码 HTML 实体
				const decoded = textContent
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&amp;/g, '&')
					.replace(/&quot;/g, '"')
					.replace(/&#39;/g, "'");
				
				// 移除末尾的换行符
				const trimmed = decoded.replace(/\n+$/, '');
				
				// 如果内容为空，行数为 0
				if (trimmed === '') {
					return `<div class="code-block-wrapper"><div class="line-numbers"></div><pre${attributes}>${content}</pre></div>`;
				}
				
				// 计算行数
				const lineCount = trimmed.split('\n').length;
				
				let lineNumbers = '';
				for (let i = 1; i <= lineCount; i++) {
					lineNumbers += `<span>${i}</span>`;
				}
				
				return `<div class="code-block-wrapper"><div class="line-numbers">${lineNumbers}</div><pre${attributes}>${content}</pre></div>`;
			}
		);
		return wrapped;
	}

	// 获取字体文件的MIME类型
	getFontMimeType(filename: string): string {
		const ext = filename.split('.').pop()?.toLowerCase();
		const mimeTypes: { [key: string]: string } = {
			'woff2': 'font/woff2',
			'woff': 'font/woff',
			'ttf': 'font/ttf',
			'otf': 'font/otf',
			'eot': 'application/vnd.ms-fontobject',
			'svg': 'image/svg+xml'
		};
		return mimeTypes[ext || ''] || 'application/octet-stream';
	}

	// 检测 Markdown 中是否包含数学公式
	detectMathFormulas(markdown: string): boolean {
		// 增强的数学公式检测正则表达式
		// 行内公式：$...$（允许空格）
		const inlineMathRegex = /\$\s*[^$]+?\s*\$/g;
		// 块级公式：$$...$$（允许多行）
		const blockMathRegex = /\$\$[\s\S]+?\$\$/g;
		// LaTeX 格式：\(...\) 和 \[...\]
		const latexInlineRegex = /\\\(\s*[^\\]+?\s*\\\)/g;
		const latexBlockRegex = /\\\[\s*[\s\S]+?\s*\\\]/g;
		
		// 始终返回 true 进行调试
		const hasMath = inlineMathRegex.test(markdown) ||
			blockMathRegex.test(markdown) ||
			latexInlineRegex.test(markdown) ||
			latexBlockRegex.test(markdown);

		// 添加调试日志
		console.log('Math detection result:', hasMath);
		return true; // 临时强制启用 KaTeX
	}

	// 从 Markdown 源码中提取所有图片链接
	extractImageLinks(markdown: string): string[] {
		const imageLinks: string[] = [];
		
		// 匹配 Markdown 图片语法：![alt](src) 或 ![[src]]
		const markdownImgRegex = /!\[([^\]]*)\]\(([^)]+)\)|!\[\[([^\]]+)\]\]/g;
		let match;
		
		while ((match = markdownImgRegex.exec(markdown)) !== null) {
			// 匹配 ![alt](src) 格式
			if (match[2]) {
				const src = match[2].split('|')[0].split('?')[0]; // 移除尺寸等参数
				imageLinks.push(src);
			}
			// 匹配 ![[src]] 格式（Obsidian 内部链接）
			if (match[3]) {
				const src = match[3].split('|')[0].split('?')[0];
				imageLinks.push(src);
			}
		}
		
		return imageLinks;
	}

	async convertImagesToBase64(html: string, file: TFile, imageLinks: string[] = []): Promise<string> {
		let processedHtml = html;
		const processedImages = new Map<string, string>();
		const processingImages = new Set<string>();

		// 首先处理从 Markdown 中提取的所有图片链接
		for (const imgSrc of imageLinks) {
			const cleanSrc = imgSrc.split('?')[0].split('#')[0];
			
			// 检查文件后缀名，只处理图片文件
			const extension = cleanSrc.split('.').pop()?.toLowerCase() || '';
			const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico', 'avif', 'heic'];
			
			if (!imageExtensions.includes(extension)) {
				continue; // 跳过非图片文件
			}

			if (cleanSrc.startsWith('data:')) {
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
				// Silently fail for non-image files
			}
		}

		// 处理 <img> 标签
		const imgRegex = /<img src="([^"]+)"(?: alt="([^"]*)")?(?: title="([^"]*)")?\s*\/?>/g;
		
		const imgMatches: { full: string; src: string; alt: string; index: number }[] = [];
		let match;
		
		while ((match = imgRegex.exec(html)) !== null) {
			imgMatches.push({
				full: match[0],
				src: match[1],
				alt: match[2] || '',
				index: match.index
			});
		}

		const replacements: { start: number; end: number; replacement: string }[] = [];

		for (const img of imgMatches) {
			if (img.src.startsWith('data:')) {
				continue;
			}

			try {
				let dataUrl: string | null = null;

				if (processedImages.has(img.src)) {
					dataUrl = processedImages.get(img.src)!;
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
				// Silently fail
			}
		}

		if (replacements.length > 0) {
			replacements.sort((a, b) => b.start - a.start);
			for (const rep of replacements) {
				processedHtml = processedHtml.substring(0, rep.start) + rep.replacement + processedHtml.substring(rep.end);
			}
		}

		// 处理 Obsidian 的 internal-embed span 标签
		const embedRegex = /<span[^>]*class="[^"]*internal-embed[^"]*"[^>]*>[\s\S]*?<\/span>/g;
		const embedMatches: { full: string; src?: string; alt?: string; index: number }[] = [];
		
		const matches = Array.from(processedHtml.matchAll(embedRegex));
		for (const match of matches) {
			const fullMatch = match[0];
			const srcMatch = fullMatch.match(/src="([^"]+)"/);
			const altMatch = fullMatch.match(/alt="([^"]+)"/);
			
			if (srcMatch) {
				embedMatches.push({
					full: fullMatch,
					src: srcMatch[1],
					alt: altMatch ? altMatch[1] : '',
					index: match.index
				});
			}
		}

		const embedReplacements: { start: number; end: number; replacement: string }[] = [];

		for (const embed of embedMatches) {
			if (embed.src && !embed.src.startsWith('data:')) {
				try {
					let dataUrl: string | null = null;

					if (processedImages.has(embed.src)) {
						dataUrl = processedImages.get(embed.src)!;
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
						const newImgTag = `<img src="${dataUrl}" alt="${embed.alt || ''}" />`;
						embedReplacements.push({
							start: embed.index,
							end: embed.index + embed.full.length,
							replacement: newImgTag
						});
					}
				} catch (error) {
					// Silently fail
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

		if (!imageFile) {
			return null;
		}

		if (imageFile && imageFile instanceof TFile && 
			['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp'].includes(imageFile.extension.toLowerCase())) {
			try {
				// Read image content
				const buffer = await this.app.vault.readBinary(imageFile);
				// Convert buffer to base64 using chunked approach to avoid stack overflow
				const base64 = this.arrayBufferToBase64(buffer);
				return { base64, extension: imageFile.extension };
			} catch (error) {
				return null;
			}
		}

		return null;
	}

	// Convert ArrayBuffer to base64 using chunked approach
	arrayBufferToBase64(buffer: ArrayBuffer): string {
		const bytes = new Uint8Array(buffer);
		let base64 = '';
		const chunkSize = 0x8000; // 32KB chunks to avoid stack overflow
		
		for (let i = 0; i < bytes.length; i += chunkSize) {
			const chunk = bytes.subarray(i, i + chunkSize);
			base64 += String.fromCharCode.apply(null, chunk as unknown as number[]);
		}
		
		return btoa(base64);
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

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ExportHTMLSettingTab extends PluginSettingTab {
	plugin: ExportHTMLPlugin;

	constructor(app: App, plugin: ExportHTMLPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName(this.plugin.translate('Auto-open folder after export'))
			.setDesc(this.plugin.translate('Automatically open the folder containing the exported HTML file after successful export'))
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoOpenFolder)
				.onChange(async (value) => {
					this.plugin.settings.autoOpenFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}