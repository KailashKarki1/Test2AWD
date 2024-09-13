import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import man from './img/man.png';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Signup from './Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentAccountBalance, setCurrentAccountBalance] = useState(10000); // Initial balance for Current Account
  const [savingsAccountBalance, setSavingsAccountBalance] = useState(50000); // Initial balance for Savings Account
  const [transactions, setTransactions] = useState([]); // Transaction history

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDeposit = (amount) => {
    setCurrentAccountBalance((prevBalance) => prevBalance + amount);
    addTransaction('Deposit', amount);
  };

  const handleWithdraw = (amount) => {
    if (amount <= currentAccountBalance) {
      setCurrentAccountBalance((prevBalance) => prevBalance - amount);
      addTransaction('Withdraw', amount);
    } else {
      alert("Insufficient funds");
    }
  };

  const addTransaction = (type, amount) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { type, amount, date: new Date().toLocaleString() }
    ]);
  };

  const handleTransferSubmit = (e, transferData) => {
    e.preventDefault();
    const amount = parseFloat(transferData.amount);

    if (transferData.accountType === 'current') {
      if (amount > currentAccountBalance) {
        alert('Insufficient balance in Current Account!');
      } else {
        setCurrentAccountBalance(currentAccountBalance - amount);
        addTransaction(`Transfer to ${transferData.recipient}`, amount);
        alert(`Transferred $${amount} from Current Account`);
      }
    } else if (transferData.accountType === 'savings') {
      if (amount > savingsAccountBalance) {
        alert('Insufficient balance in Savings Account!');
      } else {
        setSavingsAccountBalance(savingsAccountBalance - amount);
        addTransaction(`Transfer to ${transferData.recipient}`, amount);
        alert(`Transferred $${amount} from Savings Account`);
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/wealth-management" element={<WealthManagement />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/Signup" element={<Signup />} /> 
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard
                  currentAccountBalance={currentAccountBalance}
                  savingsAccountBalance={savingsAccountBalance}
                  transactions={transactions}
                  onDeposit={handleDeposit}
                  onWithdraw={handleWithdraw}
                  onTransfer={handleTransferSubmit}
                  onLogout={handleLogout} // Pass handleLogout as a prop
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>

        <LoginModal 
          show={showLoginForm} 
          onClose={() => setShowLoginForm(false)} 
          onSubmit={handleFormSubmit} 
        />

        <Footer />
      </div>
    </Router>
  );
};

// Example Home component
const Home = () => (
  <>
    <Hero
      title="Secure Your Future with National Bank"
      subtitle="Whether you’re saving, investing, or planning for the future, we’re here to help."
      backgroundImage={man}
      ctaText="Get Started"
      ctaLink="/personal"
    />

    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img src={img1} alt="Banking Icon" />
          <h4>Personal Banking</h4>
          <p>Manage your accounts, credit cards, loans, and more.</p>
        </div>
        <div className="col-md-4">
          <img src={img2} alt="Business Icon" />
          <h4>Business Banking</h4>
          <p>Business solutions to meet your company’s growing needs.</p>
        </div>
        <div className="col-md-4">
          <img src={img3} alt="Wealth Icon" />
          <h4>Wealth Management</h4>
          <p>Planning for your financial future starts today.</p>
        </div>
      
      </div>
    </div>
    <div className="container mt-5">
      <div className="row">
        {/* Column 1 */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src={img1} className="card-img-top" alt="Personal Banking" />
            <div className="card-body">
              <h5 className="card-title">Personal Banking</h5>
              <p className="card-text">
                Manage your accounts, credit cards, loans, and more with ease. Our personal banking services are tailored to meet your individual financial needs.
              </p>
              <Link to="/personal" className="btn btn-custom">Learn More</Link>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src={img2} className="card-img-top" alt="Business Banking" />
            <div className="card-body">
              <h5 className="card-title">Business Banking</h5>
              <p className="card-text">
                Business solutions designed to meet your company's growing needs. From managing cash flow to business loans, we have you covered.
              </p>
              <Link to="/business" className="btn btn-custom">Learn More</Link>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src={img3} className="card-img-top" alt="Wealth Management" />
            <div className="card-body">
              <h5 className="card-title">Wealth Management</h5>
              <p className="card-text">
                Plan for your financial future with expert guidance and tailored investment strategies. Let us help you build and manage your wealth.
              </p>
              <Link to="/wealth-management" className="btn btn-custom">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const Dashboard = ({ currentAccountBalance, savingsAccountBalance, transactions, onDeposit, onWithdraw, onTransfer, onLogout }) => {
  const [amount, setAmount] = useState(0);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [transferData, setTransferData] = useState({
    amount: '',
    recipient: '',
    accountType: 'current', // default to current account
  });

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    onDeposit(parseFloat(amount));
    setAmount(0); // Reset amount
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    onWithdraw(parseFloat(amount));
    setAmount(0); // Reset amount
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    onTransfer(e, transferData); // Call the transfer handler

    // Reset transfer form after submission
    setTransferData({
      amount: '0',
      recipient: '...',
      accountType: 'current', // Reset to default account type
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <h2>Welcome to Your Dashboard</h2>
      <p>Here you can view your recent transactions, manage accounts, and access banking services.</p>

      <div className="row">
        <div className="col-md-6">
          <h4>Account Balance</h4>
          <p>Current Account: ${currentAccountBalance}</p>
          <p>Savings Account: ${savingsAccountBalance}</p>
        </div>
        <div className="col-md-6">
          <h4>Recent Transactions</h4>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.type}: ${transaction.amount} on {transaction.date}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Deposit</h4>
          <form onSubmit={handleDepositSubmit}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="form-control mb-2"
              required
            />
            <button type="submit" className="btn btn-success">Deposit</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Withdraw</h4>
          <form onSubmit={handleWithdrawSubmit}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="form-control mb-2"
              required
            />
            <button type="submit" className="btn btn-danger">Withdraw</button>
          </form>
        </div>
      </div>

      {/* Interac e-Money Transfer */}
      <button className="btn btn-primary mt-3" onClick={() => setShowTransferForm(true)}>
        Interac e-Money Transfer
      </button>

      {showTransferForm && (
        <div className="mt-4">
          <h3>Interac e-Money Transfer</h3>
          <form onSubmit={handleTransferSubmit}>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount to Send</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={transferData.amount}
                onChange={handleTransferChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient" className="form-label">Recipient (Email)</label>
              <input
                type="email"
                className="form-control"
                id="recipient"
                name="recipient"
                value={transferData.recipient}
                onChange={handleTransferChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accountType" className="form-label">Select Account</label>
              <select
                className="form-control"
                id="accountType"
                name="accountType"
                value={transferData.accountType}
                onChange={handleTransferChange}
              >
                <option value="current">Current Account</option>
                <option value="savings">Savings Account</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Send Transfer</button>
          </form>
        </div>
      )}
    </div>
  );
};

const Personal = () => <h1>Personal Banking Services</h1>;

const Business = () => <h1>Business Banking Services</h1>;

const WealthManagement = () => <h1>Wealth Management</h1>;

export default App;
