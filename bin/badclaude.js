#!/usr/bin/env node
const path = require('path');
const { spawn, execSync } = require('child_process');
const { getLauncherEnv } = require('../lib/linux-support');

let electronBinary;
try {
  electronBinary = require('electron');
} catch (e) {
  try {
    const cmd = process.platform === 'win32' ? 'where electron' : 'which electron';
    electronBinary = execSync(cmd, { encoding: 'utf-8' }).trim().split('\n')[0];
  } catch (lookupError) {
    console.error('badclaude: Electron not found.');
    console.error('');
    console.error('  Install with: npm install -g electron');
    if (process.platform === 'linux') {
      console.error('  On Linux also: sudo apt install xdotool');
    }
    process.exit(1);
  }
}

const appPath = path.resolve(__dirname, '..');
const env = getLauncherEnv(process.env);

const child = spawn(electronBinary, [appPath], {
  detached: true,
  stdio: 'ignore',
  windowsHide: true,
  env,
});

child.on('error', (err) => {
  console.error('Failed to start badclaude:', err.message);
  process.exit(1);
});

child.unref();
