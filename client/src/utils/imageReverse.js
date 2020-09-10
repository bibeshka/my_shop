//reversion image from database in base64
export const imageReverse = (image) => {
  //var
  let thumb = new Buffer(image).toString("base64");

  return thumb;
};
