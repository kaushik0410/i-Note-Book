import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(
            "http://localhost:5000/user/auth/signIn/",
            {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({email: credentials.email, password: credentials.password})}
        );
        const json = await res.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("You have successfully signed in into iNoteBook", "success");
        } else {
            props.showAlert("Invalid Credentials!!!", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <h1>Sign In into your account to use iNoteBook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} className="form-control" aria-describedby="passwordHelpBlock" />
                </div>
                <div className="col-auto">
                    <button type="submit" className={`btn btn-${props.mode==='light'?'primary':'light'} mb-3`}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;