'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, '__esModule', { value: true });
const typeScriptExtensionId = 'vscode.typescript-language-features';
const pluginId = 'typescript-lit-mustache-plugin';
const configurationSection = 'lit-mustache';
function synchronizeConfiguration(api) {
  api.configurePlugin(pluginId, getConfiguration());
}
function getConfiguration() {
  const config = vscode.workspace.getConfiguration(configurationSection);
  const outConfig = {
    format: {}
  };
  withConfigValue(config, 'tags', tags => { outConfig.tags = tags; });
  withConfigValue(config, 'format.enabled', enabled => { outConfig.format.enabled = enabled; });
  return outConfig;
}
function withConfigValue(config, key, withValue) {
  const configSetting = config.inspect(key);
  if (!configSetting) {
    return;
  }
  // Make sure the user has actually set the value.
  // VS Code will return the default values instead of `undefined`, even if user has not don't set anything.
  if (typeof configSetting.globalValue === 'undefined' && typeof configSetting.workspaceFolderValue === 'undefined' && typeof configSetting.workspaceValue === 'undefined') {
    return;
  }
  const value = config.get(key, undefined);
  if (typeof value !== 'undefined') {
    withValue(value);
  }
}


// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  return __awaiter(this, void 0, void 0, function* () {
    const extension = vscode.extensions.getExtension(typeScriptExtensionId);
    if (!extension) {
      return;
    }
    yield extension.activate();
    if (!extension.exports || !extension.exports.getAPI) {
      return;
    }
    const api = extension.exports.getAPI(0);
    if (!api) {
      return;
    }
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration(configurationSection)) {
        synchronizeConfiguration(api);
      }
    }, undefined, context.subscriptions);
    synchronizeConfiguration(api);
  });
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};