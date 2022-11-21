#!/usr/bin/env node

import { exec } from "child_process";
import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";

program.requiredOption("-m, --message <message>");

program.parse();

const options = program.opts();

exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
  //   console.log({ stdout }, { stderr }, { err });
  const commit_message = `[${stdout.trim()}] ${options.message}`;
  console.log(chalk.bgMagenta.bold(commit_message));
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "message",
        message: "Do you want it as commit message?",
        default: true,
      },
    ])
    .then((answers) => {
      if (answers.message) {
        exec(`git commit -m"${commit_message}"`, (err, stdout, stderr) => {
          if (err) {
            console.log(chalk.bgRed.bold("ERROR: ", err));
          }
          console.log(chalk.green.bold("Commit created", stdout));
        });
      }
    });
});
