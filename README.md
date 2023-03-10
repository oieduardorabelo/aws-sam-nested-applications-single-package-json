# AWS SAM Nested Applications with single package.json

This is an example of using AWS SAM with nested applications sharing a single `package.json`.

We have a Rest API TypeScript application (`apps/rest-api/handlers`) that uses `dependencies` from the root `package.json`.

We have a DynamoDB Stream with a TypeScript lambda consumer (`apps/dynamodb/handlers`) that uses `dependencies` from the root `package.json`.

Any application can define its own TypeScript Lambda and use the root `package.json`.

The parent AWS SAM application is defined in `./template.yaml` and child applications are defined in `./apps/*/template.yaml`.

## Benefits

This enables the developer to use a single `package.json` and share it across the entire application. `esbuild` will be packing each lambda handler bundling the correct dependencies imported by each handler.

## Drawback

You need to define `--base-dir` for every AWS SAM CLI command that have it as an option.

When using `sam sync` chaging the source code of one lambda with sync all lambdas of that stack. For example, `apps/rest-api` is a stack with 2 lambdas. If you change the source code of one lambda, all 2 lambdas will be synced.

## Conventions on how to use

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

With `sync`:

```bash
sam sync --base-dir .
```

With `deploy`:

```
sam build --base-dir .
sam deploy
```

## Running locally

You can run it locally as you would normally do with AWS SAM CLI.

With `local start-api`:

```bash
sam build --base-dir .
sam local start-api
```

With `local invoke`:

```bash
sam build --base-dir .
sam local invoke StackRestApi/GetCategoriesFunction
```
