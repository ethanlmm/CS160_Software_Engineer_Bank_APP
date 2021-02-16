const slaveGen = require('child_process')


const { Sequelize, Op } = require('sequelize');
const config = require('./config/config.json')
const seq = new Sequelize(config["production"])


const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
var multer = require('multer');
var forms = multer();



const indirect = slaveGen.fork('./api/slave_indirect')






const api = express()

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

api.listen('5001', () => {
    console.log('listening on 5001');
});
api.use(bodyParser.json());
api.use(forms.array());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cors())
api.post('/init', (req, res) => {

    var result = {}
    result["Success"] = "True"
    res.send(result);
});


api.post('/RegisterUser', (req, res) => {
    var request = {}
    request["Function"] = "Register User"
    request["Last Name"] = req.body["Last Name"]
    request["First Name"] = req.body["First Name"]
    request["Password"] = req.body["Password"]
    request["Address"] = req.body["Address"]

    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {

            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/Login', (req, res) => {
    var request = {}
    request["Function"] = "Login"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {

            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/ChangeName', (req, res) => {
    var request = {}
    request["Function"] = "Change Name"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["New Last Name"] = req.body["New Last Name"]
    request["New First Name"] = req.body["New First Name"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {

            res.send(JSON.parse(result["OutputJSON"]))

        }
    })
})

api.post('/ChangeAddress', (req, res) => {
    var request = {}
    request["Function"] = "Change Address"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["New Address"] = req.body["New Address"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/ChangePassword', (req, res) => {
    var request = {}
    request["Function"] = "Change Password"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Old Password"] = req.body["Old Password"]
    request["New Password"] = req.body["New Password"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})


api.post('/OpenAccount', (req, res) => {
    var request = {}
    request["Function"] = "Open Account"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account Name"] = req.body["Account Name"]
    request["Account Type"] = req.body["Account Type"]
    request["Initial Deposit"] = parseFloat(req.body["Initial Deposit"]).toFixed(2);
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/ChangeAccountName', (req, res) => {
    var request = {}
    request["Function"] = "Change Account Name"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account ID"] = parseInt(req.body["Account ID"])
    request["New Account Name"] = req.body["New Account Name"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})
api.post('/CloseAccount', (req, res) => {
    var request = {}
    request["Function"] = "Close Account"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account ID"] = parseInt(req.body["Account ID"])
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {

            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/ChangeAccountName', (req, res) => {
    var request = {}
    request["Function"] = "Close Account"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account ID"] = parseInt(req.body["Account ID"])
    request["New Account Name"] = req.body["New Account Name"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {

            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/Withdraw', (req, res) => {
    var request = {}
    request["Function"] = "Withdraw"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account ID"] = parseInt(req.body["Account ID"])
    request["Amount"] = parseFloat(req.body["Amount"]).toFixed(2);
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/Deposit', (req, res) => {
    var request = {}
    request["Function"] = "Deposit"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account ID"] = parseInt(req.body["Account ID"])
    request["Amount"] = parseFloat(req.body["Amount"]).toFixed(2);
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/Deposit', (req, res) => {
    var request = {}
    request["Function"] = "Deposit"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account ID"] = parseInt(req.body["Account ID"])
    request["Amount"] = parseFloat(req.body["Amount"]).toFixed(2);
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/Transfer', (req, res) => {
    var request = {}
    request["Function"] = "Transfer"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Source Account ID"] = parseInt(req.body["Source Account ID"])
    request["Destination Account ID"] = parseInt(req.body["Destination Account ID"])
    request["Amount"] = parseFloat(req.body["Amount"]).toFixed(2);
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/UserInfo', (req, res) => {
    var request = {}
    request["Function"] = "User Info"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})
api.post('/UserAccountSummary', (req, res) => {
    var request = {}
    request["Function"] = "User Account Summary"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Include Inactive"] = req.body["Include Inactive"]
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {

            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/UserTransactionHistory', (req, res) => {
    var request = {}
    request["Function"] = "User Transaction History"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Limit"] = parseInt(10)
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/AccountTransactionHistory', (req, res) => {
    var request = {}
    request["Function"] = "Account Transaction History"
    request["User ID"] = parseInt(req.body["User ID"])
    request["Password"] = req.body["Password"]
    request["Account ID"] = parseInt(req.body["Account ID"])
    request["Limit"] = parseInt(req.body["Limit"])
    var APIkey = getRandomInt(1000000)

    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(request) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {
            res.send(JSON.parse(result["OutputJSON"]))
        }
    })
})

api.post('/API', (req, res) => {
    var APIkey = getRandomInt(1000000)
    seq.query("INSERT INTO APICalls(APIkey,InputJSON) VALUES(" + APIkey + ",'" + JSON.stringify(req.body) + "')")
    indirect.on('message', (str) => {
        const result = JSON.parse(str);
        if (result["APIKey"] == APIkey) {

            res.send(JSON.parse(result["OutputJSON"]))

        }
    })
})