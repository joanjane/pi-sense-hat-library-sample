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
  runDisplayTest(display);

  joystick.on('press', (e) => {
    console.log('joystick press ' + e);
    // 'left' | 'up' | 'right' | 'down' | 'click'
    if (e === 'up') {
      environmentSensors.getSensorsStatus().then(envSensorsStatus => {
        console.log(JSON.stringify(envSensorsStatus));
        display.showMessage('Temperature: ' + envSensorsStatus.temperature + ' C', 0.5, '#004400', () => {
          display.showMessage('Humidity: ' + envSensorsStatus.humidity + '%', 0.5, '#440000', () => {
            display.showMessage('Pressure: ' + envSensorsStatus.pressure + 'hPa', 0.5, '#000044');
          });
        });
      });
    } else if (e === 'right') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        console.log(JSON.stringify(motionStatus));
        const vector = motionStatus.acceleration;
        display.showMessage('Accel[x,y,z]: ' + vector.x + '/' + vector.y + '/' + vector.z, 0.5, '#aabbcc');
      });
    } else if (e === 'left') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        console.log(JSON.stringify(motionStatus));
        const vector = motionStatus.gyroscope;
        display.showMessage('Gyro[x,y,z]: ' + vector.x + '/' + vector.y + '/' + vector.z, 0.5, '#334455');
      });
    } else if (e === 'down') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        console.log(JSON.stringify(motionStatus));
        const vector = motionStatus.orientation;
        display.showMessage('Orient[x,y,z]: ' + vector.x + '/' + vector.y + '/' + vector.z, 0.5, '#aa3300');
      });
    } else if (e === 'click') {
      motionSensors.getMotionStatus().then((motionStatus) => {
        console.log(JSON.stringify(motionStatus));
        const degrees = Math.atan2(motionStatus.compass.y, motionStatus.compass.x) / Math.PI * 180;
        display.showMessage('Compass: ' + degrees + 'deg', 0.5, '#33aa00');
      });
    }
  });
}