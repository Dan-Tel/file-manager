import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function handleAdd(state, newFileName) {
  const pathToFile = resolve(state.workingDirectory, newFileName);

  await writeFile(pathToFile, "", { flag: "wx" });
}
