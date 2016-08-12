3D翻轉換圖功能(overturn)
=========================
### 演示
[線上觀看](http://virtools.github.io/reactjs_overturn/v1/index.html)
### 設置
|設置|默認值|描述|
|---|---|---|
|index|`0`|圖片索引數值|
|count|`4`|分割數量|
|duration|`0.5`|單一塊動作時間長度|
|difference|`0.1`|動作間格時間|
|width|`200`|寬度|
|height|`200`|高度|
|dir|`"top"`|翻轉方向,值(left或right或top或bottom)|
|reverse|`false`|相反順序,值(true或false)|
|className|`""`|風格|
### 默認風格
該組件會自動嵌入了一些必要的風格。
```css
.Overturn {
    float: left;
    position: relative;
    display: block;
    perspective: 200px;
    perspective-origin: center center;
    margin: 10px;
    cursor: pointer;
}
.Overturn > .Space {
    position: absolute;
    display: block;
}
.Overturn > .Space > .Box {
    position: absolute;
    display: block;
    transform-style: preserve-3d;
}
.Overturn > .Space > .Box > .Box01,
.Overturn > .Space > .Box > .Box02,
.Overturn > .Space > .Box > .Box03,
.Overturn > .Space > .Box > .Box04 {
    position: absolute;
    display: block;
    backface-visibility: hidden;
    background-repeat: no-repeat;
}
.Overturn > .Space > .Box > .Box01 {
    background-color: rgba(255, 255, 255, 1);
}
.Overturn > .Space > .Box > .Box02 {
    background-color: rgba(255, 255, 255, 1);
}
.Overturn > .Space > .Box > .Box03 {
    background-color: rgb(54, 54, 54);
}
.Overturn > .Space > .Box > .Box04 {
    background-color: rgb(54, 54, 54);
}
```
### 設定參考
```javascript
<Overturn dir = "top" reverse = {true} index = {1} width = {600} height = {300} duration = {0.3} difference = {0.05} count = {20} src = {["image01.jpg","image02.jpg","image03.jpg"]} />
```
### 許可
MIT
