import { dirname } from "node:path";

export function handleUp(state) {
  state.workingDirectory = dirname(state.workingDirectory);
}
