export const getRandomPropertyId = () => {
  // since the numbers don't start at 1 need to align propertyIds
  const FirstPropertyId = 339;
  const LastPropertyId = 562;
  return (
    Math.floor(Math.random() * (LastPropertyId - FirstPropertyId + 1)) +
    FirstPropertyId
  );
};
