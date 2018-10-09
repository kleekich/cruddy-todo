const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      throw ("error");
    } else {
      fs.writeFile(exports.dataDir + '/' + id + '.txt', text, (err, data)=>{
        if (err) {
          throw ('error');
        } else {
          callback(null, {id: id, text: text});
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  var data = [];
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw ("error");
    } else {
      files.forEach((file) => {
        var content = file.slice(0,-4);
        data.push({id: content, text: content});
      });
      callback(null, data);
    }
    
  });
};

exports.readOne = (id, callback) => {
  var path = exports.dataDir + '/' + id + '.txt';
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, {id: id, text: data});
    }
  });
};

exports.update = (id, text, callback) => {
  var path = exports.dataDir + '/' + id + '.txt';
  fs.readFile(path, 'utf8', (err, data) => { 
    if (err) {
      callback(err, null);
    } else {
       fs.writeFile(path, text, (err, data) => {
        if (err) {
          throw ('error');
        } else {
          callback(null, text);
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  var path = exports.dataDir + '/' + id + '.txt';
  fs.unlink(path, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
