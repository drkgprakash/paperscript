#!/bin/bash
# =============================================================================
# PaperScript LaTeX Compilation Script
# =============================================================================
# Usage: compile.sh <input_dir> <output_dir> <main_file> [compiler]
# =============================================================================

set -euo pipefail

INPUT_DIR="${1:?Input directory required}"
OUTPUT_DIR="${2:?Output directory required}"
MAIN_FILE="${3:?Main .tex file required}"
COMPILER="${4:-pdflatex}"
TIMEOUT="${LATEX_TIMEOUT_SECONDS:-60}"

# Validate compiler
case "$COMPILER" in
    pdflatex|xelatex|lualatex) ;;
    *) echo "ERROR: Invalid compiler: $COMPILER" >&2; exit 1 ;;
esac

# Validate input
if [ ! -f "$INPUT_DIR/$MAIN_FILE" ]; then
    echo "ERROR: Main file not found: $INPUT_DIR/$MAIN_FILE" >&2
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

# Run compilation (two passes for references)
cd "$INPUT_DIR"

for pass in 1 2; do
    echo "=== Compilation pass $pass ==="
    timeout "$TIMEOUT" "$COMPILER" \
        -interaction=nonstopmode \
        -output-directory="$OUTPUT_DIR" \
        "$MAIN_FILE" || {
        echo "ERROR: Compilation failed on pass $pass" >&2
        exit 1
    }
done

# Run bibtex if .bib files exist
if ls "$INPUT_DIR"/*.bib 1>/dev/null 2>&1; then
    echo "=== Running BibTeX ==="
    cd "$OUTPUT_DIR"
    MAIN_BASE="${MAIN_FILE%.tex}"
    bibtex "$MAIN_BASE" 2>/dev/null || true

    # Re-run compiler after bibtex
    cd "$INPUT_DIR"
    timeout "$TIMEOUT" "$COMPILER" \
        -interaction=nonstopmode \
        -output-directory="$OUTPUT_DIR" \
        "$MAIN_FILE" || true
fi

echo "=== Compilation complete ==="
PDF_FILE="$OUTPUT_DIR/${MAIN_FILE%.tex}.pdf"
if [ -f "$PDF_FILE" ]; then
    echo "SUCCESS: PDF generated at $PDF_FILE"
    ls -lh "$PDF_FILE"
else
    echo "ERROR: PDF not generated" >&2
    exit 1
fi
