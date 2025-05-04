#!/bin/bash

# Recursively find all .html files
find . -type f -name "*.html" | while read -r file; do
    # Check if the first line contains <!DOCTYPE html>
    if ! head -n 1 "$file" | grep -iq "^<!DOCTYPE html>"; then
        echo "Fixing: $file"
        tmpfile=$(mktemp)
        echo "<!DOCTYPE html>" > "$tmpfile"
        cat "$file" >> "$tmpfile"
        mv "$tmpfile" "$file"
    fi
done
