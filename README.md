# SYNOPSIS
A Project perspecive for Github.

# STATUS
Working, but a work in progress.

![screenshot](/docs/screenshot1.png)
![screenshot](/docs/screenshot2.png)

# EXAMPLE CONFIG

## .prohubrc
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

