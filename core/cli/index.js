const checkEngines = require('check-engines');
const rootCheck = require('root-check');
const userHome = require('userhome');
const semver = require('semver');
const { program } = require('commander');
const log = require('@juln-cli/log');
const getNpmInfo = require('@juln-cli/get-npm-info');
const pkg = require('./package.json');

const argv = require('minimist')(process.argv.slice(2));

function prepareDebug() {
  if (argv.debug) {
    process.env.LOG_LEVEL = 'verbose';
  }
  if (process.env.LOG_LEVEL) {
    log.level = process.env.LOG_LEVEL;
  }
}

async function checkVersion() {
  log.info('version', pkg.version);
  try {
    const npmInfo = await getNpmInfo(pkg.name);
    const lastVersion = npmInfo['dist-tags']['latest'];
    if (semver.lt(pkg.version, lastVersion)) {
      log.warn('update', `当前版本: ${pkg.version}，最新版本: ${lastVersion}，请手动更新!`);
    }
  } catch (error) {
    log.error('', error.message);
  }
}

function checkNodeVersion() {
  checkEngines(pkg, (err) => {
    if (err) {
      log.error('', `请使用满足[ ${pkg.engines.node} ]的node版本`);
    }
  });
}

function cli() {
  program.usage('<commnad>').version(pkg.version).option('--debug', 'debug');

  const chain = Promise.resolve();
  chain.then(prepareDebug);
  chain.then(checkNodeVersion);
  chain.then(checkVersion);
  chain.then(rootCheck);
  chain.then(() => console.log());

  chain.then(() => require('@juln-cli/init/command')(program));
  chain.then(() =>
    program.arguments('<cmd>').action(() => {
      log.info('call me', `想要更多的功能？请联系我: ${pkg.author}`);
    }),
  );
  chain.then(() => program.parse());

  // chain.then(() => {
  //   console.log();
  //   program.outputHelp();
  //   console.log();
  // });
}

module.exports = cli;
