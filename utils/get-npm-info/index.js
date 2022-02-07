"use strict";

const axios = require("axios");
const urlJoin = require("url-join");
const semver = require("semver");

const defaultRegistry = "https://registry.npmjs.org";

async function getNpmInfo(pkgName, registry = defaultRegistry) {
  if (!pkgName) {
    return null;
  }
  const url = urlJoin(registry, pkgName);
  try {
    const { status, data } = await axios.get(url);
    if (status >= 400) {
      throw new Error(`网络请求错误: ${url}`);
    }
    return data;
  } catch {
    throw new Error(`网络请求错误: ${url}`);
  }
}

module.exports = getNpmInfo;
