# CI configuration via Docker

### `Dockerfile` for `Asp.net core`

```dockerfile
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src
COPY {Your solution file}.sln ./
COPY {All your csproj file}/*.csproj ./{Project folder}/
COPY Project01/*.csproj ./Project01/

RUN dotnet restore
COPY . .
WORKDIR /src/{the project folder your want to publish}
RUN dotnet publish -c release -r linux-x64 -o /app
...

FROM build AS publish
RUN dotnet publish -c release -r linux-x64 -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "{your project}.dll"]
```

### config a nat subet for pull docker image (skip but important)

### create task definition & cluster & service &  on AWS

### if code has submodules

```bash
aws ssm put-parameter --name ssh_key --type String --value "$(cat ~/.ssh/id_rsa)"
```

### create code pipeline

#### build phase  (`Buildspec.yml`)

```yaml
version: 0.2

env:
  variables:
    MT_Env: "my-env"
    MT_Region: "us-east-1"
    MT_DockerUrl: "123456789.dkr.ecr.us-east-1.amazonaws.com"
    MT_DockerName: "myproject/development"
  parameter-store:
    ssh_key: "ssh_key"

phases:
  install:
    runtime-versions:
      docker: 18
    commands: 
      - mkdir -p ~/.ssh
      - echo "$ssh_key" > ~/.ssh/id_rsa
      - chmod 600 ~/.ssh/id_rsa
      - ssh-keygen -F github.com || ssh-keyscan github.com >>~/.ssh/known_hosts
      - git config --global url."git@github.com:".insteadOf "https://github.com/"
      - git init
      - git remote add origin {Your_Git_repo with git protocol}
      - git fetch
      - git checkout -f {branch you want}
      - git submodule init
      - git submodule update --recursive
      - export DOCKER_IMAGE_NAME=$MT_DockerName
      - echo " DOCKER_IMAGE_NAME = $MT_DockerUrl/$DOCKER_IMAGE_NAME"

  pre_build:
    commands:
      - echo Restore started on `date`
      - echo Logging in to Amazon ECR...
      - $(aws ecr get-login --no-include-email --region ${MT_Region})

  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image for Environment $MT_Env ...
      - docker build --build-arg mt_env=$MT_Env -t $MT_DockerName . 
      - docker tag $MT_DockerName:latest $MT_DockerUrl/$DOCKER_IMAGE_NAME:latest

  post_build:
    commands:
      - echo Pushing the Docker image...
      - docker push $MT_DockerUrl/$DOCKER_IMAGE_NAME:latest
      # - command
artifacts:
  files:
    - 'imagedefinitions-dev.json'
    
```

#### deploy phase (`imagedefinitions.json`)

```json	
[
  {
    "name": "{your docker name}",
    "imageUri":"{your docker image}"
  }
]

```

