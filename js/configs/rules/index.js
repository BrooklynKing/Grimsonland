import spells from './spells';
import units from './units';
import layers from './layers';
import ui from './ui';
import etc from './etc';

var rules = {};

Object.assign(rules, spells);
Object.assign(rules, units);
Object.assign(rules, layers);
Object.assign(rules, ui);
Object.assign(rules, etc);

export default rules;