## A Customizable ALIS Logo as a React Component

[![npm package](https://nodei.co/npm/alis-logo-svg-react.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/alis-logo-svg-react/)

![example logo](https://raw.githubusercontent.com/alisista/alis-logo-svg-react/master/assets/example_logo.png "Example Logo")

---


## Table of contents

- [Installation](#installation)
- [Demo](#demo)
- [Example](#example)
- [Contributors](#contributors)


---


## Installation

```js
yarn add alis-logo-svg-react
```
---

## Demo

[https://alis.ocrybit.com/logo/](https://alis.ocrybit.com/logo/)

---

## example

```js
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
    const colors = [`#454A75`, `#51578A`, `#5C629C`, `#686FB0`, `#7880CC`, `#848DE0`]
    return (
      <ALIS_LOGO
	    ref={this.ref}
	    id="alis_logo"
	    colors={colors}
	    number_of_colors={6}
	    circle_color="#5E68AF"
	    backgroundColor={false}
	    shuffle={true}
	    nomargin={true}
	    size={531}
		type={`logo+letters+slogan`}
		text={`信頼できる記事と人々を明かにする\n全く新しいソーシャルメディア`}
	    />
    )
  }
}

render(<App />, document.getElementById("root"))
```

---

## Contributors

- [OK Rabbit (@ocrybit)](https://github.com/ocrybit)


