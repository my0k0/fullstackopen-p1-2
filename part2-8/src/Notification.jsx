const Notification = ({message}) => {
    if (message === null || message.trim() === '')
        return null

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification