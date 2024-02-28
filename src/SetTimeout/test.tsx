import { act, render, screen } from '@testing-library/react'
import userEvent, { type Options } from '@testing-library/user-event'
import React from 'react'

import App from '.'

const customRender = (
    config: {
        props?: Record<string, any>
        userEventOptions?: Options
    } = {},
) => {
    const user = userEvent.setup(config.userEventOptions)
    return {
        user,
        ...render(<App {...config.props} />),
    }
}

it('produces an act error, runs setState after the test is run', async () => {
    const { user } = customRender()
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /increase count/i }))
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
})

it('uses findBy* to select element', async () => {
    const { user } = customRender()
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /increase count/i }))
    expect(await screen.findByText(/count: 1/i)).toBeInTheDocument()
})

it('uses getBy* to select element', async () => {
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
