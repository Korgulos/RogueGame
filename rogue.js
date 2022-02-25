//variabile and constant
let rogue = {
  strength: 11,
  constitution: 12,
  dexterity: 10,
  weaponsMaster: "f",
  melee: "e",
  marksman: "f",
  athletics: "f",
  defense: "e",
};
let attacker = {
  health: 70,
  shielding: 70,
  damage: 35,
  actionPoints: 12,
};
const skils = {
  f: 1.2,
  e: 1.4,
  d: 1.6,
  c: 1.8,
  d: 2,
  a: 2.2,
  s: 2.4,
  ss: 2.6,
  sss: 2.8,
};
const rogueCl = document.querySelector(".rogue");
const attackerCl = document.querySelector(".attacker");

let healthNow = rogueHealth();
let shieldingNow = rogueShielding();

//skil iterator for html
function skilRows() {
  return new Map([
    ["weaponsMaster", rogue.weaponsMaster],
    ["melee", rogue.melee],
    ["marksman", rogue.marksman],
    ["athletics", rogue.athletics],
    ["defense", rogue.defense],
  ]);
}
//load buttons on rogue div
function skilsIterator() {
  const rows = skilRows();
  let row = `<h4 id="rogue-shielding">Shild: ${shieldingNow}</h4>
  <h4 id="rogue-health" style="background-color: rgba(212, 16, 16, 0.5);">Health: ${healthNow}</h4>`;
  rows.forEach((e, f) => {
    row += `<button class="btn">${f}</button>`;
    //console.log(e + f);
  });
  return row;
}
//for checking defense subtracks rogue health
function weaponsMaster(f) {
  if (f == "weaponsMaster") {
    const bang = 20;
    healthNow -= bang;
    shieldingNow -= bang;
    const rogueHealthHtml = document.getElementById("rogue-health");
    rogueHealthHtml.innerHTML = `Health: ${healthNow}`;
    const rogueShieldingHtml = document.getElementById("rogue-shielding");
    rogueShieldingHtml.innerHTML = `Shild: ${shieldingNow}`;
  }
}
//button function for melee
function melee(f) {
  if (f == "melee") {
    let clkulus =
      rogue.strength * skils[rogue.melee] * skils[rogue.weaponsMaster];
    attacker.shielding -= clkulus;
    //console.log(clkulus);
    if (attacker.health <= 0) {
      attackerCl.innerHTML = `<h4>DEAD</h4>`;
      attacker.shielding = 0;
    }
    if (attacker.shielding <= 0) {
      attacker.health -= clkulus;
      if (attacker.health <= 0) {
        attacker.health = 0;
        attackerCl.innerHTML = `<h4>DEAD</h4>`;
      } else {
        attackerCl.innerHTML = `<h4>Shild: 0</h4><h4 style="background-color: rgba(212, 16, 16, 0.5);">Health: ${attacker.health}</h4>`;
      }
    } else {
      attackerCl.innerHTML = `<h4>Shild: ${attacker.shielding}</h4><h4 style="background-color: rgba(212, 16, 16, 0.5);">Health: ${attacker.health}</h4>`;
    }
  }
}
//button function for marksman
function marksman(f) {
  if (f == "marksman") {
    let clkulus =
      (rogue.dexterity * skils[rogue.marksman] * skils[rogue.weaponsMaster]) /
      2;
    //console.log(clkulus);
    attacker.health -= clkulus;
    if (attacker.shielding < 0) {
      attacker.shielding = 0;
    }
    if (attacker.health <= 0) {
      attacker.health = 0;
      attackerCl.innerHTML = `<h4>DEAD</h4>`;
    } else {
      attackerCl.innerHTML = `<h4>Shild: ${attacker.shielding}</h4><h4 style="background-color: rgba(212, 16, 16, 0.5);">Health: ${attacker.health}</h4>`;
    }
  }
}
//restore health on rogue
function defense(f) {
  if (f == "defense") {
    const rogueHealthHtml = document.getElementById("rogue-health");
    console.log(f);
    let clkulus =
      ((rogue.strength * rogue.constitution * skils[rogue.defense]) / 10) *
      skils[rogue.defense];

    if (healthNow < rogueHealth()) {
      if (clkulus + healthNow >= rogueHealth()) {
        healthNow = rogueHealth();
      } else {
        healthNow += clkulus;
      }
    }
    rogueHealthHtml.innerHTML = `Health: ${healthNow}`;
  }
}

function athletics(f) {
  if (f == "athletics") {
    const rogueshieldingHtml = document.getElementById("rogue-shielding");
    console.log(f);
    let clkulus =
      ((rogue.dexterity * rogue.constitution * skils[rogue.athletics]) / 10) *
      skils[rogue.athletics];

    if (shieldingNow < rogueShielding()) {
      if (clkulus + shieldingNow >= rogueShielding()) {
        shieldingNow = rogueShielding();
      } else {
        shieldingNow += clkulus;
      }
    }
    rogueshieldingHtml.innerHTML = `Shild: ${shieldingNow}`;
  }
}
//seat rogue health in div
function rogueHealth() {
  let hl = rogue.constitution * rogue.strength * skils[rogue.defense];
  return hl;
}
//seat rogue shielding in div
function rogueShielding() {
  let sl = rogue.dexterity * rogue.constitution * skils[rogue.athletics];
  return sl;
}

//starting game stats

attackerCl.innerHTML = `<h4>Shild: ${attacker.shielding}</h4><h4 style="background-color: rgba(212, 16, 16, 0.5);">Health: ${attacker.health}</h4>`;
rogueCl.innerHTML = skilsIterator();
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  //console.log(btn.textContent);
  btn.addEventListener("click", () => {
    const rows = skilRows();
    rows.forEach((e, f) => {
      if (f == btn.textContent) {
        //console.log(attacker.health);
        melee(f);
        marksman(f);
        defense(f);
        athletics(f);
        weaponsMaster(f);
      }
    });
  });
});
