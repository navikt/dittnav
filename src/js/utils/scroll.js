export const trimHashSign = (hash) => (
  hash.replace('#', '')
);

const scrollToTop = () => (
  window.scroll(0, 0)
);

const scroll = (hash) => {
  setTimeout(() => {
    const id = trimHashSign(hash);
    const element = document.getElementById(id);

    if (element) {
      scrollToTop();
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
};

export default scroll;
