var Overturn = React.createClass({
    getInitialState: function() {
        return {
            mouseover:false,
            index:this.props.index!=undefined?this.props.index:0,
            count:this.props.count!=undefined?this.props.count:4,
            duration:this.props.duration!=undefined?this.props.duration:0.5,
            difference:this.props.difference!=undefined?this.props.difference:0.1,
            width:this.props.width!=undefined?this.props.width:200,
            height:this.props.height!=undefined?this.props.height:200,
            dir:this.props.dir!=undefined?this.props.dir:"top",
            reverse:this.props.reverse!=undefined?this.props.reverse:false,
            className:this.props.className!=undefined?this.props.className:""
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
    createBoxH:function(width,height,index,count,angle,transition){
        var temp = (count-1)*0.5;       
        var BoxStyle = {width:width,
                        height:height,
                        top:index*height,
                        transition:transition,
                        zIndex:temp-Math.abs(index-temp),
                        transform: "translateZ(" + (-width*0.5) + "px)" + "rotateY(" + angle + "deg)"                        
                       };
        var tempStyle = {width:width,
                          height:height,
                          backgroundSize: "auto calc(100% * " + count + ")",
                          backgroundPosition: "50% calc("+ ((count<=1)?0:(index/(count-1))) +" * 100%)"                      
                         };        
        var Box01Style = Object.assign({transform: 'rotateY(0deg) translateZ('+(width*0.5)+'px)',
                          backgroundImage: "url("+this.props.src[this.state.index]+")"                         
                         },tempStyle);
        var Box02Style = Object.assign({transform: 'rotateY(' +(angle>0?-90:90)+'deg) translateZ('+(width*0.5)+'px)',
                          backgroundImage: "url("+this.props.src[(this.state.index + 1)%this.props.src.length]+")"                         
                         },tempStyle);
            
        var a = <div key = {index} className = "Box" style = {BoxStyle} >
                    <div className = "Box01" style = {Box01Style} ></div>                 
                    <div className = "Box02" style = {Box02Style} ></div>
                    <div className = "Box03" style = {{width:width,height:width,transform: 'rotateX(-90deg) translateZ('+(height-width*0.5)+'px)'}} ></div> 
                    <div className = "Box04" style = {{width:width,height:width,transform: 'rotateX(90deg) translateZ('+(width*0.5)+'px)'}} ></div>  
                </div>;
        return a;
    }, 
    createBoxV:function(width,height,index,count,angle,transition){        
        var temp = (count-1)*0.5;
        var BoxStyle = {width:width,
                        height:height,
                        left:index*width,
                        transition:transition,
                        zIndex:temp-Math.abs(index-temp),
                        transform: "translateZ(" + (-height*0.5) + "px)" + "rotateX(" + angle + "deg)"                        
                       };
        var tempStyle = {width:width,
                          height:height,
                          backgroundSize: "calc(100% * " + count + ") auto",
                          backgroundPosition: "calc("+ ((count<=1)?0:(index/(count-1))) +" * 100%) 50%"                      
                         };        
        var Box01Style = Object.assign({transform: 'rotateX(0deg) translateZ('+(height*0.5)+'px)',
                          backgroundImage: "url("+this.props.src[this.state.index]+")"                         
                         },tempStyle);
        var Box02Style = Object.assign({transform: 'rotateX(' +(angle>0?-90:90)+'deg) translateZ('+(height*0.5)+'px)',
                          backgroundImage: "url("+this.props.src[(this.state.index + 1)%this.props.src.length]+")"                         
                         },tempStyle);
            
        var a = <div key = {index} className = "Box" style = {BoxStyle} >
                    <div className = "Box01" style = {Box01Style} ></div>                 
                    <div className = "Box02" style = {Box02Style} ></div>
                    <div className = "Box03" style = {{width:height,height:height,transform: 'rotateY(-90deg) translateZ('+(height*0.5)+'px)'}} ></div> 
                    <div className = "Box04" style = {{width:height,height:height,transform: 'rotateY(90deg) translateZ('+(width-height*0.5)+'px)'}} ></div>  
                </div>;
        return a;
    }, 
    render: function() {   
        var count = this.state.count;
        var box = new Array(count);        
        var width = this.state.width;
        var height = this.state.height;
        var duration = this.state.duration; 
        var dir = this.state.dir;
        var reverse = this.state.reverse;
        for(var i=0;i<count;i++){
            var ii = reverse?count-1-i:i;
            var transition = this.state.mouseover ? "transform " + duration + "s " + (ii*this.state.difference) +"s":"";        
            var angle = this.state.mouseover ? 90:0;
            if(dir=="bottom" || dir=="left"){
                angle*=-1;
            }
            if(dir=="top" || dir=="bottom"){
                box[i]=this.createBoxV(width/count,height,i,count,angle,transition);
            }else if(dir=="left" || dir=="right"){
                box[i]=this.createBoxH(width,height/count,i,count,angle,transition);
            }
        }
        return (
            <div ref = "overturn" className = {"Overturn " + this.state.className} style = {{width:width,height:height}} onClick = {this.onClick} >
                <div className = "Space" style = {{width:width,height:height}} >
                    {box}
                </div>
            </div> 
        );
    }
});
ReactDOM.render(
    <Overturn dir = "top" src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example01_0')
);
ReactDOM.render(
    <Overturn dir = "right" src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example01_1')
);
ReactDOM.render(
    <Overturn dir = "bottom" src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example01_2')
);
ReactDOM.render(
    <Overturn dir = "left" src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example01_3')
);

ReactDOM.render(
    <Overturn className = {"Overturn02"} reverse = {true} index = {1} width = {400} height = {200} duration = {0.3} difference = {0.05} count = {20} src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example02')
);

ReactDOM.render(
    <Overturn index = {2} duration = {0.75} difference = {0.1} count = {10} src = {["image01.jpg","image02.jpg","image03.jpg"]} />,
    document.getElementById('example03')
);

