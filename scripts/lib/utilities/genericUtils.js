import {socket} from '../sockets.js';
import {socketUtils} from '../../utils.js';
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function translate(key) {
    return game.i18n.localize(key);
}
function setProperty(object, key, value) {
    return foundry.utils.setProperty(object, key, value);
}
function duplicate(object) {
    return foundry.utils.duplicate(object);
}
function deepClone(object) {
    return foundry.utils.deepClone(object);
}
function mergeObject(original, other) {
    return foundry.utils.mergeObject(original, other);
}
async function update(entity, updates) {
    let hasPermission = socketUtils.hasPermission(entity, game.user.id);
    if (hasPermission) return await entity.update(updates);
    await socket.executeAsGM('updateEntity', entity.uuid, updates);
}
async function setFlag(entity, scope, key, value) {
    let hasPermission = socketUtils.hasPermission(entity, game.user.id);
    if (hasPermission) return await entity.setFlag(scope, key, value);
    await socket.executeAsGM('setFlag', entity.uuid, scope, key, value);
}
async function remove(entity) {
    let hasPermission = socketUtils.hasPermission(entity, game.user.id);
    if (hasPermission) return await entity.delete();
    await socket.executeAsGM('deleteEntity', entity.uuid);
}
function decimalToFraction(decimal) {
    if (!decimal) return 0;
    if (Number(decimal) >= 1) return Number(decimal);
    return '1/' + 1 / Number(decimal);
}
function getCPRSetting(key) {
    return game.settings.get('chris-premades', key);
}
function isNewerVersion(v1, v0) {
    return foundry.utils.isNewerVersion(v1, v0);
}
function randomID(value) {
    return foundry.utils.randomID(value);
}
export let genericUtils = {
    sleep,
    translate,
    setProperty,
    duplicate,
    update,
    remove,
    setFlag,
    deepClone,
    mergeObject,
    getCPRSetting,
    decimalToFraction,
    isNewerVersion,
    randomID
};