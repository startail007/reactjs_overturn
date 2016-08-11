var getPosition = function(el) {
  var Rect = el.getBoundingClientRect();
  return {x:Rect.left + window.scrollX,y:Rect.top + window.scrollY};
}

var Box = React.createClass({
    render: function() {
        var width = this.props.width;
        var height = this.props.height;
        var index = this.props.index;
        var length = this.props.count;
        var rate = (length<=1)?0:(index/(length-1));
        var angle = this.props.active ? 90:0;         
        var BoxStyle = {width:width,
                        height:height,
                        left:index*width,
                        transition:this.props.transition,
                        zIndex:this.props.zIndex,
                        transform: "translateZ(" + (-height*0.5) + "px)" + "rotateX(" + angle + "deg)"                        
                       };
        var Box01Style = {width:width,
                          height:height,
                          transform: 'rotateX(0deg) translateZ('+(height*0.5)+'px)',
                          backgroundSize: "calc(100% * " + length + ") auto",
                          backgroundPosition: "calc("+ rate +" * 100%) 50%",
                          backgroundImage: "url("+this.props.src01+")"                          
                         };
        var Box02Style = {width:width,
                          height:height,
                          transform: 'rotateX(-90deg) translateZ('+(height*0.5)+'px)',
                          backgroundSize: "calc(100% * " + length + ") auto",
                          backgroundPosition: "calc("+ rate +" * 100%) 50%",
                          backgroundImage: "url("+this.props.src02+")"    
                         };
        return (
            <div className = "Box" style = {BoxStyle} >
                <div className = "Box01" style = {Box01Style} ></div>                 
                <div className = "Box02" style = {Box02Style} ></div>
                <div className = "Box03" style = {{width:height,height:height,transform: 'rotateY(-90deg) translateZ('+(height*0.5)+'px)'}} ></div> 
                <div className = "Box04" style = {{width:height,height:height,transform: 'rotateY(90deg) translateZ('+(width-height*0.5)+'px)'}} ></div>  
            </div>
        );
    }
});
var Overturn = React.createClass({
    getInitialState: function() {
        return {
            mouseover:false,
            index:this.props.index!=undefined?this.props.index:0,
            count:this.props.count!=undefined?this.props.count:4,
            duration:this.props.duration!=undefined?this.props.duration:0.5,
            difference:this.props.difference!=undefined?this.props.difference:0.1,
            width:this.props.width!=undefined?this.props.width:200,
            height:this.props.height!=undefined?this.props.height:200
        };
    },
    onClick: function(e) {
        if(!this.state.mouseover){
           this.setState({mouseover:true});
            setTimeout(
            function(){
            var index = this.state.index + 1;
                index = index>=this.props.src.length?0:index;
              this.setState({mouseover:false,index:index});  
                
            }.bind(this),(this.state.duration + (this.state.count - 1)*this.state.difference)*1000
            )
        }        
    },
    render: function() {   
        var count = this.state.count;
        var a = new Array(count);        
        var width = this.state.width;
        var height = this.state.height;
        var width0 = width/count;
        
        var transition = this.state.mouseover ? "transform " + this.state.duration + "s":"";
        var temp = (count-1)*0.5;
        for(var i=0;i<count;i++){            
            var temp0 = transition +(this.state.mouseover ?" " + (i*this.state.difference)+"s":"");
            a[i]=<Box key = {i} index = {i} width = {width0} height = {height} zIndex = {temp-Math.abs(i-temp)} count = {count} active = {this.state.mouseover} src01 = {this.props.src[this.state.index]} src02 = {this.props.src[(this.state.index + 1)%this.props.src.length]} transition = {temp0}></Box>
        }
        return (
            <div ref = "overturn" className = "Overturn" style = {{width:width,height:height}} onClick = {this.onClick} >
                <div className = "Space" style = {{width:width,height:height}} >
                    {a}
                </div>
            </div> 
        );
    }
});
ReactDOM.render(
    <Overturn src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example01')
);

ReactDOM.render(
    <Overturn index = {1} width = {600} height = {300} duration = {0.3} difference = {0.05} count = {20} src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example02')
);

ReactDOM.render(
    <Overturn index = {2} duration = {0.75} difference = {0.1} count = {10} src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example03')
);

