import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["components/ui/Image.tsx"], rules: { "@next/next/no-img-element": "off" } },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "test-results/**",
    "playwright-report/**",
    "diagnostic-results/**",
    "next-env.d.ts",
    ".agents/**",
    "hairline/**",
    "public/hairline/**",
  ]),
]);

export default eslintConfig;
