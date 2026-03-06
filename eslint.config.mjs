import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  // JS 文件配置
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {},
    },
    plugins: {
      obsidianmd,
    },
    rules: {
      // JS 文件只使用 obsidianmd 的基本规则
    },
  },
  // TypeScript 文件配置 - 使用官方推荐的方式
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: { project: "./tsconfig.json" },
    },
    plugins: {
      obsidianmd,
    },
    rules: {
      // obsidianmd 推荐规则
      ...obsidianmd.configs.recommended[0]?.rules,
      // 自定义规则覆盖
      "obsidianmd/sample-names": "off",
      // 禁止使用 console.log（但允许 warn, error, debug）
      "no-console": ["error", { allow: ["warn", "error", "debug"] }],
    },
  },
]);
