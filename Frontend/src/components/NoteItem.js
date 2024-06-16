import React, {useContext} from 'react';
import noteContext from '../contexts/notes/noteContext';

const NoteItem = (props) => {
    const {note, updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context; 

    return (
        <div className='col-md-4'>
            <div className="card my-2">
                <div className="card-body"> 
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <div className='position-absolute top-0 end-0 p-2'>
                        <i className="fa-solid fa-pen mx-2" onClick={() => {updateNote(note); props.showAlert("Note has been deleted successfully!!!", "success")}}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;