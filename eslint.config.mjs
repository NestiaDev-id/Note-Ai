import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      // "import/no-anonymous-default-export": [
      //   "error",
      //   {
      //     allowArray: true,
      //     allowArrowFunction: true,
      //     allowAnonymousClass: true,
      //     allowAnonymousFunction: true,
      //     allowCallExpression: true,
      //     allowLiteral: true,
      //     allowObject: true,
      //   },
      // ],
    },
  },
];

export default eslintConfig;
