let rogue = {
  strength: 10,
  constitution: 10,
  dexterity: 10,
  weaponsMaster: "f",
  melee: "e",
  marksman: "s",
  athletics: "d",
  defense: "c",
};

let attacker = {
  health: 100,
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

function skilsIterator() {
  const rows = skilRows();
  let row = "";
  rows.forEach((e, f) => {
    row += `<button class="btn">${f}</button>`;
    //console.log(e + f);
  });
  return row;
}

function skilRows() {
  return new Map([
    ["weaponsMaster", rogue.weaponsMaster],
    ["melee", rogue.melee],
    ["marksman", rogue.marksman],
    ["athletics", rogue.athletics],
    ["defense", rogue.defense],
  ]);
}

rogueCl.innerHTML = skilsIterator();
const buttons = document.querySelectorAll(".btn");
console.log(buttons);
buttons.forEach((btn) => {
  //console.log(btn.textContent);
  btn.addEventListener("click", () => {
    const rows = skilRows();
    rows.forEach((e, f) => {
      if (f == btn.textContent) {
        console.log(f + " - " + e);
        melee(f);
      }
    });
  });
});

function melee(f) {
  if (f == "melee") {
    let clkulus =
      rogue.strength * skils[rogue.melee] + skils[rogue.weaponsMaster] * 3;
    attacker.health -= clkulus;
    if (attacker.health <= 0) {
      attackerCl.innerHTML = `<h4>DEAD</h4>`;
    } else {
      attackerCl.innerHTML = `<h4>${attacker.health}</h4>`;
    }
  }
}
