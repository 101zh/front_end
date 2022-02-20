let strength=30
let health=100
let defense=20
let currenthealth=100
let xp=0
let xpcontainer=20
let level=0
let money=25

let damageRNG2=0
let damageRNG1=0
let defenseRNG=0

let monsterstrength=30
let currentmonsterhealth=100
let monsterhealth=100
let monsterdefense=15

// let attackcontainer=0

function setInfo() {
    sessionStorage.setItem("XPBAR", xpcontainer)
    sessionStorage.setItem("LVL", level)
    sessionStorage.setItem("XP", xp)
    sessionStorage.setItem("HP",health)
    sessionStorage.setItem("DEF", defense)
    sessionStorage.setItem("Strength", strength)
    sessionStorage.setItem("MonHP", monsterhealth)
    sessionStorage.setItem("MonDef", monsterdefense)
    sessionStorage.setItem("MonStrength", monsterstrength)
    sessionStorage.setItem("Money", money)
}
function retrieveInfo() {
    xpcontainer=sessionStorage.getItem("XPBAR")
    level=sessionStorage.getItem("LVL")
    xp=sessionStorage.getItem("XP")
    health=sessionStorage.getItem("HP")
    defense=sessionStorage.getItem("DEF")
    strength=sessionStorage.getItem("Strength")
    monsterhealth=sessionStorage.getItem("MonHP")
    monsterdefense=sessionStorage.getItem("MonDef")
    monsterstrength=sessionStorage.getItem("MonStrength")
    money=sessionStorage.getItem("Money")
}
function checkInfo() {
    if (xp==null) {
        strength=30
        health=100
        defense=20
        xp=0
        xpcontainer=20
        level=0
        money=25

        monsterstrength=30
        monsterhealth=100
        monsterdefense=15
    }
    if (monsterhealth==null) {
        strength=30
        health=100
        defense=20
        xp=0
        xpcontainer=20
        level=0
        money=25

        monsterstrength=30
        monsterhealth=100
        monsterdefense=15
    }
    xpcontainer=parseInt(xpcontainer)
    level=parseInt(level)
    xp=parseInt(xp)
    health=parseInt(health)
    defense=parseInt(defense)
    strength=parseInt(strength)
    monsterhealth=parseInt(monsterhealth)
    monsterdefense=parseInt(monsterdefense)
    monsterstrength=parseInt(monsterstrength)
    money=parseInt(money)
    currentmonsterhealth=monsterhealth
    currenthealth=health
}



function damage(input) {
    if (input=="monster") {
        var damageLow=monsterstrength-5
        damageRNG1=monsterstrength-damageLow+5
        damageRNG1=Math.floor((Math.random() * damageRNG1) +damageLow)
        var defenseLow=defense-10
        defenseRNG=defense-defenseLow-5
        defenseRNG=Math.floor((Math.random() * defenseRNG) +defenseLow)
        damageRNG1-=defenseRNG
    }
    else if (input=="slash") {
        var damageLow=strength-5
        damageRNG2=strength-damageLow+5
        damageRNG2=Math.floor((Math.random() * damageRNG2) +damageLow)
        var defenseLow=monsterdefense-10
        defenseRNG=monsterdefense-defenseLow-5
        defenseRNG=Math.floor((Math.random() * defenseRNG) +defenseLow)
        damageRNG2-=defenseRNG
    }
    else {
        alert("Input is incorrect")
    }
    if (damageRNG1<=0) {
        damageRNG1=0
    }
    else if (damageRNG2<=0) {
        damageRNG2=0
    }
}
function check(){
    document.getElementById("currenthealth1").innerHTML = currentmonsterhealth;
    document.getElementById("health1").innerHTML = monsterhealth;
    document.getElementById("currenthealth2").innerHTML = currenthealth;
    document.getElementById("health2").innerHTML = health

    if (currenthealth <= 0) {
      // var loss=Math.floor((Math.random() * 12) + 5);
      var xploss=Math.floor((Math.random() * 0) + 4);
      alert("you have lost "+xploss+" xp points");
      currentmonsterhealth=monsterhealth
      currenthealth=health
      xp-=xploss
      setInfo()
      window.location.replace("RPG.html");
    }
    else if (currentmonsterhealth <= 0) {
      var xpgain =  Math.floor((Math.random() * 15) + 15);
      alert("you gained "+xpgain+" xp");
      xp+=xpgain
      currentmonsterhealth=monsterhealth
      currenthealth=health
      var statsgain =  1
      statsgain=parseInt(statsgain)
      monsterhealth+=statsgain
      monsterdefense+=statsgain
      monsterstrength+=statsgain
      setInfo()
      window.location.replace("RPG.html");
    }
    else {
  
    }
  }
function run() {
    var runawaychance=Math.floor((Math.random() * 100)+0)
    if (runawaychance>=51) {
        damage("monster")
        alert("you failed to get away safely \nwhile you were distracted the monster hit you and dealed "+damageRNG+" damage")
        check()
    }
    else if (runawaychance<=50) {
        var xploss=Math.floor((Math.random() * 5) + 0);
        alert("You got away safely, you lost "+xploss+" xp points");
        xp-=xploss
        setInfo()
        window.location.replace("RPG.html")
    }
  
}


function attack() {
    attackcontainer = document.createElement("div");
    attackcontainer=document.getElementById("attackcontainer");
    var slash = document.createElement('button');
    slash.innerHTML = 'Slash';
    attackcontainer.appendChild(slash);
    slash.onclick= function () {
        damage("slash")
        damage("monster")
        currentmonsterhealth-=damageRNG2
        currenthealth-=damageRNG1
        alert("You swung your sword and dealed "+damageRNG2+" damage\nBut you were caught of guard and the monster dealed "+damageRNG1+" damage")
        check()
    } 
    if (level>=5) {
    var fireBall = document.createElement("button");
    fireBall.innerHTML = "Fire Ball";
    document.body.appendChild(fireBall);
    fireBall.onclick=function () {
        strength+=20
        damage("slash")
        damage("monster")
        currentmonsterhealth-=damageRNG2
        currenthealth-=damageRNG1
        alert("You swung your sword and dealed "+damageRNG2+" damage\nBut you were caught of guard and the monster dealed "+damageRNG1+" damage")
        strength-=20
        check()
    }
    }
    };  
    // damage("player")
    // damage("monster")
    // alert("You swung your sword and dealed "+damageRNG2+" damage\nBut you were caught of guard and the monster dealed "+damageRNG1+" damage")
    // check()
