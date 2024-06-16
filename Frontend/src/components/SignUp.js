import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(
            "http://localhost:5000/user/auth/createUser/",
            {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})}
        );
        const json = await res.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("You have successfully created your account into iNoteBook", "success");
        } else {
            props.showAlert("Invalid Credentials!!!", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <h1>Create an account to use iNoteBook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="John Doe" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" onChange={onChange} className="form-control" aria-describedby="passwordHelpBlock" />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </div>
                </div>
                <div className="col-auto">
                    <button type="submit" className={`btn btn-${props.mode==='light'?'primary':'light'} mb-3`}>Register</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;