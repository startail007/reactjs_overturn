var Overturn = React.createClass({
    getInitialState: function () {
        return {
            mouseover: false,
            index: this.props.index != undefined ? this.props.index : 0,
            count: this.props.count != undefined ? this.props.count : 4,
            duration: this.props.duration != undefined ? this.props.duration : 0.5,
            difference: this.props.difference != undefined ? this.props.difference : 0.1,
            width: this.props.width != undefined ? this.props.width : 200,
            height: this.props.height != undefined ? this.props.height : 200,
            dir: this.props.dir != undefined ? this.props.dir : "top",
            reverse: this.props.reverse != undefined ? this.props.reverse : false,
            className: this.props.className != undefined ? this.props.className : "",
            ImageData:this.props.ImageData || []
        };
    },
    componentDidMount: function (rootNode) {
        var overturn = this.refs.overturn.parentElement
        var rect = overturn.getBoundingClientRect();
        this.setState({ width: rect.width, height: rect.height })
        window.addEventListener('resize', this.resize)
    },
    resize: function () {
        var overturn = this.refs.overturn.parentElement
        var rect = overturn.getBoundingClientRect();
        this.setState({ width: rect.width, height: rect.height })
    },
    onClick: function (e) {
        if (!this.state.mouseover) {
            this.setState({ mouseover: true });
            setTimeout(
                function () {
                    var index = this.state.index + 1;
                    index = index >= this.state.ImageData.length ? 0 : index;

                    this.setState({ mouseover: false, index: index});

                }.bind(this), (this.state.duration + (this.state.count - 1) * this.state.difference) * 1000
            )
        }
    },
    createBoxH: function (width, height, index, count, angle, transition) {
        var temp = (count - 1) * 0.5;
        var tempStyle = {
            width: width,
            height: height/count
        };
        var BoxStyle = {
            top:index*height/count,
            transition:transition,
            zIndex:temp-Math.abs(index-temp),
            transform: "translateZ(" + (-width*0.5) + "px)" + "rotateY(" + angle + "deg)"                        
        };       
        var tempStyle01 = this.createBoxH0(width, height, index, count, 0,this.state.index);
        var tempStyle02 = this.createBoxH0(width, height, index, count, angle > 0 ? -90 : 90,(this.state.index + 1) % this.state.ImageData.length);
        
        var BoxStyle = Object.assign(BoxStyle,tempStyle);
        var Box01Style = Object.assign(tempStyle01,tempStyle );
        var Box02Style = Object.assign(tempStyle02,tempStyle );
        var Box03Style = {width:width,height:width,transform: 'rotateX(-90deg) translateZ('+(height/count-width*0.5)+'px)'};
        var Box04Style = {width:width,height:width,transform: 'rotateX(90deg) translateZ('+(width*0.5)+'px)'};
        var a = <div key = {index} className = "Box" style = {BoxStyle} >
            <div className = "Box01" style = {Box01Style} ></div>
            <div className = "Box02" style = {Box02Style} ></div>
            <div className = "Box03" style = {Box03Style} ></div> 
            <div className = "Box04" style = {Box04Style} ></div>           
        </div>;
        return a;
    },
    createBoxH0: function (width, height, index, count, angle,SelectIndex) {           
        var rate = width / height;
        var CountEnd = count-1
        var ImageData = this.state.ImageData[SelectIndex]
        var tempStyle01 = {
            transform: 'rotateY(' + angle + 'deg) translateZ(' + (width * 0.5) + 'px)',
            backgroundImage: "url(" + ImageData.src + ")"
        }
        if (!ImageData.contain ^ (rate < ImageData.rate)) {
            var temp000 = 0.5+(index-CountEnd*0.5)/(rate*count/ImageData.rate-1);
            tempStyle01.backgroundSize = "100% auto"
            tempStyle01.backgroundPosition = " 50% " + temp000* 100 + "%"
        } else {
            var temp001 = (CountEnd <= 0 ? 0 : index / CountEnd);
            tempStyle01.backgroundSize = "auto calc(100% * " + count + ")"
            tempStyle01.backgroundPosition = "50% calc(" + temp001 + " * 100%)"
        }
        return tempStyle01;
    },
    createBoxV0: function (width, height, index, count, angle,SelectIndex) {        
        var rate = width / height;
        var CountEnd = count-1
        var ImageData = this.state.ImageData[SelectIndex]
        var tempStyle01 = {
            transform: 'rotateX(' + angle + 'deg) translateZ(' + (height * 0.5) + 'px)',
            backgroundImage: "url(" + ImageData.src + ")"
        }
        if (ImageData.contain ^ (rate < ImageData.rate)) {
            var temp000 = 0.5+(index-CountEnd*0.5)/(ImageData.rate*count/rate-1);
            tempStyle01.backgroundSize = "auto 100%"
            tempStyle01.backgroundPosition = temp000* 100 + "% 50%"
        } else {
            var temp001 = (CountEnd <= 0 ? 0 : index / CountEnd);
            tempStyle01.backgroundSize = "calc(100% * " + count + ") auto"
            tempStyle01.backgroundPosition = "calc(" + temp001 + " * 100%) 50%"
        }
        return tempStyle01;
    },
    createBoxV: function (width, height, index, count, angle, transition) {
        var temp = (count - 1) * 0.5;
        var tempStyle = {
            width: width/count,
            height: height
        };
        var BoxStyle = {
            left: index * width/count,
            transition: transition,
            zIndex: temp - Math.abs(index - temp),
            transform: "translateZ(" + (-height * 0.5) + "px)" + "rotateX(" + angle + "deg)"
        };       
        var tempStyle01 = this.createBoxV0(width, height, index, count, 0,this.state.index);
        var tempStyle02 = this.createBoxV0(width, height, index, count, angle > 0 ? -90 : 90,(this.state.index + 1) % this.state.ImageData.length);
        
        var BoxStyle = Object.assign(BoxStyle,tempStyle);
        var Box01Style = Object.assign(tempStyle01,tempStyle );
        var Box02Style = Object.assign(tempStyle02,tempStyle );
        var Box03Style = { width: height, height: height, transform: 'rotateY(-90deg) translateZ(' + (height * 0.5) + 'px)' };
        var Box04Style = { width: height, height: height, transform: 'rotateY(90deg) translateZ(' + (width/count - height * 0.5) + 'px)' };
        
        var a = <div key = {index} className = "Box" style = {BoxStyle} >
            <div className = "Box01" style = {Box01Style} ></div>
            <div className = "Box02" style = {Box02Style} ></div>
            <div className = "Box03" style = {Box03Style} ></div>
            <div className = "Box04" style = {Box04Style} ></div>            
        </div>;
        return a;
    },
    render: function () {
        var count = this.state.count;
        var box = new Array(count);
        var width = this.state.width;
        var height = this.state.height;
        var duration = this.state.duration;
        var dir = this.state.dir;
        var reverse = this.state.reverse;
        for (var i = 0; i < count; i++) {
            var ii = reverse ? count - 1 - i : i;
            var transition = this.state.mouseover ? "transform " + duration + "s " + (ii * this.state.difference) + "s" : "";
            var angle = this.state.mouseover ? 90 : 0;
            if (dir == "bottom" || dir == "left") {
                angle *= -1;
            }
            if (dir == "top" || dir == "bottom") {
                box[i] = this.createBoxV(width, height, i, count, angle, transition);
            } else{
                box[i] = this.createBoxH(width, height, i, count, angle, transition);
            }
        }
    
    var MainBox01Style = {
        width:width,
        height:height,
        backgroundImage: "url(" + this.state.ImageData[this.state.index].src + ")",
        backgroundSize: this.state.ImageData[this.state.index].contain?'contain':'cover' //cover contain
    }
        return (
            <div ref = "overturn" className = {"Overturn " + this.state.className} style = {{ width: width, height: height }} onClick = {this.onClick} >
                <div className = {"Space" + (this.state.mouseover?'':' hidden')} style = {{ width: width, height: height }} >
                    {box}
                </div>
                <div className = {"MainBox01" + (this.state.mouseover?' hidden':'')} style = {MainBox01Style} ></div>
            </div>
        );
    }
});
var ImageData = [
    {src:"Image001.jpg",
    rate:900 / 280,
    contain:false},
    {src:"Image02.jpg",
    rate:300 / 300,
    contain:true},
    {src:"Image03.jpg",
    rate:300 / 300,
    contain:true},
]

ReactDOM.render(
    <Overturn dir = "top" index = {0}  duration = {1} difference = {0.1} count = {10} ImageData = {ImageData}/>,
    document.getElementById('example01_0')
);
ReactDOM.render(
    <Overturn dir = "right" index = {1}  duration = {1} difference = {0.1} count = {10} ImageData = {ImageData}/>,
    document.getElementById('example01_1')
);
ReactDOM.render(
    <Overturn dir = "bottom" index = {2}  duration = {1} difference = {0.1} count = {10} ImageData = {ImageData}/>,
    document.getElementById('example01_2')
);
ReactDOM.render(
    <Overturn dir = "left" index = {0}  duration = {1} difference = {0.1} count = {10} ImageData = {ImageData}/>,
    document.getElementById('example01_3')
);
ReactDOM.render(
    <Overturn dir = "top" className = {"Overturn02"} reverse = {true} index = {0}  duration = {1} difference = {0.1} count = {10} ImageData = {ImageData}/>,
    document.getElementById('example02')
);



