import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

export async function handleDecompress(state, pathToFile, pathToDestination) {
  const oldPathToFile = resolve(state.workingDirectory, pathToFile);
  const newPathToFile = resolve(
    state.workingDirectory,
    join(pathToDestination, basename(pathToFile).slice(0, -3))
  );

  if (!existsSync(oldPathToFile)) {
    throw new Error(`Source file not found: ${oldPathToFile}`);
  }
  if ((await stat(oldPathToFile)).isDirectory()) {
    throw new Error(`Illegal operation on a directory`);
  }

  const rs = createReadStream(oldPathToFile);
  const ws = createWriteStream(newPathToFile);

  const brotli = createBrotliDecompress();

  await pipeline(rs, brotli, ws);
}
