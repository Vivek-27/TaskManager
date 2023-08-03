import React, { useState } from 'react';
import './auth.css';
import toast, { Toaster } from 'react-hot-toast';

const Auth = () => {
  const [startup, setStartup] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(true);

  const signUp = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast(`Enter Valid Email`);
      return;
    }

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((response) => {
        toast(response.message);
        setLogin(true);
      })
      .catch((error) => console.log(error));
  };

  const logIn = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast(`Enter Valid Email`);
      return;
    }

    fetch('/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.error) toast(response.error);
        else toast('LoggedIn Successfully');
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  const StartUp = () => {
    return (
      <div className="startup">
        <h1>
          Task Manage Your <br />
          Project
        </h1>

        <p>
          when an unknown printer took a galley of <br />
          type and scrambled it to make a type <br /> specimen
        </p>

        <button onClick={(prev) => setStartup(!prev)}>GET STARTED </button>
        <img
          src="https://ouch-cdn2.icons8.com/Gd8IJmCRrRktd_NDnK9Zb8oslq-xTNc2PUVyk2YrPkI/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjIz/LzgwMWU1OTk3LTAz/YzUtNDhhMy05Yzcx/LTI2NDZmZDAwYzhm/Mi5wbmc.png"
          alt=""
        />
      </div>
    );
  };
  return (
    <>
      <Toaster />
      <div className="Auth">
        <div className="nav">
          <div className="left">
            <p>Hi! User</p>
          </div>
          <div className="right">
            <button onClick={() => setLogin(true)}>Login</button>
            <button onClick={() => setLogin(false)}>SignUp</button>
          </div>
        </div>
        {startup ? (
          <StartUp />
        ) : (
          <>
            {login ? (
              //Login
              <div className="login">
                <div className="input">
                  <h1>LogIn</h1>

                  <div className="inp">
                    <p>Email</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div className="inp">
                    <p>Password</p>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="btn">
                    <button onClick={() => logIn()}>Login</button>
                  </div>
                  <span onClick={() => setLogin(false)}>
                    Don't have an Account?
                  </span>
                </div>
                <img
                  src="https://ouch-cdn2.icons8.com/Gd8IJmCRrRktd_NDnK9Zb8oslq-xTNc2PUVyk2YrPkI/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjIz/LzgwMWU1OTk3LTAz/YzUtNDhhMy05Yzcx/LTI2NDZmZDAwYzhm/Mi5wbmc.png"
                  alt=""
                />
              </div>
            ) : (
              //SignUp
              <div className="login">
                <div className="input">
                  <h1>SignUp</h1>
                  <div className="inp">
                    <p>Name</p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className="inp">
                    <p>Email</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div className="inp">
                    <p>Password</p>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="btn">
                    <button onClick={() => signUp()}>SignUp</button>
                  </div>
                  <span onClick={() => setLogin(true)}>
                    Already have an Account?
                  </span>
                </div>
                <img
                  src="https://ouch-cdn2.icons8.com/Gd8IJmCRrRktd_NDnK9Zb8oslq-xTNc2PUVyk2YrPkI/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjIz/LzgwMWU1OTk3LTAz/YzUtNDhhMy05Yzcx/LTI2NDZmZDAwYzhm/Mi5wbmc.png"
                  alt=""
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Auth;
