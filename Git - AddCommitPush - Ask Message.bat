@echo off
set /p message="Enter your commit message:"
git add .
git commit -m "%message%"
git push origin master
@echo off
set /p output="Commands finished. Press any key to close."

