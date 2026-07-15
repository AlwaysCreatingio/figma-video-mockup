# MP4 export server: Node + headless Chromium (Playwright) + FFmpeg
FROM node:22-slim

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev || npm install --omit=dev
# install Chromium + its system deps into the image
RUN npx playwright install --with-deps chromium && rm -rf /var/lib/apt/lists/*

COPY export-server.mjs _logos.js ./
COPY templates ./templates

ENV NODE_ENV=production
EXPOSE 10000
CMD ["node", "export-server.mjs"]
