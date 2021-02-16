
const {Sequelize,Op}= require('sequelize');
const config = require('./config/config.json')
const seq= new Sequelize(config["test"])
//const models=require('./models')



async function fetchRequest(reqid){
    var result=await models.Input.findOne({where:{reqID:reqid}});
    return result["dataValues"]['request']

}

async function updateResult (resid,r){
    await models.Output.update({Result:r},{where:{resID:resid}});
    //await models.Output.findOne({where:{resID:resid}}).then((r)=>{console.log(r)})
    }

async function execute(f,p){
    const keys=Object.keys(p)
    var command="EXECUTE "+f+" USING ";
    if(keys.length==0){ seq.query("EXECUTE "+f+";")}

    else{
        const keys=Object.keys(p)
        for(var i=0;i<keys.length;i++){
            var k="@"+keys[i]
            if(i<keys.length-1){command=command+k+","}
            else{command=command+k+";"}
            if(typeof(p[keys[i]])=="string"){await seq.query("SET "+k+"='"+p[keys[i]]+"';")}
            else{await seq.query("SET "+k+"="+p[keys[i]]+";")}
        }
        return await seq.query(command)
}}


const sql_init =async() =>{
    const result=await models.command.findAll();
        
    for(var i=0;i<result.length;i++){
           var row=result[i]["dataValues"]
           var name=row["name"]
           var command=row["command"]["F"]
           var prepare=await seq.query("PREPARE "+name+" FROM \""+command+"\"")
    }
    
}


//setInterval(sql_init,2000);

process.on('message',(raw)=>{

    const q=async()=>{
        const ticket={}
        const req = JSON.parse(raw);
        ticket["APID"]=req["APID"]
        ticket["Seed"]=req["Seed"]
        const f=req["Function"]
        const para=req["Parameter"]

        var result=await execute(f,para)
        ticket["Result"]=result[0][0]["Result"]
        const ticketInStr=JSON.stringify(ticket)
        process.send(ticketInStr)
    }
    
    
    
    
})