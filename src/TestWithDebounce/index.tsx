import debounce from 'lodash/debounce'
import React, { useMemo, useState } from 'react'

const validateInputField = (value: string) => {
    if (value.length < 5) {
        return 'Input must be at least 5 characters long'
    } else if (value !== 'idaho') {
        return 'Input must be idaho -- all lower case'
    }
    return ''
}

const TestWithDebounce: React.FC = () => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [shouldShowError, setShouldShowError] = useState<boolean>(false)

    const debouncedSetError = useMemo(
        () =>
            debounce(() => {
                setShouldShowError(true)
            }, 2000),
        [setShouldShowError],
    )

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setValue(event.currentTarget.value)

        const message = validateInputField(event.currentTarget.value)
        if (message) {
            debouncedSetError()
        } else {
            debouncedSetError.cancel()
        }

        setError(message)
    }

    return (
        <main>
            <h1>Hello world</h1>
            <h2>Press button to increase count</h2>
            <label>
                Enter something:
                <input
                    onChange={handleOnChange}
                    type="text"
                    name="random_input"
                />
            </label>
            {shouldShowError && error ? (
                <p role="status" style={{ color: 'red' }}>
                    {error}
                </p>
            ) : null}
            <p>Input: {value}</p>
        </main>
    )
}

export default TestWithDebounce
