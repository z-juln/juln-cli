'use strict';

/**
 * @param {import("commander").Command} parentCmd
 */
function initProjectCmd(parentCmd) {
  const command = parentCmd
    .command('project <template>')
    .description('init project')
    .allowUnknownOption()
    .action((template, opts) => {
      require('.')(template, opts);
    });
  return command;
}

module.exports = initProjectCmd;
