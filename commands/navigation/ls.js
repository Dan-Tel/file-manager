import { readdir } from "node:fs/promises";

export async function handleLs(state) {
  const files = await readdir(state.workingDirectory, { withFileTypes: true });
  files.sort((a, b) => a.name.localeCompare(b.name));

  console.table(
    files.map((file) => ({
      Name: file.name,
      Type: file.isDirectory() ? "directory" : "file",
    }))
  );
}
