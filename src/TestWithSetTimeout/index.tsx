import React, { useState } from 'react'

const App: React.FC = () => {
    const [count, setCount] = useState(0)

    return (
        <main>
            <h1>Hello world</h1>
            <h2>Press button to increase count</h2>
            <button
                onClick={() => {
                    debugger
                    setTimeout(() => setCount(count + 1), 10)
                }}
            >
                Increase count
            </button>
            <p>Count: {count}</p>
        </main>
    )
}

export default App
