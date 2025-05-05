import { stat } from "node:fs/promises";
import { resolve } from "node:path";

export async function handleCd(state, pathToDir) {
  const fullPathToDirectory = resolve(state.workingDirectory, pathToDir);

  if ((await stat(fullPathToDirectory)).isDirectory()) {
    state.workingDirectory = fullPathToDirectory;
  } else {
    throw Error("Operation failed");
  }
}
