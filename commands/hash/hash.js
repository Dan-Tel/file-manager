import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

export async function handleHash(state, pathToFile) {
  const hash = createHash("sha256");

  const fullPathToFile = resolve(state.workingDirectory, pathToFile);

  if (!(await stat(fullPathToFile)).isFile()) {
    throw new Error("Invalid path to file");
  }

  const rs = createReadStream(fullPathToFile);

  rs.on("data", (chunk) => hash.update(chunk));
  rs.on("end", () => console.log(hash.digest("hex")));
}
