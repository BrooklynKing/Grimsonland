import objects from './objects/index';
import rules from './rules/index';

function getRuleConfig(id: string) {
  return rules[id];
}

function getConfig(id: string) {
  const config = JSON.parse(JSON.stringify(objects[id]));

  !config.id && (config.id = id);

  return config;
}

export default {
  getRuleConfig,
  getConfig,
};
