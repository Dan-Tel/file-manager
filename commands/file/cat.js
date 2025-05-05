import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

export async function handleCat(state, pathToFile) {
  const fullPathToFile = resolve(state.workingDirectory, pathToFile);

  if (!(await stat(fullPathToFile)).isFile()) {
    throw new Error("Invalid path to file");
  }

  const rs = createReadStream(fullPathToFile);

  rs.pipe(process.stdout);
}
