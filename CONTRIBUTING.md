# Deno Doppler Client - Contribution Guide

This Repo was forked from https://github.com/codemonument/deno-module-template/commit/beb8dab612b9c71a7772064353fcd5e2ca9ecd85

A template repo for developing deno modules. They are intended to be deployed to `deno.land/x`

## Folder Structure

- `.vscode` = A folder, 
  - containing a `settings.json` which activates the deno language server for this workspace
  - containing a `extensions.json` with recommended vscode extensions for this workspace
- `example` = A folder, containing entry deno files for demonstrating the modules functionalities 
   - contains `main.ts` - the default file for examples
- `importMap.json` = A file, including dependency mappings to url
- `deps` - a folder to re-export dependencies 
   (for example to group testing dependencies into one import)
- `lib` = A folder containing more source files which are exported by `mod.ts`
   - Hint: you may create multiple of them to structure your module.
- `.gitignore` = A normal gitingore file
- `deno.jsonc` - a config file for the deno cli
   - includes tasks (a.k.a aliases for long commands) with `deno task`
- `LICENSE`
- `mod.ts` = the entrypoint for this deno module, which exports all functionality of this module
- `Readme.md` = A normal Readme file

## Running examples 

see `tasks` property in `deno.jsonc`
Run each key there with `deno task <task-key>`

## Configure Deployments to deno.land/x 

see https://deno.land/add_module