const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM4')
const fs = require('fs')
const launch  = `${new Date()}`
// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    port.read()
  })
  
const parser = port.pipe(new Readline({ delimiter: '\n' }));

parser.on('data', data => {
    console.log(data);
    fs.appendFile(`./${launch.split("2021")[0]}.txt`, `${Date.now()}*${data}\n`, (err) => { if (err) throw err; });
  });
