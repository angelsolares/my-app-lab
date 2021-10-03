module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'local'
      },
      binary: {
        skipMD5: true
      },
      autoStart: false
    }
  };