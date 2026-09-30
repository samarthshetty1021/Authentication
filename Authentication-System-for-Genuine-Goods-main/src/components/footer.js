import React from 'react';
import '../style/footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <h2>Contact Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 123-456-7890</p>
        <p>Address: 123 Street, City, Country</p>
      </div>
      <hr className="footer-divider" />

      <div className="footer-section">
        <h2>Services</h2>
        <ul>
          <li>Service 1</li>
          <li>Service 2</li>
          <li>Service 3</li>
        </ul>
      </div>
      <hr className="footer-divider" />

      <div className="footer-section">
        <h2>Social Media Links</h2>
        <ul>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
