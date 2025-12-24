// Plainer иконки
import * as plainer from './plainer';

// Iconex иконки
import * as iconEx from './iconex';

// Phosphor иконки
import * as phosphor from './phosphor';

export const icons = {
  plainer,
  iconEx,
  phosphor,
};

export default icons;

const _iconNames = {
  ...plainer,
  ...iconEx,
  ...phosphor,
};

export type IconName = keyof typeof _iconNames;
