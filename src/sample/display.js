module.exports.runDisplayTest = function (display, onFinish) {
  var O = '#123fff';
  var X = [123, 200, 30];
  var testPixels = [
    O, O, O, O, O, O, O, O,
    O, O, X, O, O, X, O, O,
    O, O, O, O, O, O, O, O,
    O, O, O, O, O, O, O, O,
    O, X, O, O, O, O, X, O,
    O, X, O, O, O, O, X, O,
    O, O, X, X, X, X, O, O,
    O, O, O, O, O, O, O, O
  ];

  var sequence = [
    () => { display.setPixel(2, 6, [123, 9, 200]) },  // You can render a pixel using x, y and rgb color
    () => { display.setPixel('*', '*', '#2255dd') },  // You can render all pixels in X and Y axis, with also a hex color
    () => { display.clear() },                        // You can clear display
    () => { display.setPixel('*', 4, '#bb44ee') },    // You can render an horizontal line at 4th row of pixels
    () => { display.setPixel(3, '*', '#ff00ff') },    // You can render a vertical line at 3rd row of pixels
    () => { display.setPixels(testPixels) },          // You can render all pixels defining a matrix of pixels
    () => { display.showMessage(`This is a test message ${Date.now()}`, 0.1, '#bbaa00') }, // You can flash messages too
    () => { console.log('Finished'), display.clear(), onFinish && onFinish() },
  ];

  console.log('Starting...');
  display.connect(() => {
    console.log('Sending sequence...');
    runSequence(sequence);
  });

  function runSequence(seq) {
    if (seq.length === 0) return;

    var first = seq[0],
    rest = seq.slice(1);
    first();

    setTimeout(() => {
      runSequence(rest);
    }, 2000);
  }

}
