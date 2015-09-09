(function(){
  'use strict';

  /* code here! */


  // window.console.log = function(){};

  /**
   * 瀑布流类
   * @param {[type]} container [容器ID]
   */
  function Falls(container){
  	this.container = document.getElementById(container);
  	this.boxs = this.container.children;
  	this.colWidth = this.boxs[0].offsetWidth;
  	this.columns = Math.floor(document.documentElement.clientWidth / this.colWidth);
  	this.columnsHeight = [];
  	this.lastsortImg = this.columns;
  }

  /**
   * 瀑布流原型链
   * @type {Object}
   */
  Falls.prototype = {
    //设置容器宽度，根据列和列宽
    setContainerWidth:function(){
      this.container.style.width = this.colWidth * this.columns + "px";
    },
    //获得初始化时候的列的高度
    getColumnsHeight:function(){
      for(var i = 0;i < this.columns;i ++){
        this.columnsHeight[i] = this.boxs[i].offsetHeight;
        console.log(this.boxs[i].offsetHeight);
      }
      console.log(this.columnsHeight);
    },
    //得到列的最低高度，将图片塞到最低高度的下面
    getMinHeightIndex:function(columnsHeight,minColHeight){
      for(var i in columnsHeight){
        if(columnsHeight[i] === minColHeight){
          return i;
        }
      }
    },
    //将图片塞到最低高度的下面
    sortIMG:function(){
      for(var i = this.lastsortImg + 1;i < this.boxs.length; i ++){
        var minColHeight = Math.min.apply(null,this.columnsHeight);
        console.log(minColHeight);
        var minColIndex = this.getMinHeightIndex(this.columnsHeight,minColHeight);
        console.log(minColIndex);
        var minColLeft = minColIndex * this.colWidth;
        this.boxs[i].style.position = "absolute";
        this.boxs[i].style.top = minColHeight + "px";
        this.boxs[i].style.left = minColLeft + "px";
        this.columnsHeight[minColIndex] += this.boxs[i].offsetHeight;
        console.log(this.columnsHeight[minColIndex]);
        this.lastsortImg = i;
      }
    },
    //检查是否加载新图
    checkScroll:function(){
      var lastTop = this.boxs[this.boxs.length - 1].offsetTop;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if(lastTop < scrollTop + clientHeight){
        return true;
      }
    },
    //初始化调用
    init:function(){
      this.setContainerWidth();
      this.getColumnsHeight();
      this.sortIMG();
    }

  }

  var falls = new Falls("falls");
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
  };

  /**
   * 在onload事件中监听，否则，图片位置会乱
   * @return {[type]} [description]
   */
  window.onload = function(){   
    falls.init();
  }
  /**
   * 在onscroll中监听是否加载
   * @return {[type]} [description]
   */
  window.onscroll = function(){
    if(falls.checkScroll()){
       falls.container.innerHTML += html(list);
       falls.sortIMG();
    }
  }

})();