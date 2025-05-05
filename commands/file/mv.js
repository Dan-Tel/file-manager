import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";

export async function handleMv(state, pathToFile, pathToNewDirectory) {
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
  await unlink(oldPathToFile);
}
