import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from '.'

const customRender = (props = {}) => {
    const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
    })
    return {
        user,
        ...render(<App {...props} />),
    }
}

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
})

it('produces an act error, and runs setState after the test is done', async () => {
    const { user } = customRender()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    await user.type(
        screen.getByRole('textbox', { name: /enter something/i }),
        'some',
    )

    expect(screen.getByRole('status')).toHaveTextContent(
        'Input must be at least 5 characters long',
    )
})

it('produces an act error, but runs setState at the correct time (while the component is still mounted)', async () => {
    const { user } = customRender()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    await user.type(
        screen.getByRole('textbox', { name: /enter something/i }),
        'some',
    )
    jest.runOnlyPendingTimers()

    expect(screen.getByRole('status')).toHaveTextContent(
        'Input must be at least 5 characters long',
    )
})

it.only('does not produce an act error', async () => {
    const { user } = customRender()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    await user.type(
        screen.getByRole('textbox', { name: /enter something/i }),
        'some',
    )
    act(() => jest.runOnlyPendingTimers())

    expect(screen.getByRole('status')).toHaveTextContent(
        'Input must be at least 5 characters long',
    )
})
