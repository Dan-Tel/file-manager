import { homedir } from "node:os";
import { createInterface } from "node:readline";

import { handleUp } from "./commands/navigation/index.js";

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
