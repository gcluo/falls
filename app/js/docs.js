(function(){
  'use strict';

  /* code here! */

  // window.console.log = function(){};
  var falls = new Falls();
  var tpl = tpl || document.getElementById('tpl').innerHTML;
  document.getElementById('tpl').remove();
  var html = _.template(tpl);
  var data = [
    {src:"img/0.jpg"},
    {src:"img/1.jpg"},
    {src:"img/2.jpg"},
    {src:"img/3.jpg"},
    {src:"img/4.jpg"},
    {src:"img/5.jpg"},
    {src:"img/6.jpg"},
    {src:"img/7.jpg"},
    {src:"img/8.jpg"},
    {src:"img/9.jpg"}
  ];
  var list={
    data: data
  }
  console.log(html(list));




  window.onload = function(){   
    falls.init();
  }

  window.onscroll = function(){
    if(falls.checkScroll()){
       falls.container.innerHTML += html(list);
       falls.sortIMG();
    }
  }

  function Falls(){
  	this.container = document.getElementById('falls');
  	this.boxs = this.container.children;
  	this.IMGWIDTH = this.boxs[0].offsetWidth;
  	this.columns = Math.floor(document.documentElement.clientWidth / this.IMGWIDTH);
  	this.columnsHeight = [];
  	this.lastsortImg = this.columns;
  	this.setContainerWidth=function(){
  		this.container.style.width = this.IMGWIDTH * this.columns + "px";
  	};
  	this.getColumnsHeight=function(){
	  	for(var i = 0;i < this.columns;i ++){
	  		this.columnsHeight[i] = this.boxs[i].offsetHeight;
	  		console.log(this.boxs[i].offsetHeight);
	  	}
	  	console.log(this.columnsHeight);
	  };
  	this.getMinHeightIndex=function(columnsHeight,minColHeight){
	  	for(var i in columnsHeight){
	  		if(columnsHeight[i] === minColHeight){
	  			return i;
	  		}
	  	}
	  };
  	this.sortIMG=function(){
	  	for(var i = this.lastsortImg + 1;i < this.boxs.length; i ++){
	  		var minColHeight = Math.min.apply(null,this.columnsHeight);
	  		console.log(minColHeight);
	  		var minColIndex = this.getMinHeightIndex(this.columnsHeight,minColHeight);
	  		console.log(minColIndex);
	  		var minColWidth = minColIndex * this.IMGWIDTH;
	  		this.boxs[i].style.position = "absolute";
	  		this.boxs[i].style.top = minColHeight + "px";
	  		this.boxs[i].style.left = minColWidth + "px";
	  		this.columnsHeight[minColIndex] += this.boxs[i].offsetHeight;
	  		console.log(this.columnsHeight[minColIndex]);
	  		this.lastsortImg = i;
	  	}
	  };
    this.checkScroll = function(){
      var lastTop = this.boxs[this.boxs.length - 1].offsetTop;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if(lastTop < scrollTop + clientHeight){
        return true;
      }
    };
    this.init = function(){
      this.setContainerWidth();
      this.getColumnsHeight();
      this.sortIMG();
    };
  }

  


  // var container = document.getElementById('falls');
  // var boxs = container.children;
  // var IMGWIDTH = boxs[0].offsetWidth;

  // var getColumns = function(){
  // 	var screenWidth = document.documentElement.clientWidth;
  // 	return Math.floor(screenWidth / IMGWIDTH);
  // };

  // var columns = getColumns();
  // console.log(columns);

  // var setContainerWidth = function(container,columns){
  // 	container.style.width = IMGWIDTH * columns + "px";
  // };

  // setContainerWidth(container,columns);

  // var columnsHeight = [];

  // var getColumnsHeight = function(columns,boxs){
  // 	for(var i = 0;i < columns;i ++){
  // 		columnsHeight[i] = boxs[i].offsetHeight;
  // 		console.log(boxs[i].offsetHeight);
  // 		console.log(document.getElementById('falls').children[i].offsetHeight);
  // 	}
  // };

  // getColumnsHeight(columns,boxs);
  // console.log(columnsHeight)

  // var lastsortImg = columns;

  // var getMinHeightIndex = function(columnsHeight,minColHeight){
  // 	for(var i in columnsHeight){
  // 		if(columnsHeight[i] === minColHeight){
  // 			return i;
  // 		}
  // 	}
  // }

  // var sortIMG = function(boxs){
  // 	for(var i = lastsortImg;i < boxs.length; i ++){
  // 		var minColHeight = Math.min.apply(null,columnsHeight);
  // 		console.log(minColHeight);
  // 		var minColIndex = getMinHeightIndex(columnsHeight,minColHeight);
  // 		console.log(minColIndex);
  // 		var minColWidth = minColIndex * IMGWIDTH;
  // 		boxs[i].style.position = "absolute";
  // 		boxs[i].style.top = minColHeight + "px";
  // 		boxs[i].style.left = minColWidth + "px";
  // 		columnsHeight[minColIndex] += boxs[i].offsetHeight;
  // 		console.log(columnsHeight[minColIndex]);
  // 		lastsortImg = i;
  // 	}
  // }

  // sortIMG(boxs);

})();


 // var tpl = document.getElementById('tpl').innerHTML;
 //  var html = _.template(tpl);
 //  var data = [
 //    {src:"img/0.jpg"},
 //    {src:"img/1.jpg"},
 //    {src:"img/2.jpg"},
 //    {src:"img/3.jpg"},
 //    {src:"img/4.jpg"},
 //    {src:"img/5.jpg"},
 //    {src:"img/6.jpg"},
 //    {src:"img/7.jpg"},
 //    {src:"img/8.jpg"},
 //    {src:"img/9.jpg"}
 //  ];
 //  console.log(html(data));