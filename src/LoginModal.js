import React from 'react';

const LoginModal = ({ show, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login to Your Account</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Account Number</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Login</button>
          <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
