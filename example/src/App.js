import React from 'react'

import { useMyHook } from 'use-query-params'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
