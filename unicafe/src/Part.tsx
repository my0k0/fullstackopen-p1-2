import React from "react";

const Part = ({statistics}) => {
    return <table>
        {
            statistics.map(stat => {
                return <tr>
                    <td>{stat.text}</td>
                    <td>{stat.value}</td>
                </tr>
            })
        }
    </table>
}

export default Part;