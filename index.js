const express = require("express")
const app = express()
var cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");

// คำสั่งเชื่อม MongoDB Atlas
var mongo_uri = "mongodb://localhost:27017/";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Ahoy!" })
})

app.get("/data", (req, res) => {
    // ? SHOW
    res.json({ message: "get DATA" })
})


app.delete("/profile", (req, res) => {
    // ! DEALETE
    res.json({ message: "delete profile DATA" })
})

app.post("/", (req, res) => {
    // ? POST
    res.json({ message: "create DATA" })
})

app.put("/", (req, res) => {
    // ! UPDATE
    res.json({ message: "updated DATA" })
})

app.delete("/", (req, res) => {
    // ! DEALETE
    res.json({ message: "delete DATA" })
})

app.post("/createuser", async(req, res) => {
    // ? POST
    const payload = req.body;
    console.log("payload:", payload);
    res.json({ message: "create DATA" })
})
app.post("/create-room", (req, res) => {
    // ? POST
    const payload = req.body;
    console.log("payload:", payload);
    res.json({ message: "create DATA" })
})

app.delete("/createuser-delete", async(req, res) => {
    const payload = req.body;
    console.log("payload:", payload);
    eventlist.findByIdAndDelete(req.body._id, (err, data) => {
        userlist.deleteMany({eventid: req.body._id},function(err){
        if (err) return res.status(400).send(err);
        res.status(200).send("ลบข้อมูลเรียบร้อย");
        });
        
    });
});

app.listen(9000, () => {
    console.log("Application is running on port 9000")
})

app.get("/userdata", async(req, res) => {
    const eventget = await db.eventlist.find({});
    res.json(eventget);
});

app.post("/create-eventlist", async(req, res) => {
    const payload = req.body;
    console.log("payload:", payload);
    const event = new eventlist(payload);
    let temp = await event.save();
    console.log(temp._id);
    const gsapi = google.sheets({ version: "v4", auth: client });
    const opt = {
        spreadsheetId: payload.googlesheetID,
        range: "การตอบแบบฟอร์ม 1",
    };
    
    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;
    dataArray.shift();
    for (let val of dataArray) {
        let new_user = new userlist({
            eventid: temp._id,
            timedate: val[0],
            prefix: val[1],
            name: val[2],
            lastname: val[3],
            major: val[4],
            email: val[5],
            status: "not available"
        });
        new_user.save(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Save to db successfully");
            }
        });
    }
    res.status(200).send(temp._id);
});
app.get("/userslist-show", async(req, res) => {
    const eventuserslist = await userlist.find({});
    res.json(eventuserslist);
});
app.get("/eventlist-show", async(req, res) => {
    const eventget = await db.eventlist.find({});
    res.json(eventget);
});

