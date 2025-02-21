export const correctMonth = () => {
  if (new Date().getMonth() < 9) {
    return `0${new Date().getMonth() + 1}`;
  }
  return new Date().getMonth() + 1;
};

export const correctDate = () => {
  if (new Date().getDate() < 10) {
    return `0${new Date().getDate()}`;
  }
  return new Date().getDate();
};

export const correctMinute = () => {
  if (new Date().getMinutes() < 10) {
    return `0${new Date().getMinutes()}`;
  }
  return new Date().getMinutes();
};
