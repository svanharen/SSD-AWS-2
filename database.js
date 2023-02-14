var notes = [
    {
        id: 1,
        title: "First Note",
        timestamp: Date.now(),
        contents:
        "Note 1 wow"
    },
    {
        id: 2,
        title: "Second Note",
        timestamp: Date.now(),
        contents:
        "Note 2 wowwee"
    }
]

function getNotes(searchTerm)
{
    if(!searchTerm) {
        return notes;
    }
    return notes.filter(note => note.title.includes(searchTerm) || note.contents.includes(searchTerm))
}

function getNote(id)
{
    return notes.find(note => note.id == id);
}

function addNote(note)
{
    notes.push({
        ...note,
        id: notes.length+1,
        timestamp: Date.now()
    })
}

function deleteNote(id)
{
    notes = notes.filter((note) => note.id !== id)
}

exports.getNotes = getNotes
exports.getNote = getNote
exports.addNote = addNote
exports.deleteNote = deleteNote

