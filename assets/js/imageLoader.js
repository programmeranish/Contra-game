var images = {};
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
    let url = IMAGES_PATH + IMAGES_NAMES[i];
    let image = await getImage(url);
    images = { ...images, [IMAGES_NAMES[i]]: image };
  }

  return new Promise((resolve, reject) => {
    if (Object.keys(images).length === IMAGES_NAMES.length) {
      resolve("loaded");
    }
  });
}
