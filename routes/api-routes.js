const router = require('express').Router();
const fs = require("fs");
const uuid = require("uuid/v1")

router.get('/notes', async (req, res) => {
    const dbJson= await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbJson);

});   
    
router.post('/notes', (req, res) => {
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    };
 const allNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"))
    allNotes.push(newFeedback)
   fs.writeFileSync("db/db.json",JSON.stringify(allNotes));
   res.json(allNotes)




})
router.delete('/notes/:id', (req, res) =>{
    const allNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"))
    console.log(allNotes)
    return allNotes.filter((note) => note.id !== req.params.id)
    .then((notes)=>fs.writeFileSync("db/db.json", JSON.stringify(notes)))
    .then(()=>res.json({ok:true}))
})


module.exports = router;