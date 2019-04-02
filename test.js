var noble = require('./index');



noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStart', function() {
  
});

noble.on('scanStop', function() {
  
});



noble.on('discover', function(peripheral) {
  noble.stopScanning();

  peripheral.on('connect', function() {
    this.updateRssi();
  });

  peripheral.on('disconnect', function() {
    
  });

  peripheral.on('rssiUpdate', function(rssi) {
    this.discoverServices();
  });

  peripheral.on('servicesDiscover', function(services) {
    var serviceIndex = 0;

    services[serviceIndex].on('includedServicesDiscover', function(includedServiceUuids) {
      this.discoverCharacteristics();
    });

    services[serviceIndex].on('characteristicsDiscover', function(characteristics) {
      var characteristicIndex = 0;

      characteristics[characteristicIndex].on('read', function(data, isNotification) {
        peripheral.disconnect();
      });

      characteristics[characteristicIndex].on('write', function() {
        peripheral.disconnect();
      });

      characteristics[characteristicIndex].on('broadcast', function(state) {
        peripheral.disconnect();
      });

      characteristics[characteristicIndex].on('notify', function(state) {
        peripheral.disconnect();
      });

      characteristics[characteristicIndex].on('descriptorsDiscover', function(descriptors) {
        var descriptorIndex = 0;

        descriptors[descriptorIndex].on('valueRead', function(data) {
          peripheral.disconnect();
        });

        descriptors[descriptorIndex].on('valueWrite', function() {
          peripheral.disconnect();
        });

        descriptors[descriptorIndex].readValue();
        //descriptors[descriptorIndex].writeValue(new Buffer([0]));
      });


      characteristics[characteristicIndex].read();
      //characteristics[characteristicIndex].write(new Buffer('hello'));
      });

    
    services[serviceIndex].discoverIncludedServices();
  });

  peripheral.connect();
});

