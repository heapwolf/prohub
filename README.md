# SYNOPSIS
A Project perspecive for Github.

# STATUS
Working, but a work in progress.

# SCREENSHOTS
## REPOS IN PROJECT

![screenshot](/docs/screenshot1.png)

## AGGREGATED MILESTONES
![screenshot](/docs/screenshot2.png)
Grey bar indicates a date timeline from the beginning of the project to the end of the project. The Blue bar is the progress of total milestones closed towards completion.


# HOW TO RUN
Watches css and javascript for changes so you don't need to restart.
```bash
npm run watch
```

Build the CSS and HTML but dont start
```bash
npm run bundle
```

Just start the app without bundling anything
```bash
npm start
```


# CONFIGURATION
You will need to register a new application under your account or organization.
The client ID and secret created during that process is what is used in the 
configuration of this application. The callback url is going to be 
`//host:port/callback`.

## EXAMPLE RC FILE

### .prohubrc
You can place your [`rc`](github.com/dominictarr/rc) file where ever you want.
`local` or `production` sections are used based on the value of the `NODE_ENV`
environment variable.

```json
{
  "org": "My Organization",

  "port": 8080,
  "host": "0.0.0.0",

  "githubClient": "",
  "githubSecret": "",

  "baseURL": "http://localhost:8080"
}
```


# DOCKER 
This will get put up on the Docker Registry soon until then you'll have to 
build it.

```bash
docker build -t prohub .
```


To run it use the following instructions. You can replace the `-it --rm` 
with `-d` to daemon and run in the background.

```bash
docker run -it --rm \
 -p "8080:8080" \
 -e "prohub_githubClient=CLIENT_ID" \
 -e "prohub_githubSecret=SECRET" \
 -e "prohub_baseURL=http://<hostname>:8080"
```

You can override the configuration variables below by using the following 
environment variables

* prohub_org
* prohub_port (you really do not need to change this variable when using docker)
* prohub_host (you really do not need to change this variable when using docker)
* prohub_githubClient
* prohub_githubSecret
* prohub_baseURL

We highly recommend that you proxy the connection to the application via nginx 
with SSL. Just be sure to set your baseURL to the external URL, as well as the 
callback URL in the github application configuration.


