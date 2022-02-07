'use strict';

const commander = require('commander');

class Command extends commander.Command {
  constructor(name) {
    super(name);
    this.allowUnknownOption();
    this.allowExcessArguments();
    // this.
  }
}

module.exports = Command;
