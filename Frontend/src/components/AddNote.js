import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../contexts/notes/noteContext';

const AddNote = (props) => {

  const navigate = useNavigate();
  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const context = useContext(noteContext);
  const {addNote} = context;

  const handleBack = () => {
    navigate('/back');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    navigate('/');
    props.showAlert("Note has been added successfully!!!", "success");
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label"  style={{color: props.mode==='light'?'black':'white', fontWeight: 'bold'}}>Title</label>
          <textarea className="form-control" id="title" name="title" onChange={onChange} value={note.title} rows="1" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" style={{color: props.mode==='light'?'black':'white', fontWeight: 'bold'}}>Description</label>
          <textarea className="form-control" id="description" name="description" onChange={onChange} value={note.description} rows="1" required minLength={5}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"  style={{color: props.mode==='light'?'black':'white', fontWeight: 'bold'}}>Tag</label>
          <textarea className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} rows="1" required minLength={3}></textarea>
        </div>
        <button disabled={note.title.length===0 || note.description.length<5 || note.tag.length<3} type="button" className={`btn btn-${props.mode==="light"?"primary":"light"} mx-2`} onClick={handleSubmit}>Add</button>
        <button type="button" className={`btn btn-${props.mode==="light"?"primary":"light"} mx-2`} onClick={handleBack}>Back</button>
      </form>
    </div>
  );
};

export default AddNote;
