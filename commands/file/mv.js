import { createReadStream, createWriteStream } from "node:fs";
import { stat, unlink } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";

export async function handleMv(state, pathToFile, pathToNewDirectory) {
  const oldPathToFile = resolve(state.workingDirectory, pathToFile);
  const newPathToFile = resolve(
    state.workingDirectory,
    join(pathToNewDirectory, basename(pathToFile))
  );

  if (!(await stat(oldPathToFile)).isFile()) {
    throw new Error("Invalid path to file");
  }

  const rs = createReadStream(oldPathToFile);
  const ws = createWriteStream(newPathToFile);

  await pipeline(rs, ws);
  await unlink(oldPathToFile);
}
