export const getRandomPropertyId = () => {
  const FirstPropertyId = 9;
  const LastPropertyId = 11;
  return (
    Math.floor(Math.random() * (LastPropertyId - FirstPropertyId + 1)) +
    FirstPropertyId
  );
};
