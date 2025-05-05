import { rename } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

export async function handleRn(state, pathToFile, newFileName) {
  const oldPathToFile = resolve(state.workingDirectory, pathToFile);
  const newPathToFile = join(dirname(oldPathToFile), newFileName);

  await rename(oldPathToFile, newPathToFile);
}
