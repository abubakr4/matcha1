<template>
    <div id="chat">
        <h2>Chats</h2>
        <div></div>
        <form method="post" id="texting">
            <input type="text" name="message" id="message" placeholder="Type your message">
            <button type="submit">Send</button>
        </form>
    </div>    
</template>


<script>
// v-model="username"
export default {
    data(){
    }
}
</script>

<style scoped>
    #chat{
        width: 500px;
        height: 80%;
        background: red;
    }
    
</style>