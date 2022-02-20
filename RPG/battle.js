retrieveInfo()
checkInfo()
check()
function attackmenu() {
    console.log("triggered")
    if (attackcontainer.hasChildNodes()) {
        while (attackcontainer.firstChild) {
            attackcontainer.removeChild(attackcontainer.firstChild);
            console.log("bruh")
        }
    } else {
        attack();
        console.log("lol")
    }
};