@echo off
setlocal enabledelayedexpansion

set "SOURCE_DIR=%cd%"

for /r "%SOURCE_DIR%" %%f in (*.png *.jpeg *.jpg) do (
    set "FILE=%%f"
    set "EXT=%%~xf"

    if /i "!EXT!"==".png" (
        echo Converting: %%f
        magick "%%f" "%%~dpnf.webp"
    ) else if /i "!EXT!"==".jpeg" (
        echo Converting: %%f
        magick "%%f" "%%~dpnf.webp"
    ) else if /i "!EXT!"==".jpg" (
        echo Converting: %%f
        magick "%%f" "%%~dpnf.webp"
    )
)

echo Conversion complete!
pause
