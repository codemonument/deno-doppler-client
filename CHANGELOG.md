# Changelog 

## next 

- Make page prop in DopplerResponse optional (to fit with secrets response, which seem to not have a page prop in response)

## 0.1.2 - 2022-10-15 

- Refactor all import paths inside the lib code to not use the import map 
  (seems broken when using this module outside of this repos)

## 0.1.1 - 2022-10-15 

- Fix syntax highlighting in Readme.md

## 0.1.0 - 2022-10-15 

First release, Implements functions from doppler api: 

- getConfigs
- getSecrets
- retrieveSecret/getSecret