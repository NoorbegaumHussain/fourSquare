import uuid from 'react-native-uuid';
export const restructureObject = dataArray => {
  let structuredImagesData = [];
  let tempObj = {};
  dataArray.forEach(item => {
    item.photos.url.forEach(pic => {
      tempObj = {};
      tempObj.url = pic;
      tempObj.name = item.name;
      tempObj._id = item._id;
      tempObj.tempId = uuid.v4();
      structuredImagesData.push(tempObj);
    });
  });
  return structuredImagesData;
};
