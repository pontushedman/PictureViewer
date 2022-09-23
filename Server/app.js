const fs = require('fs');
const express = require('express');
const formidable = require('formidable');
const cors = require('cors');
const path = require('path');
const AdmZip = require('adm-zip');

const libraryJsonPath = `/public/app-data/library/picture-library.json`;
const app = express();
const port = 3000;

// Improvement, use routes to encapsulate code related to album paths / picture paths
// this middleware will be used to GET all images through the default base url
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/api/libraryjson', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(__dirname + libraryJsonPath);
})

//#region Album HTTP methods

app.get('/api/album/:id', async (req, res) => { // Download entire album 

  if (req.params.id === undefined) return res.status(404).json({message: "No album id"});

  // Get a reference to the designated album
  const id = req.params.id;
  let targetPath = undefined;

  libraryJson = JSON.parse(fs.readFileSync(`${__dirname}${libraryJsonPath}`));

  for(album of libraryJson.albums)
      if (album.id === id)
        targetPath = `${__dirname}/public/${album.path}/`;
  
  if (typeof targetPath === undefined || !targetPath)
    return res.status(404).json({message: "Album not found"});

  const output = await createZipArchive(`${__dirname}/tmp/${uniqueId()}.zip`, targetPath);
  
  if (!output)
    return res.status(500).json({message: "Failed to download album"});

  res.download(output, () => {
    // Delete temp file after sending download
    fs.unlink(output, (err) => { if (err) console.log(`Could not delete ${output}`); });
  });

});
app.post('/api/album', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files){
    
    if (err)
      return;
    
    // Image processing
    const extention = checkMimeType(/(image\/[a-z]+)/.exec(fields.image)[0]);
    const buffer = Buffer.from(fields.image.replace(/(^data:image\/[a-z]+;base64,)/, ''), "base64");
    
    // Check mimetype before continuing
    if(!extention)
      return res.status(415).json({message: 'File extension not supported'});

    const title = sanitizeTitle(fields.title);
    const dir = `/app-data/library/pictures/${title}`;
    const albumHeaderDir = `/app-data/library/pictures/album-header/`;

    // recursively create multiple directories
    fs.mkdirSync(`${__dirname}/public/${dir}`, { recursive: true }, (err) => {
      return res.status(500).json({message: `Couldn't create album`});
    });

    // Save image to new path
    let path = albumHeaderDir + `${title}-header.${extention}`;
    
    fs.writeFileSync(`${__dirname}/public${path}`, buffer, function(err){
      return res.status(501).json({message: `Couldn't create album`});
    })
      
      // Load and alter picture-library.json
      libraryJson = JSON.parse(fs.readFileSync(__dirname + libraryJsonPath));

      albumObj = {
        id: uniqueId(),
        title: pimpMyTitle(title),
        comment: fields.comment,
        path: dir,
        headerImage: path,
        rating: "0",
        pictures: []
      };
      
      // Save Changes to library Json
      libraryJson.albums.push(albumObj);
      
      fs.writeFileSync(__dirname + libraryJsonPath, JSON.stringify(libraryJson), function(err) {
        if (err)
          return res.status(501).json({message: `Couldn't create album`});
      });
      
  res.status(200).json({message: 'Successfully created an album'});
});
});

app.put('/api/album', (req, res) => {
  const form = new formidable.IncomingForm();
  console.log('I was at put /api/album');
  form.parse(req, function(err, fields){
    if (err) return res.status(500).json({message: "Error updating album"});
    if (fields.id === undefined) return res.status(404).json({message: "No album id"});

    // Get a reference to the designated album
    let target = undefined;
    libraryJson = JSON.parse(fs.readFileSync(`${__dirname}${libraryJsonPath}`));

    for(album of libraryJson.albums)
        if (album.id === fields.id) target = album;

    if (typeof target === undefined)
      return res.status(404).json({message: `Could not update album with id ${fields.id}`});

    //update title 
    if (typeof fields.title === 'string' && fields.title)
      target.title = pimpMyTitle(sanitizeTitle(fields.title));

    //update comment 
    if (typeof fields.comment === 'string' && fields.comment)
      target.comment = fields.comment;

    //update rating
    if (typeof fields.rating === 'string' && fields.rating)
      target.rating = fields.rating;

      fs.writeFileSync(__dirname + libraryJsonPath, JSON.stringify(libraryJson), function(err) {
        if (err) return res.status(501).json({message: "Error updating album"}); });

      res.status(200).json({message: "Successfully updated album"});
  });
});

app.delete('/api/album', (req, res) => {
  const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){

      if (err) return res.status(500).json({message: "Error deleting album"});
      if (fields.id === undefined) return res.status(404).json({message: "No album id"});


      libraryJson = JSON.parse(fs.readFileSync(`${__dirname}${libraryJsonPath}`));
      console.log(libraryJson.albums.length);
      libraryJson.albums = libraryJson.albums.filter(x => { return x.id !== fields.id});
      console.log(libraryJson.albums.length);

      /*
      fs.writeFileSync(__dirname + libraryJsonPath, JSON.stringify(libraryJson), function(err) {
        if (err)
          return res.status(500).json({message: "Error deleting media"});
      });
      */
      res.status(200).json({message: "Successfully deleted album"});
      
    });
});
//#endregion


//#region Picture HTTP methods

app.get('/api/picture/:id', (req, res) => { // Download

  if (req.params.id === undefined) return res.status(404).json({message: "No media id"});

  // Get a reference to the designated picture object
  const id = req.params.id;
  let targetPath = undefined;
  libraryJson = JSON.parse(fs.readFileSync(`${__dirname}${libraryJsonPath}`));

  for(album of libraryJson.albums)
    for(image of album.pictures)
      if (image.id === id)
        targetPath = `${__dirname}/public/${album.path}/${image.imgHiRes}`;
  
  if (typeof targetPath !== 'string' || !targetPath)
    return res.status(404).json({message: `Couldn't find media with id ${id}`});

  res.status(200).download(targetPath);

});
app.post('/api/picture', (req, res) => {
  const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files){
      
      if (err)
        return res.status(500).json({message: "Error uploading media"});

      // Load picture-library.json
      libraryJson = JSON.parse(fs.readFileSync(`${__dirname}${libraryJsonPath}`));

      for(image of fields.images)
      {
        try
        {
          for (const album of libraryJson.albums) {

            if (album.id === image.album)
            {
              // We now have a reference to the designated album
              
              // Image processing
              const extention = checkMimeType(/(image\/[a-z]+)/.exec(image.hires_image)[0]);
              const bufferHiRes = Buffer.from(image.hires_image.replace(/(^data:image\/[a-z]+;base64,)/, ''), "base64");
              const bufferLoRes = Buffer.from(image.lowres_image.replace(/(^data:image\/[a-z]+;base64,)/, ''), "base64");
              
              // Check mimetype before continuing
              if(!extention)
                return res.status(415).send(JSON.stringify({message: "File extension not supported"}));
              
              const title = sanitizeTitle(image.title);
              const hiResPath = `${album.path}/${title}-highres.${extention}`;
              const loResPath = `${album.path}/${title}-lowres.${extention}`;
              
              // highres
              fs.writeFileSync(`${__dirname}/public/${hiResPath}`, bufferHiRes, function(err){
                if (err) return res.status(501).send(JSON.stringify({message: "Error uploading media"}));
              });

              // lowres
              fs.writeFileSync(`${__dirname}/public/${loResPath}`, bufferLoRes, function(err){
                if (err) return res.status(501).send(JSON.stringify({message: "Error uploading media"}));
              });
              // push new picture object to target album
              album.pictures.push({
                id: uniqueId(),
                title: pimpMyTitle(title),
                comment: image.comment,
                imgLoRes: `${title}-lowres.${extention}`,
                imgHiRes: `${title}-highres.${extention}`,
                rating: 0
              });
            }
          }
        }
        catch(ex)
        {
          return res.status(500).send(JSON.stringify({message: "Error uploading media"}));
        }
      }

      fs.writeFileSync(__dirname + libraryJsonPath, JSON.stringify(libraryJson), function(err) {
        if (err)
          return res.status(501).send(JSON.stringify({message: "Error updating album"}));
      });

    res.json({message: "Successfully uploaded media"}); 
  });
});
app.put('/api/picture', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){

    if (err) return res.status(500).json({message: "Error updating media"});
    if (fields.id === undefined) return res.status(500).json({message: "No media id"});

    // Get a reference to the designated picture object
    let target = undefined;
    libraryJson = JSON.parse(fs.readFileSync(`${__dirname}${libraryJsonPath}`));

    for(album of libraryJson.albums)
      for(image of album.pictures)
        if (image.id === fields.id) target = image;

    if (typeof target === undefined)
      return res.status(404).json({message: `Could not update media with id ${fields.id}`});
    
    //update title 
    if (typeof fields.title === 'string' && fields.title)
      target.title = pimpMyTitle(sanitizeTitle(fields.title));

    //update comment 
    if (typeof fields.comment === 'string' && fields.comment)
      target.comment = fields.comment;

    //update rating
    if (typeof fields.rating === 'string' && fields.rating)
      target.rating = fields.rating;

      fs.writeFileSync(__dirname + libraryJsonPath, JSON.stringify(libraryJson), function(err) {
        if (err) return res.status(501).json({message: "Error updating media"});
      });

      res.status(200).json({message: "Successfully updated media"});
  });
});

app.delete('/api/picture', (req, res) => {
  const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){

      if (err) return res.status(500).json({message: "Error deleting media"});
      if (fields.id === undefined) return res.status(404).json({message: "No media id"});

      // Get a reference to the designated album of the to-be deleted media and remove the appropriate object
      let target = undefined;
      libraryJson = JSON.parse(fs.readFileSync(`${__dirname}${libraryJsonPath}`));

      for(album of libraryJson.albums)
        for(image of album.pictures)
          if (image.id === fields.id)
            album.pictures = album.pictures.filter(x => { return x.id !== fields.id; });

      
      fs.writeFileSync(__dirname + libraryJsonPath, JSON.stringify(libraryJson), function(err) {
        if (err)
          return res.status(500).json({message: "Error deleting media"});
      });

      res.status(200).json({message: "Successfully deleted media"});
      
    });
});
//#endregion

app.listen(port, () => console.log(`http://localhost:${port} is listening.`));

//#region Helper methods
function checkMimeType(mimeType)
{
    if (typeof mimeType !== 'string')
        return false;

    let pattern = /image\/(png|jpeg|webp|gif)/;

    if (mimeType.match(pattern)){
      return mimeType.split('/').pop();
    } 
    return false;
}

function sanitizeTitle(input)
{
  if (typeof input !== 'string')
        return 'undefined';
  return input.trim().replace(' ', '-').replace(/(\s|-|_|~)+/g, '-').toLowerCase();
}

function pimpMyTitle(string) {
  let tmp = string.replace(/-/g, ' ');
  return tmp.charAt(0).toUpperCase() + tmp.slice(1);
}

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
}

async function createZipArchive(output, localFolder)
{
  try 
  {
    const zip = new AdmZip();
    const outputFile = output;
    zip.addLocalFolder(localFolder);
    zip.writeZip(outputFile);
    return output;
  } 
  catch (e) 
  {
    return false;
  }
}
//#endregion