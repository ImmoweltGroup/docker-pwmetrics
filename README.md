# @immowelt/pwmetrics

[![Powered by Immowelt](https://img.shields.io/badge/powered%20by-immowelt-yellow.svg?colorB=ffb200)](https://stackshare.io/immowelt-group/)
[![Build Status](https://travis-ci.org/ImmoweltGroup/pwmetrics.svg?branch=master)](https://travis-ci.org/ImmoweltGroup/pwmetrics)

> A Docker image for the [pwmetrics CLI](https://github.com/paulirish/pwmetrics) which should be used to test your application on behalf of performance guidelines from Google.

## Getting started (using Docker)
In case you want to integrate a performance test in your CI pipeline, we have an already pre configured Docker image at your hands.
Execute the following commands in your pipeline to do so.

```shell
# First pull the required version of the docker image on your host, only needs to be done once.
docker pull immowelt/pwmetrics:3.1.1

# Execute the tests based on a config located at `$(pwd)/path/to/config/pwmetrics.config.js`, the `$(pwd)` is only supported in unix environments.
docker run -v $(pwd)/path/to/config/:/usr/pwmetrics-config immowelt/pwmetrics:3.1.1 http://domain-to-test.com/ --config=/usr/pwmetrics-config/pwmetrics.config.js
```

## Configuration and preset-rules

### ttfmp (First Meaningful Paint) / ttfcp (First Contentful Paint)
The `ttfmp`, or commonly known as FMP, describes the time it takes until the browser paints the first frame of the application.
It was introduced since it signifies the user that the website / application is near to being loaded.

The `ttfcp`, or commonly known as FCP, describes the time it takes until the browser paints the first frame of text or content of the application.
It was introduced since it is the moment that the user starts scanning the page for content.

A visualized example of the two is shown below.
![Image that explains the difference between ttfmp and ttfcp](https://user-images.githubusercontent.com/1557092/29769201-93fd399a-8be9-11e7-9cb2-db0199aa5002.png)

More information can be found [here](https://github.com/WICG/paint-timing#definition).

### psi (Perceptual Speed Index)
The `psi` is a threshold which was introduced as a rating for your website in regards to perceived performance.
This number scale is based on the principle „The-lower-the-better“, Google employee Paul Irish recommends a PSI of under `1000`, but this is hard to achieve for bigger websites, the average score for the top 50 E-Commerce sites in the UK is between `3000` and `8500`, so we set our maximum PSI as the median of this range of `5000`.

[https://developers.google.com/web/tools/lighthouse/audits/speed-index](https://developers.google.com/web/tools/lighthouse/audits/speed-index)

## Licensing
See the LICENSE file at the root of the repository.
