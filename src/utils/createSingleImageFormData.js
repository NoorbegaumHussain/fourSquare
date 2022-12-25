import {Platform} from 'react-native';

export const createSingleImageFormData = jsonObject => {
  let formData = new FormData();

  for (let key in jsonObject) {
    if (key === 'image') {
      const imageData = jsonObject[key];
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
    } else {
      formData.append(`${key}`, `${jsonObject[key]}`);
    }
  }

  return formData;
};
