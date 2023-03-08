# AWS SAM Nested Applications with single package.json

This is an example of using AWS SAM with nested applications sharing a single `package.json`.

The Rest API is a TypeScript application (`apps/rest-api`) that uses `dependencies` from the root `package.json`.

The parent AWS SAM application is defined in `./template.yaml` and child applications are defined in `./apps/*/template.yaml`.

## Benefits

This enables the developer to use a single `package.json` and share it across the entire application. `esbuild` will be packing each lambda handler bundling the correct dependencies imported by each handler.

## How to use

We have a few conventions:

1. The `package.json` is located in the root of the project
2. The `CodeUri` of any lambda is always `./`
3. Definitions for lambda handlers entry points are defined using the full relative path of the project root
4. When running `sam build` from the root of the project, we need to define `--base-dir .` to make sure that `esbuild` will be able to find the `package.json` in the root of the project and resolve all relative paths correctly

For example:

```yaml
Resources:
    GetBooksFunction:
        Type: AWS::Serverless::Function
        Properties:
            CodeUri: ./
            Handler: get-books.handler
            # ...
        Metadata:
            # ...
            BuildProperties:
                # ...
                EntryPoints:
                    - apps/rest-api/handlers/get-books.ts
```

**Important:** The `--base-dir` must be defined for every AWS SAM CLI command that have it as an option.

## Deploying to AWS

You can use any AWS SAM CLI command, make sure you include `--base-dir .` when running from the root of the project.

For example:

```bash
sam sync --base-dir .
sam build --base-dir .
```

## Running locally

You can run it locally as you would normally do with AWS SAM CLI.

For example:

```bash
sam build --base-dir .
sam local start-api
```

You can also run the lambda handlers locally using `sam local invoke`:

```bash
sam build --base-dir .
sam local invoke StackRestApi/GetCategoriesFunction
```
