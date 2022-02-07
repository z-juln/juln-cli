'use strict';

const initProjectCmd = require('@juln-cli/init-project/command');
const initComponentCmd = require('@juln-cli/init-component/command');

/**
 * @param {import("commander").Command} parentCmd
 */
function initCmd(parentCmd) {
  const command = parentCmd
    .command('init <type> <template>')
    .description('init project or component')
    .option('-f, --force', 'force rewrite if exist')
    .allowUnknownOption()
    .action((type, template, opts) => {
      require('.')(type, template, opts);
    });

  initProjectCmd(command);
  initComponentCmd(command);

  return command;
}

module.exports = initCmd;
