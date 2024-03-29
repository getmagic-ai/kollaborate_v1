const InvitationEmail = () => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        Hello! You have been invited to Kollaborate.co
      </div>
      <h1>Click the button below to get started.</h1>
      <a href={process.env.NEXT_PUBLIC_APP_URL} style={buttonStyle}>
        Join Now
      </a>
      <p>
        If the button above doesn't work, you can also copy and paste the
        following link into your browser:
        <br />
        <a href={process.env.NEXT_PUBLIC_APP_UR}>
          https://kollaborate.vercel.app
        </a>
      </p>
      <p>Thank you for joining our community!</p>
    </div>
  );
};

export default InvitationEmail;
