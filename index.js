import { homedir } from "node:os";
import { createInterface } from "node:readline";

import { handleUp, handleCd, handleLs } from "./commands/navigation/index.js";
import {
  handleCat,
  handleAdd,
  handleMkdir,
  handleRn,
  handleCp,
  handleMv,
  handleRm,
} from "./commands/file/index.js";
import { handleOs } from "./commands/system/os.js";

const state = {
  workingDirectory: homedir(),
};

const username = process.argv.slice(2)[0]?.split("=")[1] || "Anonymous";

console.log(`Welcome to the File Manager, ${username}!`);
printDirectory();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", async (line) => {
  const [command, ...args] = line.split(" ");

  try {
    switch (command) {
      case "up":
        handleUp(state);
        break;
      case "cd":
        await handleCd(state, args[0]);
        break;
      case "ls":
        await handleLs(state);
        break;
      case "cat":
        await handleCat(state, args[0]);
        break;
      case "add":
        await handleAdd(state, args[0]);
        break;
      case "mkdir":
        await handleMkdir(state, args[0]);
        break;
      case "rn":
        await handleRn(state, args[0], args[1]);
        break;
      case "cp":
        await handleCp(state, args[0], args[1]);
        break;
      case "mv":
        await handleMv(state, args[0], args[1]);
        break;
      case "rm":
        await handleRm(state, args[0]);
        break;
      case "os":
        handleOs(args[0]);
        break;
      case ".exit":
        exitApp();
        return;
      default:
        console.log("Invalid input");
        break;
    }
  } catch (e) {
    console.log("Operation failed");
  }

  printDirectory();
});

function printDirectory() {
  console.log(`You are currently in ${state.workingDirectory}`);
}

function exitApp() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

rl.on("SIGINT", exitApp);
