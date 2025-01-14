import serial
from pynput.mouse import Listener

# Set up serial communication
arduino = serial.Serial('COM3', 9600)  # Replace 'COM3' with your Arduino's COM port

def on_click(x, y, button, pressed):
    if pressed:
        if button.name == 'left':
            arduino.write(b'CLOSE\n')  # Send CLOSE command
            print("Gripper closed.")
        elif button.name == 'right':
            arduino.write(b'OPEN\n')   # Send OPEN command
            print("Gripper opened.")

# Start mouse listener
with Listener(on_click=on_click) as listener:
    listener.join()
