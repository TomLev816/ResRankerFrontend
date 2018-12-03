const defaultPhotos = [];

const photos = (state = defaultPhotos, action) => {
  switch (action.type) {
    case "ADD_PHOTO":
      return action.payload;
    default:
      return state;
  }
};

export default photos;
