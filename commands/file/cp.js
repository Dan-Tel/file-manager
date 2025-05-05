import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";

export async function handleCp(state, pathToFile, pathToNewDirectory) {
  const oldPathToFile = resolve(state.workingDirectory, pathToFile);
  const newPathToFile = resolve(
    state.workingDirectory,
    join(pathToNewDirectory, basename(pathToFile))
  );

  if (!existsSync(oldPathToFile)) {
    throw new Error(`Source file not found: ${oldPathToFile}`);
  }

  const rs = createReadStream(oldPathToFile);
  const ws = createWriteStream(newPathToFile);

  await pipeline(rs, ws);
}
