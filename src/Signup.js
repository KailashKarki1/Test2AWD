import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // You can handle the sign-up logic here, such as sending the data to the server or validating inputs
    alert('Sign-up successful!');
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zipCode" className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="securityQuestion" className="form-label">Security Question</label>
          <input
            type="text"
            className="form-control"
            id="securityQuestion"
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="securityAnswer" className="form-label">Security Answer</label>
          <input
            type="text"
            className="form-control"
            id="securityAnswer"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
