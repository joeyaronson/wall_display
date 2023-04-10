#!/bin/bash
export DISPLAY=:0;

if [ $# -eq 0 ]
  then
    echo "running home"
    kill_chrome
    chromium-browser --kiosk --allow-file-access-from-files --disable-infobar ~/wall_display/home.html
else
    echo "running $1"
    chromium-browser --kiosk --disable-infobar ~/wall_display/$1/index.html
fi
