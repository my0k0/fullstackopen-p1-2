const Notification = ({ message, status }) => {
  const notiStyle = {
    color: status ? "green" : "red",
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null || message.trim() === "") return null;
  return <div style={notiStyle}>{message}</div>;
};

export default Notification;
