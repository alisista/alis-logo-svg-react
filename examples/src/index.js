import React from 'react'
import { render } from 'react-dom'
import ALIS_LOGO from '../../src'
const App = () => (
  <ALIS_LOGO number_of_colors={1} colors={['red','blue', 'yellow']} shuffle={true} />
)
render(<App />, document.getElementById("root"))
