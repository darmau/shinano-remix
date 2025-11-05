import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

const appFiles = ["**/*.{js,jsx,ts,tsx}"];
const jsxFiles = ["**/*.{jsx,tsx}"];
const nodeFiles = [
  "*.config.{js,cjs,mjs,ts,cts,mts}",
  "vite.config.ts",
  "tailwind.config.ts",
  "postcss.config.js",
  "functions/**/*.ts",
  "worker-configuration.d.ts",
  "load-context.ts",
];

export default tseslint.config(
  {
    ignores: [
      "build/**",
      "public/**",
      "node_modules/**",
      ".pnpm-store/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: jsxFiles,
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat["jsx-runtime"].rules,
    },
  },
  {
    files: jsxFiles,
    rules: {
      ...reactHooksPlugin.configs.flat["recommended-latest"].rules,
    },
  },
  {
    files: appFiles,
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
    },
  },
  {
    files: appFiles,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/internal-regex": "^~/",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
      "@typescript-eslint/no-floating-promises": [
        "error",
        { ignoreVoid: false },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": [
        "warn",
        { ignoreConditionalTests: true, ignoreTernaryTests: true },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/no-cycle": ["warn", { ignoreExternal: true }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.config.{js,cjs,mjs,ts,cts,mts}",
            "**/*.test.*",
            "**/*.spec.*",
            "vite.config.ts",
            "tailwind.config.ts",
            "postcss.config.js",
            "eslint.config.js",
          ],
        },
      ],
    },
  },
  {
    files: nodeFiles,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      sourceType: "module",
    },
  },
);
