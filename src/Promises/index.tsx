import React, { useState } from 'react'

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))
const TestWithPromises: React.FC = () => {
    const [count, setCount] = useState(0)

    return (
        <main>
            <h1>Hello world</h1>
            <h2>Press button to increase count</h2>
            <button
                onClick={() => {
                    wait().then(() => setCount(count + 1))
                }}
            >
                Increase count
            </button>
            <p>Count: {count}</p>
        </main>
    )
}

export default TestWithPromises
