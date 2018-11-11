# Dockerfile extending the generic Node image with application files for a
# single application.
FROM gcr.io/google_appengine/nodejs

# Update apt-get
RUN apt-get update

# Check to see if the the version included in the base runtime satisfies
# '>=6.9.0', if not then do an npm install of the latest available
# version that satisfies it.
RUN /usr/local/bin/install_node '>=8.9.4'

RUN apt install -y rlwrap build-essential automake libtool coreutils python2.7
RUN apt-get install -y vim tmux git libpq5 libpq-dev htop

# Copy application code.
COPY . /app/

# You have to specify "--unsafe-perm" with npm install
# when running as root.  Failing to do this can cause
# install to appear to succeed even if a preinstall
# script fails, and may have other adverse consequences
# as well.
# This command will also cat the npm-debug.log file after the
# build, if it exists.
RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
  cat npm-debug.log; \
  fi) && false)

# Install the global dependencies
RUN npm install -g typescript ts-node@6.2.0 concurrently

# Install the node modules
RUN npm install

# Install the dev node modules (temporary workaround)
RUN npm install --only=dev

ENV NODE_ENV production
ENV HOST 127.0.0.1
ENV PORT 3000
ENV API_SECRET 8d4a864b-3826-4124-a6f7-4d166102
ENV PG_URI postgres://postgres:calorify123@35.184.140.133:5432/calorify-production	

# Run the database migrations and seeds
RUN npm run migrate

# Run the database migrations and seeds
RUN npm run build

# Run the app, default is "npm start"
CMD npm start