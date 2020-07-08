<template>
  <div id="app">
    <div id="nav">
      <router-link
        v-if="!$store.state.loggedIn"
        to="/">
        Home</router-link> |

      <router-link
        v-if="!$store.state.loggedIn"
        to="/login">
        Login</router-link> |

      <router-link
          v-if="!$store.state.loggedIn"
          to="/register">
        Register</router-link> |

      <router-link
          to="/about">
        About</router-link> |

      <router-link 
        v-if="$store.state.loggedIn"
        to="/settings">
      Settings</router-link>

      <button
        v-if="$store.state.loggedIn"
        @click="logout">
      Logout</button>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null);
      this.$router.push({name: 'Login'});
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-image: url('./assets/the-sun-3057622_1920.jpg');
  background-repeat: no-repeat;
  background-position: center; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.forms{
    width: 320px;
    margin: auto;
    border: 1px solid black;
    text-align: center;
    background: none;
}
.forms h1{
    font-size: 40px;
    color: rgb(0, 0, 0);
    margin-bottom: 30px;
}
.forms label{
    display: block;
    text-align: center;
}
.forms input{
    display: block;
    text-align: center;
    width: 300px;
    height: 35px;
    margin: 10px auto;
    background: none;
    color: black;
}
.forms button{
    display: block;
    width: 300px;
    height: 30px;
    margin: 25px auto;
    background: rgb(0, 0, 0);
    border: 1px solid rgb(155, 139, 0);
    color: white;
}
</style>
