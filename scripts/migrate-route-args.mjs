import { readFile, writeFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import { execSync } from "node:child_process";

const files = execSync(
  `grep -lE "\\bLoaderFunctionArgs\\b|\\bActionFunctionArgs\\b" app/**/*.ts app/**/*.tsx`,
  { shell: "/bin/zsh", encoding: "utf-8" },
)
  .trim()
  .split("\n")
  .filter(Boolean);

let touched = 0;
for (const file of files) {
  const original = await readFile(file, "utf-8");
  const base = basename(file, extname(file));
  const typesImport = `import type { Route } from "./+types/${base}";`;

  let next = original;

  next = next.replace(/:\s*LoaderFunctionArgs\b/g, ": Route.LoaderArgs");
  next = next.replace(/:\s*ActionFunctionArgs\b/g, ": Route.ActionArgs");

  next = next.replace(
    /import\s+type\s*\{\s*([^}]*)\}\s*from\s*(["'])react-router\2\s*;?\s*/g,
    (_match, contents, quote) => {
      const kept = contents
        .split(",")
        .map((s) => s.trim())
        .filter(
          (s) =>
            s && s !== "LoaderFunctionArgs" && s !== "ActionFunctionArgs",
        );
      if (kept.length === 0) return "";
      return `import type { ${kept.join(", ")} } from ${quote}react-router${quote};`;
    },
  );

  next = next.replace(
    /import\s*\{\s*([^}]*)\}\s*from\s*(["'])react-router\2\s*;?/g,
    (match, contents, quote) => {
      const kept = contents
        .split(",")
        .map((s) => s.trim())
        .filter(
          (s) =>
            s &&
            s !== "type LoaderFunctionArgs" &&
            s !== "type ActionFunctionArgs",
        );
      if (kept.join(",") === contents.split(",").map((s) => s.trim()).join(","))
        return match;
      if (kept.length === 0) return "";
      return `import { ${kept.join(", ")} } from ${quote}react-router${quote};`;
    },
  );

  if (next === original) continue;

  if (!next.includes(`./+types/${base}`)) {
    const lines = next.split("\n");
    let insertAt = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/from\s+["']react-router["']/.test(lines[i])) insertAt = i;
    }
    if (insertAt === -1) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("import ")) insertAt = i;
      }
    }
    if (insertAt === -1) {
      lines.unshift(typesImport);
    } else {
      lines.splice(insertAt + 1, 0, typesImport);
    }
    next = lines.join("\n");
  }

  await writeFile(file, next);
  touched++;
  console.log(`✓ ${file}`);
}
console.log(`Updated ${touched} files`);
