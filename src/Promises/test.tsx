import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from '.'

const customRender = (props = {}) => {
    const user = userEvent.setup()
    return {
        user,
        ...render(<App {...props} />),
    }
}

it('produces an error', async () => {
    const { user } = customRender()
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /increase count/i }))
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
})

it('uses act on the click action', async () => {
    const { user } = customRender()
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
    await act(
        async () =>
            await user.click(
                screen.getByRole('button', { name: /increase count/i }),
            ),
    )
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
})

it('uses findBy* to select element', async () => {
    const { user } = customRender()
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /increase count/i }))
    expect(await screen.findByText(/count: 1/i)).toBeInTheDocument()
})
