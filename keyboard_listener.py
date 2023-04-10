
# Keyboard module in Python
import os
import keyboard
  
# press a to print rk
keyboard.add_hotkey('ctrl + shift + a', lambda: os.system("export DISPLAY=:0;/home/joey/wall_display/start.sh"))
  
keyboard.wait('esc')