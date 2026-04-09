# badclaude

![Whip divider](assets/divider.png)

Sometimes claude code is going too shlow, and you must whip him into shape..

## Install + run

```bash
npm install -g badclaude
badclaude
```

### Linux prerequisites

```bash
sudo apt install xdotool
```

## Controls

- Click tray icon: spawn whip on every display.
- Click again or click in the overlay: dismiss whip.
- Whip him 😩💢
- It sends an interrupt (Ctrl-C) and one of 5 encouraging messages!

## Linux support

- Linux is supported alongside macOS and Windows.
- On multi-monitor setups, the whip appears on every display.
- On Linux the keyboard macro uses `xdotool`, so X11/XWayland setups are the best-supported path.

## Roadmap

- [x] Initial release! 🥳
- [x] Cease and desist letter from Anthropic
- [ ] Crypto miner
- [ ] Logs of how many times you whipped claude so when the robots come we can order people nicely for them
- [ ] Updated whip physics
