import spells from './spells';
import units from './units';
import effects from './effects';
import terrain from './terrain';
import ui from './ui';

var objects = {};

Object.assign(objects, spells);
Object.assign(objects, units);
Object.assign(objects, effects);
Object.assign(objects, ui);
Object.assign(objects, terrain);

export default objects;