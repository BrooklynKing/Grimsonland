import * as spells from './spells';
import * as logic from './logic';
import * as units from './units';
import * as effects from './effects';
import * as terrain from './terrain';
import * as ui from './ui';

const objects: any = {
  ...logic,
  ...spells,
  ...units,
  ...effects,
  ...ui,
  ...terrain,
};

export default objects;
