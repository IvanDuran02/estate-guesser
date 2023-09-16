export const getRandomPropertyId = () => {
  // since the numbers don't start at 1 need to align propertyIds
  const FirstPropertyId = 339;
  const LastPropertyId = 562;
  let randomPropertyId;

  do {
    randomPropertyId =
      Math.floor(Math.random() * (LastPropertyId - FirstPropertyId + 1)) +
      FirstPropertyId;
  } while (randomPropertyId === 343); // skips 343 (Empty property)

  return randomPropertyId;
};
