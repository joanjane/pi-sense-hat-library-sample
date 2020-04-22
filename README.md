# Introduction
This is a sample application that demoes all features of Pi SenseHat device using [pi-sense-hat-library](https://github.com/joanjane/pi-sense-hat-library). It features also a simulation mode using [pi-sense-hat-remote-simulator](https://github.com/joanjane/pi-sense-hat-remote-simulator) library for easy development without a real device.

## Configuration
Create a .env file based on .env.sample.
```bash
# MODE to use real sense hat or the simulated interface
MODE=[production|simulator]

# Simulator settings 
# (see pi-sense-hat-remote-simulator repo to launch web simulator and server for development)
SERVER_URI=ws://localhost:8080
DEVICE=pi-sense-hat-library-sample # identifier of the simulator must match on the web simulator
```

## Sample usage
* When app is connected with sense pi, the display appear green. Then it will flash a test sequence.
* If you move the joystick up, it will display the current temperature, humidity and pressure.
* If you move the joystick right, it will display the acceleration values.
* If you move the joystick left, it will display the gyroscope values.
* If you move the joystick down, it will display the orientation values.
* If you move the joystick click, it will display the compass degrees.