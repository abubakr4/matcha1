<template>
    <div class="forms">
        <form method="POST">
            <h1 class="formHeading">Login</h1>
            <label for="username">Userame</label>
            <input type="text" name="username" v-model="username">

            <label for="password">Password</label>
            <input type="password" name="password" v-model="password">

            <button @click="login">login</button>
        </form>
    </div>    
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data(){
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        async login(e){
            e.preventDefault();
            try{
                const response = await AuthenticationService.login({
                    username: this.username,
                    password: this.password
                })
                console.log(response);
                // this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setToken', response.data.resetToken)
                this.$store.dispatch('setUser', response.data.username)
                if (response.data.resetToken)
                    this.$router.push({name: 'Home'})
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


</style>