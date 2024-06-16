import React, {useContext, useEffect, useRef, useState} from 'react';
import noteContext from '../contexts/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Note = (props) => {
    const [currentNote, setCurrentNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
    const context = useContext(noteContext);
    const {note, getNote, editNote} = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();

    const updateNote = (note) => {
        ref.current.click();
        setCurrentNote({id: note._id, etitle: note.title, edescription: note.description, etag: note.tag});
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote(); 
        } else {
            navigate("/signin");
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etag);
        refClose.current.click();
        props.showAlert("Note has been updated successfully!!!", "success");
    };

    const onChange = (e) => {
        setCurrentNote({...currentNote, [e.target.name]: e.target.value});
    };

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body"  style={{color: props.mode==='light'?'black':'white'}}>
                        <form className='my-3'>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <textarea className="form-control" id="etitle" name="etitle" value={currentNote.etitle} onChange={onChange} rows="1" required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name="edescription" value={currentNote.edescription} onChange={onChange} rows="1" required minLength={5}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <textarea className="form-control" id="etag" name="etag" value={currentNote.etag} onChange={onChange} rows="1" required minLength={3}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={currentNote.etitle.length===0 || currentNote.edescription.length<5 || currentNote.etag.length<3} type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='container'>{Array.isArray(note) && note.length === 0 && 'No notes to display!!!'}</div>
                {Array.isArray(note) && note.map((notes) => { 
                    return <NoteItem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} note={notes} />
                })}
            </div>
        </>
    );
};

export default Note;