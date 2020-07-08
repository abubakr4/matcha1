<template>
    <div class="update">
        <h1>Update your details</h1>
        <form class="personal" method="POST">
            <h2>Change personal details</h2>
            <label for="username">Enter Username</label>
            <input
                v-model="username"
                type="text"  name="username" value= '' required>
        
            <label for="Firstname">Enter Firstname</label>
            <input
                v-model="firstname"
                type="text" name="Firstname" value= '' required>
        
            <label for="Lastname">Enter Lastname</label>
            <input
                v-model="lastname"
                type="text" name="Lastname" value= '' required>
        
            <label for="Email">Enter Email</label>
            <input
                v-model="email"
                type="email" name="Email" value= '' required>
        
            <button
                @click="settingsPersonal">
            Update details</button>
        </form>

        <form class="password" method="POST">
            <h2>Change your password</h2>
            <div class="div_password">
                <label for="Password">Enter password</label>
                <input
                    v-model="password"
                    type="password" name="Password" required>
            </div>
            <div class="div_vpassword">
                <label for="vPassword">Confirm Password</label>
                <input
                    v-model="vPassword"
                    type="password" name="vPassword" required>
            </div>
            <button
                @click="settingsPassword">
            Update password</button>
        </form>

        <div class="location">
            <h2>Your location</h2>
            <button @click="getLocation">Get current Location</button>
            <p id="demo">Display results here</p>
            <form class="location_result" method="POST">
                <input type="text" name="Longitude">
                <input type="text" name="Latitude">
                <button
                    @click="settingsLocation">
                Update Location</button>
            </form>
        </div>

        <form class="additional" method="POST">
            <h2>Enter additional information</h2>
            <label for="orientation" >Orientation</label>
                <select
                    v-model="orientation"
                    name="orientation" tabindex="6" aria-placeholder="bi-sexual">

                    <option value="bi-sexual">Bi-sexual</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="gay">Gay</option>
                    <option value="lesbian">Lesbian</option>
                </select>
            <label for="Bio">Tell us a little about yourself</label>
            <textarea
                v-model="bio"
                name="Bio" required>
            </textarea>
            <button
                @click="settingsAdditional">
            Add additional info</button>
        </form>

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
            email: "",
            password: "",
            vPassword: "",
            orientation: "",
            bio: ""
        }
    },
    methods: {
        getLocation(){
            console.log("get a location");
        },
        async settingsPersonal(e){
            e.preventDefault();
            try{
                const response = await AuthenticationService.settingsPersonal({
                    username: this.username,
                    firstnane: this.firstnane,
                    lastname: this.lastname,
                    email: this.email,
                    
                })
                console.log(response);
            }catch(error){
                console.log(error.body);
            }
        },
        async settingsPassword(e){
            e.preventDefault();
            try{
                const response = await AuthenticationService.settingsPassword({
                    password: this.password,
                    vPassword: this.vPassword
                })
                console.log(response);
            }catch(error){
                console.log(error.body);
            }
        },
        async settingsLocation(e){
            e.preventDefault();
            try{
                const response = await AuthenticationService.settingsLocation({
                    msg: "nothing yet"
                })
                console.log(response);
            }catch(error){
                console.log(error.body);
            }
        },
        async settingsAdditional(e){
            e.preventDefault();
            try{
                const response = await AuthenticationService.settingsAdditional({
                    orientation: this.orientation,
                    bio: this.bio
                })
                console.log(response);
            }catch(error){
                console.log(error.body);
            }
        }
    }
}
</script>

<style scoped>
form{
    width: 320px;
    margin: 8px auto;
    border: 1px solid rgb(50, 50, 50);
    text-align: center;
    background: none;
}
form h2{
    color: rgb(20, 20, 20);
    margin-bottom: 10px;
}

form input{
    width: 300px;
    height: 25px;
    margin: 5px;
    background: none;
    color: rgb(50, 50, 50);
}
.orientation{
    display: flex;
}
form button{
    display: block;
    width: 300px;
    height: 30px;
    margin: 25px auto;
    background: rgb(10, 10, 10);
    border: 1px solid rgb(155, 139, 0);
    color: white;
}
</style>