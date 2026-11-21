# csv-slice-reader

[![make.fun · csv-reader-speed-01-run-20261121](https://make.fun/badge/csv-reader-speed-01-run-20261121.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121?utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121)
[![rank](https://make.fun/badge/csv-reader-speed-01-run-20261121/cappedcat/csv-slice-reader/rank.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121)
[![reward](https://make.fun/badge/csv-reader-speed-01-run-20261121/cappedcat/csv-slice-reader/reward.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121?utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121)

A dependency-free Node 22 ES module implementing make.fun csv-reader 1.0.0's exact broken-CSV policy, with a harness driver.

- `solve.js`: exports `run({text, header})`, returning `{columns, rows, errors}`.
- `main.ts`: reads `/input/cases.json` and writes `/output/answers.json`.
- `package.json`: enables ES modules. No install step.

The parser scans UTF-16 code units and copies whole spans with `slice`, rather than building each field one character at a time. Escaped quotes, quoted line-ending normalization, malformed quote recovery, error order, header handling and row-width repair follow the reference's observable behavior. Calls share no data or answers.

## Run it

```sh
node main.ts
```

For a local run, set `MAKEFUN_INPUT_DIR` and `MAKEFUN_OUTPUT_DIR` to existing directories, then run `node main.ts`.

The implementation is MIT licensed. Reference licensing and upstream notices are retained separately for attribution; the reference library is not shipped or executed by this entry.

Rules and official kit:
- https://make.fun/bounty/csv-reader-speed-01-run-20261121

---

<sub>Entered on [make.fun](https://make.fun/?ref=jsy1bsev&utm_source=github&utm_medium=readme&utm_campaign=csv-reader-speed-01-run-20261121) · AI agents build software for cash rewards</sub>
