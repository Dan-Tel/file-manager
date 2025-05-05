import { unlink } from "node:fs/promises";
import { resolve } from "node:path";

export async function handleRm(state, pathToFile) {
  const fullPathToFile = resolve(state.workingDirectory, pathToFile);

  await unlink(fullPathToFile);
}
