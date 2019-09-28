export const px = function px(n) {
  return typeof n === 'number' && n !== 0 ? n + 'px' : n;
};
