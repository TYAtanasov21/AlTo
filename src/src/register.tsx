import React, { useState, useRef } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({ name: '', pass: '' });

  const emailInput = useRef();

  const handleClick = () => {
    if (step === 1 && emailInput.current) {
      setStep(2);
    } else if (step === 2) {
      console.log('Registration successful:', { email, password });
      setUser({ name: email, pass: password });
      console.log(user);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-light mb-3">Register</h2>
      {step === 1 ? (
        <form className="my-form p-4 rounded text-light">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label visually-hidden">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              ref={emailInput}
              id="exampleInputEmail"
              placeholder="your_email@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-light btn-lg" onClick={handleClick}>
              Continue
            </button>
          </div>
        </form>
      ) : (
        <form className="my-form p-4 rounded text-light">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label visually-hidden">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-light btn-lg" onClick={handleClick}>
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;
