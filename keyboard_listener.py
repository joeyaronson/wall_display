
# Keyboard module in Python
import keyboard
  
# press a to print rk
keyboard.add_hotkey('a', lambda: keyboard.write('Geek'))
keyboard.add_hotkey('ctrl + shift + a', print, args =('you entered', 'hotkey'))
  
keyboard.wait('esc')