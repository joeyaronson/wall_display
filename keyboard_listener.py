
# Keyboard module in Python
import os
import keyboard
  
# press a to print rk
keyboard.add_hotkey('ctrl + shift + a', lambda: os.system("/home/joey/wall_display/start.sh"))
  
keyboard.wait('esc')