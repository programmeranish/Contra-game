var imagesObj = {};
let fetchedFlag = false;
async function getImage(url) {
  let image = new Image();
  image.src = url;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image);
    };
  });
}
async function loadImages() {
  for (let i = 0; i < IMAGES_NAMES.length; i++) {
    let url = IMAGES_PATH + IMAGES_NAMES[i] + ".png";
    let image = await getImage(url);
    imagesObj = { ...imagesObj, [IMAGES_NAMES[i]]: image };
  }

  return new Promise((resolve, reject) => {
    if (Object.keys(imagesObj).length === IMAGES_NAMES.length) {
      resolve(imagesObj);
    }
  });
}
