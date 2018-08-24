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
    const size = this.props.size || 300

    canvas.width = size
    canvas.height = size
    if(this.props.type == `logo+letters`){
      canvas.height = size / 3
    }else if(this.props.type == `logo+letters+slogan`){
      canvas.height = size / 2
      if(size == 531){
	canvas.height = 288
      }
    }
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
      win.revokeObjectURLog(url)
      const uri = canvas.toDataURL(`image/png`).replace(`image/png`, `octet/stream`)
      let a = document.createElement(`a`)
      document.body.appendChild(a)
      a.style = `display: none`
      a.href = uri
      a.download = file_name || `alis_logo_${size}px.png`
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
  
  getTiles_letters(ratio, colors, scale = 1, top = 0, left = 0, ratio2 = 1){
    let {points_ali: letter_points, points_s: s_points}   = this.getPoints_letters(ratio, scale, top, left)
    let letters = [
      [0, 1, 4, 5, 6, 3, 2],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16],
      [17, 18, 19, 20]
    ]
    
    let tile_colors = [0, 1, 2, 3, 4, 5].map((v)=>{
      return v % colors.length
    })
    let points = []
    let i = 0
    for(let v of letters){
      let pts2 = []
      for(let pt of v){
	pts2.push(letter_points[pt].join(` `))
      }
      points.push(<path d={`M${pts2.join(`, `)} Z`} stroke={colors[tile_colors[i]]} fill={colors[tile_colors[i]]} />)
      i += 1
    }
    
    points.push(this.makePath(`MCCLCCZ`, s_points, colors[tile_colors[i]]))
    i += 1
    if(this.props.type === `logo+letters+slogan`){
      points = points.concat(this.getSlogan(colors[tile_colors[i]], ratio2))
    }
    return points
  }
  
  makePath(routes, points, color){
    let path = []
    let cursor = 0
    const paths_route = routes.split(``)
    for(let r of paths_route){
      let d = r
      if(r !== `Z`){
	if(r !== `M`){
	  d += ` `
	}
	let number_of_points = 1
	if(r === `C`){
	  number_of_points = 3
	}
	for(let i2 = 0; i2 < number_of_points; i2++){
	  if(i2 !== 0){
	    d += `, `
	  }
	  d += `${points[cursor][0]} ${points[cursor][1]}`
	  cursor += 1
	}
      }
      path.push(d)
    }
    return <path d={path.join(` `)} stroke={color} fill={color} />
  }
  
  getSlogan(color, ratio2){
    let points = []
    let fontSize = 16 * ratio2
    let letterSpacing = 7 * ratio2
    let texts = this.props.text.split('\n')
    let t1 = 185
    let t2 = 220
    if(this.props.size == 531){
      t1 = 190
      t2 = 230
      if(texts.length < 2){
	t1 = 205
      }
    }else{
      if(texts.length < 2){
	t1 = 200
      }
    }
    points.push(<text fontSize={fontSize+"px"} letterSpacing={letterSpacing+"px"} x={(this.props.size || 300) / 2} y={t1 * ratio2} fill={color} textAnchor="middle" className="heavy">{texts[0]}</text>)
    if(texts.length > 1){
      points.push(<text fontSize={fontSize+"px"} letterSpacing={letterSpacing+"px"} x={(this.props.size || 300) / 2} y={t2 * ratio2} fill={color} textAnchor="middle" className="heavy">{texts[1]}</text>)
    }	
    return points
  }
  
  getTiles(ratio, colors, scale = 1, top = 0, left = 0, ratio2 = 1){
    let points = this.getPoints(ratio, scale, top, left, ratio2)

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
  
  getPoints_letters(ratio, scale, top, left){
    top = top * scale * ratio
    left = left * scale * ratio
    let letter_points = [
      [28,146],
      [51,146],
      [84,19],
      [106,19],
      [95,46],
      [138,147],
      [161,147],

      [194,19],
      [216,19],
      [216,125],
      [283,125],
      [283,147],	
      [194,147],

      [319,19],
      [319,50],
      [341,39],
      [341,19],
      
      [319,61],	
      [319,147],
      [341,147],
      [341,50],
      
      [460,50],
      [471,34],
      [392,114],		
      [379,129],		
    ]
    let s_points = [
      [391, 112],
      [436, 154],
      [491, 107],
      [424, 92],
      [340, 73],
      [396, -19],
      [472, 33],
      [460, 50],
      [415, 17],
      [370, 61],
      [440, 75],
      [513, 94],
      [465, 189],
      [377, 129]
    ]
    letter_points.forEach((p, i)=>{
      let i2 = 0
      for(let p2 of p){
	let move
	if(i2 === 1){
	  move = top
	}else{
	  move = left
	}
	letter_points[i][i2] = scale * ratio * p2 + move
	i2 += 1
      }
      i += 1
    })
    s_points.forEach((p, i)=>{
      let i2 = 0
      for(let p2 of p){
	let move
	if(i2 === 1){
	  move = top
	}else{
	  move = left
	}
	s_points[i][i2] = scale * ratio * p2 + move
	i2 += 1
      }
      i += 1
    })
    return {points_ali: letter_points, points_s: s_points}
  }
  
  getPoints(ratio, scale = 1, top = 0, left = 0, ratio2 = 1){
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
    
    const size = (this.props.size || 300) * scale
    top = top * scale * ratio2
    left = left * scale * ratio2
    let size_adjusted = size
    let minus = 0
    let nomargin = this.props.nomargin || false
    if(nomargin === true && this.props.type == `logo`){
      size_adjusted = (size / 0.82) * 0.95
      minus = size * (0.95 - 0.82)
    }

    points.forEach((p, i)=>{
      let i2 = 0
      for(let p2 of p){
	p2 -= minus
	let mult = 0.25
	let move
	if(i2 === 1){
	  mult = 0.221
	  move = top
	}else{
	  move = left
	}
	points[i][i2] = (((size_adjusted / 300) * p2) * 0.5 + (size_adjusted) * mult) + move
	i2 += 1
      }
      i += 1
    })
    
    return points
    
  }
  
  getCircle(ratio, colors, scale = 1, top = 0, left = 0, ratio2 = 1){
    const size = (this.props.size || 300) * scale
    top = top * ratio2 * scale
    left = left * ratio2 * scale

    let circle_color = this.getCircleColor(colors)
    
    return (<circle key="circle" cx={((size) / 2) + left} cy={((size) / 2) + top} r={(size / 2) * ratio} fill="none" stroke={circle_color} strokeWidth={size / 25} />)
  }
  
  getBackground(){
    const size = this.props.size || 300    
    let background = null
    
    if(this.props.backgroundColor !== undefined && this.props.backgroundColor !== false){
      let height = size
      if(this.props.type == 'logo+letters'){
	height = size / 3
      }else if(this.props.type == `logo+letters+slogan`){
	height = size / 2
	if(size == 531){
	  height = 288
	}
	
      }
      background = (<rect key="background" x="0" y="0" width={size} height={height} fill={this.props.backgroundColor} />)
    }
    
    return background
  }
  
  render(){
    const shuffle = this.state.shuffle
    const size = this.props.size || 300
    
    const colors = this.getColors()

    const background = this.getBackground()
    let defs, tiles_logo, tiles_letters, circle, height, ratio_letters, scale_letters, top_letters, left_letters, ratio_logo2, ratio_letters2, ratio_logo, top_logo, left_logo, scale
    const types = {
      logo: {logo: true},
      letters: {letters: true},
      "logo+letters": {logo: true, letters: true},
      "logo+letters+slogan": {logo: true, letters: true, slogan: true}
    }
    const type = types[this.props.type]
    if(this.props.type == `logo+letters+slogan`){
      ratio_logo = 0.82
      ratio_logo2 =  (size / 500)
      top_logo = 35
      left_logo = 35
      scale = 0.3
      if(size == 531){
	scale = 0.25
	top_logo = 50
	left_logo = 200
      }
      
      ratio_letters = (size * 0.7) / 500
      top_letters = 45
      left_letters = 225
      scale_letters = 0.95
      ratio_letters2 = ratio_logo2
      if(size == 531){
	scale_letters = 0.95 * (0.25 / 0.3)
	top_letters = 55
	left_letters = 310
	height = 288
      }

      height = size / 2
      
    }else if(this.props.type == `logo+letters`){
      ratio_logo = 0.82
      ratio_logo2 =  (size / 500)
      top_logo = 35
      left_logo = 35
      scale = 0.3
      
      ratio_letters = (size * 0.7) / 500
      top_letters = 40
      left_letters = 225
      scale_letters = 0.95

      height = size / 3
      
    }else if(this.props.type == `letters`){
      ratio_letters = size / 500
      tiles_letters = this.getTiles_letters(ratio_letters, colors)
      return (
	<svg id={this.props.id} style={{height: (size/3) + "px", width: size + "px"}}>
	  {background}
	  {tiles_letters}
	</svg>
      )
      
    }else{
      ratio_logo = 0.82
      let nomargin = this.props.nomargin || false
      if(nomargin === true){
	ratio_logo = 0.95
      }

      height = size
    }

    if(type.logo === true){
      tiles_logo = this.getTiles(ratio_logo, colors, scale, top_logo, left_logo, ratio_logo2)
      circle = this.getCircle(ratio_logo, colors, scale, top_logo, left_logo, ratio_logo2)      
    }
    if(type.letters === true){
      tiles_letters = this.getTiles_letters(ratio_letters, colors, scale_letters, top_letters, left_letters, ratio_logo2)
    }
    if(type.slogan === true){
      defs = (
	<defs>
	  <style type="text/css">
	    {`@import url('https://fonts.googleapis.com/earlyaccess/sawarabigothic.css');`}
	    {`text {font-family: "Sawarabi Gothic";}`}
	  </style>
	</defs>
      )
    }
    return (
      <svg id={this.props.id} style={{height: height + "px", width: size + "px"}}>
	{defs}
	{background}
	{tiles_logo}
	{circle}
	{tiles_letters}
      </svg>
    )
  }
}

export default ALIS_LOGO
