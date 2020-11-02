const args = require('yargs')(process.argv.slice(2)).argv;
const { exec } = require("child_process");
const throwError = require('./throwError');
const loadConfigFile = require('./loadConfigFile');
const loadBuildFile = require('./loadBuildFile');
const buildDepTree = require('./buildDepTree');
const buildReverseDepTree = require('./buildReverseDepTree');

// How to integrate with circle
// >> sent a change list, for each file find the most specific build and then execute it.

// Validate and parse command args.
if(!args._ || !args._[0] || !args._[1]) {
    throwError("Command or Path commands are invalid.");
}

const config = loadConfigFile(args.config);
const command = args._[0];
const buildFilePath = args._[1];

if(!config[command]) {
    console.log(`Command ${command} doesn't exist in the config.`);
    console.log(`Valid Commands:`);
    throwError(Object.keys(config));
}

// Load the command's config.
const commandConfig = config[command];

// Build an array of files to execute on.
let buildFiles = [loadBuildFile(buildFilePath)];

// If reverseDeps is true, run this on all things that depend on this.
if(commandConfig.reverseDeps) {
    buildFiles = buildFiles.concat(buildReverseDepTree(buildFilePath));
}

// If deps is true, run this on all things this depends on.
if(commandConfig.deps) {
    buildFiles = buildFiles.concat(buildDepTree(buildFilePath))
}

// Special keyword commands
if(command === "debug") {
    console.log(`args:`);
    console.log(args);
    console.log(`build files:`);
    console.log(buildFiles);
    return;
}

for(let buildFile of buildFiles) {

    // Find which command we are running (build, test, lint etc) and execute it.
    const execCommand = buildFile[command];
    console.log(buildFile, command, execCommand);
    if(!execCommand) {
        throwError(`${command} did not exist in the build file ${buildFile}.`);
    }

    console.log(`executing ${execCommand}`);

    exec(`${config.base} ${execCommand}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`${stdout}`);
    });
}
