<template>
  <div class="container">
<h3 class=" text-center">Messaging</h3>
<div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar"  placeholder="Search" >
                <span class="input-group-addon">
                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div class="inbox_chat">
            <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>This is the only group working <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Peter Parker <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Natasha Romanoff <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Steve Rogers <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mesgs">
          <div class="msg_history">
            <div :key="message.id" v-for="message in messages"  class="incoming_msg">
              <div :class="[message.author == authUser.displayName ?'sent_msg':'received_msg' ]">
                <div >
                  <p class="bold">{{message.message}}</p>
                  <span class="time_date">     {{message.author}}</span></div>
              </div>
            </div>
            
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input @keyup.enter ="calling"  v-model = "message" type="text" class="write_msg" placeholder="Type a message" />
              <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      
      
      
    </div></div>
</template>

<script>
// @ is an alias to /src
import firestore from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
    collection, 
    getDocs, 
    doc, 
    setDoc, 
    addDoc,
    arrayUnion, 
    arrayRemove, 
    onSnapshot, 
    query, 
    where, 
    documentId, 
    QuerySnapshot,
    orderBy
} from 'firebase/firestore';
import {serverTimestamp} from 'firebase/firestore';
const docref= collection(firestore,'chat');
export default {
  name: 'Chat',
  data(){
      return {
          message:null,
          createdat:null,
          messages:[],
          authUser:{},
      }
  },
  components: {
    
  },
  methods: {
    
       scrollToBottom(){
           var box = document.querySelector('.msg_history');
           box.scrollTop=box.scrollHeight;
       },
       async saveMessage(){
         // Add a new document with a generated id.
            const docRef = await addDoc(collection(firestore, "chat"), {
              message: this.message,
              author: this.authUser.displayName,
              createdat: new Date(),
              
            }).then(()=>{
              this.scrollToBottom();
            })
            // console.log("Document written with ID: ", docRef.id); 
            this.message=null;

      },
      async fetchMessages(){
             var allmessages = [];
            const querySnapshot = await getDocs(collection(firestore, "chat"));
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            allmessages.push(doc.data())
            // console.log(doc.id, " => ", doc.data());
            });
            this.messages = allmessages;
            
      },
      async getUser(){
          const auth = getAuth();
              onAuthStateChanged(auth, (user) => {
                if (user) {      
                  this.authUser = user;
                  
                } else {
                   this.authUser = {};
                }
              });
      },
      async calling(){
          this.saveMessage().then(this.fetchMessages())
         
      }
      

  },
  created() {
          this.getUser(); 
          this.fetchMessages();
      },
  beforeRouteEnter(to,from,next){
    next(vm=>{
             const auth = getAuth();
              onAuthStateChanged(auth, (user) => {
                if (user) {      
                  
                } else {
                  vm.$router.push('/login')
                }
              });
    })
  }
}
</script>
<style>
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  color: black;
  /* background: blue; */
  padding: 0 0 0 10px;
  vertical-align: top;
  text-align:right;
  width: 92%;
 }
 .sent_msg {
  display: inline-block;
  color: black;
  /* background: blue; */
  padding: 0 0 0 10px;
  vertical-align: top;
  text-align:left;
  width: 92%;
 }
 /* .received_msg {
  display: inline-block;
   color:black;
   background: green; 
  padding: 0 0 0 10px;
  vertical-align: top;
  text-align:right;
  width: 92%;
 } */

.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 100%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  color:black;
  background: #ffffff none repeat scroll 0 0;
  border-radius: 3px;
  font-size: auto;
  margin: 0; 
  /* color:#fff; */
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  color:black;
  float: right;
  width: 100%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  
  height: 516px;
  overflow-y: auto;
}
</style>