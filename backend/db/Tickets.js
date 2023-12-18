const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema(
    {
        subject: String,
        issueMessage:String,
        status:String,
        // email:String,
    }
);
module.exports =mongoose.model("ticket",ticketSchema);