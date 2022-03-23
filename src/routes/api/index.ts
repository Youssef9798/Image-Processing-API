import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Images } from '../../utilities/getAllImages';

const routes = express.Router();

routes.get('/api/image', async (req: Request, res: Response) => {
  const { height, width, image_name } = req.query;

  if (!image_name) {
    return res.status(401).render('index', {
      error: 'No image Name Exist',
      image: '',
      resizedImage: '',
    });
  }
  if (!height || !width) {
    return res.status(401).render('index', {
      error: 'invalid height or width, try again',
      image: '',
      resizedImage: '',
    });
  }

  const imagesClass = new Images();
  const originalImages: unknown = await imagesClass.getAllImages(
    path.resolve('./assets/images/full')
  );
  const imageExist = (originalImages as string[]).filter((el) => {
    return el === image_name;
  });

  if (!imageExist[0]) {
    return res.status(404).render('index', {
      error: 'Images is not avaliable or not found',
      image: ``,
      resizedImage: ``,
    });
  } else {
    const imageBuffer = fs.readFileSync(`./assets/images/full/${image_name}`);
    const processedImage = await imagesClass.save(
      imageBuffer,
      +width,
      +height,
      `${image_name}`
    );

    res.status(200).render('index', {
      error: '',
      image: `${image_name}`,
      resizedImage: `${processedImage}`,
    });
  }
});

export default {
  routes,
};
