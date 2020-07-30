import spells from './spells';
import logic from './logic';
import units from './units';
import effects from './effects';
import terrain from './terrain';
import ui from './ui';

const objects: any = {
  ...logic,
  ...spells,
  ...units,
  ...effects,
  ...ui,
  ...terrain,
};

export default objects;
