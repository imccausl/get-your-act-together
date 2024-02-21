import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import debounce from 'lodash/debounce'
import React from 'react'

import App from '.'

jest.mock('lodash/debounce')

const customRender = (props = {}) => {
    const user = userEvent.setup()
    return {
        user,
        ...render(<App {...props} />),
    }
}

describe('with mocked debounce', () => {
    beforeEach(() => {
        ;(debounce as jest.MockedFn<any>).mockImplementation((fn: any) => {
            fn.cancel = jest.fn()
            return fn
        })
    })
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('does not need fake timers -- no act errors', async () => {
        const { user } = customRender()
        expect(screen.queryByRole('status')).not.toBeInTheDocument()
        await user.type(
            screen.getByRole('textbox', { name: /enter something/i }),
            'some',
        )

        expect(await screen.findByRole('status')).toHaveTextContent(
            'Input must be at least 5 characters long',
        )
    })
})
