var Folder = require('../models/Folder');
var File = require('../models/File');
var shortid = require('shortid');

/*
 *  Get /folder
 */
exports.getFolder = function (req, res) {
  Folder.find({
    owner: req.user.id
  })
  .populate('file')
  .exec(function (err, folders) {
    if (err) {
      return res.send({
        success: false,
        msg: 'Error'
      });
    }
    res.send({ success: true, folder: folders });
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
      console.log(sampleFile);
      var short = shortid.generate();
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(process.cwd() + '/upload/'+ sampleFile.name +'.jpg', function (err) {
        if (err)
        {
          console.log(err);
          return res.send({
            success: false,
            msg: 'File no create'
          });
        }
        var arrayMime = sampleFile.mimetype.split('/');
        var newFile = new File({
          name: req.body.name,
          short: short,
          size: req.body.size,
          owner: req.user.id,
          parent: req.body.id,
          extension: arrayMime[1],
          typeDoc: arrayMime[0],
        });
        newFile.save(function (err) {
          res.send({ success: true, file: newFile });
        });
      });

      /*name: String,
        size: Number,
          extension: String,
            type: String,
              short: String,
                owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
                  link: { type: Schema.Types.ObjectId, ref: 'Folder' }*/

      
    });
};
