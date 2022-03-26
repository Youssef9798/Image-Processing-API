import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Images } from '../../utilities/imagesHandler';

const routes = express.Router();

routes.get('/api/images', async (req: Request, res: Response): Promise<void> => {
  // const { height, width, filename } = req.query;
  const height: string | unknown = req.query.height;
  const width: string | unknown = req.query.width;
  const filename: string | unknown = req.query.filename;
  if(!req.query){
    return res.status(401).render('index', {
      error: 'No input, please make sure to add the inputs',
      image: '',
      resizedImage: '',
    });
  }
  
  const invHeight:Number = parseInt(`${height}`);
  const invWidth:Number = parseInt(`${width}`);
  if (!filename) {
    return res.status(401).render('index', {
      error: 'No image input',
      image: '',
      resizedImage: '',
    });
  }
  if (!height || !width) {
    return res.status(401).render('index', {
      error: 'Enter a width and height',
      image: '',
      resizedImage: '',
    });
  }
  
  if(invHeight <= 0){
    return res.status(401).render('index', {
      error: 'Enter a valid Height',
      image: '',
      resizedImage: '',
    });
  }

  if(invWidth <= 0){
    return res.status(401).render('index', {
      error: 'Enter a valid Width',
      image: '',
      resizedImage: '',
    });
  }

  if(`${filename}`.split('.')[1] !== 'jpg'){
    return res.status(401).render('index', {
      error: 'Enter a valid image, image must be jpg or png',
      image: '',
      resizedImage: '',
    });
  }

  

  const imagesClass = new Images();
  const originalImages: unknown = await imagesClass.getAllImages(
    path.resolve('./assets/images/full')
  );
  const imageExist: String[] = (originalImages as string[]).filter((el) => {
    return el === filename;
  });

  if (!imageExist[0]) {
    return res.status(404).render('index', {
      error: 'Images is not avaliable or not found',
      image: ``,
      resizedImage: ``,
    });
  } else {
    const imageBuffer: Buffer = fs.readFileSync(`./assets/images/full/${filename}`);
    const processedImage: String = await imagesClass.resize(
      imageBuffer,
      +invWidth,
      +invHeight,
      `${filename}`
    );
    // console.log(res.req.originalUrl);
    // console.log(res.req.headers.host);
    
    res.status(200).render('index', {
      error: '',
      image: `${filename}`,
      resizedImage: `${processedImage}`,
    });
  }
});

export default {
  routes,
};
