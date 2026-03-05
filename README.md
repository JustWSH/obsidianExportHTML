# Obsidian Export HTML Plugin

## 插件简介

A plugin for Obsidian that allows you to export notes to beautiful HTML files with GitHub style.

这是一个Obsidian插件，可以将笔记导出为具有GitHub风格的精美HTML文件。

## Features 功能特性

1. **Right-click menu integration**: Add an "Export to HTML..." option to the right-click menu of markdown files
   **右键菜单集成**：在Markdown文件的右键菜单中添加“导出为HTML...”选项

2. **Custom save location**: Choose where to save your HTML file, with default location matching the source file
   **自定义保存位置**：选择HTML文件的保存位置，默认位置与源文件相同

3. **GitHub-style formatting**: Exported HTML follows GitHub's clean and modern styling
   **GitHub风格格式**：导出的HTML采用GitHub简洁现代的样式

4. **Image embedding**: Images are automatically converted to base64 and embedded in the HTML file
   **图片嵌入**：图片自动转换为base64编码并嵌入到HTML文件中

5. **Table of contents**: Automatically generates a navigation menu from headings in your note
   **目录导航**：根据笔记中的标题自动生成导航菜单

6. **Bilingual support**: Supports both English and Chinese languages
   **双语支持**：支持中英文两种语言

## Usage 使用方法

### English
1. Right-click on any markdown file in the Obsidian file explorer
2. Select "Export to HTML..."
3. Choose a save location and file name (default is same as source file with .html extension)
4. Click "Save" to export

### 中文
1. 在Obsidian文件资源管理器中右键点击任何Markdown文件
2. 选择“导出为HTML...”
3. 选择保存位置和文件名（默认与源文件同名，扩展名为.html）
4. 点击“保存”完成导出

## Installation 安装方法

1. Clone this repository to your Obsidian plugins folder
   将此仓库克隆到你的Obsidian插件文件夹
2. Run `npm install` to install dependencies
   运行 `npm install` 安装依赖
3. Run `npm run build` to build the plugin
   运行 `npm run build` 构建插件
4. Enable the plugin in Obsidian settings
   在Obsidian设置中启用插件

## Building 构建

```bash
npm install
npm run build
```

## Development 开发

```bash
npm run dev
```

## License 许可证

MIT