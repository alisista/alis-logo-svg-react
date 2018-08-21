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
    
    let circle_color = this.props.circle_color
    if(this.props.colors == undefined && this.circle_color == undefined){
      circle_color = `#5E68AF`
    }
    let colors = this.props.colors || [`#454A75`,`#51578A`,`#5C629C`,`#686FB0`,`#7880CC`,`#848DE0`]
    
    this.state = {
      id: this.props.id || `alis_logo`,
      colors: colors,
      circle_color: circle_color,
      size: this.props.size || 300,
      number_of_colors: this.props.number_of_colors || this.colors,
      backgroundColor: this.props.backgroundColor || false,
      shuffle: this.props.shuffle || false,
      nomargin: this.props.nomargin || false
    }
  }
  
  download(file_name){
    var canvas = document.getElementById(`c`)
    canvas.width = this.state.size
    canvas.height = this.state.size
    
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
      a.download = file_name || `alis_logo_` + this.state.size + `px.png`
      a.click()
      window.URL.revokeObjectURL(uri)
      document.body.removeChild(a)
    }
    img.src = url
  }
  
  getCircleColor(colors){
    let circle_color = this.state.circle_color
    if(circle_color == undefined){
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
    let len = this.state.colors.length
    for(let i = 0; i < len; i += 1){
      nums.push(i)
    }
    for(let i = 0; i < len; i += 1){
      let n = 0
      if(this.props.shuffle === true){
	n = Math.floor(Math.random() * nums.length)
      }
      colors.push(this.state.colors[nums[n]])
      nums.splice(n, 1)
    }
    if(this.state.number_of_colors !== undefined && this.state.number_of_colors > 0){
      colors = colors.slice(0, this.state.number_of_colors, 1)
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
    
    let size_adjusted = this.state.size
    let minus = 0
    if(this.props.nomargin === true){
      size_adjusted = (this.state.size / 0.82) * 0.95
      minus = this.state.size * (0.95 - 0.82)
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
    // get circle color
    let circle_color = this.getCircleColor(colors)
    
    return (<circle key="circle" cx={this.state.size / 2} cy={this.state.size / 2} r={(this.state.size / 2) * ratio} fill="none" stroke={circle_color} strokeWidth={this.state.size / 25} />)
  }
  
  getBackground(){
    let background = null
    if(this.state.backgroundColor !== false){
      background = (<rect key="background" x="0" y="0" width={this.state.size} height={this.state.size} fill={this.state.backgroundColor} />)
    }
    
    return background
  }
  
  render(){
    let ratio = 0.82
    if(this.props.nomargin === true){
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
      <svg id={this.props.id} style={{height: this.state.size + "px", width: this.state.size + "px"}}>
	{background}
	{tiles}
	{circle}
      </svg>
    )
  }
  
}

export default ALIS_LOGO
