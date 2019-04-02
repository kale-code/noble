var noble = require('../index');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    for (var i in serviceData) {
      
    }
  }
  if (peripheral.advertisement.manufacturerData) {
    
  }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    
  }
});

