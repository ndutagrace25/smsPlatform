//Storing API Key in an envoronment file
require('dotenv').config();

// Setting up credentials
const credentials = {

    apiKey: process.env.API_KEY,
    username: process.env.API_NAME,

}
const AfricasTalking = require("africastalking")(credentials);
const Sms_reports = require("../../models").Sms_reports;
const readXlsxFile = require("read-excel-file/node");
const xlsxFile = require('read-excel-file/node');
const fs = require("fs");
const xlsx = require("xlsx");

//added


//Cleaning Phone numbers.

const { cleanPhone } = require("../utils/cleanPhone")

module.exports = {
    
    // Sending a single SMS.
    singleSms(messagecontent, result) {

        //cleaning phone number
        const sendSms = AfricasTalking.SMS;
        const tellNumber = cleanPhone(messagecontent.phone)
        const options = {
            to: tellNumber,
            message: messagecontent.message
            // set short code for mawingu           

        }
        sendSms.send(options).then(response => {
            let data = response.SMSMessageData.Recipients[0]
            Sms_reports.create({
                message: messagecontent.message,
                recepient: tellNumber,
                status: data.status,
                sms_cost: data.cost,
                created_by: messagecontent.created_by,
                sms_type: messagecontent.sms_type
            }).then(() => {
                result(null, { message: "Message sent successfully." })
            }).catch(error => {
                result({ error: "Something went wrong" }, null)

            })
        })
            .catch(error => { result(error, null) })
    },
    //Displaying All SMS Reports
    getAllSms(result) {
        Sms_reports.findAll({
            attributes: ["id", "message", "recepient", "created_by", "status", "sms_type", "sms_cost"],
        })
            .then((sms) => {
                result(null, sms);
            })
            .catch((error) => {
                result({ error: "Something went wrong" }, null);

            });

    },


//bulk sms
bulkSms(files,result){
    const sendSms = AfricasTalking.SMS;
    if (files.files.file) {
        console.log(files.body)

        const file = files.files.file;
        const fileName = file.name;

        file.mv(`./uploads/${fileName}`, (err) => {
  
          if (err) {
  
            result(err, null);
  
          } else {
  
            const data = xlsx.readFile(`uploads/${fileName}`);//reading the file
            const workSheet = data.Sheets["Sheet1"];//picking the first sheet on excel
            const arrayData = xlsx.utils.sheet_to_json(workSheet);//converting the data to json

            let cleanedPhonenumbers = arrayData.map(item =>{
                return cleanPhone(item.phone)
            })

            arrayData.map(item =>{
                const options = {
                    to:cleanPhone(item.phone),
                    message: `Dear ${item.name} ${files.body.message}`
                    // set short code for mawingu         
                }
                sendSms.send(options).then(response => {
                    let data = response.SMSMessageData.Recipients[0]
                        Sms_reports.create({
                            message: files.body.message,
                            recepient: cleanPhone(item.phone),
                            status: data.status,
                            sms_cost: data.cost,
                            created_by: files.body.created_by,
                            sms_type: files.body.sms_type
                        }).then(() => {
                       //     result(null, { message: "Message sent successfully." })
                        }).catch(error => {
                            result({ error: "Something went wrong" }, null)
            
                        })
                   
                    }).catch(error => { result(error, null) })
            }) 
            result(null, { message: "Success" });

          }
  
        });
  
      } else {
  
        result({ error: "Please select a file to upload" }, null);
  
      }
}
}

