var Folder = require('../models/Folder');
var File = require('../models/File');
var shortid = require('shortid');
/*
 *  Get /folder/:id
 */
exports.getFolder = function (req, res) {
  Folder.findById(req.params.id)
    .populate('files')
    .exec(function (err, folder) {
      if (err) {
        return res.send({
          success: false,
          msg: 'Error'
        });
      }
      return Promise.each(folder.subFolder, function (child) {
        node.children.push(child);
        child.parent = null;
        return child.populateTree();
      });
      //res.send({folder: folder});
    });
};
/*return this.constructor.find({ parent: this._id }).exec()
  .then(function (arrayOfChildren) {
    return Promise.each(arrayOfChildren, function (child) {
      node.children.push(child);
      child.parent = null;
      return child.populateTree();
    });
  });*/
/*exports.getFolder = function (req, res) {
  Folder.findById( req.params.id)
  .populate('file')
  .exec(function (err, folder) {
    if (err) {
      return res.send({
        success: false,
        msg: 'Error'
      });
    }
    var eachFolderPromise = eachFolder(folder.id);
    eachFolderPromise.then(function (result) {
      var reFolder = {
        "id": folder.id,
        "updateAt": folder.updateAt,
        "createAt": folder.createAt,
        "name": folder.name,
        "owner": folder.owner,
        "files": folder.files,
        "subFolder": result,
      };
      console.log(reFolder);
      res.send({ success: true, folder: reFolder });
    }, function (err) {
      console.log(err);
    });
  });
};*/
/*
function eachFolder(id) {
  return new Promise(function (resolve, reject) {
    Folder.find({
      parent: id
    })
      .populate('file')
      .exec(function (err, folders) {
        if (err) {
          return res.send({
            success: false,
            msg: 'Error'
          });
        }
        var reFolders = [];
        folders.forEach(function (folder) {
          console.log('a');
          var eachFolderPromise = eachFolder(folder.id);
          eachFolderPromise.then(function (result) {
            var reFolder = {
              "id": folder.id,
              "updateAt": folder.updateAt,
              "createAt": folder.createAt,
              "name": folder.name,
              "owner": folder.owner,
              "files": folder.files,
              "subFolder": result,
            };
            reFolders.push(reFolder);
          }, function (err) {
            console.log(err);
          });
        });
        console.log(reFolders);
        resolve(reFolders);
      });
  });
}
*/
/*
 *  Get /folder/short/:short
 */
exports.getFolderShort = function (req, res) {
  Folder.findOne(
    {short: req.params.short}
  )
    .populate('file')
    .exec(function (err, folder) {
      if (err) {
        return res.send({
          success: false,
          msg: 'Error'
        });
      }
      //console.log(folder);
      //  folder.subFolders = eachFolder(folder.id);
      res.send({ success: true, folder: folder });
    });
};

/*
 *  Get /file/:id
 */
exports.getFile = function (req, res) {
  File.findById(req.params.id)
    .populate('file')
    .exec(function (err, file) {
      if (err) {
        return res.send({
          success: false,
          msg: 'Error'
        });
      }
      res.send({ success: true, file: file });
    });
};

/*
 *  Get /file/short/:short
 */
exports.getFileShort = function (req, res) {
  File.findOne(
    { short: req.params.short }
  )
    .exec(function (err, file) {
      if (err) {
        return res.send({
          success: false,
          msg: 'Error'
        });
      }
      res.send({ success: true, file: file });
    });
};

/*
 * Post /folder
 * Parameter: id - Parent Folder
 */

 exports.addFolder = function (req, res){
  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'Error'
    });
   }
  Folder.findOne({
    parent: req.body.id,
    owner: req.user.id
  })
    .exec(function (err, folder) {
      if (err) {
        return res.send({
          success: false,
          msg: 'Error'
        });
      }
      var newFolder = new Folder({
        name: req.body.name,
        owner: req.user.id,
        parent: req.body.id,
        short: shortid.generate()
      });
      newFolder.save(function (err) {
        res.send({ success: true, folder: newFolder });
      });
  });
 };

 /*
  * Post /file
  * Parameter: id - Parent Folder
  * Parameter: size - Size of the file
  */
 exports.addFile = function (req, res) {
   if (!req.files)
     return res.send({
       success: false,
       msg: 'No File'
     });

  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'No id for folder'
    });
   }

   if (!req.body.size) {
     return res.send({
       success: false,
       msg: 'No size'
     });
   }
  Folder.findOne({
    parent: req.body.id,
    owner: req.user.id
  })
    .exec(function (err, folder) {
      if (err) {
        return res.send({
          success: false,
          msg: 'Error'
        });
      }

      var sampleFile = req.files.sampleFile;
      var short = shortid.generate();
      var arrayMime = sampleFile.mimetype.split('/');
      // Use the mv() method to place the file somewhere on your server
      // change process.cwd() + '/upload/ => process.env.STORAGE_PATH
      sampleFile.mv(process.cwd() + '/upload/' + sampleFile.name + '.' + arrayMime[1], function (err) {
        if (err)
        {
          console.log(err);
          return res.send({
            success: false,
            msg: 'File no create'
          });
        }
        var newFile = new File({
          name: req.body.name,
          short: short,
          size: req.body.size,
          owner: req.user.id,
          link: req.body.id,
          extension: arrayMime[1],
          typeDoc: arrayMime[0],
        });
        newFile.save(function (err) {
          res.send({ success: true, file: newFile });
        });
      });
    });
};


/*
 * Put /folder
 */
exports.changeNameFolder = function (req, res) {
  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'No id for folder'
    });
  }

  if (!req.body.name) {
    return res.send({
      success: false,
      msg: 'No name for folder'
    });
  }

  Folder
    .findOneAndUpdate({
    id: res.body.id,
    owner: req.user.id
  },
  {
    name: req.body.name
  },
  function (err, folder){
    if (err) {
      return res.send({
        success: false,
        msg: err
      });
    }
    res.send({
      success: true,
      folder: folder
    });
  });
};

/*
 * Put /file
 */
exports.changeNameFile = function (req, res) {
  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'No id for folder'
    });
  }

  if (!req.body.name) {
    return res.send({
      success: false,
      msg: 'No name for folder'
    });
  }

  File
    .findOneAndUpdate({
      id: res.body.id,
      owner: req.user.id
    },
    {
      name: req.body.name
    },
    function (err, file) {
      if (err) {
        return res.send({
          success: false,
          msg: err
        });
      }
      res.send({
        success: true,
        file: file
      });
    });
};

/*
 * Delete /folder
 */
exports.deleteFolder = function(req, res) {
  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'No id for folder'
    });
  }
  Folder.findOneAndRemove(
    {
      id: res.body.id,
      owner: req.user.id
    },
    function (err, folder) {
      if (err) {
        return res.send({
          success: false,
          msg: err
        });
      }
      res.send({
        success: true
      });
    }
  )
};

/*
 * Delete /file
 */
exports.deleteFile = function (req, res) {
  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'No id for folder'
    });
  }
  File.findOneAndRemove(
    {
      id: res.body.id,
      owner: req.user.id
    },
    function (err, file) {
      if (err) {
        return res.send({
          success: false,
          msg: err
        });
      }
      res.send({
        success: true
      });
    }
  )
};

/*
 * Put /folder/folder
 */
exports.changeFolderFolder = function (req, res) {
  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'No id for folder'
    });
  }

  if (!req.body.folder) {
    return res.send({
      success: false,
      msg: 'No name for folder'
    });
  }

  Folder
    .findOneAndUpdate({
      id: res.body.id,
      owner: req.user.id
    },
      {
        parent: req.body.folder
      },
      function (err, folder) {
        if (err) {
          return res.send({
            success: false,
            msg: err
          });
        }
        res.send({
          success: true,
          folder: folder
        });
      });
};

/*
 * Put /file/folder
 */
exports.changeFolderFile = function (req, res) {
  if (!req.body.id) {
    return res.send({
      success: false,
      msg: 'No id for folder'
    });
  }

  if (!req.body.name) {
    return res.send({
      success: false,
      msg: 'No name for folder'
    });
  }

  File
    .findOneAndUpdate({
      id: res.body.id,
      owner: req.user.id
    },
      {
        link: req.body.folder
      },
      function (err, file) {
        if (err) {
          return res.send({
            success: false,
            msg: err
          });
        }
        res.send({
          success: true,
          file: file
        });
      });
};