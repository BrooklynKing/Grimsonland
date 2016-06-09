import spells from './spells'
import logic from './logic';
import units from './units';
import layers from './layers';
import ui from './ui';
import etc from './etc';

var rules = {};

Object.assign(rules, logic);
Object.assign(rules, spells);
Object.assign(rules, units);
Object.assign(rules, layers);
Object.assign(rules, ui);
Object.assign(rules, etc);

export default rules;