#!/usr/bin/env node

/**
 * Builds and pushes all docker images automatically based on the github tags of the `pwmetrics` repository.
 *
 * @return {Void}
 */
const logger = require('log-fancy')('@immowelt/pwmetrics');
const fetch = require('node-fetch');
const semver = require('semver');
const asyncExec = require('async-exec');
const exec = asyncExec.default;
const {execWithCallbackOnLine} = asyncExec;

async function buildAndPush(version) {
	const dockerImageTag = `pwmetrics:${version}`;

	logger.info(`Building ${dockerImageTag}...`);
	await execWithCallbackOnLine(`docker build --pull --no-cache --build-arg PWMETRICS_VERSION=${version} -t ${dockerImageTag} .`, output => {
		if (output.includes('+ pwmetrics@')) {
			logger.log(output);
		}
	});

	logger.success(`Successfuly built ${dockerImageTag}!`);
	console.log(exec);
	// Disable the push until we setup the login to hub.docker.com
	// await exec(`docker push ${dockerImageTag}`, true);
}

(async function () {
	try {
		const res = await fetch('https://api.github.com/repos/paulirish/pwmetrics/tags');
		const tags = await res.json();
		const versionTags = tags.map(tag => semver.clean(tag.name)).filter(v => Boolean(v));

		//
		// Build and push each tag.
		//
		for (var i = 0; i < versionTags.length; i++) {
			const version = versionTags[i];

			await buildAndPush(version); // eslint-disable-line no-await-in-loop
		}

		//
		// Renew the generic 'latest' tag of the repository to the latest version of the pwmetrics CLI.
		//
		await buildAndPush('latest');
	} catch (err) {
		logger.fatal(err.message);
	}
})();
