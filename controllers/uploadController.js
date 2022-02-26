import fs from 'fs';
import cloudinary from 'cloudinary';
import { BadRequestError } from '../errors/index.js';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
async function uploadSingleHandler(req, res, next) {
  const { file, body } = req;
  let response = null;

  if (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      response = result;
    } catch (e) {
      res.status(500).json(e);
    } finally {
      fs.unlinkSync(file.path);
    }
    res.status(200).json({
      message: 'success upload',
      status: 'Ok',
      data: { url: response.url },
    });
  } else {
    throw new BadRequestError('File does not send, try again.');
  }
}

async function uploadMultipleHandler(req, res, next) {
  const { files, body } = req;
  const response = [];

  for (const singleFile of files) {
    try {
      const result = await cloudinary.uploader.upload(singleFile.path);
      response.push(result);
    } catch (e) {
      res.status(500).json(e);
    } finally {
      fs.unlinkSync(singleFile.path);
    }
  }
  res.status(200).json({
    msg: 'success upload',
    response,
  });
}
export { uploadSingleHandler, uploadMultipleHandler };
