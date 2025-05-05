import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

export async function handleCat(state, pathToFile) {
  const fullPathToFile = resolve(state.workingDirectory, pathToFile);

  if (!existsSync(fullPathToFile)) {
    throw new Error(`Source file not found: ${fullPathToFile}`);
  }
  if ((await stat(fullPathToFile)).isDirectory()) {
    throw new Error(`Illegal operation on a directory`);
  }

  const rs = createReadStream(fullPathToFile);

  rs.pipe(process.stdout);
}
