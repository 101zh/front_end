retrieveInfo()
checkInfo()
if (xp>=xpcontainer) {
    level=parseInt(level)
    level=level+1
    alert("You are now Level "+level)
    xp-=xpcontainer
    xpcontainer=parseInt(xpcontainer)
    xpcontainer=xpcontainer/2+xpcontainer
    var statsgain =  Math.floor((Math.random() * 10) + 10);
    statsgain=parseInt(statsgain)
    health+=statsgain
    defense+=statsgain
    strength+=statsgain
    xpcontainer=parseInt(xpcontainer)
    console.log(xpcontainer)
    console.log(xp)
}

if (level==5) {
    
}

document.getElementById("health").innerHTML = health;
document.getElementById("defense").innerHTML = defense;
document.getElementById("strength").innerHTML = strength;
document.getElementById("xp").innerHTML = xp;
document.getElementById("xpcontainer").innerHTML = xpcontainer;
document.getElementById("LVL").innerHTML = level;
setInfo()
