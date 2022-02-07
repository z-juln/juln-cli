'use strict';

/**
 * @param {import("commander").Command} parentCmd
 */
function initComponentCmd(parentCmd) {
  const command = parentCmd
    .command('component <template>')
    .description('init component')
    .allowUnknownOption()
    .action((template, opts) => {
      require('.')(template, opts);
    });
  return command;
}

module.exports = initComponentCmd;
