(function(e){function t(t){for(var n,s,d=t[0],i=t[1],o=t[2],p=0,l=[];p<d.length;p++)s=d[p],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&l.push(a[s][0]),a[s]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);u&&u(t);while(l.length)l.shift()();return c.push.apply(c,o||[]),r()}function r(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,d=1;d<r.length;d++){var i=r[d];0!==a[i]&&(n=!1)}n&&(c.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},c=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var d=window["webpackJsonp"]=window["webpackJsonp"]||[],i=d.push.bind(d);d.push=t,d=d.slice();for(var o=0;o<d.length;o++)t(d[o]);var u=i;c.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},1535:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view",{attrs:{emittedObject:e.objectToPass,emittedUser:e.userToPass},on:{emitDeck:e.emitDeck,emitUser:e.emitUser}})],1)},c=[],s={name:"App",components:{},data:function(){return{objectToPass:{},userToPass:{}}},methods:{emitDeck:function(e){this.objectToPass=e},emitUser:function(e){this.userToPass=e}}},d=s,i=(r("034f"),r("2877")),o=Object(i["a"])(d,a,c,!1,null,null,null),u=o.exports,p=r("8c4f"),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"welcome_css"}},[r("h1",[e._v("Welcome "+e._s(e.emittedUser.userName)+"!")]),r("br"),r("p",{staticClass:"displayInline"},[e._v(" You currently have "+e._s(this.deckObjectListForUser.length)+" decks in your library.")]),r("br"),r("br"),r("p",{staticClass:"displayInline"},[e._v("Please enter the name of your new deck into the textbox:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.deckInput,expression:"deckInput"}],attrs:{type:"text"},domProps:{value:e.deckInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit.apply(null,arguments)},input:function(t){t.target.composing||(e.deckInput=t.target.value)}}}),r("button",{on:{click:e.submit}},[e._v("submit")]),r("br"),r("p",[e._v("When you have decks, they show up here. ")]),r("p",[e._v("Click on the deck that you want to work on and you will be redirected to that deck's page.")]),r("div",{staticClass:"flexContainer"},e._l(this.deckObjectListForUser,(function(t){return r("button",{key:t,staticClass:"deckButtons",on:{click:function(r){return e.goToDeck(t)}}},[e._v(e._s(t.deckName))])})),0),r("br"),r("button",{on:{click:function(t){return e.returnToLoginPage()}}},[e._v("Return To Login Page")])])},m=[],f=r("b85c"),k=r("1da1"),h=(r("96cf"),r("bc3a")),b=r.n(h),v="/api/decks/",g="/api/users/",y={name:"Welcome",components:{},props:{emittedUser:{Type:Object,required:!0,_id:{type:String,required:!0},userName:{type:String,required:!0}}},data:function(){return{deckInput:"",deckObjectList:[],userObjectList:[],deckObjectListForUser:[]}},methods:{submit:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b.a.post(v,{deckName:e.deckInput,userId:e.emittedUser._id});case 2:r=t.sent,201!==r.status&&console.log("error: ",r),e.deckObjectList.push(r.data),e.deckInput="";case 6:case"end":return t.stop()}}),t)})))()},goToDeck:function(e){this.$emit("emitDeck",e),this.$router.push({path:"/welcome/single-deck/".concat(e.deckName)})},returnToLoginPage:function(){this.$router.push({path:"/"})}},created:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r,n,a,c,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b.a.get(v);case 2:return r=t.sent,e.deckObjectList=r.data,t.next=6,b.a.get(g);case 6:n=t.sent,e.userObjectList=n.data,a=Object(f["a"])(e.deckObjectList);try{for(a.s();!(c=a.n()).done;)s=c.value,s.userId===e.emittedUser._id&&e.deckObjectListForUser.push(s)}catch(d){a.e(d)}finally{a.f()}case 10:case"end":return t.stop()}}),t)})))()}},I=y,x=(r("fddd"),Object(i["a"])(I,l,m,!1,null,"53aad814",null)),_=x.exports,O=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"singleDeck_css"}},[e.editDeckNameSelected?e._e():r("h1",[e._v(e._s(e.emittedObject.deckName))]),r("div",{staticClass:"textBox"},[e.editDeckNameSelected?r("input",{directives:[{name:"model",rawName:"v-model",value:e.editDeckNameInput,expression:"editDeckNameInput"},{name:"focus",rawName:"v-focus"}],attrs:{type:"text",placeholder:"Type the new deck name"},domProps:{value:e.editDeckNameInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitEditedDeckName.apply(null,arguments)},input:function(t){t.target.composing||(e.editDeckNameInput=t.target.value)}}}):e._e()]),r("button",{staticClass:"cardNavigationButtons1",on:{click:function(t){return e.updateCardIndex(-1)}}},[e._v("Previous Card")]),r("button",{staticClass:"cardNavigationButtons2",on:{click:function(t){return e.updateCardIndex(1)}}},[e._v("Next Card")]),r("div",{staticClass:"card",class:{flipped:"Front"===this.cardSide}},[r("p",{staticClass:"cardPromptClass1"},[e._v(e._s(e.cardSide))]),e.addCardFront||e.addCardBack?e._e():r("p",{staticClass:"cardPromptClass2"},[e._v(e._s(e.cardPrompt))]),e.addCardFront?r("input",{directives:[{name:"model",rawName:"v-model",value:e.cardFrontInput,expression:"cardFrontInput"},{name:"focus",rawName:"v-focus"}],staticClass:"cardInputBox",attrs:{type:"text",placeholder:"Type front text"},domProps:{value:e.cardFrontInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.flipCard.apply(null,arguments)},input:function(t){t.target.composing||(e.cardFrontInput=t.target.value)}}}):e._e(),e.addCardBack?r("input",{directives:[{name:"model",rawName:"v-model",value:e.cardBackInput,expression:"cardBackInput"}],staticClass:"cardInputBox",attrs:{type:"text",placeholder:"Type back text"},domProps:{value:e.cardBackInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitCard.apply(null,arguments)},input:function(t){t.target.composing||(e.cardBackInput=t.target.value)}}}):e._e(),e.addCardBack?e._e():r("button",{staticClass:"cardButton",on:{click:e.flipCard}},[e._v("Flip Card")]),e.addCardBack?r("button",{staticClass:"cardButton",on:{click:e.submitCard}},[e._v("Submit Card")]):e._e()]),r("button",{staticClass:"addCardButton",on:{click:e.addCard}},[e._v("Add Card")]),r("button",{staticClass:"deleteCardButton",on:{click:e.deleteCard}},[e._v("Delete Card")]),r("div",[r("button",{staticClass:"deckEditButton",on:{click:e.editDeckName}},[e._v("Edit Deck Name")]),r("button",{staticClass:"deckDeleteButton",on:{click:e.deleteDeck}},[e._v("Delete Deck")]),r("br"),r("button",{staticClass:"decksReturnButton",on:{click:e.goBackToDecks}},[e._v("Return To Decks")])])])},C=[],j=(r("a434"),"/api/decks/"),w={props:{emittedObject:{type:Object,required:!0,_id:{type:String,required:!0},cards:{type:Array,required:!0},deckName:{type:String,required:!0}}},directives:{focus:{inserted:function(e){e.focus()}}},data:function(){return{cardSide:"Front",cardPrompt:"please add a card",cardFrontInput:"",cardBackInput:"",addCardFront:!1,addCardBack:!1,cardsListIndex:0,editDeckNameSelected:!1,editDeckNameInput:"",cardId:""}},methods:{flipCard:function(){if(0===this.emittedObject.cards.length&&(this.cardPrompt="there is no card to flip. please add a card"),this.addCardFront)return this.cardSide="Back",this.addCardBack=!0,void(this.addCardFront=!1);"Front"===this.cardSide?(this.cardSide="Back",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardBack):(this.cardSide="Front",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront)},addCard:function(){this.addCardFront=!0},submitCard:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b.a.post(j+e.emittedObject._id+"/cards",{cardFront:e.cardFrontInput,cardBack:e.cardBackInput});case 2:r=t.sent,201!==r.status&&console.log("error: ",r),e.emittedObject.cards=r.data.cards,e.addCardFront=!1,e.addCardBack=!1,e.cardSide="Front",e.cardFrontInput="",e.cardBackInput="",e.cardsListIndex=e.emittedObject.cards.length-1,e.cardPrompt=e.emittedObject.cards[e.cardsListIndex].cardFront,e.cardId=e.emittedObject.cards[e.cardsListIndex]._id;case 13:case"end":return t.stop()}}),t)})))()},updateCardIndex:function(e){0!==this.emittedObject.cards.length?1!==this.emittedObject.cards.length?(e+this.cardsListIndex<0?this.cardsListIndex=this.emittedObject.cards.length-1:e+this.cardsListIndex>this.emittedObject.cards.length-1?this.cardsListIndex=0:this.cardsListIndex=e+this.cardsListIndex,this.cardSide="Front",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront,this.cardId=this.emittedObject.cards[this.cardsListIndex]._id):console.log("there is only one card in the deck."):console.log("there are no cards in the deck.")},deleteCard:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b.a.delete(j+e.emittedObject._id+"/cards/"+e.cardId);case 2:e.emittedObject.cards.splice(e.cardsListIndex,1),e.emittedObject.cards.length-1>=0?(e.cardsListIndex=0===e.cardsListIndex?0:e.cardsListIndex-1,e.cardPrompt=e.emittedObject.cards[e.cardsListIndex].cardFront,e.cardId=e.emittedObject.cards[e.cardsListIndex]._id):e.cardPrompt="please add a card";case 4:case"end":return t.stop()}}),t)})))()},goBackToDecks:function(){this.$router.push({path:"/welcome"})},deleteDeck:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b.a.delete(j+e.emittedObject._id+"/deckName");case 2:e.goBackToDecks();case 3:case"end":return t.stop()}}),t)})))()},editDeckName:function(){this.editDeckNameSelected=!0},submitEditedDeckName:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.emittedObject.deckName=e.editDeckNameInput,t.next=3,b.a.put(j+e.emittedObject._id+"/deckName",{deckName:e.editDeckNameInput});case 3:r=t.sent,201!==r.status&&console.log("error: ",r),e.editDeckNameInput="",e.editDeckNameSelected=!1;case 7:case"end":return t.stop()}}),t)})))()}},created:function(){0!=this.emittedObject.cards.length&&(this.cardPrompt=this.emittedObject.cards[0].cardFront,this.cardId=this.emittedObject.cards[0]._id)}},N=w,P=(r("b020"),Object(i["a"])(N,O,C,!1,null,"76f5f1ff",null)),D=P.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"loginPage_css"}},[n("h1",[e._v("Welcome to the Flash Card App!")]),n("img",{attrs:{src:r("5c7d"),alt:"Flash Cards"}}),n("br"),n("p",{staticClass:"displayInline"},[e._v("Please enter your username:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.userNameInput,expression:"userNameInput"}],attrs:{type:"text"},domProps:{value:e.userNameInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.logIn.apply(null,arguments)},input:function(t){t.target.composing||(e.userNameInput=t.target.value)}}}),n("br"),n("button",{on:{click:function(t){return e.logIn()}}},[e._v("Log In")])])},B=[],F="/api/users/",S={name:"LoginPage",components:{},props:{},data:function(){return{userNameInput:""}},methods:{logIn:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r,n,a,c,s,d,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b.a.get(F);case 2:r=t.sent,n=r.data,a={},c=!1,s=Object(f["a"])(n);try{for(s.s();!(d=s.n()).done;)i=d.value,i.userName===e.userNameInput&&(c=!0,a=i)}catch(u){s.e(u)}finally{s.f()}if(c){t.next=14;break}return t.next=11,b.a.post(F,{userName:e.userNameInput});case 11:o=t.sent,201!==o.status&&console.log("error: ",o),a=o.data;case 14:e.$emit("emitUser",a),e.userNameInput="",e.$router.push({path:"/welcome/"});case 17:case"end":return t.stop()}}),t)})))()}}},T=S,R=(r("ee8f"),Object(i["a"])(T,L,B,!1,null,"3f4c86c8",null)),E=R.exports,U=[{path:"/welcome/",component:_,props:!0},{path:"/welcome/single-deck/:deckName",component:D,props:!0},{path:"/",component:E,props:!0}];n["a"].use(p["a"]);var $=new p["a"]({routes:U});n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(u)},router:$}).$mount("#app")},"5c7d":function(e,t,r){e.exports=r.p+"img/flash_cards.8ef07bb4.png"},"725d":function(e,t,r){},"85ec":function(e,t,r){},b020:function(e,t,r){"use strict";r("725d")},d69c:function(e,t,r){},ee8f:function(e,t,r){"use strict";r("d69c")},fddd:function(e,t,r){"use strict";r("1535")}});
//# sourceMappingURL=app.6323e161.js.map