import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export class Images {
  public getAllImages(imagesFolder: string): Promise<string[] | void> {
    return new Promise((reslove, reject) => {
      // const imagesFolder = path.resolve('./assets/images/full');
      // console.log(imagesFolder);
      fs.readdir(imagesFolder, (err, f: string[]) => {
        if (f.length === 0 || err) {
          console.log(err);
          reject(`${err}`);
        }
        reslove(f);
      });
    });
  }

  // public imageProcessing(){

  // }
  async resize(buffer: Buffer, w: number, h: number, name: unknown): Promise<String> {
    
    const fileName = (name as string).split('.')[0];
    const fileExt = (name as string).split('.')[1];
    const newName = Images.filename(fileName, fileExt, w, h);
    const allthumbs = await this.getAllImages(path.resolve('./assets/images/thumbnails'));

    const imageExist = (allthumbs as string[]).filter((el) => {
      return el === newName;
    });
    
    if(imageExist){
      return imageExist[0];
    }

    const imagesFolder = path.resolve(`./assets/images/thumbnails/${newName}`);


    await sharp(buffer)
      .resize(w, h)
      .toFile(imagesFolder);


    return newName;
  }

  static filename(name: string, ext: string, w: number, h: number) {
    return `${name}-${w}-${h}.${ext}`;
  }
}
// export default {
//   getAllimages: GetAllIamges,
// };
