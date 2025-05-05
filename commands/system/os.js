import { arch, cpus, EOL, homedir, userInfo } from "node:os";

export function handleOs(flag) {
  switch (flag) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      break;
    case "--cpus":
      const allCpus = cpus();
      console.log(`Overall CPUs: ${allCpus.length}`);
      allCpus.forEach((cpu, index) => {
        console.log(
          `CPU ${index + 1}: ${cpu.model}, ${Math.round(cpu.speed) / 1000} GHz`
        );
      });
      break;
    case "--homedir":
      console.log(homedir());
      break;
    case "--username":
      console.log(userInfo().username);
      break;
    case "--architecture":
      console.log(arch());
      break;
    default:
      console.log("Invalid input");
      break;
  }
}
