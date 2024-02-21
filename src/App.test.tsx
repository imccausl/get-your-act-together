import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from './App'

const customRender = (props = {}) => {
    const user = userEvent.setup()
    return {
        user,
        ...render(<App {...props} />),
    }
}

it('renders the app', () => {
    customRender()
    expect(
        screen.getByRole('heading', { name: /hello world/i }),
    ).toBeInTheDocument()
})
