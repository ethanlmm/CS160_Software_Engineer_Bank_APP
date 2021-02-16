let API_server = "http://localhost:5001/"

var cash = 0

function withdrawAmount(amount) {
    if (amount === undefined) {
        cash = document.getElementById("atm-withdrawAmount").value
    } else { cash = amount }

    doAction("Withdraw")
}

function atmStart() {
    sessionStorage.userID = document.getElementById("atm-login-userID").value
    sessionStorage.password = authenticate()
    req("Login",
        (data) => {
            data.append("User ID", sessionStorage.userID)
            data.append("Password", sessionStorage.password)
        },
        (raw) => {
            console.log(raw)
            let result = JSON.parse(raw)
            if (result["Login Successful"] == true) {
                console.log("successful login. user: " + sessionStorage.userID)
                atmSwitch("Deposit")
                sessionStorage.accountID = document.getElementById("atm-accountID").value
                    //TODO show account value
            } else {
                alert("Incorrect User ID or Password")
            }
        }
    )
}

function atmStop() {
    cash = 0
    sessionStorage.clear()
    atmSwitch("Logout")
}

function atmSwitch(mode) {
    switch (mode) {
        case "Deposit":
            document.getElementById("atm-balance").setAttribute("style", "visibility:visible")
            document.getElementById("atm-deposit").setAttribute("style", "visibility:visible")
            document.getElementById("atm-withdraw").setAttribute("style", "visibility:collapse")
            break
        case "Withdraw":
            document.getElementById("atm-balance").setAttribute("style", "visibility:visible")
            document.getElementById("atm-deposit").setAttribute("style", "visibility:collapse")
            document.getElementById("atm-withdraw").setAttribute("style", "visibility:visible")
            break
        default:
            Array.from(document.getElementsByClassName("atm-main")).forEach(e => e.setAttribute("style", "visibility:collapse")) //hides the atm pages when log out
    }
}

function atmFund(amount) {
    cash += amount
    document.getElementById("atm-cash").innerHTML = "$ " + cash
}

function changePage(page) {
    switch (page) {
        case "home": //user homepage, personal profile page, account summary, logged in
        case "account":
        case "profile":
        case "login":
            window.location = 'account.html'
            loadProfile()
            break
        case "map":
            window.location = 'map.html'
            break
        case "official chase":
            window.location = 'https://locator.chase.com/search'
        default: //website homepage, the landing page, logged out
            sessionStorage.clear()
            window.location = 'index.html#'
    }
}

function loadProfile() {
    doAction("UserInfo")
    doAction("UserAccountSummary")
    document.getElementById("username").innerHTML = sessionStorage.firstName + " " + sessionStorage.lastName
}
// loads secondary account and user panels
// param: string panel name
function load(panel) {
    hide("all")

    function show() { document.getElementById(panel).setAttribute("style", "visibility: visible") }
    switch (panel) {
        case "newAcc":
            show()
            break
        case "userSetting":
            document.getElementById("fill-firstName").innerHTML = sessionStorage.firstName
            document.getElementById("fill-lastName").innerHTML = sessionStorage.lastName
            document.getElementById("fill-userID").innerHTML = sessionStorage.userID
            document.getElementById("fill-address").innerHTML = sessionStorage.address
            show()
            break
        case "support":
            show()
            break
        default:
            if (!document.getElementById("selected")) alert("Please select an account")
            else {
                show()
                switch (panel) {
                    case "transactionPanel":
                        Array.from(document.getElementsByClassName("aTrans")).forEach(t => t.remove())
                        doAction("AccountTransactionHistory")
                        break
                    case "transferPanel":
                        document.getElementById("donor").innerHTML = sessionStorage.accountID
                        break
                    case "depositPanel":

                        break
                    case "accountSetting":
                        let account = JSON.parse(sessionStorage["A" + sessionStorage.accountID])
                        document.getElementById("fill-accName").innerHTML = account["Account Name"]

                        document.getElementById("fill-accType").innerHTML = account["Account Type"]
                        document.getElementById("fill-accNum").innerHTML = sessionStorage.accountID
                        break
                }
            }
    }
}

function addAcc(accName, accNumber, accValue) {
    //let numStr = parseInt(accNumber).toString()
    //let last4 = "..." + numStr.substring(numStr.length - 4)
    let accVal = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(accValue)
        // above line referenced from Mozilla Developer Network Web Docs url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
    let accBtn = document.createElement("tr")
    accBtn.setAttribute("class", "button")
    accBtn.setAttribute("onclick", "select(this)")
    let a = document.createElement("td")
    a.setAttribute("class", "acc")
    a.setAttribute("id", accNumber)
    a.innerHTML = accName
    let b = document.createElement("td")
    b.setAttribute("class", "gray")
    b.innerHTML = accNumber
    let c = document.createElement("td")
    c.setAttribute("class", "money")
    c.innerHTML = accVal
    accBtn.appendChild(a)
    accBtn.appendChild(b)
    accBtn.appendChild(c)
    document.getElementById("accounts").appendChild(accBtn)
}

function addTransaction(type, amount, time, other, status) {
    //let value = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    let trans = document.createElement("tr")
    trans.setAttribute("class", "aTrans")
    let a = document.createElement("td")
    a.setAttribute("class", "acc")
    a.innerHTML = type
    let b = document.createElement("td")
    b.setAttribute("class", "money")
    b.innerHTML = amount
    let c = document.createElement("td")
    c.setAttribute("class", "acc")
    c.innerHTML = time
    let d = document.createElement("td")
    d.setAttribute("class", "gray")
    switch (type) {
        case "Incoming Transfer":
            d.innerHTML = "from " + other
            break
        case "Outgoing Transfer":
            d.innerHTML = "to " + other
            break
        default:
            d.innerHTML = other
    }
    let e = document.createElement("td")
    e.setAttribute("class", "acc")
    e.innerHTML = status
    trans.appendChild(a)
    trans.appendChild(b)
    trans.appendChild(c)
    trans.appendChild(d)
    trans.appendChild(e)
    document.getElementById("transactions").appendChild(trans)
}

function hide(panel) {
    if (panel === "all") {
        Array.from(document.getElementsByClassName("secondaryPanel")).forEach(e => e.setAttribute("style", "visibility: collapse"))
    } else document.getElementById(panel).setAttribute("style", "visibility: collapse")
}

// selects an account for use with secondary account panels
// param: element tr with class=button
function select(acc) {
    hide("all")
    let old = document.getElementById("selected")
    if (old) old.removeAttribute("id")
    acc.setAttribute("id", "selected")
    sessionStorage.accountID = acc.children[0].id
}

function doAction(act) {
    switch (act) {
        case "RegisterUser":
            let firstName = document.getElementById("form-first").value
            let lastName = document.getElementById("form-last").value
            let password = document.getElementById("form-pass").value
            let address = document.getElementById("form-addr").value
            req(act, //act should not have space because it is a url.
                (data) => {
                    data.append("First Name", firstName)
                    data.append("Last Name", lastName)
                    data.append("Password", password)
                    data.append("Address", address)
                },
                (raw) => {
                    console.log(raw)
                    let result = JSON.parse(raw)
                    if (result["Error"] == false) {
                        let userID = result["User ID"]
                        alert("Your User ID is " + userID + "\nYou will need it to Log In next time. Do not forget it.")
                        sessionStorage.userID = userID
                        sessionStorage.password = password
                        document.getElementById("login-user").value = userID
                        document.getElementById("login-pass").value = password
                            //doAction("Login")
                    }
                }
            )
            break
        case "Login":
            sessionStorage.clear()
            attemptUser = document.getElementById("login-user").value
            attemptPass = document.getElementById("login-pass").value
            req(act,
                (data) => {
                    data.append("User ID", attemptUser)
                    data.append("Password", attemptPass)
                },
                (raw) => {
                    console.log(raw) //here again
                    let result = JSON.parse(raw)

                    if (result["Login Successful"] == true) {

                        sessionStorage.userID = attemptUser
                        sessionStorage.password = attemptPass
                        changePage("home")

                    } else {
                        alert("Incorrect User ID or Password")
                        changePage("login")
                    }
                }
            )
            break
        case "ChangeName":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                let first = document.getElementById("set-first").value //not work change to const
                let last = document.getElementById("set-last").value
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("New First Name", first)
                        data.append("New Last Name", last)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Error"] == false) {
                            alert("Name Change Successful!")
                            changePage('home')
                        } else {
                            alert(result["Error Message"])
                            changePage('home')
                        }

                    })
            }
            break
        case "ChangeAddress":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                let address = document.getElementById("set-addr").value
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("New Address", address)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Error"] == false) {
                            alert("Address Change Successful!")
                            changePage('home')
                        } else {
                            alert(result["Error Message"])
                            changePage('home')
                        }

                    }
                )
            }
            break
        case "ChangePassword":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                let newpass = document.getElementById("set-newPass").value
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Old Password", sessionStorage.password)
                        data.append("New Password", newpass)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Password Changed"] == true) {
                            alert("Password Change Successful!")
                            sessionStorage.clear()
                            changePage("logout")
                        } else { alert(result["Error Message"]) }

                    }
                )

            }
            break
        case "OpenAccount":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Account Name", document.getElementById("newAcc-AccName").value)
                        data.append("Account Type", document.getElementById("newAcc-accType").value)
                        data.append("Initial Deposit", document.getElementById("newAcc-accValue").value)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Error"] == false) {
                            //add new row in view with given result.

                            alert("Account Opened Successfully!")
                            changePage('home')
                        } else {
                            alert(result["Error Message"])
                            changePage('home')
                        }

                    }
                )

            }
            break
        case "ChangeAccountName":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Account ID", sessionStorage.accountID)
                        data.append("New Account Name", document.getElementById("acc-accName").value)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Error"] == false) {
                            alert("Account Name Updated!\nRefresh to see changes.")
                        } else {
                            alert(result["Error Message"])
                        }

                    }
                )

            }
            break
        case "CloseAccount":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Account ID", sessionStorage.accountID)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Closed"] == true) { alert("Account Close Successful") } else { alert(result["Error Message"]) }

                    }
                )
            }
            break
        case "Withdraw":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        console.log("$" + cash + " pending for withdrawal")
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Account ID", sessionStorage.accountID)
                        data.append("Amount", cash) //look, even hard code not work
                    },
                    (raw) => {

                        let result = JSON.parse(raw)
                        console.log(result)
                        if (result["Error"] == false) {
                            alert(result["Status"])
                            document.getElementById("atm-output").innerHTML = "ATM dispensed " + result["Amount"]
                        } else { alert(result["Error Message"]) }

                    }
                )
            }
            break
        case "Deposit":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Account ID", sessionStorage.accountID)
                        data.append("Amount", cash)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Error"] == false) {
                            alert("Deposit Successful")

                            document.getElementById("atm-output").innerHTML = "ATM accepted " + result["Amount"]
                        } else {
                            alert(result["Error Message"])
                            document.getElementById("atm-output").innerHTML = "ATM rejected $" + cash
                        }
                    }
                )
            }
            break
        case "Transfer":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Source Account ID", sessionStorage.accountID)
                        data.append("Destination Account ID", document.getElementById("transfer-to").value)
                        data.append("Amount", document.getElementById("transfer-value").value)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Error"] == false) {
                            alert(result["Status"])
                            changePage('home')
                        } else {
                            alert(result["Error Message"])
                            changePage('home')
                        }
                    }
                )
            }
            break
        case "UserInfo":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        if (result["Error"] == false) {
                            sessionStorage.firstName = result["First Name"]
                            sessionStorage.lastName = result["Last Name"]
                            sessionStorage.address = result["Address"]
                        } else { alert(result["Error Message"]) }
                    }
                )
            }
            break
        case "UserAccountSummary":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Include Inactive", false)
                    },
                    (raw) => {

                        sessionStorage.UserAccountSummary = raw
                        let accounts = JSON.parse(raw)["Accounts"]
                            //cokies will only store string, so make json stringify and decode it.
                        for (acc of accounts) { //JSON.parse(sessionStorage.UserAccountSummary)["Accounts"]
                            sessionStorage.setItem("A" + acc["Account ID"], JSON.stringify(acc)) //individual account 
                            addAcc(acc["Account Name"], acc["Account ID"], acc["Balance"])
                        }

                        //document.getElementById("username").innerHTML = sessionStorage.firstName + " " + sessionStorage.lastName
                    }
                )
            }
            break
        case "UserTransactionHistory":

            break
        case "AccountTransactionHistory":
            if (!sessionStorage.userID || !sessionStorage.password) { changePage("logout") } else {
                req(act,
                    (data) => {
                        data.append("User ID", sessionStorage.userID)
                        data.append("Password", sessionStorage.password)
                        data.append("Account ID", sessionStorage.accountID)
                        data.append("Limit", 0)
                    },
                    (raw) => {
                        let result = JSON.parse(raw)
                        let transactions = result["Transactions"]
                        for (t of transactions) {
                            console.log(t)
                            t["account"]
                            let other = null
                            switch (t["Transaction Type"]) {
                                case "Outgoing Transfer":
                                    other = t["Destination Account ID"]
                                    break
                                case "Incoming Transfer":
                                    other = t["Source Account ID"]
                                    break
                                default:
                                    other = t["Account ID"]
                            }
                            addTransaction(t["Transaction Type"], t["Amount"], t["Time of Transaction"], other, t["Status"])
                        }
                    }
                )
            }
            break
    }
}

function accountInfo(info) { //I want to be able to get the account info and we dont have a function for that
    for (acc of sessionStorage.accounts) {
        if (sessionStorage.accountID === acc["Account ID"]) {
            return acc[info]
        }
    }
    return undefined
}
//I can just do sessionStorage.accountName, sessionStorage.accountType...it is to store which account is selected OK
//requests user password input what about user put two account id //I dont understand what you ask
function authenticate() {
    return window.prompt("Please enter your password")
}

function sample1() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.response)
    }

    xhttp.open("POST", API_server + "init", true);

    var data = new FormData();
    data.append('user', 'person');
    console.log(data)
    xhttp.send(data);
}

function req(API, send, recive) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            recive(this.response)
        }
    }
    xhttp.open("POST", API_server + API, true);
    var data = new FormData();
    send(data)
    xhttp.send(data);
}