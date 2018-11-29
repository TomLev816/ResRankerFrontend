const defaultViewOrMap = 'map';

const viewOrMap = (state = defaultViewOrMap, action) => {
  switch (action.type) {
    case "VIEW_OR_MAP_TO_LOAD":
      return action.payload;
    default:
      return state;
  }
};

export default viewOrMap;
