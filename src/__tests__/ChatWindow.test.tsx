import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('../api/client', async () => {
  return {
    sendChat: vi.fn().mockResolvedValue('Hail, seeker.'),
  }
})

import ChatWindow from '../components/ChatWindow'
import { sendChat } from '../api/client'

describe('ChatWindow', () => {
  it('sends a message and displays assistant reply', async () => {
    const user = userEvent.setup()
    render(<ChatWindow />)

    const input = screen.getByLabelText(/message/i)
    await user.type(input, 'What is the truth?')
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(sendChat).toHaveBeenCalled()

    // User message should appear
    expect(await screen.findByText('What is the truth?')).toBeInTheDocument()

    // Assistant message should appear after promise resolves
    await waitFor(async () => {
      expect(await screen.findByText('Hail, seeker.')).toBeInTheDocument()
    })
  })
})

