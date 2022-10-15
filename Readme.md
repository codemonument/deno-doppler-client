# Deno Doppler Client 

This Module wraps the doppler.com REST API to provide a thin client sdk in deno

**NOTICE: This Module does not implement the full doppler api right now, but it can safely be used to get secrets from a doppler config :)**

It basically implements the following example flow from the doppler.com website:  
https://docs.doppler.com/docs/sdk-javascript

## Getting the secrets for a config 

```ts
// Init new Doppler Service with valid token 
// You can get a service token here: https://docs.doppler.com/docs/enclave-service-tokens
// (These are valid for 1 Project for 1 Environment but can be valid for multipl configs)
const doppler = new DopplerService({ token: DOPPLER_TOKEN });

// Get all secrets for a specific doppler config 
const secrets = await doppler.getSecrets("project-name", "config-name");
  console.log(secrets);

// Get one specific secret
 const secret = await doppler.retrieveSecret(
      "project-name",
      "config-name",
      "SECRET_NAME",
    );
```

## Useful Links

- [Doppler API Reference](https://docs.doppler.com/reference/api)
- [Auth Token Formats](https://docs.doppler.com/reference/auth-token-formats)