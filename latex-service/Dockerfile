# =============================================================================
# PaperScript LaTeX Compilation Service
# =============================================================================
# Full TeX Live installation for comprehensive LaTeX support
# =============================================================================

FROM texlive/texlive:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --break-system-packages redis

WORKDIR /workdir

COPY compile.sh /usr/local/bin/compile.sh
RUN chmod +x /usr/local/bin/compile.sh

# Create non-root user for sandboxed compilation
RUN useradd -m -s /bin/bash latex-user
USER latex-user

CMD ["python3", "-c", "import time; print('LaTeX service ready'); time.sleep(999999)"]
