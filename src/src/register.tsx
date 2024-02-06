import React, { useState, useRef } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleEmailSubmit = (event) => {
    const textInput = useRef!<HTMLInputElement>(null);
    event.preventDefault();

    setStep(2);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic with email and password
    console.log('Registration successful:', { email, password });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-light mb-3">Register</h2>
      {step === 1 ? (
        <form className="my-form p-4 rounded text-light" onSubmit={handleEmailSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label visually-hidden">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="your_email@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-light btn-lg">
              Continue
            </button>
          </div>
        </form>
      ) : (
        <form className="my-form p-4 rounded text-light" onSubmit={handlePasswordSubmit}>
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
            <button type="submit" className="btn btn-light btn-lg">
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;
