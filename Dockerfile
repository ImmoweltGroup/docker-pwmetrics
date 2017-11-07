FROM markadams/chromium-xvfb-js:8
LABEL maintainer="Immonet dev team <aegaeon@immonet.de>"

#
# Define a production env to avoid installing devDeps
#
ARG NODE_ENV=production
ARG BABEL_ENV=production

#
# Install the Progressive Web Metrics CLI globally.
#
ARG PWMETRICS_VERSION="latest"
RUN npm i -g pwmetrics@"$PWMETRICS_VERSION"

#
# Set the default path to the CLI.
#
ENTRYPOINT [ "pwmetrics" ]
