function home(){ //user homepage, personal profile page, account summary, logged in
    window.location = 'account.html'
}
function land(){ //website homepage, the landing page, logged out
    window.location = 'home.html'
}

function loadProfile(){
    document.getElementById("username").innerHTML = "Full Name"
    addAcc('Example Account', 3216549876543215, 5433.21)//sample account
    addAcc('Example Account 2', 1234567891011121, 10288.51)//sample account
    addAcc('Example Account 3', 1234567891154645, 108.51)//sample account
}

function load(panel){
    hide("all")
    function show(){document.getElementById(panel).setAttribute("style","visibility: visible")}
    switch(panel){
        case "newAcc":
            show()

            break

        case "userSetting":
            show()

            break

        case "support":
            show()

            break

        default:
            let selected = getSelected()
            if(!selected) alert("Please select an account")
            else {
                show()
                switch(panel){
                    case "tPanel":

                        addTransaction("Account 1","Account 2",24.35)//sample transaction
                        break
        
                    case "transferPanel":
                        document.getElementById("donor").innerHTML = selected.id
                        break
        
                    case  "depositPanel":

                        break
        
                    case "settingPanel":

                        break
                }
            }
    }
}

function addAcc(accName, accNumber, accValue){
    let numStr = parseInt(accNumber).toString()
    let last4 = "..." + numStr.substring(numStr.length - 4)
    let accVal = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(accValue)
    // above line referenced from Mozilla Developer Network Web Docs url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
    let accBtn = document.createElement("tr")
    accBtn.setAttribute("class","button")
    accBtn.setAttribute("onclick","select(this)")
    let a = document.createElement("td")
    a.setAttribute("class","acc")
    a.innerHTML = accName
    let b = document.createElement("td")
    b.setAttribute("class","gray")
    b.innerHTML = last4
    let c = document.createElement("td")
    c.setAttribute("class","money")
    c.innerHTML = accVal
    accBtn.appendChild(a)
    accBtn.appendChild(b)
    accBtn.appendChild(c)
    document.getElementById("accounts").appendChild(accBtn)
}

function addTransaction(from, to, tValue){
    let value = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tValue)
    let trans = document.createElement("tr")
    let a = document.createElement("td")
    a.setAttribute("class","acc")
    a.innerHTML = from
    let b = document.createElement("td")
    b.setAttribute("class","acc")
    b.innerHTML = to
    let c = document.createElement("td")
    c.setAttribute("class","money")
    c.innerHTML = value
    trans.appendChild(a)
    trans.appendChild(b)
    trans.appendChild(c)
    document.getElementById("transactions").appendChild(trans)
}

function hide(panel){
    if(panel === "all") {
        Array.from(document.getElementsByClassName("secondaryPanel")).forEach(e => e.setAttribute("style","visibility: collapse"))
    }
    else document.getElementById(panel).setAttribute("style","visibility: collapse")
}

function getSelected(){
    return document.getElementById("selected")
}

function select(elem){
    hide("all")
    let old = document.getElementById("selected")
    if(old) old.removeAttribute("id")
    elem.setAttribute("id","selected")
}

function login(userID, pass){

}

function authenticate() {
    return window.prompt("Please enter your password")
}
