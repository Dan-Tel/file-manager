import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

export async function handleMkdir(state, newDirectoryName) {
  const fullPathToDirectory = resolve(state.workingDirectory, newDirectoryName);

  await mkdir(fullPathToDirectory, { recursive: true });
}
