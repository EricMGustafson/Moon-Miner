// #region variables and dictionaries

let rupees = 0
let stealTotal = 0
let passiveTotal = 0

const stealUpgrades = {
  stickyFingers: {
    name: 'Sticky Fingers',
    price: 100,
    quantity: 0,
    bonus: 1,
    multiplier: 2,
    img: './assets/thief.jpg'
  },
  smashPots: {
    name: 'Smash Pots',
    price: 2500,
    quantity: 0,
    bonus: 1,
    multiplier: 3,
    img: './assets/lots-o-pots.jpg'
  },
  masterSword: {
    name: 'Master Sword',
    price: 25000,
    quantity: 0,
    bonus: 1,
    multiplier: 5,
    img: './assets/master-sword.png'
  }
};

const passiveUpgrades = {
  rolling: {
    name: 'Rolling',
    price: 10,
    quantity: 0,
    bonus: 1,
    multiplier: 3,
    img: './assets/rolling.png'
  },
  spinAttack: {
    name: 'Spin Attack',
    price: 60000,
    quantity: 0,
    bonus: 1,
    multiplier: 5,
    img: './assets/spin-attack.gif'
  },
  bomb: {
    name: 'Bomb',
    price: 100000,
    quantity: 0,
    bonus: 1,
    multiplier: 10,
    img: './assets/bomb.webp'
  }
};

// #endregion

// #region templates

function drawStealCards() {
  let template = ''
  for (let upgrades in stealUpgrades) {
      let upgrade = stealUpgrades[upgrades]
      template += `
      <div id="${upgrades}" style="background-image: url('${upgrade.img}')" class="col upgrade-tile align-items-center d-flex justify-content-between flex-column select bg-image m-3" onclick="buyStealUpgrade('${upgrades}')">
        <div class="w-100 d-flex justify-content-between p-2">
          <h4 class="upgrade-bg">Bonus: ${upgrade.bonus}</h4>
          <h4 class="upgrade-bg">Cost: ${upgrade.price}</h4> 
        </div>
        <div class="text-center">
          <h4 class="upgrade-bg">${upgrade.name}: ${upgrade.quantity}</h4>
        </div>
      </div>`
      console.log('this should be the key', upgrades);
      console.log('this should be the key variable', upgrade);
    }
    document.getElementById('steals').innerHTML = template
  }

function drawPassiveCards() {
  let template = ''
  for (let upgrades in passiveUpgrades) {
      let upgrade = passiveUpgrades[upgrades];
      template += `
      <div id="${upgrades}" style="background-image: url('${upgrade.img}')" class="col upgrade-tile align-items-center d-flex justify-content-between flex-column select bg-image m-3" onclick="buyPassiveUpgrade('${upgrades}')">
        <div class="w-100 d-flex justify-content-between p-2">
          <h4 class="upgrade-bg">Current Bonus: ${upgrade.bonus}</h4>
          <h4 class="upgrade-bg">Cost: ${upgrade.price}</h4> 
        </div>
        <div class="text-center">
          <h4 class="upgrade-bg">${upgrade.name}: ${upgrade.quantity}</h4>
        </div>
      </div>`
  }
  document.getElementById('passives').innerHTML = template
}

// #endregion

// #region clickables
function steal() {
  rupees += (1 + stealTotal)
  update()
}

function addAllSteals() {
  stealTotal += stealUpgrades.stickyFingers.bonus
  stealTotal += stealUpgrades.smashPots.bonus
  stealTotal += stealUpgrades.masterSword.bonus
}

function buyStealUpgrade(upgrade) {
  if (rupees >= stealUpgrades[upgrade].price) {
    rupees -= stealUpgrades[upgrade].price
    stealUpgrades[upgrade].quantity++
    stealUpgrades[upgrade].bonus += (stealUpgrades[upgrade].multiplier * stealUpgrades[upgrade].bonus)
    stealUpgrades[upgrade].price += (stealUpgrades[upgrade].multiplier * 100)
  }
  addAllSteals()
  update()
  updateSteal(upgrade)
}


function update() {
  document.getElementById('count').innerText = JSON.stringify(rupees)
}

function updateSteal(upgrade) {
  drawStealCards()
}

// function buyStickyFingers() {
//   let upgrade = stealUpgrades.stickyFingers
//   if (rupees >= upgrade.price) {
//     rupees -= upgrade.price
//     upgrade.quantity += 1
//     stealTotal += upgrade.bonus
//   }
//   addUpgrade(upgrade)
//   update()
// }

// function buySmashPots() {
//   let upgrade = stealUpgrades.smashPots
//   if (rupees >= upgrade.price) {
//     rupees -= upgrade.price
//     upgrade.quantity += 1
//     stealTotal += upgrade.bonus
//   }
//   addUpgrade(upgrade)
//   update()
// }


// #endregion

// #region passives

function buyPassiveUpgrade(upgrade) {
  if (rupees >= passiveUpgrades[upgrade].price) {
    rupees -= passiveUpgrades[upgrade].price
    passiveUpgrades[upgrade].quantity++
    passiveUpgrades[upgrade].bonus += (passiveUpgrades[upgrade].multiplier * passiveUpgrades[upgrade].bonus)
    passiveUpgrades[upgrade].price += (passiveUpgrades[upgrade].multiplier * 100)
  }
  addPassiveUpgrade()
  update()
  drawPassiveCards()
}


function addPassiveUpgrade() {
  passiveTotal += passiveUpgrades.rolling.bonus
  passiveTotal += passiveUpgrades.spinAttack.bonus
  passiveTotal += passiveUpgrades.bomb.bonus

  setInterval(totalPassiveUpgrades, 3000);
}

function totalPassiveUpgrades(){
  rupees += passiveTotal
}

// function buyRolling() {
//   let upgrade = passiveUpgrades.rolling
//   if (rupees >= upgrade.price) {
//     upgrade.quantity += 1
//     upgrade.bonus += passiveTotal
//   }
//   addPassiveUpgrade()
//   update()
//   drawPassiveCards()
// }
// function buySpinAttack() {
//   let upgrade = passiveUpgrades.spinAttack
//   if (rupees >= upgrade.price) {
//     upgrade.quantity += 1
//     upgrade.bonus += passiveTotal
//   }
//   addPassiveUpgrade()
//   update()
//   drawPassiveCards()
// }
// function buyBomb() {
//   let upgrade = passiveUpgrades.bomb
//   if (rupees >= upgrade.price) {
//     rupees -= upgrade.price
//     upgrade.quantity += 1
//     upgrade.bonus += 1
//     upgrade.price += (upgrade.multiplier * 300)
//   }
//   addPassiveUpgrade()
//   update()
//   drawPassiveCards()
// }
// 


// #endregion 

drawPassiveCards()
drawStealCards()
setInterval(totalPassiveUpgrades, 3000);