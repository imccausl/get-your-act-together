import React, { useState } from 'react'

const TestWithSetTimeout: React.FC = () => {
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState('')

    return (
        <main>
            <h1>Hello world</h1>
            <h2>Press button to increase count</h2>
            {message ? <p>{message}</p> : null}
            <button
                onMouseEnter={() => {
                    setTimeout(() => setMessage('I am hovering'), 0)
                }}
                onMouseLeave={() => {
                    setMessage('')
                }}
                onClick={() => {
                    setTimeout(() => setCount(count + 1), 0)
                }}
            >
                Increase count
            </button>
            <p>Count: {count}</p>
        </main>
    )
}

export default TestWithSetTimeout
