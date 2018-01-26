## 疯狂猜球官方版（代理版）
### 采用单页面的形式进行开发（比赛数据通过websocket进行推送）
####主要涉及功能比赛列表、比赛动画直播、兑换场、抽奖场、登陆、注册、反馈、个人中心协议、比赛订单列表等内容。
#### 充值部分 ，微信环境走微信充值，微信外走支付宝支付 。
~~~
部分 package.json  内容。
  "name": "crazybet",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "rimraf dist/* && cross-env NODE_ENV=production webpack --config build/webpack.prod.config.js --progress --hide-modules",
    "prod": "rimraf dist/* && cross-env NODE_ENV=preRelease webpack --config build/webpack.prod.config.js --progress --hide-modules",
    "dev": "node server.js",
    "localdev": "cross-env LOCAL_ENV=true PORT=80 node server.js",
    "clean": "rimraf dist/*",
    "lint": "eslint --ext .js,.vue src",
    "lint-fix": "eslint --ext .js,.vue src --fix",
    "precommit": "npm run lint"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.16.1", // 请求
    "bc-zepto.full": "^1.1.6-b", //  $ 最要用户主页的动画
    "commonjs-touchslider": "^1.1.0",
    "es6-promise": "^4.1.0", // promise 兼容
    "js-cookie": "^2.1.3",
    "moment": "^2.18.1",
    "scroller": "0.0.3",
    "v-tap": "^2.2.2",
    "vue": "^2.3.3",
    "vue-clipboard2": "0.0.6",
    "vue-router": "^2.5.3",
    "vuex": "^2.3.1",
    "vuex-router-sync": "^4.1.1"
  },
~~~

## git clone 之后，npm install 一下，然后走本地跑项目走localdev（默认80端口可修改）。 
#### 上线打包走build 。

~~~
    线上访问:
    http://crazybet.choopaoo.com/official/#/h5/home
    or
    http://crazybet.choopaoo.com/official?from=500touch
    or
    http://crazybet.choopaoo.com/official?from=off
    or
    http://crazybet.choopaoo.com/official?from=off-mipan
~~~
####内部需求地址：
~~~
http://192.168.17.42:8010/H5-OUT/#g=1&p=h5%E5%85%91%E6%8D%A2%E4%BA%A4%E4%BA%92
~~~

#### 外部可用 石墨表格 进行bug 修正跟踪。
~~~
https://shimo.im/sheet/FnWezzumwI0v5fqo
~~~
#### 公司内网使用 ：
 ~~~
 http://jira.500boss.com/secure/Dashboard.jspa
 ~~~
 
 ####现在已经停止注册了，体验可以用
 ~~~
 18649633327  xie123  体验
  ~~~
  
  ### 改善写法：
  ~~~
  1、
  getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。
  这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。
  下例就是 同时触发：
        let [foo,bar] = await Promise.all([getFoo(),getBar()]);
        
 //  async 写法可优化例子  (非继发)
    async function logInOrder(urls){
      for( const url of urls ){
        const response = await fetch(url);
        console.log( await response.text());
      }
    }
    
 //  继发
    async function logInOrder(urls){
        const textPromises = urls.map( async url =>{
            const response = await fetch( url );
            return response.text();
        } );
        
        for( const textPromise of textPromises ){
            console.log( await textPromise );
        }
    }
    
    
    
        
      
        
        
  2、利用async await  实现多次重复尝试
     const superagent = require('superagent');
     const NUM = 3;
     async function test(){
        let i;
        for( i=0;i<NUM;i++ ){
          try{
             await superagent.get('http://...........');
          } catch(e){
            
          }
        }
     }
     test();
      ======================
       //  async 函数的实现原理，就是将Generator 函数和自动执行器，包装在一个函数里。
         
         async function fn(args){}
        // 等价于
        function fn(args){
            return spawn(function *(){
            
            }) ;
        }
        
        spawn 函数就是自动执行器 实现
        
        function spawn(genF){
            return new Promise(function(resolve,reject){
                const gen = genF();
                function step(nextF){
                    let next;
                    try{
                        next = nextF();
                    }catch(e){
                        return reject(e);
                    }
                    if( next.done ){
                        return resolve( next.value );
                    }
                    Promise.resolve( next.value ).then(function(v){
                        step( function(){ return gen.next(v); } );
                    },function(e){
                        step(function(){ return gen.throw(e) })
                    }) 
                }
                step(function(){ return gen.next(undefined ) })
            })
        }
         
         

         
         
         
  ~~~
  
 ##项目部分截图:
 
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/1.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/2.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/3.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/4.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/5.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/6.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/7.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/8.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/9.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/10.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/11.png)
 ![Image text](https://raw.githubusercontent.com/katoto/crazyOfficial/master/projectImg/12.png)

