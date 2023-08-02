'use client'

import React, { Button, useState } from 'react'
import Cyber, { Message, LoggingMiddleware } from 'cyber-js-core'

export default function Page() {
  const [value, setValue] = useState('');

  React.useEffect(() => {
    Cyber.middlewares = [
      new LoggingMiddleware()
    ]

    Cyber.scriptAdapter = {
      dispatchToScript: (message: Message) => {
        if (message.type === 'hello-from-native') {
          setValue(message.payload)
        }
      }
    }

    // Cleanup.
    return () => {
      Cyber.scriptAdapter = undefined
    }
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <p>From native: {this.state.value}</p>
        <Button
          onClick={() => {
            Cyber.dispatchToNative({ type: 'hello-from-script' })
          }}>
          Dispatch to Native
        </Button>
      </div>
    </main>
  )
}
