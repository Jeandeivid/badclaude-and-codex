function normalizeWindowId(windowId) {
  const normalized = String(windowId ?? '').trim();
  return /^\d+$/.test(normalized) ? normalized : null;
}

function buildLinuxMacroCommands(text, windowId) {
  const commands = [];
  const targetWindowId = normalizeWindowId(windowId);

  if (targetWindowId) {
    commands.push(['windowactivate', '--sync', targetWindowId]);
  }

  commands.push(['key', '--clearmodifiers', 'ctrl+c']);
  commands.push(['type', '--clearmodifiers', String(text)]);
  commands.push(['key', 'Return']);

  return commands;
}

function buildLinuxRefocusArgs(windowId) {
  const targetWindowId = normalizeWindowId(windowId);
  if (targetWindowId) {
    return ['windowactivate', '--sync', targetWindowId];
  }
  return ['key', 'alt+Tab'];
}

function getLauncherEnv(env) {
  const nextEnv = { ...env };
  delete nextEnv.ELECTRON_RUN_AS_NODE;
  return nextEnv;
}

module.exports = {
  buildLinuxMacroCommands,
  buildLinuxRefocusArgs,
  getLauncherEnv,
};
