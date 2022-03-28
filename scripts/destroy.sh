#!/bin/bash
set -e

STACK_NAME="cognito-workshop"
AWS_REGION="eu-west-3"

printf "\n\nDestroying STACK %s \n" "${STACK_NAME}"
printf "..........................\n\n"

aws cloudformation delete-stack --stack-name "${STACK_NAME}" --region "${AWS_REGION}"

aws cloudformation wait stack-delete-complete --stack-name "${STACK_NAME}" --region "${AWS_REGION}"

printf "Destroyed STACK %s \n" "${STACK_NAME}"
printf "..........................\n\n"
