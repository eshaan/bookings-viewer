import { px } from '../utils/styleUtils';

const fonts = {
  default: 'Roboto'
};

const fontSizes = {
  default: px(12),
  heading: px(24),
  subHeading: px(16)
};

const space = {
  oneX: px(5),
  twoX: px(10),
  threeX: px(15),
  fourX: px(20),
  fiveX: px(25),
  sixX: px(30),
  sevenX: px(35),
  eightX: px(40)
};

const colors = {
  disabled: '#f9f9f9'
};

const localTheme = {
  fonts,
  fontSizes,
  space,
  colors
};

export default localTheme;
