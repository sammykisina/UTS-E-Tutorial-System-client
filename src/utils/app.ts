const getRandom = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];

const generateTutorialCode: () => string = () => {
  const loops = 4;
  let code = '';
  for (let index = 0; index <= loops; index++) {
    const number = Math.floor(Math.random() * 1000);
    code = code + number;
  }

  return 'TOT-' + generateNumberWithDashes(code);
};

const generateNumberWithDashes: (number: string) => string = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '-');
};

const generateAvatar: (name: string) => string = (name) =>
  `https://ui-avatars.com/api/?name=${name}&background=170140&color=fff&bold=true&font-size=0.33`;

const appUtils = {
  getRandom,
  generateTutorialCode,
};

export default appUtils;
