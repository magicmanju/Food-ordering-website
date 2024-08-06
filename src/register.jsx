import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


function Register(props) {
    const navigate = useNavigate();
    var [state, setState] = useState(
        {
            email: "",
            password: "",
            fullname: "",
            dob: "",
            gender: "",
            country: "",
            receieveletter: "",
        }
    )
    var [countries] = useState(
        [
            "india", "uk", "usa", "japan", "spain", "france"
        ]
    )
    var [errors, setErros] = useState(
        {
            email: [],
            password: [],
            fullname: [],
            dob: [],
            gender: [],
            country: [],
            receieveletter: [],
        }
    )
    var [dirty, setDirty] = useState(
        {
            email: false,
            password: false,
            fullname: false,
            dob: false,
            gender: false,
            country: false,
            receieveletter: false,

        }
    )
    var [message, setMessage] = useState();
    var validate = () => {
        var errorsData = {};
        errorsData.email = []
        if (!state.email) {
            errorsData.email.push("email cant blank")
        }
        const validemailregex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
        if (state.email) {
            if (!validemailregex.test(state.email)) {
                errorsData.email.push("enter proper email address")
            }
        }
        errorsData.password = []

        if (!state.password) {
            errorsData.password.push("password cant blank")
        }
        const validregex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (state.password) {
            if (!validregex.test(state.password)) {
                errorsData.password.push("enter proper password")
            }
        }
        errorsData.fullname = []
        if (!state.fullname) {
            errorsData.fullname.push("fullname cant blank")
        }
        errorsData.dob = []
        if (!state.dob) {
            errorsData.dob.push("dob cant blank")
        }
        errorsData.gender = []
        if (!state.gender) {
            errorsData.gender.push("gender cant blank")
        }
        errorsData.country = []
        if (!state.country) {
            errorsData.country.push("country cant blank")
        }
        setErros(errorsData);
    };

    var isRegistered = async () => {
        let dirtyData = dirty;
        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        })
        setDirty(dirtyData);
        validate();
        var isvalid = () => {
            var valid = true;
            for (var control in errors) {
                if (errors[control].length > 0) {
                    valid = false;
                }
            }
            return valid;
        }

        if (isvalid()) {
            var response = await fetch("http://localhost:5000/users", {
                method: "POST",
                body: JSON.stringify({ email: state.email, password: state.password, fullname: state.fullname, dob: state.dob, gender: state.gender, country: state.country }),
                headers: { "content-type": "application/json" },

            });
            if (response.ok) {
                navigate("/", { replace: true })
            }
            else {
                <span>errors in server</span>
            }
        };
    }
    useEffect(validate, [state]);
    return (
        <div className=''>
            <div className='register'></div>
            <div className='errors'>
                {Object.keys(errors).map((control) => {
                    if (dirty[control]) {
                        return errors[control].map((err) => {
                            return <li className='list' key={err}>{<div className='text'><i class="fa fa-hand-o-down" aria-hidden="true"></i>{err}</div>}</li>;
                        })
                    }
                }
                )}
            </div>
            <div className='col-lg-4 mt-5 mx-auto reg-card'>
                <div class="card ">
                    <div class=" text-primary text-center card-header">
                        <h2>Register</h2>
                    </div>
                    <div class="">
                        <div class=" px-4 pb-4 mx-4 ">
                            <label for="" className='col-lg-2'>Email</label>
                            <input className='col-lg-8' type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="email" value={state.email}
                                onChange={(event) => { setState({ ...state, email: event.target.value }) }} />
                        </div>
                        <div class="px-4 pb-4 mx-4 ">
                            <label className=' col-lg-2' for="">password</label>
                            <input className='0 col-lg-8' type="password" class="form-control" name="" id="" placeholder="password" value={state.password}
                                onChange={(event) => { setState({ ...state, password: event.target.value }) }} />
                        </div>
                        <div class="px-4 pb-4 mx-4 ">
                            <label className='col-lg-2' for="">FullName</label>
                            <input className='col-lg-8' type="text" class="form-control" name="" id="" placeholder="manju" value={state.fullname}
                                onChange={(event) => { setState({ ...state, fullname: event.target.value }) }} />
                        </div>
                        <div class="px-4 pb-4 mx-4 ">
                            <label className='col-lg-2' for="">DOB</label>
                            <input className='col-lg-8' type="date" class="form-control" name="" id="" placeholder="" value={state.dob}
                                onChange={(event) => { setState({ ...state, dob: event.target.value }) }} />
                        </div>
                        <div class="px-4 pb-4 mx-4 ">
                            <label className='col-lg-2' for="">Gender</label>
                            <input type="radio" name="gender" id="male" placeholder="" value="male" checked={state.gender === 'male' ? true : false} className=''
                                onChange={(event) => { setState({ ...state, gender: event.target.value }) }} />
                            <span className='px-2'>male</span>
                            <input type="radio" name="gender" id="female" placeholder="" value="female" checked={state.gender === 'female' ? true : false}
                                onChange={(event) => { setState({ ...state, gender: event.target.value }) }} />
                            <span className='px-2'>female</span>
                        </div>
                        <div class="px-4 pb-4 mx-4 ">
                            <label className='col-lg-2' for="">Country</label>
                            <select className='col-lg-8' type="text" class="form-control" name="country" id="country" value={state.country} onChange={(event) => {
                                setState({ ...state, country: event.target.value })

                            }}>
                                {countries.map((Country) => (
                                    <option key={Country} value={Country}>{Country}</option>
                                ))}
                            </select>
                        </div>
                        <div class="px-4 pb-4 mx-4 ">
                            <label for="" className=''>Receieve Letter</label>{" "}
                            <input className='' type="checkbox" class="" name="" id="" placeholder="" />
                        </div>
                    </div>
                    <div className='alert alert-sucess mx-auto'>
                        {message}
                    </div>
                    <div className='card-footer text-center'>
                        <button type="submit" onClick={isRegistered}>Register</button>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Register;