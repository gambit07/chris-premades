import {combatUtils, dialogUtils, genericUtils, tokenUtils, workflowUtils} from '../../utils.js';

async function damage({trigger: {entity: item}, workflow}) {
    if (workflow.hitTargets.size !== 1 || workflow.item.system.actionType !== 'mwak') return;
    if (!item.system.uses.value) return;
    if (!combatUtils.perTurnCheck(item, 'strikeOfTheGiants')) return;
    let selection = await dialogUtils.confirm(item.name, genericUtils.format('CHRISPREMADES.Dialog.Use', {itemName: item.name}));
    if (!selection) return;
    await combatUtils.setTurnCheck(item, 'strikeOfTheGiants');
    await workflowUtils.syntheticItemRoll(item, [workflow.hitTargets.first()], {options: {consumeUsage: true}, config: {configureDialog: false}});
}
async function combatEnd({trigger: {entity: item}}) {
    await combatUtils.setTurnCheck(item, 'strikeOfTheGiants', true);
}
async function earlyCloud({trigger: {entity: effect}, workflow}) {
    if (workflow.targets.size !== 1) return;
    let targetToken = workflow.targets.first();
    let originActor = fromUuidSync(effect.origin).actor;
    if (!originActor?.uuid !== targetToken.actor.uuid) return;
    workflow.disadvantage = true;
    workflow.attackAdvAttribution.add(genericUtils.translate('DND5E.Disadvantage') + ': ' + effect.name);
}
async function useStone({workflow}) {
    if (!workflow.failedSaves.size) return;
    let targetToken = workflow.targets.first();
    await tokenUtils.pushToken(workflow.token, targetToken, 10);
}
export let strikeOfTheGiants = {
    name: 'Strike of the Giants',
    version: '0.12.70',
    midi: {
        actor: [
            {
                pass: 'damageRollComplete',
                macro: damage,
                priority: 50
            }
        ]
    },
    combat: [
        {
            pass: 'combatEnd',
            macro: combatEnd,
            priority: 50
        }
    ]
};
let version = '0.12.70';
export let cloudStrike = {
    name: 'Strike of the Giants: Cloud Strike',
    version,
    midi: {
        actor: [
            {
                pass: 'preambleComplete',
                macro: earlyCloud,
                priority: 50
            }
        ]
    }
};
export let fireStrike = {
    name: 'Strike of the Giants: Fire Strike',
    version
};
export let frostStrike = {
    name: 'Strike of the Giants: Frost Strike',
    version
};
export let hillStrike = {
    name: 'Strike of the Giants: Hill Strike',
    version
};
export let stoneStrike = {
    name: 'Strike of the Giants: Stone Strike',
    version,
    midi: {
        item: [
            {
                pass: 'rollFinished',
                macro: useStone,
                priority: 50
            }
        ]
    }
};
export let stormStrike = {
    name: 'Strike of the Giants: Storm Strike',
    version
};