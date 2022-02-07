#!/usr/bin/env node

'use strict';

const importLocal = require('import-local');
const log = require('@juln-cli/log');

if (importLocal(__filename)) {
  log.info('', '正在使用本地的库');
} else {
  require('../index')();
}
