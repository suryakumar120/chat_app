<template>
    <div>
        
        <!-- <button @click="login"> Login with google</button> -->
    </div>
    <div class="sidenav">
         <div class="login-main-text">
            <h2>Chat app<br> </h2>
            <p>A basic chatting application</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12">
             <button @click="login" type="button" class="btn btn-success">Login with google</button>
            
         </div>
      </div>
</template>
<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
    name:'login',
    methods:{
        async login(){
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            const auth = getAuth();
            await this.afterthis(auth,provider);
            
        },
        async afterthis(auth,provider){ 
                signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    this.$router.push('/')
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        },
               
        
        

    }
}
</script>
<style>
body {
    font-family: "Lato", sans-serif;
}



.main-head{
    height: 150px;
    background: #FFF;
   
}

.sidenav {
    height: 100%;
    background-color: #000;
    overflow-x: hidden;
    padding-top: 20px;
}


.main {
    padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%; 
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 80%;
    }

    .register-form{
        margin-top: 20%;
    }
}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
}</style>