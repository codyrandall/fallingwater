![Fallingwater Icon](icon.png "Falling Water")

- [Installation](#installation)
- [Usage](#usage)
    * [Config](#config)
    * [Command](#command)
    * [Build File](#build-file)
    * [Flags](#flags)

##Fallingwater

Fallingwater is a small library intended to quickly enable developers to test and build 
packages, microfrontends and small bits of javascript with ease.

Fallingwater works by defining a strict life cycle for each package inside your respository. 
Fallingwater builds a dependency tree and keeps your builds green by running tests and linters each time one of the packages
a dependency depends on changes.

###Example
You have defined three packages defined in your repository with fallingwater, Foo, Bar and Baz. 
Inside fallingwater, you set Bar as a dependency of Foo and Baz. Each time Bar changes, the lifecycle
requirements defined by your process are run (linter, tester, etc) for Foo and Baz, insuring your contract is complete
and keeping your build green.

##Installation

With yarn

```yarn add fallingwater --dev```

With npm

```npm install fallingwater --save-dev```

##Usage

```yarn fallingwater <command> <build file>```

###Config
An optional config file can be passed into fallingwater. Your config file determines your lifecycle rules.
The default rules are found in `defaultconfig.json`.

###Command

Commands are executable statements that are shared by each one of your packages. 
Fallingwater helps you keep your build process organized between each package, enabling you to trigger other
commands based on a dependency tree.
These can be customized inside the config file.

The default commands are 
```
build - Used to build this package.
test - Tests this package and all packages that depend on this package.
lint - Runs the linter for this package.
debug - Prints a debug output for the build file.
```

###Build File
Each package is defined by the closest `build.json` file in it's directory structure. This defines how
your package responds to each lifecycle event defined in your `config` and it defines your dependencies in the array
`deps`. 

```json
  {      
    "build": "testbuild.js",
    "test": "jest",
    "lint": "yarn lint",
    "deps": []
  }
```

###Flags
```
--config <path> - Points to a new config file.
```
