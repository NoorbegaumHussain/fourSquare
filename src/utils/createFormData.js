export const createFormData = jsonObject => {
  let formData = new FormData();

  for (let key in jsonObject) {
    if (key === 'image') {
      jsonObject.image.map(item => {
        // const imageData = jsonObject[key];
        const imageData = item.image;
        formData.append('image', {
          uri: imageData.path,
          type: imageData.mime,
          name:
            imageData.filename !== undefined
              ? `${imageData.filename}.${imageData.mime.substr(
                  imageData.mime.indexOf('/') + 1,
                )}`
              : `rnImagePicker.${imageData.mime.substr(
                  imageData.mime.indexOf('/') + 1,
                )}`,
        });
      });
    } else {
      formData.append(`${key}`, `${jsonObject[key]}`);
    }
  }

  return formData;
};
