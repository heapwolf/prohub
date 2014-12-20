# SYNOPSIS
A Project perspecive for Github.

# STATUS
Working, but a work in progress.

![screenshot](/docs/screenshot1.png)
![screenshot](/docs/screenshot2.png)

# EXAMPLE CONFIG

## .prohubrc
You can place your [`rc`](github.com/dominictarr/rc) file where ever you want.

```json
{
  "org": "My Organization",

  "local": {
    "port": 8080,
    "host": "0.0.0.0"
  },

  "production": {
    "port": 80,
    "host": "0.0.0.0"
  },

  "githubClient": "",
  "githubSecret": "",

  "baseURL": "http://localhost:8080"
}
```
