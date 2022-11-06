export DISPLAY=:0;

if [ $# -eq 0 ]
  then
    echo "running home"
    chromium-browser --kiosk --disable-infobar /home/pi/wall_display/index.html
else
    echo "running $1"
    chromium-browser --kiosk --disable-infobar /home/pi/wall_display/$1/index.html
fi
