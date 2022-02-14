let rogue = {
  strength: 10,
  constitution: 10,
  dexterity: 15,
  weaponsMaster: "e",
  melee: "e",
  marksman: "e",
  athletics: "e",
  defense: "e",
};

let attacker = {
  health: 70,
  shielding:70,
  damage:35,
  actionPoints:12,
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
  let row = `<h4>${rogueShielding()}</h4><h4>${rogueHealth()}</h4>`;
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
        //console.log(f + " - " + e);
        melee(f);
        marksman(f)
      }
    });
  });
});

function melee(f) {
  if (f == "melee") {
    let clkulus =
      rogue.strength * skils[rogue.melee] + skils[rogue.weaponsMaster];
    attacker.shielding -= clkulus;
    if (attacker.shielding <= 0) {
        attacker.health -= clkulus;
        if (attacker.health <=0){
            attackerCl.innerHTML = `<h4>DEAD</h4>`;
        }else{
            attackerCl.innerHTML = `<h4>0</h4><h4>${attacker.health}</h4>`;
        }
      
    } else {
      attackerCl.innerHTML = `<h4>${attacker.shielding }</h4><h4>${attacker.health}</h4>`;
    }
  }
}

function marksman(f) {
    if (f == "marksman") {
      let clkulus =
        rogue.dexterity + (attacker.shielding/(attacker.shielding /skils[rogue.marksman])) + skils[rogue.weaponsMaster];
      attacker.health -= clkulus;
      if (attacker.health <= 0) {
        attackerCl.innerHTML = `<h4>DEAD</h4>`;
      } else {
        attackerCl.innerHTML = `<h4>${attacker.shielding}</h4><h4>${attacker.health}</h4>`;
      }
    }
  }

function rogueHealth(){
    let hl = rogue.constitution*skils[rogue.defense]*skils[rogue.defense];
    return (hl)
}

function rogueShielding (){
    let sl = rogue.dexterity*skils[rogue.athletics]*skils[rogue.athletics];
    return (sl)
}