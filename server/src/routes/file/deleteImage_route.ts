
import express from 'express';
import fs from 'fs';
import path from 'path'
import Database from '../../database/Database';
import { getProjectAbsolutePath } from '../../getProjectAbsolutePath';

const srcPath = getProjectAbsolutePath()

const imagesFolderPath = path.join(srcPath, '/files/images')
const database = new Database()

export const deleteImageRouter = express.Router();

deleteImageRouter.post('/api/deleteImage', (req, res)=>{
  console.log('/api/deleteImage')
    const imgBaseUrl = req.body['imgBaseUrl']
    const user_id = req.body['user_id']
    console.log(req.body)

    deleteDirFilesUsingPattern(imgBaseUrl, imagesFolderPath, (message)=>{
      res.send({message})    
    })
    const imageData= {
      user_id: user_id,
      image_url: imgBaseUrl
    }
    database.deleteImage(imageData)
})



/*
script taken from and works great:
https://stackoverflow.com/questions/44076455/delete-all-files-in-a-certain-directory-that-their-names-start-with-a-certain-st



*/


const deleteDirFilesUsingPattern = (pattern, dirPath, callback) => {
    // default directory is the current directory
  
    // get all file names in directory
    fs.readdir(path.resolve(dirPath), (err, fileNames) => {
      if (err) throw err;
  
      // iterate through the found file names
      for (const name of fileNames) {
          const rawName = name.toString()
        // if file name matches the pattern

        if (name.includes(pattern)) {
  
          // try to remove the file and log the result
          fs.unlink(path.join(dirPath,name), (err) => {
            if (err) throw err;
            console.log(`Deleted ${name}`);
          });
        }
      }
      return callback(`Image with baseUrl ${pattern} deleted succesfully`)
    });
  }