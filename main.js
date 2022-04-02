// #region variables and dictionaries

let rupees = 0
let stealTotal = 0
let passiveTotal = 0

let stealUpgrades = {
  stickyFingers: {
    name: 'Sticky Fingers',
    price: 10,
    quantity: 0,
    bonus: 1,
    multiplier: 1,
    img: './assets/thief.jpg'
  },
  smashPots: {
    name: 'Smash Pots',
    price: 500,
    quantity: 0,
    bonus: 1,
    multiplier: 3,
    img: './assets/lots-o-pots.jpg'
  },
  masterSword: {
    name: 'Master Sword',
    price: 5000,
    quantity: 0,
    bonus: 5,
    multiplier: 50,
    img: './assets/master-sword.png'
  }
};

let passiveUpgrades = {
  rolling: {
    name: 'Rolling',
    price: 300,
    quantity: 0,
    bonus: 1,
    multiplier: 5,
    img: './assets/rolling.png'
  },
  spinAttack: {
    name: 'Spin Attack',
    price: 600,
    quantity: 0,
    bonus: 1,
    multiplier: 20,
    img: './assets/spin-attack.gif'
  },
  bomb: {
    name: 'Bomb',
    price: 1000,
    quantity: 0,
    bonus: 1,
    multiplier: 20,
    img: './assets/bomb.webp'
  }
};

// #endregion

// #region templates

function drawStealCards() {
  debugger
  let template = ''
  for (let key in stealUpgrades) {
      let upgrade = stealUpgrades[key]
      template += `
      <div id="${upgrade}" style="background-image: url('${upgrade.img}')" class="col upgrade-tile align-items-center d-flex justify-content-between flex-column select bg-image m-3" onclick="buyStealUpgrade(${upgrade})">
        <div class="w-100 d-flex justify-content-between p-2">
          <h4 class="upgrade-bg">Current Bonus: ${upgrade.bonus}</h4>
          <h4 class="upgrade-bg">Cost: ${upgrade.price}</h4> 
        </div>
        <div class="text-center">
          <h4 class="upgrade-bg">${upgrade.name}: ${upgrade.quantity}</h4>
        </div>
      </div>`
      console.log(stealUpgrades[key]);
    }
    document.getElementById('steals').innerHTML = template
  }

function drawPassiveCards() {
  let template = ''
  for (let upgrades in passiveUpgrades) {
      let upgrade = passiveUpgrades[upgrades];
      template += `
      <div style="background-image: url('${upgrade.img}')" class="col upgrade-tile align-items-center d-flex justify-content-between flex-column select bg-image m-3">
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
  rupees += 1
  rupees += stealTotal
  update()
}

function buyStealUpgrade(key) {
  debugger
  console.log("key", key);
  if (rupees >= stealUpgrades[key].price) {
    rupees -= stealUpgrades[key].price
    stealUpgrades[key].quantity += 1
    stealTotal += stealUpgrades[key].bonus
    stealUpgrades[key].quantity += 1
    stealUpgrades[key].multiplier += 1
    stealUpgrades[key].price += (stealUpgrades[key].multiplier * 100)
    stealUpgrades[key].bonus *= stealUpgrades[key].multiplier
  }

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



function update() {
  document.getElementById('count').innerText = JSON.stringify(rupees)
}
// #endregion

// #region passives

// function buyRolling() {
//   let upgrade = passiveUpgrades.rolling
//   if (rupees >= upgrade.price) {
//     upgrade.quantity += 1
//     upgrade.bonus += passiveTotal
//   }
//   addUpgrade(upgrade)
//   update()
// }
// function buySpinAttack() {
//   let upgrade = passiveUpgrades.spinAttack
//   if (rupees >= upgrade.price) {
//     upgrade.quantity += 1
//     upgrade.bonus += passiveTotal
//   }
//   addUpgrade(upgrade)
//   update()
// }

function totalPassiveUpgrades(){
  passiveTotal += rupees

}




let passiveU = {
  rolling: {
    price: 250,
    quantity: 0,
    bonus: 1,
    multiplier: 5
  },
  spinAttack: {
    price: 1000,
    quantity: 0,
    bonus: 1,
    multiplier: 20
  }
};


// #endregion 


drawPassiveCards()
drawStealCards()
setInterval(totalPassiveUpgrades, 3000);