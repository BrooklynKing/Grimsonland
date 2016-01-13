import objects from './objects/index';
import rules from './rules/index';
import layers from './layers';

function getRuleConfig(id) {
    return rules[id]
}
function getConfig(id) {
    var config = JSON.parse(JSON.stringify(objects[id]));

    (!config.id) && (config.id = id);

    return config;
}
function getLayerConfig(id) {
    return layers[id];
}
export {
    getRuleConfig,
    getConfig,
    getLayerConfig
};