export const trimHashSign = (hash) => (
  hash.replace('#', '')
);

const scroll = (hash) => {
  setTimeout(() => {
    const id = trimHashSign(hash);
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
};

export default scroll;
