<template>
    <div>
        <div class="forms">
            <form method="POST" autocomplete="off">
                <h1>register</h1>
                
                <label for="username">Username</label>
                <input type="text" name="username" v-model="username" required>

                <label for="firstname">first name</label>
                <input type="text" name="firstname" v-model="firstname" required>

                <label for="lastname">last name</label>
                <input type="text" name="lastname" v-model="lastname" required>
                
                <label for="age">Age</label>
                <input type="number" name="age" v-model="age" required>

                <label for="email">Email</label>
                <input type="email" name="email" v-model="email" required>

                <label for="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    autocomplete="new-password"
                    v-model="password"
                    required>

                <label for="vPassword">Verify Password</label>
                <input 
                    type="password" 
                    name="vPassword" 
                    v-model="vPassword" 
                    required>
                
                <button @click="register">Register</button>
            </form>
        </div>
        
    </div>    
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'

export default {
    data(){
        return {
            username: "",
            firstname: "",
            lastname: "",
            age: "",
            email: "",
            password: "",
            vPassword: ""
        }
    },
    methods:{
        async register(e){
            e.preventDefault();
            try{
                const response = await AuthenticationService.register({
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    age: this.age,
                    email: this.email,
                    password: this.password,
                    vPassword: this.vPassword
                })
                console.log(response);
                this.$router.push({name: 'Login'});
            }catch(error){
                console.log(`this is the error `);
                console.log("-------------------");
                console.log(error.body);
            }
        }
    }
}
</script>

<style scoped>
/* .inputs{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
label{
    display: block;
}
input{
    display: block;
    width: 300px;
}
button{
    display: block;
    width: 300px;
} */
</style>