<template>
  <div class="welcome container">
      <div class="card">
      <div class="card-content center-align">
        <h2 class = 'blue-text lighten-2'>Scissor Paper Rock</h2>
        <form @submit.prevent="enterGame">
          <label for="name">Enter your name:</label>
            <input type="text" name="name" v-model="name" autocomplete="off" autofocus>
            
          <div v-if="haveCode">
            <label for="gameID">Enter code:</label>
            <input type="text" name="gameID" v-model="gameID" autocomplete="off">
            
          </div>
          <p>
            <label>
              <input type="checkbox" v-model="haveCode" class=blue lighten-2 accent-3/>
              <span>Do you have a room code?</span>
            </label>
          </p>
          <p class="red-text">{{feedback}}</p>
          <p class="red-text">{{feedGameID}}</p>
          <button class="btn blue lighten-2">Play!</button>
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
      haveCode: false,
      name: null,
      gameID: null,
      feedGameID: null,
      feedback: null,
    }
  },
  methods:{
    getData(){
      db.collection('players').doc(this.gameID).get()
      .then(doc => {
        if(doc.data()){
          if(doc.data().two) this.feedGameID = `This room is full!`
          else this.redirect()
          }
        else this.feedGameID = `Please enter a correct code!`
        console.log(doc.data())
      })
      .catch(err => {
        this.validGameID = false
        this.feedGameID = `Error: ${err}`
      })
    },
    enterGame(){
      if (this.gameID){
        this.getData()
      }
      else this.redirect()
      },
      redirect(){
      if(this.name){
          this.$router.push({ name: 'GameScreen', params: {name: this.name, gameID: this.gameID} })
        }
        else {
          this.feedback = 'Please enter your name'
        }
      },
    },
    
  // created(){
  //   db.collection('test').get()
  //   .then(snapshot => {
  //     snapshot.forEach(doc => {
  //       console.log(doc.data())
  //     });
  //   })
  // }
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
input[type=text]:focus{
  border-bottom: 1px solid #64b5f6 !important;
}
input[type="checkbox"]:checked+span:not(.lever):before{
     border-right: 2px solid #64b5f6 !important;
    border-bottom: 2px solid #64b5f6 !important;
}
</style>
