import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { usercontext } from "./createcontext";
let Login = (props) => {
    const navigate = useNavigate();
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    let UserContext = useContext(usercontext);

    let [dirty, setDirty] = useState({
        email: false,
        password: false,
    });

    let [errors, setErrors] = useState({
        email: [],
        password: [],
    });

    let [loginMessage, setLoginMessage] = useState("");

    //executes on each render (initial render & state updates)
    useEffect(() => {
        //console.log(email, password);
    });

    //executes only on state updates of "email" only (and also with initial render)
    useEffect(() => {
        //validation on email only
        if (email.indexOf("@") > 0) {
            //console.log("valid");
        } else {
            //console.log("invalid");
        }
    }, [email]);

    //executes only once - on initial render =  componentDidMount
    useEffect(() => {
        document.title = "Login - eCommerce";
    }, []);

    //executes only once - on component unmounting phase = componentWillUnmount
    useEffect(() => {
        //do something
        return () => {
            console.log("Component Unmount");
        };
    }, []);

    //a function to validate email and password
    let validate = () => {
        //variable to store errorsData
        let errorsData = {};

        //email
        errorsData.email = [];

        //email can't blank
        if (!email) {
            errorsData.email.push("Email can't be blank");
        }

        //email regex
        let validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (email) {
            if (!validEmailRegex.test(email)) {
                errorsData.email.push("Proper email address is expected");
            }
        }

        //password
        errorsData.password = [];

        //password can't blank
        if (!password) {
            errorsData.password.push("Password can't be blank");
        }

        //password regex
        let validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
        if (password) {
            if (!validPasswordRegex.test(password)) {
                errorsData.password.push(
                    "Password should be 6 to 15 characters atleast one uppercase and lowercase letter and one digit"
                );
            }
        }

        setErrors(errorsData);
    };

    useEffect(validate, [email, password]);

    //When the user clicks on Login button
    let onLoginClick = async () => {
        //set all controls as dirty
        let dirtyData = dirty;
        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        });
        setDirty(dirtyData);

        //call validate
        validate();

        if (isValid()) {
            navigate("/dashboard", { replace: true })
            // let response = await fetch(
            //     `http://localhost:5000/users?email=${email}&password=${password}`,
            //     { method: "GET" }
            // );
            // if (response.ok) {
            //     //Status code is 200
            //     let responseBody = await response.json();
            //     if (responseBody.length > 0) {
            //         UserContext.setUser({
            //             ...usercontext.user, isloggin: true, userid: responseBody[0].id, username: responseBody[0].fullname,
            //         })
            //         console.log(usercontext.userid)
            //         navigate("/dashboard", { replace: true })
            //     } else {
            //         setLoginMessage(
            //             <span className="text-danger">Invalid Login, please try again</span>
            //         );
            //     }
            // } else {
            //     setLoginMessage(
            //         <span className="text-danger">Unable to connect to server</span>
            //     );
            // }
        }
    };

    let isValid = () => {
        let valid = true;

        //reading all controls from errors
        for (let control in errors) {
            if (errors[control].length > 0) valid = false;
        }

        return valid;
    };

    return (
        <div className="bg">
            <div className="col-lg-2 mx-2 login">
                <div className="pb-2">
                    <center className=""><h4>Login</h4></center>
                </div>
                <div className="form-group pb-4 ">
                    <label for="">email</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="" value={email} onChange={(event) => { setEmail(event.target.value) }}
                        onBlur={() => {
                            setDirty({ ...dirty, email: true })
                            validate();
                        }}
                    />
                    <div>{dirty["email"] && errors["email"][0] ? errors["email"] : ""}</div>
                </div>
                <div className="form-group pb-4">
                    <label for="">password</label>
                    <input type="password" className="form-control" name="" id="" placeholder="" value={password} onChange={(event) => { setPassword(event.target.value) }}
                        onBlur={() => {
                            setDirty({ ...dirty, email: true })
                            validate();
                        }} />
                    <div>{dirty["password"] && errors["password"][0] ? errors["password"] : ""}</div>
                </div>
                <div className="card-footer">
                    <div className="m-1">{loginMessage}</div>
                    <center><button onClick={onLoginClick}>login</button></center>
                </div>

            </div>

        </div>

    );
}

export default Login;