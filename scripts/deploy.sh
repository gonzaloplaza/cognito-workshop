#!/bin/bash
set -e

STACK_NAME="cognito-workshop"
AWS_REGION="eu-west-3"
PARAMETER_OVERRIDES="$(cat .aws-envs |tr "\n" " ")"

printf "\n\nDeploying STACK %s \n" "${STACK_NAME}"
printf "..........................\n\n"

deploy=(aws cloudformation deploy \
  --stack-name "${STACK_NAME}" \
  --no-fail-on-empty-changeset \
  --template-file template.yml \
  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
  --parameter-overrides "${PARAMETER_OVERRIDES}" \
  --region "${AWS_REGION}")

eval "$(echo "${deploy[@]}")"
