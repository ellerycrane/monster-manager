#!/bin/bash
echo "Watching for changes in test.yaml; will touch ./js/services/MonsterEditor.js when changed"
fswatch -o ./test.yaml | xargs -n1 -I{} touch ./js/services/MonsterEditor.js