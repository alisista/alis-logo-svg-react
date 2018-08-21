import React, { Component } from 'react'

class ALIS_LOGO extends Component{
  constructor(props){
    super(props)

    this.tiles = [
      [1,2,3],
      [3,4,1],
      [4,3,5],
      [6,5,4],
      [5,6,7],
      [7,8,5],
      [5,9,8],
      [5,9,10],
      [10,9,12],
      [11,12,10]      
    ]
    
    this.state = {
      id: this.props.id || `alis_logo`,
      shuffle: this.props.shuffle,
      update: Date.now()
    }
  }
  shuffle(){
    this.setState({shuffle: true, update:Date.now()})
  }  
  download(file_name){
    let canvas = document.getElementById(`c`)
    let size = this.props.size || 300

    canvas.width = size
    canvas.height = size
    
    let svg = document.getElementById(this.props.id)
    let div = document.getElementById(`d`)
    div.innerHTML= svg.outerHTML
    svg = div.querySelector(`svg`)
    
    const data = new XMLSerializer().serializeToString(svg)
    let win = window.URL || window.webkitURL || window
    let img = new Image()
    const blob = new Blob([data], { type: `image/svg+xml` })
    const url = win.createObjectURL(blob)
    
    img.onload =  ()=> {
      canvas.getContext(`2d`).drawImage(img, 0, 0)
      win.revokeObjectURL(url)
      const uri = canvas.toDataURL(`image/png`).replace(`image/png`, `octet/stream`)
      let a = document.createElement(`a`)
      document.body.appendChild(a)
      a.style = `display: none`
      a.href = uri
      a.download = file_name || `alis_logo_` + size + `px.png`
      a.click()
      window.URL.revokeObjectURL(uri)
      document.body.removeChild(a)
    }
    img.src = url
  }
  componentWillReceiveProps(props){
    if(this.state.shuffle !== props.shuffle){
      this.setState({shuffle: props.shuffle})
    }
  }
  getCircleColor(colors){
    let circle_color = this.props.circle_color
    if(this.props.colors == undefined && this.circle_color == undefined){
      circle_color = `#5E68AF`
    }else if(circle_color == undefined){
      circle_color = colors[Math.floor(Math.random() * colors.length)]
    }
    
    return circle_color
  }
  
  getTiles(ratio, colors){
    // calculate actual points
    let points = this.getPoints(ratio)

    // get tile colors
    let tile_colors = [0, 1, 2, 3, 4, 5, 2, 3, 0, 1].map((v)=>{
      return v % colors.length
    })
    
    let tiles = []
    this.tiles.forEach((v, i)=>{
      let color = colors[tile_colors[i]]
      tiles.push(
	<path
	  key={`tile-${i}`}
	  fill={color}
	  stroke={color}
	  d={`M ${points[v[0]-1].join(` `)} L ${points[v[1]-1].join(` `)} L ${points[v[2]-1].join(` `)} L ${points[v[0]-1].join(` `)}`}
	  />
      )
    })
    
    return tiles
  }
  
  getColors(){
    let colors = []
    let nums = []
    let prop_colors = this.props.colors || [`#454A75`,`#51578A`,`#5C629C`,`#686FB0`,`#7880CC`,`#848DE0`]
    let len = prop_colors.length
    for(let i = 0; i < len; i += 1){
      nums.push(i)
    }
    for(let i = 0; i < len; i += 1){
      let n = 0
      if(this.state.shuffle === true){
	n = Math.floor(Math.random() * nums.length)
      }
      colors.push(prop_colors[nums[n]])
      nums.splice(n, 1)
    }
    let number_of_colors = this.props.number_of_colors || this.colors
    if(number_of_colors !== undefined && number_of_colors > 0){
      colors = colors.slice(0, number_of_colors, 1)
    }
    
    return colors
  }
  
  getPoints(ratio){
    let points = [
      [0, 300],
      [77, 300],
      [120, 182],
      [61, 135],
      [150, 100],
      [92, 50],
      [110, 0],
      [186, 0],
      [237, 135],
      [177, 182],
      [220, 300],
      [300, 300]      
    ]
    
    let size = this.props.size || 300
    let size_adjusted = size
    let minus = 0
    let nomargin = this.props.nomargin || false
    if(nomargin === true){
      size_adjusted = (size / 0.82) * 0.95
      minus = size * (0.95 - 0.82)
    }

    points.forEach((p, i)=>{
      let i2 = 0
      for(let p2 of p){
	p2 -= minus
	let mult = 0.25
	if(i2 === 1){
	  mult = 0.221
	}
	points[i][i2] = ((size_adjusted / 300) * p2) * 0.5 + (size_adjusted * mult)
	i2 += 1
      }
      i += 1
    })
    
    return points
    
  }
  
  getCircle(ratio, colors){
    let size = this.props.size || 300    
    // get circle color
    let circle_color = this.getCircleColor(colors)
    
    return (<circle key="circle" cx={size / 2} cy={size / 2} r={(size / 2) * ratio} fill="none" stroke={circle_color} strokeWidth={size / 25} />)
  }
  
  getBackground(){
    let size = this.props.size || 300    
    let background = null
    
    if(this.props.backgroundColor !== undefined && this.props.backgroundColor !== false){
      background = (<rect key="background" x="0" y="0" width={size} height={size} fill={this.props.backgroundColor} />)
    }
    
    return background
  }
  
  render(){
    let shuffle = this.state.shuffle
    let size = this.props.size || 300
    let ratio = 0.82
    let nomargin = this.props.nomargin || false
    if(nomargin === true){
      ratio = 0.95
    }
    // get colors
    let colors = this.getColors()

    // get background
    let background = this.getBackground()


    // generate tiles
    let tiles = this.getTiles(ratio, colors)
    
    let circle = this.getCircle(ratio, colors)
    
    return (
      <svg id={this.props.id} style={{height: size + "px", width: size + "px"}}>
	{background}
	{tiles}
	{circle}
      </svg>
    )
  }
  
}

export default ALIS_LOGO
