// #region variables and dictionaries

let rupees = 0
let stealTotal = 0
let passiveTotal = 0
let bonusTotal = 0
let allTotal = 0
let clickCount = 0
let savedGame = []

const stealUpgrades = {
  stickyFingers: {
    name: 'Sticky Fingers',
    price: 20,
    quantity: 0,
    bonus: 0,
    multiplier: 2,
    img: './assets/thief.jpg'
  },
  smashPots: {
    name: 'Smash Pots',
    price: 100,
    quantity: 0,
    bonus: 0,
    multiplier: 3,
    img: './assets/lots-o-pots.jpg'
  },
  masterSword: {
    name: 'Master Sword',
    price: 500,
    quantity: 0,
    bonus: 0,
    multiplier: 4,
    img: './assets/master-sword.png'
  }
};

const passiveUpgrades = {
  rolling: {
    name: 'Rolling',
    price: 60,
    quantity: 0,
    bonus: 0,
    multiplier: 5,
    img: './assets/rolling.png'
  },
  spinAttack: {
    name: 'Spin Attack',
    price: 300,
    quantity: 0,
    bonus: 0,
    multiplier: 6,
    img: './assets/spin-attack.gif'
  },
  bomb: {
    name: 'Bomb',
    price:  1500,
    quantity: 0,
    bonus: 0,
    multiplier: 7,
    img: './assets/bomb.webp'
  }
};

const allBadges = {
  blue: {
    img: './assets/gray.png',
    badgeimg: './assets/blue.webp',
    title: "Purchase 5 Sticky Finger upgrades",
  },
  green: {
    img: './assets/gray.png',
    badgeimg: './assets/green.webp',
    title: "Purchase 5 Rolling upgrades",
  },
  orange: {
    img: './assets/gray.png',
    badgeimg: './assets/orange.webp',
    title: "Click 500 times"
  },
  purple: {
    img: './assets/gray.png',
    badgeimg: './assets/purpble.webp',
    title: "Purchase a Master Sword upgrade"
  },
  red: {
    img: './assets/gray.png',
    badgeimg: './assets/red.webp',
    title: "Purchase a Bomb upgrade"
  },
  silver: {
    img: './assets/gray.png',
    badgeimg: './assets/silver.png',
    title: "Collect 1,000,000 Rupees"
  }
}

// #endregion

// #region templates

function toast(title, display) {
  let timerInterval
// @ts-ignore
Swal.fire({
  title: title,
  html: display,
  timer: 2000,
  timerProgressBar: true,
  target: document.getElementById('alert'),
  didOpen: () => {
    // @ts-ignore
    Swal.showLoading()
    // @ts-ignore
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      // @ts-ignore
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  // @ts-ignore
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}

function bigToast(title) {
  // @ts-ignore
  Swal.fire({
    title: title,
    text: 'You have collect 1,000,000 rupees!!',
    imageUrl: 'https://unsphttps://i.makeagif.com/media/6-09-2015/ytZUe1.giflash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Make it Rain',
  })
}

function drawStealCards() {
  let template = ''
  for (let upgrades in stealUpgrades) {
      let upgrade = stealUpgrades[upgrades]
      template += `
      <div id="${upgrade.name}" style="background-image: url('${upgrade.img}')" class="col upgrade-tile select bg-image" onclick="buyStealUpgrade('${upgrades}')">
        <div class="d-flex flex-column">
          <p><span class="upgrade-bg">${upgrade.name}:</span><span class="upgrade-bg">${upgrade.quantity}</span></p>
          <p><span class="upgrade-bg">Cost: </span><span class="upgrade-bg">${upgrade.price}</span</p>
        </div>
      </div>`
    }
    document.getElementById('steals').innerHTML = template
  }

function drawPassiveCards() {
  let template = ''
  for (let upgrades in passiveUpgrades) {
      let upgrade = passiveUpgrades[upgrades];
      template += `
      <div id="${upgrade.name}" style="background-image: url('${upgrade.img}')" class="col-3 upgrade-tile select bg-image py-1" onclick="buyPassiveUpgrade('${upgrades}')">
        <div class="d-flex flex-column">
          <p><span class="upgrade-bg">${upgrade.name}:</span><span class="upgrade-bg">${upgrade.quantity}</span></p>
          <p><span class="upgrade-bg">Cost: </span><span class="upgrade-bg">${upgrade.price}</span</p>
        </div>
      </div>`
  }
  document.getElementById('passives').innerHTML = template
}

function drawStealBonus(){
  let template = ''
  for (let totals in stealUpgrades) {
      let total = stealUpgrades[totals];
      template += `<div class="d-flex justify-content-between"><p>${total.name} </p><p>${total.bonus}</p></div>`
  }
  document.getElementById('s-bonus').innerHTML  = template
}

function drawPassiveBonus() {
  let template = ''
  for (let totals in passiveUpgrades) {
      let total = passiveUpgrades[totals];
      template += `<div class="d-flex justify-content-between"><p>${total.name} </p><p>${total.bonus}</p></div>`
  }
  document.getElementById('p-bonus').innerHTML = template
}

function drawBadge() {
  let template = ''
  for (const badges in allBadges) {
      const badge = allBadges[badges];
      template +=`
        <div>
          <img class="object-fit px-2" src=${badge.img} alt="" title="${badge.title}">
        </div>`
    }
    document.getElementById('badges').innerHTML = template
}

function drawBadgeWin(){
  if (stealUpgrades.stickyFingers.quantity == 5 && allBadges.blue.img != allBadges.blue.badgeimg){
    allBadges.blue.img = allBadges.blue.badgeimg
    toast('Blue Badge', 'You have purchased 5 Sticky Fingers upgrades!')
  }
  if (passiveUpgrades.rolling.quantity == 5 && allBadges.green.img != allBadges.green.badgeimg) {
    allBadges.green.img = allBadges.green.badgeimg
    toast('Green Badge', 'You have purchased 5 Rolling upgrades!')
  }
  if (clickCount >= 500 && allBadges.orange.img != allBadges.orange.badgeimg){
    allBadges.orange.img = allBadges.orange.badgeimg
    toast('Orange Badge', 'You have stolen from the pot 500 times!')
  }
  if (stealUpgrades.masterSword.quantity == 1 && allBadges.purple.img != allBadges.purple.badgeimg) {
    allBadges.purple.img = allBadges.purple.badgeimg
    toast('Purple Badge', 'You have purchased the Master Sword upgrade!')
  }
  if (passiveUpgrades.bomb.quantity == 1 && allBadges.red.img != allBadges.red.badgeimg) {
    allBadges.red.img = allBadges.red.badgeimg
    toast('Red Badge', 'You have purchased the Bomb upgrade!')
  }
  if (rupees >= 1000000 && allBadges.silver.img != allBadges.silver.badgeimg) {
    allBadges.silver.img = allBadges.silver.badgeimg
    bigToast('Silver Badge')
  }
  drawBadge()
}

function hideStealUpgrades() {
  for (let hidden in stealUpgrades) {
      let hide = stealUpgrades[hidden].name;
      if (stealUpgrades[hidden].price >= (rupees + 1)  && stealUpgrades[hidden].quantity == 0  ) {
      document.getElementById(hide).style.display = "none"
      } else {
        document.getElementById(hide).style.display = "flex"
      }
  }
}

function hidePassiveUpgrades() {
  for (let hidden in passiveUpgrades) {
    let hide = passiveUpgrades[hidden].name;
    if (passiveUpgrades[hidden].price >= (rupees + 1)  && passiveUpgrades[hidden].quantity == 0  ) {
    document.getElementById(hide).style.display = "none"
    } else {
      document.getElementById(hide).style.display = "flex"
    }
}
}



// #endregion

// #region clickables


function steal() {
  rupees += (1 + stealTotal)
  allTotal ++
  clickCount ++
  update()
  hideStealUpgrades()
  hidePassiveUpgrades()
  drawStealBonus()
  drawPassiveBonus()
  addTotals()
  drawBadgeWin()
}

function buyStealUpgrade(upgrade) {
  if (rupees >= stealUpgrades[upgrade].price) {
    rupees -= stealUpgrades[upgrade].price
    stealUpgrades[upgrade].quantity++
    stealUpgrades[upgrade].bonus++
    stealUpgrades[upgrade].bonus *= stealUpgrades[upgrade].multiplier
    stealUpgrades[upgrade].price += (stealUpgrades[upgrade].multiplier * 20)
    addAllSteals(upgrade)
    update()
    drawStealCards()
    hideStealUpgrades()
    hidePassiveUpgrades()
    drawStealBonus()
    drawBadgeWin()
  } else {
    toast('Bummer','You do not have enough for this purchase.')
    }
}

function addAllSteals(total) { 
  let upgrade = stealUpgrades[total]
  stealTotal += upgrade.bonus
}

function addTotals() {
  bonusTotal += stealTotal
  bonusTotal += passiveTotal
  allTotal += stealTotal
  allTotal += passiveTotal
}

function update() {
  document.getElementById('count').innerText = JSON.stringify(rupees)
  document.getElementById('b-total').innerText = JSON.stringify(bonusTotal)
  document.getElementById('s-total').innerText = JSON.stringify(stealTotal)
  document.getElementById('p-total').innerText = JSON.stringify(passiveTotal)
  document.getElementById('all-total').innerText = JSON.stringify(allTotal)
}

// #endregion

// #region passives

function buyPassiveUpgrade(upgrade) {
  if (rupees >= passiveUpgrades[upgrade].price) {
    rupees -= passiveUpgrades[upgrade].price
    passiveUpgrades[upgrade].quantity++
    passiveUpgrades[upgrade].bonus++
    passiveUpgrades[upgrade].bonus *= passiveUpgrades[upgrade].multiplier
    passiveUpgrades[upgrade].price += (passiveUpgrades[upgrade].multiplier * 20)
  } else {
    toast('Bummer','You do not have enough for this purchase.')
  }
  addPassiveUpgrade(upgrade)
  update()
  drawPassiveCards()
  hidePassiveUpgrades()
  drawPassiveBonus()
  drawBadgeWin()
}


function addPassiveUpgrade(total) {
  let upgrade = passiveUpgrades[total]
  passiveTotal += upgrade.bonus

  setInterval(totalPassiveUpgrades, 3000);
}

function totalPassiveUpgrades(){
  rupees += passiveTotal
  update()
}

// #endregion 

// #region loadgame
function saveGame() {
  window.localStorage.setItem("Rupee Thief", JSON.stringify(savedGame))
}

function loadGame() {
  let storedGame = JSON.parse(window.localStorage.getItem("Rupee Thief"))
  if (storedGame) {
    savedGame = storedGame
  }
}

//#endregion

// #region draws

drawBadgeWin()
drawPassiveBonus()
drawStealBonus()
drawPassiveCards()
drawStealCards()
hideStealUpgrades()
hidePassiveUpgrades()
drawBadge()

// #endregion

setInterval(update, 1000);