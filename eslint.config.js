// eslint.config.js
// 同时检查 JS 和 TS 文件的 ESLint 配置
import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";
import typescriptEslint from "typescript-eslint";
import sdl from "@microsoft/eslint-plugin-sdl";

/**
 * 自定义规则：检测 eslint-disable 注释和插件实例使用问题
 * 1. 要求所有 eslint-disable 注释必须包含描述
 * 2. 禁止禁用 SDL 规则
 * 3. 检测插件实例作为组件使用（会导致内存泄漏）
 */
const customPlugin = {
  rules: {
    "require-disable-description": {
      meta: {
        type: "problem",
        docs: {
          description: "require descriptions for eslint-disable comments and forbid disabling SDL rules",
          category: "Best Practices",
          recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
          missingDescription: "eslint-disable 注释必须包含描述，解释为什么需要禁用该规则。使用格式：eslint-disable-next-line rule-name -- 原因说明",
          forbiddenDisable: "不允许禁用 '{{rule}}' 规则。"
        }
      },
      create(context) {
        const sourceCode = context.getSourceCode();
        const comments = sourceCode.getAllComments();
        
        comments.forEach(comment => {
          const text = comment.value.trim();
          
          // 检查是否是 eslint-disable 注释
          if (text.startsWith("eslint-disable")) {
            // 提取规则和描述
            const disableMatch = text.match(/eslint-disable(?:-next-line)?\s+(.*)/);
            
            if (disableMatch) {
              const rulesPart = disableMatch[1];
              
              // 检查是否有描述（-- 后面的内容）
              const hasDescription = rulesPart.includes("--") && rulesPart.split("--")[1]?.trim();
              
              // 检查是否包含 SDL 规则
              const sdlRuleMatches = rulesPart.match(/@microsoft\/sdl\/([a-z-]+)/g);
              
              if (sdlRuleMatches) {
                // 禁止禁用 SDL 规则
                sdlRuleMatches.forEach(rule => {
                  context.report({
                    node: comment,
                    messageId: "forbiddenDisable",
                    data: { rule }
                  });
                });
              }
              
              // 如果没有描述，报错（即使是 SDL 规则也要报缺少描述的错误）
              if (!hasDescription) {
                context.report({
                  node: comment,
                  messageId: "missingDescription"
                });
              }
            }
          }
        });
        
        return {};
      }
    },
    /**
     * 检测插件实例作为组件使用
     * Obsidian 的 MarkdownRenderer.render 等方法接受一个 component 参数
     * 如果传入插件实例（this），会导致内存泄漏，因为插件的生命周期太长
     */
    "no-plugin-as-component": {
      meta: {
        type: "problem",
        docs: {
          description: "disallow using plugin instance as component to prevent memory leaks",
          category: "Best Practices",
          recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
          memoryLeak: "避免将插件实例作为组件使用。插件的生命周期太长，会导致内存泄漏。请使用临时组件或文件级别的组件。"
        }
      },
      create(context) {
        return {
          CallExpression(node) {
            // 检查是否是 MarkdownRenderer.render 调用
            if (node.callee.type === "MemberExpression" &&
                node.callee.object?.type === "Identifier" &&
                node.callee.object.name === "MarkdownRenderer" &&
                node.callee.property?.type === "Identifier" &&
                node.callee.property.name === "render") {
              
              // 检查最后一个参数是否是 this
              const lastArg = node.arguments[node.arguments.length - 1];
              if (lastArg && lastArg.type === "ThisExpression") {
                context.report({
                  node: lastArg,
                  messageId: "memoryLeak"
                });
              }
            }
          }
        };
      }
    }
  }
};

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
      custom: customPlugin,
    },
    rules: {
      // TS 文件使用 obsidianmd 的所有规则
      ...obsidianmd.configs.recommended[0]?.rules,
      // 自定义规则 - 确保以下规则严格检查
      "obsidianmd/sample-names": "off", // 禁用示例命名规则
      // 启用 Promise 检查（typescript-eslint 规则）
      "@typescript-eslint/no-floating-promises": "error",
      // 启用插件实例使用检查（使用自定义规则，因为 obsidianmd 的规则不够精确）
      "obsidianmd/no-plugin-as-component": "off",
      "custom/no-plugin-as-component": "error",
      // 启用 DOM 操作检查
      "obsidianmd/no-forbidden-elements": "error",
      // SDL 安全规则 - 严格检查（不允许禁用）
      "@microsoft/sdl/no-inner-html": "error",
      "@microsoft/sdl/no-document-write": "error",
      // 要求 eslint-disable 注释必须包含描述，并禁止禁用 SDL 规则
      "custom/require-disable-description": "error",
      // 要求 TypeScript 注释必须包含描述
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description",
          "ts-expect-error": "allow-with-description",
          "ts-nocheck": "allow-with-description",
          "ts-check": "allow-with-description",
          "minimumDescriptionLength": 10
        }
      ]
    },
    // 配置禁用注释的规则
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    }
  },
]);
