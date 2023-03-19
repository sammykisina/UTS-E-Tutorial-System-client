const getRandom = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];

const appUtils = {
  getRandom,
};

export default appUtils;
