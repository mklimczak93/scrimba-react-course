import React from "react"
import Sidebar from "/src/components/Sidebar"
import Editor from "/src/components/Editor"
import Split from "react-split"
import '/src/App.css'
// import below not needed for Firebase, as it has its own id assigning system
//import {nanoid} from "nanoid"
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "/firebase.js"

export default function App() {
    // --- --- --- FUNCTIONS - FIREBASE --- --- --- //
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState("")

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
    const sortedArray = notes.sort(function(a, b){return b.editedAt - a.editedAt})


    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

    //anytime notes changes, check if there is no currentNoteId
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

    //debouncing
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [tempNoteText])


    
    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            editedAt: Date.now()
        }
        //pushing new note to Firestore using addDoc() function
        const newNoteRef = await addDoc(notesCollection, newNote)
        //updating CurrentNoteId
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(text) {
        //pushing the correct update to Firestore
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(docRef, { body: text, editedAt: Date.now()}, { merge: true })
    }


    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    // --- --- --- FUNCTIONS - LOCAL STORAGE --- --- --- //
    // const [notes, setNotes] = React.useState( function() {
    //     return JSON.parse(localStorage.getItem("notes")) || []
    // })
    // const [currentNoteId, setCurrentNoteId] = React.useState(
    //     (notes[0] && notes[0].id) || ""
    // )
    // //alternatively instead of (notes[0] && notes[0].id) || "") you can just say (notes[0]?.id || "") <- optional chain operator

    // const currentNote = 
    //     notes.find(note => note.id === currentNoteId) 
    //     || notes[0]

    // React.useEffect(() => {
    //     localStorage.setItem("notes", JSON.stringify(notes))
    // }, [notes])
    
    // function createNewNote() {
    //     const newNote = {
    //         id: nanoid(),
    //         body: "# Type your markdown note's title here"
    //     }
    //     setNotes(prevNotes => [newNote, ...prevNotes])
    //     setCurrentNoteId(newNote.id)
    // }
    
    // function updateNote(text) {
    //     setNotes(oldNotes => {
    //         const newArray = []
    //         for(let i = 0; i < oldNotes.length; i++) {
    //             const oldNote = oldNotes[i]
    //             if(oldNote.id === currentNoteId) {
    //                 newArray.unshift({ ...oldNote, body: text })
    //             } else {
    //                 newArray.push(oldNote)
    //             }
    //         }
    //         return newArray
    //     })
    // }

    // function deleteNote(event, noteId) {
    //     event.stopPropagation()
    //     setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    // }
    
    // --- --- --- RETURNING APP --- --- --- //
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedArray}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                <Editor 
                    // currentNote={currentNote} 
                    // updateNote={updateNote} 
                    tempNoteText={tempNoteText}
                    setTempNoteText={setTempNoteText}
                />
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
