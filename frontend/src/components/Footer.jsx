function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">🔍 CampusConnect</div>
          <p className="footer-text">
            Smart Lost & Found platform for college campuses — Built with ❤️
          </p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/create-item">Report Item</a>
        </div>

        <div>
          <div className="footer-tech">
            <span className="footer-tech-badge">React</span>
            <span className="footer-tech-badge">Node.js</span>
            <span className="footer-tech-badge">MongoDB</span>
            <span className="footer-tech-badge">Express</span>
          </div>
          <p className="footer-text" style={{ marginTop: "8px" }}>
            © {currentYear} CampusConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
