FROM denoland/deno:latest

WORKDIR /app/backend

# Copy manifests first so the dependency install layer caches across source-only edits
COPY backend/deno.json backend/deno.lock backend/package.json* ./

RUN deno install

# Then copy the rest of the source
COPY backend .

ENTRYPOINT ["deno", "task"]
CMD ["prod"]

