import React from "react"

const Filter = ({handler}) => {
    return <div>
        filter shown with <input type="text" onChange={handler}/>
    </div>
}

export default Filter