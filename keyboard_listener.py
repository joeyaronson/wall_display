
# Keyboard module in Python
import os
import keyboard
  
# press a to print rk
keyboard.add_hotkey('ctrl + shift + a', os.system, args =('echo test'))
  
keyboard.wait('esc')