export const findMessage = (obj, defaultMessage) => {
  let deepestMessage = defaultMessage;

  const searchDeep = (currentObj) => {
    if (currentObj !== null && typeof currentObj === "object") {
      if ("message" in currentObj) {
        deepestMessage = currentObj.message;
      }
      if ("error" in currentObj) {
        deepestMessage = currentObj.error;
      }

      for (const key in currentObj) {
        if (
          currentObj.hasOwnProperty(key) &&
          typeof currentObj[key] === "object"
        ) {
          searchDeep(currentObj[key]);
        }
      }
    }
  };

  searchDeep(obj);

  return deepestMessage;
};
