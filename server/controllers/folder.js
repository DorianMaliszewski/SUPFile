var Folder = require('../models/Folder');
var File = require('../models/File');
var shortid = require('shortid');
var fs = require('fs');

function getAll(folders, list) {
  return new Promise(function (resolve, reject) {
    var promises = [];
    for (let i = 0; i < folders.length; i++) {
      promises.push(new Promise(function (resolve, reject) {
        let subList = [];
        getFile(folders[i]._id, subList)
          .then(function () {
            folders[i].files = subList[0];
            let subListFolders = [];
            cascade(folders[i]._id, list)
              .then(function () {
                list.push(folders[i]);
                resolve();
              });
          });
      }));
    }
    Promise.all(promises).then(function (values) {
      resolve();
    });
  });
}

function getAllFiles(folders, list) {
  return new Promise(function (resolve, reject) {
  for (let i = 0, p = Promise.resolve(); i < folders.length; i++) {
    //folders.forEach(folder => {
    p = p.then(_ => new Promise(resolve => {
      var subList = [];
      getFile(folder._id, subList)
        .then(function () {
          folder.files = subList[0];
          var subListFolders = [];
          cascade(folder._id, subListFolders)
            .then(function () {
              folder.subFolder = subListFolders;
              list.push(folder);
              resolve();
            });
        });
    }));
    //});
  }
  resolve();
  });
}

function getFile(id, list) {
  return new Promise(function (resolve, reject) {
    File.find({
      link: id
    })
      .exec(function (err, files) {
        if (err) {
          return res.send({
            success: false,
            msg: 'Error'
          });
        }
        list.push(files);
        resolve();
      });
  });
}

function cascade(id, list) {
  return new Promise(function (resolve, reject) {
    Folder.find({parent: id})
      .exec(function (err, folders) {
        if (err) {
          return res.send({
            success: false,
            msg: 'Error'
          });
        }
        if (folders.length !== 0) {
          getAll(folders, list)
            .then(function () {
              resolve();
          });
        }
        else {
          resolve();
        }
      });
  });
}

exports.getRootFolder = function (req, res) {
  if(req.user) {
    Folder.find({
      owner: req.user.id
    }).populate('files')
    .exec(function (err, folders) {
      if (err) {
        return res.send({
          success: false,
          msg: 'Error'
        });
      }
      return res.status(200).send({ folders })
    });
  } else {
    return res.status(400).send({msg: "Need connect"})
  }
}
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
      File.find({
        link: folder.id
      })
        .exec(function (err, files) {
          if (err) {
            return res.send({
              success: false,
              msg: 'Error'
            });
          }
          folder.files = files;
          let list = [];
          cascade(folder._id, list)
            .then(function () {
              folder.subFolder = list;
              res.send({ folder: folder })
          });
        });
      /*return Promise.each(folder.subFolder, function (child) {
        node.children.push(child);
        child.parent = null;
        return child.populateTree();
      });*/
    });
};

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
      const fileToDownload = process.env.STORAGE_PATH + "/" + file.owner + "/" + file.name

      res.download(fileToDownload, file.name)
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
    _id: req.body.id,
    owner: req.user.id
  }).populate('files')
    .exec(function (err, folder) {
      console.log("Folder",folder)
      if (err || !folder) {
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
      sampleFile.mv(`${process.env.STORAGE_PATH}/${req.user.id}/${sampleFile.name}`, function (err) {
        if (err)
        {
          console.log(err);
          return res.send({
            success: false,
            msg: 'File no create'
          });
        }
        var newFile = new File({
          name: sampleFile.name,
          short: short,
          size: req.body.size,
          owner: req.user.id,
          link: req.body.id,
          extension: arrayMime[1],
          typeDoc: arrayMime[0],
        });
        newFile.save(function (err, file) {
          if(err) {
            return res.status(500).send({error: "Une erreur est survenue lors de l'enregistrement du fichier"})
          }
          folder.files = folder.files.concat([newFile])
          folder.save(function(err){
            if(err){
              console.log(err)
              return res.status(500).send({error: "Une erreur est survenue lors de l'enregistrement du dossier"})
            }
            console.log(folder)
            return res.status(200).send({success: true, folder})
          })
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
  console.log(req.body)
  Folder
    .findOneAndUpdate({
    _id: req.body.id,
    owner: req.user.id
  },
  {name: req.body.name},
  {new: true},
  function (err, folder){
    if (err) {
      return res.send({
        success: false,
        msg: err
      });
    }
    if(!folder){
      return res.status(401).send({error: 'Folder not found'})
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
    .findOne({
      _id: req.body.id,
      owner: req.user.id
    },
    function (err, file) {
      if (err) {
        return res.send({
          success: false,
          msg: err
        });
      }
      if (!file) {
        return res.send({
          success: false,
          error: "Aucun fichier correspondant a cet id"
        })
      }
      fs.rename(`${process.env.STORAGE_PATH}/${req.user.id}/${file.name}`,`${process.env.STORAGE_PATH}/${req.user.id}/${req.body.name}`, function(err) {
        if(err) {
          console.log(err);
          return res.status(500).send({error: "Une erreur est survenue lors du renommage du fichier"});
        }
        file.name = req.body.name;
        file.save(function(err){
          if (err) {
            return res.status(500).send({error: err.message})
          }
          return res.send({
            success: true,
            file: file
          });
        });
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
      _id: req.body.id,
      owner: req.user.id,
      parent: { $type: 7 }
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
      _id: req.body.id,
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