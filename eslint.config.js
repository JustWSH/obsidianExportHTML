// eslint.config.js
// 同时检查 JS 和 TS 文件的 ESLint 配置
import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";
import typescriptEslint from "typescript-eslint";
import sdl from "@microsoft/eslint-plugin-sdl";

export default defineConfig([
  // 忽略编译生成的文件和目录
  {
    ignores: ["main.js", "my-export-html/**"],
  },
  // JS 文件配置（包括 eslint.config.js）
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {},
    },
    plugins: {
      obsidianmd,
    },
    rules: {
      // JS 文件使用 obsidianmd 的推荐规则，禁用需要类型信息的 TypeScript 规则
      ...obsidianmd.configs.recommended[0]?.rules,
      "@typescript-eslint/*": "off",
      "obsidianmd/sample-names": "off",
    },
  },
  // TypeScript 文件配置
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: { project: "./tsconfig.json" },
    },
    plugins: {
      obsidianmd,
      "@typescript-eslint": typescriptEslint.plugin,
      "@microsoft/sdl": sdl,
    },
    rules: {
      // TS 文件使用 obsidianmd 的所有规则
      ...obsidianmd.configs.recommended[0]?.rules,
      // 自定义规则 - 确保以下规则严格检查
      "obsidianmd/sample-names": "off", // 禁用示例命名规则
      // 启用 Promise 检查（typescript-eslint 规则）
      "@typescript-eslint/no-floating-promises": "error",
      // 启用插件实例使用检查
      "obsidianmd/no-plugin-as-component": "error",
      // 启用 DOM 操作检查
      "obsidianmd/no-forbidden-elements": "error",
      "@microsoft/sdl/no-inner-html": "error",
      "@microsoft/sdl/no-document-write": "error",
    },
  },
]);
