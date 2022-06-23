var images = [];

async function loadImage(url) {
  let image = new Image();
  image.src = url;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image);
    };
  });
}
function getImages() {
  IMAGES_NAMES.forEach(async (imageName) => {
    let url = IMAGES_PATH + imageName;
    let image = await loadImage(url);
    images.push(image);
  });

  return images;
}

console.log(getImages());
