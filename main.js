// #region variables and dictionaries

let rupees = 0
let stealTotal = 0
let passiveTotal = 0

let stealUpgrades = {
  stickyFingers: {
    name: 'Sticky Fingers',
    price: 100,
    quantity: 0,
    bonus: 1,
    multiplier: 1,
    img: './assets/thief.webp'
  },
  smashPots: {
    name: 'Smash Pots',
    price: 500,
    quantity: 0,
    bonus: 1,
    multiplier: 3,
    img: './assets/lots-o-pots.jpg'
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
    img: './assets/spin-attack.webp'
  }
};

// #endregion

// #region templates

function drawStealCards() {
  let template = ''
  for (let upgrades in stealUpgrades) {
      let upgrade = stealUpgrades[upgrades];
      template += `
      <div style="background-image: url('${upgrade.img}')" class="col align-items-center d-flex justify-content-between text-light select bg-image m-3 rounded shadow onclick="buyStealUpgrade('${upgrade}')"">
        <h4>${upgrade.name}: ${upgrade.quantity}</h4>
        <h4>Cost: ${upgrade.price}</h4>
      </div>`
    }
    document.getElementById('steals').innerHTML = template
  }

function drawPassiveCards() {
  let template = ''
  for (let upgrades in passiveUpgrades) {
      let upgrade = passiveUpgrades[upgrades];
      template += `
      <div style="background-image: url('${upgrade.img}')" class="col d-flex justify-content-between align-items-center text-light select bg-image">
        <h4>${upgrade.name}: ${upgrade.quantity}</h4>
        <h4>Cost: ${upgrade.price}</h4>
      </div>
      `

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

function buyStealUpgrade(buy) {
  let upgrade = stealUpgrades[buy]
  if (rupees >= upgrade.price) {
    rupees -= upgrade.price
    upgrade.quantity += 1
    stealTotal += upgrade.bonus
  }

}

function buyStickyFingers() {
  let upgrade = stealUpgrades.stickyFingers
  if (rupees >= upgrade.price) {
    rupees -= upgrade.price
    upgrade.quantity += 1
    stealTotal += upgrade.bonus
  }
  addUpgrade(upgrade)
  update()
}

function buySmashPots() {
  let upgrade = stealUpgrades.smashPots
  if (rupees >= upgrade.price) {
    rupees -= upgrade.price
    upgrade.quantity += 1
    stealTotal += upgrade.bonus
  }
  addUpgrade(upgrade)
  update()
}

function addUpgrade(upgrade) {
  upgrade.quantity += 1
  upgrade.multiplier += 1
  upgrade.price += (upgrade.multiplier * 100)
  upgrade.bonus *= upgrade.multiplier
}


function update() {
  document.getElementById('count').innerText = JSON.stringify(rupees)
  document.getElementById('sticky').innerText = JSON.stringify(stealUpgrades.stickyFingers.price)
  document.getElementById('sticky').innerText = JSON.stringify(stealUpgrades.stickyFingers.quantity)
  document.getElementById('rolling').innerText = JSON.stringify(passiveUpgrades.rolling.price)
  document.getElementById('rolling').innerText = JSON.stringify(passiveUpgrades.rolling.quantity)
}
// #endregion

// #region passives

function buyRolling() {
  let upgrade = passiveUpgrades.rolling
  if (rupees >= upgrade.price) {
    upgrade.quantity += 1
    upgrade.bonus += passiveTotal
  }
  addUpgrade(upgrade)
  update()
}
function buySpinAttack() {
  let upgrade = passiveUpgrades.spinAttack
  if (rupees >= upgrade.price) {
    upgrade.quantity += 1
    upgrade.bonus += passiveTotal
  }
  addUpgrade(upgrade)
  update()
}

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