::windows batch

call rmdir /s /q node_modules\sui-externs
call del /s /q package-lock.json
call npm install
call npm outdated

call compiler.bat
call npx gulp serve
