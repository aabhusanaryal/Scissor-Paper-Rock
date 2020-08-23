<template>
  <div class="welcome container">
      <div class="card">
      <div class="card-content center-align">
        <h2 class = 'teal-text'>Scissor Paper Rock</h2>
        <form @submit.prevent="enterGame">
          <label for="name">Enter your name:</label>
          <input type="text" name="name" v-model="name" autocomplete="off">
          <label for="gameID">Enter code:(Leave blank if you don't have one)</label>
          <input type="text" name="gameID" v-model="gameID" autocomplete="off">
          <p class="red-text">{{feedback}}</p>
          <button class="btn teal">Play!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/Firebase/init.js'
export default {
  name: 'Index',
  data() {
    return{
      name: null,
      gameID: null,
      feedback: null
    }
  },
  methods:{
    enterGame(){
      if(this.name){
        this.$router.push({ name: 'GameScreen', params: {name: this.name, gameID: this.gameID} })
      }
      else {
        this.feedback = 'Please enter your name'
      }
    }
  },
  created(){
    db.collection('test').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data())
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome{
  max-width: 600px;
  margin-top: 100px;
}
h2{
  font-size: 3em;
}
button{
  margin: 30px;
}

</style>
