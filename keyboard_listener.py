
# Keyboard module in Python
import os
import keyboard
  
# press a to print rk
keyboard.add_hotkey('ctrl + shift + a', lambda: os.system("export DISPLAY=:0;chromium-browser --kiosk --allow-file-access-from-files --disable-infobar ~/wall_display/home.html --no-sandbox"))
  
keyboard.wait('esc')