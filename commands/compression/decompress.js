import { createReadStream, createWriteStream } from "node:fs";
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

  if (!(await stat(oldPathToFile)).isFile()) {
    throw new Error("Invalid path to file");
  }

  const rs = createReadStream(oldPathToFile);
  const ws = createWriteStream(newPathToFile);

  const brotli = createBrotliDecompress();

  await pipeline(rs, brotli, ws);
}
