FROM markadams/chromium-xvfb-js
MAINTAINER Immonet dev team "aegaeon@immonet.de"

#
# Install the Progressive Web Metrics CLI globally.
#
ARG PWMETRICS_VERSION="latest"
RUN npm i -g pwmetrics@$PWMETRICS_VERSION

#
# Set the default path to the CLI.
#
ENTRYPOINT [ "pwmetrics" ]
