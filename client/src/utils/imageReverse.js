export const imageReverse = (image) => {
  var thumb = new Buffer(image).toString('base64');

  return thumb;
}