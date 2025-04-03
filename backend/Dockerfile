FROM node:20-bullseye

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m app
WORKDIR /backend
RUN chown app:app /backend

# Copy package files first for better caching
COPY --chown=app:app package*.json ./

# Install ALL dependencies (including devDependencies for seeding)
USER app
RUN npm install --include=dev

# Copy application code
COPY --chown=app:app . .

EXPOSE 8000

CMD ["sh", "-c", "npm install && npm run seed && npm start"]