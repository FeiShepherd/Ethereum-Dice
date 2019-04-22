#!/bin/sh

git filter-branch --env-filter '

CORRECT_NAME="feishepherd"
CORRECT_EMAIL="thomasshepherd2002@gmail.com"

export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
' --tag-name-filter cat -- --branches --tags
