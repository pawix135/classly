export const fakeCall = async (time: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("done");
    }, time);
  });
};
