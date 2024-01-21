import React from "react";

const Button = ({label, handler}) => {
    return <button onClick={handler}>{label}</button>
}

export default Button;