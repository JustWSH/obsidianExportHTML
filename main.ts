import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, Menu, Vault, FileSystemAdapter } from 'obsidian';

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

export default class ExportHTMLPlugin extends Plugin {
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
		// Simple Markdown to HTML conversion
		let html = markdown;

		// Convert headings
		html = html.replace(/^#{1} (.*$)/gim, '<h1 id="$1">$1</h1>');
		html = html.replace(/^#{2} (.*$)/gim, '<h2 id="$1">$1</h2>');
		html = html.replace(/^#{3} (.*$)/gim, '<h3 id="$1">$1</h3>');
		html = html.replace(/^#{4} (.*$)/gim, '<h4 id="$1">$1</h4>');
		html = html.replace(/^#{5} (.*$)/gim, '<h5 id="$1">$1</h5>');
		html = html.replace(/^#{6} (.*$)/gim, '<h6 id="$1">$1</h6>');

		// Convert bold and italic
		html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
		html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

		// Convert lists
		html = html.replace(/^\s*\- (.*$)/gim, '<li>$1</li>');
		html = html.replace(/(<li>.*<\/li>)/, '<ul>$1</ul>');

		// Convert paragraphs
		html = html.replace(/^(?!<h|<!|\s*\-|\s*\d+\.)(.*$)/gim, '<p>$1</p>');

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
		const imageRegex = /<img src="([^"]+)" alt="([^"]*)"[^>]*>/g;
		let processedHtml = html;
		let match;

		while ((match = imageRegex.exec(html)) !== null) {
			const src = match[1];
			const alt = match[2];

			// Skip if already a data URL
			if (src.startsWith('data:')) {
				continue;
			}

			try {
				// Resolve image path
				const imageFile = this.app.metadataCache.getFirstLinkpathDest(src, file.path);
				if (imageFile) {
					// Read image content
					const buffer = await this.app.vault.readBinary(imageFile);
					// Convert buffer to base64 without using Buffer.from
					const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
					const mimeType = this.getMimeType(imageFile.extension);
					const dataUrl = `data:${mimeType};base64,${base64}`;

					// Replace image src with data URL
					processedHtml = processedHtml.replace(src, dataUrl);
				}
			} catch (error) {
				console.error('Error converting image to base64:', error);
			}
		}

		return processedHtml;
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