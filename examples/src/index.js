import React, { Component } from 'react'
import { render } from 'react-dom'
import ALIS_LOGO from '../../src'

class App extends Component {
  constructor(props){
    super(props)
    this.ref = React.createRef()
  }
  download(){
    this.ref.current.download()
  }
  shuffle(){
    this.ref.current.shuffle()
  }
  render(){
    return (
      <ALIS_LOGO
	ref={this.ref}
	id="alis_logo"
	colors={[`#454A75`, `#51578A`, `#5C629C`, `#686FB0`, `#7880CC`, `#848DE0`]}
	number_of_colors={6}
	circle_color="#5E68AF"
	backgroundColor={false}
	shuffle={true}
	nomargin={true}
	size={300}
	/>
    )
  }
}

render(<App />, document.getElementById("root"))

