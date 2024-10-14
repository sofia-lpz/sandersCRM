const { application } = require("express");
const db = require("./db"); // Assuming you have a db module to handle database connections

application.get("/donaciones", async (req, res) => {
    try {
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order === "ASC" ? 1 : -1;
            let start = Number(req.query._start);
            let end = Number(req.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;
            let data = await db.collection("donaciones").find().sort(sorter).project({ _id: 0 }).toArray();
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            data = data.slice(start, end);
            res.json(data);
        } else if ("id" in req.query) {
            let data = [];
            for (let index = 0; index < req.query.id.length; index++) {
                let dbData = await db.collection("donaciones").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
                data = data.concat(dbData);
            }
            res.json(data);
        } else {
            let data = await db.collection("donaciones").find().project({ _id: 0 }).toArray();
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

application.put("/donaciones/:id", async (req, res) => {
    let addValues= req.bosy;
    addValues["id"] = Number(req.params.id);
    let data= await db.collection("donaciones").updateOne({id: Number(req.params.id)}, {$set: addValues});
    data = await
    res.json(data[0]);
})

application.post("donaciones", async (req, res) => {
    let addValues = req.body;
    let data= await db.collection("donaciones").find({}).toArray();
    let id= data.length + 1;
    addValues["id"]= id;
    data = await db.collection("donaciones").insertOne(addValues);
    res.json(data);
})

application.delete("/donaciones/:id", async (req, res) => {
    let data = await db.collection("donaciones").deleteOne({id: Number(req.params.id)});
    res.json(data);
})