#!/usr/bin/env bash
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMEOUT_SECONDS="${TEST_TIMEOUT_SECONDS:-120}"
LOG_FILE="${TEST_LOG_FILE:-/tmp/japanese_miner_test.log}"

rm -f "$LOG_FILE"

if command -v timeout >/dev/null 2>&1; then
  timeout "$TIMEOUT_SECONDS" node "$ROOT/test-runner.mjs" "$@" --log "$LOG_FILE"
  CODE=$?
else
  node "$ROOT/test-runner.mjs" "$@" --log "$LOG_FILE"
  CODE=$?
fi

if [[ $CODE -eq 0 ]]; then
  echo "EXIT_OK"
else
  echo "EXIT_CODE=$CODE"
fi

echo "LOG_FILE=$LOG_FILE"
exit "$CODE"
