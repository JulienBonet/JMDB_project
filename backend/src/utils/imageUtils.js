const sharp = require('sharp');

const resizeAndCropBuffer = async (buffer, width, height, format = null) => {
  let image = sharp(buffer).resize(width, height, {
    fit: 'cover',
    position: 'centre',
  });

  if (format === 'jpeg') {
    image = image.jpeg({ quality: 90 });
  }

  return image.toBuffer();
};

module.exports = { resizeAndCropBuffer };
