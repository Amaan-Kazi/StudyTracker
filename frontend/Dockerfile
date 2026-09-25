FROM denoland/deno:latest

WORKDIR /app/frontend

# Copy manifests first so the dependency install layer caches across source-only edits
COPY frontend/deno.lock frontend/package.json* ./

RUN deno install

# Then copy the rest of the source
COPY frontend .

ENTRYPOINT ["deno", "task"]
CMD ["build"]

