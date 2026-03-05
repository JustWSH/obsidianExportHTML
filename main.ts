import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, Menu, Vault, FileSystemAdapter, MarkdownRenderer, Component } from 'obsidian';

const GITHUB_CSS = `
/* GitHub style CSS */
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	line-height: 1.5;
	color: #24292f;
	background-color: #ffffff;
	max-width: 980px;
	margin: 0 auto;
	padding: 45px;
}

h1, h2, h3, h4, h5, h6 {
	font-weight: 600;
	line-height: 1.25;
	margin-top: 24px;
	margin-bottom: 16px;
}

h1 {
	font-size: 2em;
	border-bottom: 1px solid #eaecef;
	padding-bottom: 0.3em;
}

h2 {
	font-size: 1.5em;
	border-bottom: 1px solid #eaecef;
	padding-bottom: 0.3em;
}

h3 {
	font-size: 1.25em;
}

h4 {
	font-size: 1em;
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
	margin-bottom: 0.5em;
}

code {
	background-color: rgba(175, 184, 193, 0.2);
	border-radius: 6px;
	font-size: 85%;
	margin: 0;
	padding: 0.2em 0.4em;
	font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
}

pre {
	background-color: #f6f8fa;
	border-radius: 6px;
	font-size: 85%;
	line-height: 1.45;
	overflow: auto;
	padding: 16px;
	margin-top: 0;
	margin-bottom: 16px;
}

blockquote {
	border-left: 4px solid #d1d5da;
	color: #6a737d;
	padding: 0 1em;
	margin: 0 0 16px 0;
}

img {
	max-width: 100%;
	box-sizing: content-box;
	background-color: #ffffff;
}

.table-of-contents {
	background-color: #f6f8fa;
	border-radius: 6px;
	padding: 16px;
	margin-bottom: 24px;
}

.table-of-contents h2 {
	margin-top: 0;
	font-size: 1.25em;
	border-bottom: none;
	padding-bottom: 0;
}

.table-of-contents ul {
	list-style: none;
	padding-left: 0;
}

.table-of-contents li {
	margin-bottom: 0.5em;
}

.table-of-contents a {
	color: #0969da;
	text-decoration: none;
}

.table-of-contents a:hover {
	text-decoration: underline;
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
		
		// Get the rendered HTML
		let html = tempDiv.innerHTML;

		// Process images: convert to base64
		const processedHtml = await this.convertImagesToBase64(html, file);

		// Extract headings for table of contents
		const headings: any[] = [];
		const headingRegex = /<h([1-6]) id="([^"]+)">([^<]+)<\/h\1>/g;
		let match;

		while ((match = headingRegex.exec(processedHtml)) !== null) {
			const level = parseInt(match[1]);
			const id = match[2];
			const text = match[3];
			headings.push({ level, id, text });
		}

		// Generate table of contents
		let toc = '<div class="table-of-contents">';
		toc += `<h2>${this.translate('Table of Contents')}</h2>`;
		toc += '<ul>';
		
		headings.forEach(heading => {
			const indent = '&nbsp;&nbsp;'.repeat(heading.level - 1);
			toc += `<li>${indent}<a href="#${heading.id}">${heading.text}</a></li>`;
		});
		
		toc += '</ul></div>';

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
	${processedHtml}
</body>
</html>
`;

		return fullHTML;
	}

	async convertImagesToBase64(html: string, file: TFile): Promise<string> {
		let processedHtml = html;

		// 处理 <img> 标签
		const imgRegex = /<img src="([^"]+)"(?: alt="([^"]*)")?(?: title="([^"]*)")?\s*\/?>/g;
		let imgMatch;

		while ((imgMatch = imgRegex.exec(html)) !== null) {
			const fullMatch = imgMatch[0];
			const src = imgMatch[1];
			const alt = imgMatch[2] || '';

			// Skip if already a data URL
			if (src.startsWith('data:')) {
				continue;
			}

			try {
				const base64Data = await this.getImageBase64(src, file);
				
				if (base64Data) {
					const mimeType = this.getMimeType(base64Data.extension);
					const dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
					const newImgTag = `<img src="${dataUrl}" alt="${alt}" />`;
					processedHtml = processedHtml.replace(fullMatch, newImgTag);
				}
			} catch (error) {
				console.error('Error converting image to base64:', error);
			}
		}

		// 处理 Obsidian 的 internal-embed span 标签
		// 匹配所有 class 包含 internal-embed 的 span 标签
		const embedRegex = /<span[^>]*class="[^"]*internal-embed[^"]*"[^>]*>/g;
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

		// 处理所有匹配的图片
		for (const embed of embedMatches) {
			if (embed.src) {
				try {
					const base64Data = await this.getImageBase64(embed.src, file);
					
					if (base64Data) {
						const mimeType = this.getMimeType(base64Data.extension);
						const dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
						// 将 span 替换为 img 标签
						const newImgTag = `<img src="${dataUrl}" alt="${embed.alt || ''}" />`;
						processedHtml = processedHtml.replace(embed.full, newImgTag);
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
		
		// Try to find the image file
		let imageFile: TFile | null = null;
		
		// Try direct path first
		imageFile = this.app.metadataCache.getFirstLinkpathDest(decodedSrc, file.path);
		
		// If not found, try without the decoded part
		if (!imageFile) {
			const simpleSrc = decodedSrc.split('?')[0];
			imageFile = this.app.metadataCache.getFirstLinkpathDest(simpleSrc, file.path);
		}

		// 如果还是找不到，尝试使用相对路径解析
		if (!imageFile) {
			const path = require('path');
			const fileDir = path.dirname(file.path);
			const resolvedPath = path.normalize(path.join(fileDir, src));
			
			// 尝试从 vault 中获取文件
			try {
				imageFile = this.app.vault.getAbstractFileByPath(resolvedPath) as TFile;
			} catch (e) {
				// 忽略错误
			}
		}

		if (imageFile && ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(imageFile.extension.toLowerCase())) {
			// Read image content
			const buffer = await this.app.vault.readBinary(imageFile);
			// Convert buffer to base64
			const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
			return { base64, extension: imageFile.extension };
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