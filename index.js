const {
  createDisplay,
  createJoystick,
  createEnvironmentSensors,
  createMotionSensors
} = require('./src');

const {
  runDisplayTest,
} = require('./src/sample');

const display = createDisplay();
const joystick = createJoystick();
const environmentSensors = createEnvironmentSensors();
const motionSensors = createMotionSensors();

console.log('Connecting to modules');
Promise.all([
  new Promise((resolve) => display.connect(resolve)),
  new Promise((resolve) => joystick.connect(resolve)),
  new Promise((resolve) => environmentSensors.connect(resolve)),
  new Promise((resolve) => motionSensors.connect(resolve))
]).then(() => {
  console.log('Modules connected');
  App(display, joystick, environmentSensors, motionSensors);
});

function App(display, joystick, environmentSensors, motionSensors) {
  display.setPixel('*', '*', '#004400');
  runDisplayTest(display);

  joystick.on('press', (e) => {
    console.log('joystick press ' + e);
    // 'left' | 'up' | 'right' | 'down' | 'click'
    if (e === 'up') {
      environmentSensors.getSensorStatus().then(envSensorsStatus => {
        display.showMessage('Temperature: ' + envSensorsStatus.temperature + ' C', 1, '#004400', () => {
          display.showMessage('Humidity: ' + envSensorsStatus.humidity + '%', 1, '#440000', () => {
            display.showMessage('Pressure: ' + envSensorsStatus.pressure + 'hPa', 1, '#000044');
          });
        });
      });
    } else if (e === 'right') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        const vector = motionStatus.acceleration;
        display.showMessage('Accel[x,y,z]: ' + vector[0] + '/' + vector[1] + '/' + vector[2], 0.2, '#aabbcc');
      });
    } else if (e === 'left') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        const vector = motionStatus.gyroscope;
        display.showMessage('Gyro[x,y,z]: ' + vector[0] + '/' + vector[1] + '/' + vector[2], 0.2, '#334455');
      });
    } else if (e === 'down') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        const vector = motionStatus.orientation;
        display.showMessage('Orient[x,y,z]: ' + vector[0] + '/' + vector[1] + '/' + vector[2], 0.2, '#aa3300');
      });
    } else if (e === 'click') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        display.showMessage('Compass: ' + motionStatus.compass + 'deg', 0.2, '#33aa00');
      });
    }
  });
}