import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {

    const total = course.parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total total={total}></Total>
        </div>
    )
}

export default Course