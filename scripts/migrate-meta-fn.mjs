import { readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";

const files = execSync(
  `grep -lE "MetaFunction<typeof loader>" app/**/*.ts app/**/*.tsx`,
  { shell: "/bin/zsh", encoding: "utf-8" },
)
  .trim()
  .split("\n")
  .filter(Boolean);

let touched = 0;
for (const file of files) {
  const original = await readFile(file, "utf-8");
  let next = original;

  next = next.replace(/:\s*MetaFunction<typeof loader>/g, ": Route.MetaFunction");

  next = next.replace(
    /import\s+type\s*\{\s*([^}]*)\}\s*from\s*(["'])react-router\2\s*;?\s*\n?/g,
    (match, contents, quote) => {
      const kept = contents
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && s !== "MetaFunction");
      if (kept.length === contents.split(",").map((s) => s.trim()).filter(Boolean).length)
        return match;
      if (kept.length === 0) return "";
      return `import type { ${kept.join(", ")} } from ${quote}react-router${quote};\n`;
    },
  );

  next = next.replace(
    /import\s*\{\s*([^}]*)\}\s*from\s*(["'])react-router\2\s*;?\s*\n?/g,
    (match, contents, quote) => {
      const items = contents.split(",").map((s) => s.trim()).filter(Boolean);
      const kept = items.filter((s) => s !== "type MetaFunction");
      if (kept.length === items.length) return match;
      if (kept.length === 0) return "";
      return `import { ${kept.join(", ")} } from ${quote}react-router${quote};\n`;
    },
  );

  if (next !== original) {
    await writeFile(file, next);
    touched++;
    console.log(`✓ ${file}`);
  }
}
console.log(`Updated ${touched} files`);
