const express = require("express");
const database = require("./database");
const mysqlDatabase = require("./mysqlDatabase");

const app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get("/notes", async (req, res) => {
  //const searchTerm = req.query.searchTerm;
  try {
    const notes = await mysqlDatabase.getNotes();
    console.log(notes);
    res.send(notes);
    /* res.redirect("notes.ejs", {
      notes,
    }); */
    
  } catch (error){
    /* res.sendStatus(500).render("note404.ejs") */
    console.log(error)
  }
  
})

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  try {
    const note = await mysqlDatabase.getNote(id)
    
    /* res.render("singleNote.ejs", {
      note,
    }); */
    res.send(note);
  } catch (err) {
    /* res.status(500).render("note404.ejs") */
    console.log(err)
  }  
  
})

app.get("/createNote", (req, res) => {
  res.render("createNote.ejs")
})

app.post("/notes", async (req, res) => {
  const data = req.body
  try {
     await mysqlDatabase.addNote(data)
    
  } catch(error){
    res.sendStatus(500).render("note404.ejs")
  }
  res.redirect("/notes");
})

app.post("/notes/:id/delete", async (req, res) => {
  const id = +req.params.id
  try {
    await mysqlDatabase.deleteNote(id);
  } catch (error) {
    res.sendStatus(500).render("note404.ejs")
  }
  res.redirect("/notes")
})

app.use(express.static("public"))


const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
