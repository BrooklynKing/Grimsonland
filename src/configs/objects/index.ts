import spells from './spells';
import logic from './logic';
import units from './units';
import effects from './effects';
import terrain from './terrain';
import ui from './ui';

const objects: any = {};

Object.assign(objects, logic);
Object.assign(objects, spells);
Object.assign(objects, units);
Object.assign(objects, effects);
Object.assign(objects, ui);
Object.assign(objects, terrain);

export default objects;
