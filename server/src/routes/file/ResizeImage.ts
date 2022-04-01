import  sharp from 'sharp'
import path from 'path';

export class ResizeImage {
    public filename
    public folder

  constructor(folder, filename) {
    this.filename = filename
    this.folder = folder;
  }
  save(buffer) {

    const filepathBig = `${this.filepath()}-big.jpg`;
    const filepathMid = `${this.filepath()}-mid.jpg`;
    const filepathSmall = `${this.filepath()}-small.jpg`;

     sharp(buffer).resize(600, 600, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      }).toFile(filepathBig);

      sharp(buffer).resize(120, 120, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      }).toFile(filepathMid); 

      sharp(buffer).resize(60, 60, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      }).toFile(filepathSmall);

    return this.filename;
  }
  filepath() {
    return path.resolve(`${this.folder}/${this.filename}`)
  }
}