
# Keyboard module in Python
import os
import keyboard
  
# press a to print rk
keyboard.add_hotkey('ctrl + shift + a', lambda: os.system("chromium-browser --kiosk --allow-file-access-from-files --disable-infobar ~/wall_display/home.html"))
  
keyboard.wait('esc')