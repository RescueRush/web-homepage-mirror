@echo off
set SERVER=sysadmin@mixvoip.rescue-rush.lu

REM Run remote git pull and deploy script
ssh %SERVER% "./git_pull.sh && sudo ./copy_git_to_prod.sh"
