var fs = require('fs');
const LCU = require('lcu-events').default;
const lcu = new LCU();

/*
"pkg": {
    "assets": [
      "assets/"
    ]
  }
*/

// let loot = JSON.parse(fs.readFileSync('myLoot.json', 'utf8'));

lcu.wsEvents.on('connect', async () => {
  /* my better version
  await lcu.fetch('/lol-loot/v2/player-loot-map')
    .then((resp) => resp.json())
    .then(async (data) => {
      const loot = data.playerLoot;
      let valueBE = 0
      let valueOE = 0

      for (const key in loot) {
        if (loot[key].disenchantValue == 0) continue;

        if (loot[key].itemDesc == "" || loot[key].itemDesc == null) {
          console.log(`${loot[key].lootName}: ${loot[key].disenchantValue} --> ${loot[key].disenchantLootName}`)
        } else {
          console.log(`${loot[key].itemDesc}: ${loot[key].disenchantValue} --> ${loot[key].disenchantLootName}`)
        }

        valueBE += (loot[key].disenchantLootName == 'CURRENCY_champion') ? loot[key].disenchantValue : 0
        valueOE += (loot[key].disenchantLootName == 'CURRENCY_cosmetic') ? loot[key].disenchantValue : 0
      }
      console.log(`\nBlue Essence: ${valueBE}\nOrange Essence: ${valueOE}`)
    }) */

  // techno
  const loot = await lcu.fetch('/lol-loot/v2/player-loot-map')
    .then((resp) => resp.json())
    .then((data) => data.playerLoot)
  let valueBE = 0
  let valueOE = 0

  for (const key in loot) {
    if (loot[key].disenchantValue == 0) continue;

    // if (loot[key].itemDesc == "" || loot[key].itemDesc == null) {
    //   console.log(`${loot[key].lootName}: ${loot[key].disenchantValue} --> ${loot[key].disenchantLootName}`)
    // } else {
    //   console.log(`${loot[key].itemDesc}: ${loot[key].disenchantValue} --> ${loot[key].disenchantLootName}`)
    // }
    if (loot[key].itemDesc == "" || loot[key].itemDesc == null) {
      console.log(`${loot[key].lootName} (x${loot[key].count}): ${(loot[key].disenchantLootName == 'CURRENCY_champion') ? '\033[36m' : '\033[33m'}${loot[key].disenchantValue * loot[key].count} ${(loot[key].disenchantLootName == 'CURRENCY_champion') ? '\033[36mBE\033[0m' : '\033[33mOE\033[0m'}`)
    } else {
      console.log(`${loot[key].itemDesc} (x${loot[key].count}): ${(loot[key].disenchantLootName == 'CURRENCY_champion') ? '\033[36m' : '\033[33m'}${loot[key].disenchantValue * loot[key].count} ${(loot[key].disenchantLootName == 'CURRENCY_champion') ? '\033[36mBE\033[0m' : '\033[33mOE\033[0m'}`)
    }

    valueBE += (loot[key].disenchantLootName == 'CURRENCY_champion') ? loot[key].disenchantValue * loot[key].count : 0
    valueOE += (loot[key].disenchantLootName == 'CURRENCY_cosmetic') ? loot[key].disenchantValue * loot[key].count : 0
  }
  console.log('\nBlue Essence: \033[36m' + valueBE + '\033[0m\nOrange Essence: \033[33m' + valueOE + '\033[0m')
})