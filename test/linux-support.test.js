const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildLinuxMacroCommands,
  buildLinuxRefocusArgs,
  getLauncherEnv,
} = require('../lib/linux-support');

test('buildLinuxMacroCommands splits the Linux macro into separate xdotool commands', () => {
  assert.deepEqual(
    buildLinuxMacroCommands('Speed it up clanker', '81234'),
    [
      ['windowactivate', '--sync', '81234'],
      ['key', '--clearmodifiers', 'ctrl+c'],
      ['type', '--clearmodifiers', 'Speed it up clanker'],
      ['key', 'Return'],
    ]
  );
});

test('buildLinuxMacroCommands skips window activation when there is no valid target window', () => {
  assert.deepEqual(
    buildLinuxMacroCommands('FASTER', null),
    [
      ['key', '--clearmodifiers', 'ctrl+c'],
      ['type', '--clearmodifiers', 'FASTER'],
      ['key', 'Return'],
    ]
  );
});

test('buildLinuxRefocusArgs re-activates the captured window when possible', () => {
  assert.deepEqual(buildLinuxRefocusArgs('9001'), ['windowactivate', '--sync', '9001']);
});

test('buildLinuxRefocusArgs falls back to alt-tab without a valid window id', () => {
  assert.deepEqual(buildLinuxRefocusArgs('not-a-window'), ['key', 'alt+Tab']);
});

test('getLauncherEnv removes ELECTRON_RUN_AS_NODE and preserves the rest of the environment', () => {
  const env = getLauncherEnv({
    ELECTRON_RUN_AS_NODE: '1',
    PATH: '/usr/bin',
    HOME: '/tmp/demo',
  });

  assert.equal(env.ELECTRON_RUN_AS_NODE, undefined);
  assert.equal(env.PATH, '/usr/bin');
  assert.equal(env.HOME, '/tmp/demo');
});
