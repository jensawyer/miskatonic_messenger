import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatInput from '../components/ChatInput'

describe('ChatInput', () => {
  it('submits entered text and clears input', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)

    const input = screen.getByRole('textbox', { name: /message/i })
    await user.type(input, 'Hello there{enter}')

    expect(onSend).toHaveBeenCalledWith('Hello there')
    expect((input as HTMLInputElement).value).toBe('')
  })
})
