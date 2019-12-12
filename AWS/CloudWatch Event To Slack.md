# CloudWatch Event to Slack

[TOC]





## Create a web hook on Slack

1. https://api.slack.com/apps
2. create a web hook, and get the URL for sending message

## Create lambda for sending message to Slack

1. Create lambda

2. Add 3 environment variables: `SLACK_WEBHOOK_URL(from slack web hook)`,`SLACK_CHANNEL(anything)`,`SLACK_USER(anything)`
3. fill in the code below(based on your demand)

### Lambda for pipeline State monitor

```python
import json
import logging
import os
from urllib import request, parse, error
# Read environment variables
SLACK_WEBHOOK_URL = os.environ['SLACK_WEBHOOK_URL']
SLACK_CHANNEL = os.environ['SLACK_CHANNEL']
SLACK_USER = os.environ['SLACK_USER']
logger = logging.getLogger()
logger.setLevel(logging.INFO)
def lambda_handler(event, context):
    logger.info("Event: " + str(event))
    # Read eventName
    message = ""
    status = event['detail']['state']
    if status == "FAILED":
        message += ":bangbang:"
    elif status == "SUCCEEDED" :
        message += ":white_check_mark:"
    message += f"Pipleline `{event['detail']['pipeline']}` has `{event['detail']['state']}` at _{event['time']}_ "# % (, , )
    logger.info("Message: " + str(message))
# Construct a slack message
    slack_message = {
        'channel': SLACK_CHANNEL,
        'username': SLACK_USER,
        'text': "%s" % (message),
        "mrkdwn": 'true'
    }
# Post message on SLACK_WEBHOOK_URL
    data = json.dumps(slack_message).encode('utf-8')
    req = request.Request(SLACK_WEBHOOK_URL, data)
    try:
        response = request.urlopen(req)
        response.read()
        logger.info("Message posted to %s", slack_message['channel'])
    except error.HTTPError as e:
        logger.error("Request failed: %d %s", e.code, e.reason)

"""
{
    "account": "12345678",
    "region": "us-west-1",
    "detail": {
        "execution-id": "adsf-38af-442b-a504-asdf",
        "pipeline": "pipeline_name",
        "version": 2.0,
        "state": "STARTED"
    },
    "detail-type": "CodePipeline Pipeline Execution State Change",
    "source": "aws.codepipeline",
    "version": "0",
    "time": "2019-08-08T04:14:11Z",
    "id": "0bb9669e-9d96-1c40-c794-fd6cd086bfe4",
    "resources": [
        "arn:aws:codepipeline:us-west-1:afasd:pipeline_name"
    ]
}
"""
```



### Lambda for pipeline action 

```python
import json
import logging
import os
from urllib import request, parse, error
# Read environment variables
SLACK_WEBHOOK_URL = os.environ['SLACK_WEBHOOK_URL']
SLACK_CHANNEL = os.environ['SLACK_CHANNEL']
SLACK_USER = os.environ['SLACK_USER']
logger = logging.getLogger()
logger.setLevel(logging.INFO)
def lambda_handler(event, context):
    logger.info("Event: " + str(event))
    # Read eventName
    message = ""
    status = event['detail']['state']
    if status == "FAILED":
        message += ":bangbang:"
    elif status == "SUCCEEDED" :
        message += ":white_check_mark:"
    message += f"Pipleline `{event['detail']['pipeline']}` executed action `[{event['detail']['stage']}/{event['detail']['action']}]` with state `{event['detail']['state']}` at _{event['time']}_ "
# Construct a slack message
    slack_message = {
        'channel': SLACK_CHANNEL,
        'username': SLACK_USER,
        'text': "%s" % (message),
        "mrkdwn": 'true'
    }
# Post message on SLACK_WEBHOOK_URL
    data = json.dumps(slack_message).encode('utf-8')
    req = request.Request(SLACK_WEBHOOK_URL, data)
    try:
        response = request.urlopen(req)
        response.read()
        logger.info("Message posted to %s", slack_message['channel'])
    except error.HTTPError as e:
        logger.error("Request failed: %d %s", e.code, e.reason)


"""
{
    "version": "0",
    "id": "asdf-4f58-8965-8756-asdf",
    "detail-type": "CodePipeline Action Execution State Change",
    "source": "aws.codepipeline",
    "account": "123456789",
    "time": "2019-08-08T05:44:08Z",
    "region": "us-west-1",
    "resources": [
        "arn:aws:codepipeline:us-west-1:123455:pipelinename"
    ],
    "detail": {
        "pipeline": "pipeline-name",
        "execution-id": "asdf-ddc1-asdf-9739-asdf",
        "stage": "Build",
        "action": "Build",
        "state": "FAILED",
        "region": "us-west-1",
        "type": {
            "owner": "AWS",
            "provider": "CodeBuild",
            "category": "Build",
            "version": "1"
        },
        "version": 2.0
    }
}
"""
```



#### Lambda for code build state change

```python
import json
import logging
import os
from urllib import request, parse, error
# Read environment variables
SLACK_WEBHOOK_URL = os.environ['SLACK_WEBHOOK_URL']
SLACK_CHANNEL = os.environ['SLACK_CHANNEL']
SLACK_USER = os.environ['SLACK_USER']
logger = logging.getLogger()
logger.setLevel(logging.INFO)
def lambda_handler(event, context):
    logger.info("Event: " + str(event))
    # Read eventName
    message = "=====>>>"
    status = event['detail']['build-status']
    if status == "FAILED":
        message += ":bangbang:"
    elif status == "SUCCEEDED" :
        message += ":white_check_mark:"
    message += f"Project `{event['detail']['project-name']}({event['detail']['additional-information']['initiator']})` build state has changed to `{event['detail']['build-status']}` at _{event['time']}_ "# % (, , )
    logger.info("Message: " + str(message))
# Construct a slack message
    slack_message = {
        'channel': SLACK_CHANNEL,
        'username': SLACK_USER,
        'text': "%s" % (message),
        "mrkdwn": 'true'
    }
# Post message on SLACK_WEBHOOK_URL
    data = json.dumps(slack_message).encode('utf-8')
    req = request.Request(SLACK_WEBHOOK_URL, data)
    try:
        response = request.urlopen(req)
        response.read()
        logger.info("Message posted to %s", slack_message['channel'])
    except error.HTTPError as e:
        logger.error("Request failed: %d %s", e.code, e.reason)

        

"""
{
    "version": "0",
    "id": "asdf-7d99-1a16-ca29-asdf",
    "detail-type": "CodeBuild Build State Change",
    "source": "aws.codebuild",
    "account": "123455698",
    "time": "2019-08-08T04:53:26Z",
    "region": "us-west-1",
    "resources": [
        "arn:aws:codebuild:us-west-1:12345:build/project_name:14e9b8ad-41bf-asdf-84ff-asdf"
    ],
    "detail": {
        "build-status": "IN_PROGRESS",
        "project-name": "project-name",
        "build-id": "arn:aws:codebuild:us-west-1:927390452103:build/project-name:asdf-41bf-4196-84ff-asdf",
        "additional-information": {
            "cache": {
                "type": "NO_CACHE"
            },
            "timeout-in-minutes": 60.0,
            "build-complete": False,
            "initiator": "codepipeline/pipeline-name",
            "build-start-time": "Aug 8, 2019 4:53:26 AM",
            "source": {
                "buildspec": "buildspec-web.yml",
                "type": "CODEPIPELINE"
            },
            "source-version": "...",
            "artifact": {
                "location": "..."
            },
            "environment": {
                "image": "aws/codebuild/standard:2.0",
                "privileged-mode": True,
                "image-pull-credentials-type": "CODEBUILD",
                "compute-type": "BUILD_GENERAL1_SMALL",
                "type": "LINUX_CONTAINER",
                "environment-variables": [
                    ...
                ]
            },
            "logs": {
                "deep-link": "https://console.aws.amazon.com/cloudwatch/home?region=us-west-1#logEvent:group=null;stream=null"
            },
            "queued-timeout-in-minutes": 480.0
        },
        "current-phase": "SUBMITTED",
        "current-phase-context": "[]",
        "version": "1"
    }
}
"""
```



## Create CloudWatch Rule for specific events



