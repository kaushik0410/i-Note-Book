import Note from './Note';
import {useNavigate} from 'react-router-dom';

const Home = (props) => {

    const navigate = useNavigate();

    const handleAddNote = () => {
        navigate('/addNote');
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '5px' }}>
                <h2>Notes </h2>
                <button type="button" className={`btn btn-${props.mode==="light"?"primary":"light"}`} onClick={handleAddNote}><i class="fa-solid fa-plus"></i> Add New Note</button>
            </div>
            <Note showAlert={props.showAlert} />
        </>
    );
};

export default Home;