import NoteContext from "./noteContext";
import React, {useState} from 'react';

const NoteState = (props) => {

  const host = "http://localhost:5000/"
  const initialNotes = [];
  const [note, setNote] = useState(initialNotes);

  const getNote = async () => {
    const res = await fetch(
      `${host}user/note/fetchAllNotes/`,
      {method: 'GET', headers: {'content-type': 'application/json', 'authToken': localStorage.getItem('token')}}
    );
    const resJson = await res.json();
    setNote(resJson);
  };

  const addNote = async (title, description, tag) => {
    const res = await fetch(
      `${host}user/note/addNote/`, 
      {method: 'POST', headers: {'content-type': 'application/json', 'authToken': localStorage.getItem('token')}, 
      body: JSON.stringify({title, description, tag})}
    );
    const notes = await res.json();
    setNote(note.concat(notes));
  };

  const deleteNote = async (id) => {
    const res = await fetch(
      `${host}user/note/deleteNote/${id}`, 
      {method: 'DELETE', headers: {'content-type': 'application/json', 'authToken': localStorage.getItem('token')}}
    );
    const json = res.json();
    console.log(json);
    const newNote = note.filter((notes) => {return notes._id!==id})
    setNote(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const res = await fetch(
      `${host}user/note/updateNote/${id}`, 
      {method: 'PUT', headers: {'content-type': 'application/json', 'authToken': localStorage.getItem('token')}, 
      body: JSON.stringify({title, description, tag})}
    );
    const json = res.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(note));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNote(newNotes);
  };

  return (
    <NoteContext.Provider value={{note, setNote, addNote, deleteNote, editNote, getNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;