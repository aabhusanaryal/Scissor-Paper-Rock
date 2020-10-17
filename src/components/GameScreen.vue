<template>
    <div class="container game">
        <h3>Scissor Paper Rock</h3>
        <h4>Game ID: {{gameID}}<i class="material-icons" ref = 'mylink' @click='copyURL' id="share-icon">share</i>   <span v-if='copied' id = "copied-prompt">Copied!</span></h4>

        <!-- Checking if Opponent's data is received; and if yes showing details -->
        <div id = "scoreboard">
            <span v-if="!opponentData"><p>Waiting for someone to join the game...</p></span>
            <span v-else><p>{{ownData.name}}({{ownData.score}}) vs {{opponentData.name}}({{opponentData.score}})</p></span>
        </div>

        
        <span v-if="opponentData">
            <span v-if="opponentData.selection"><p>{{opponentData.name}} has made a selection!</p></span>
            <div class="selectionBox card">
                <div class="card-content">
                    <span v-if="!opponentData.selection"><p>Waiting for {{opponentData.name}} to make a selection...</p></span>
                    <div v-if="!ownData.submitted">
                        <span class="card-title">Please make a selection:</span>
                        <form @submit.prevent="submitSelection">
                            <div class="row">
                                <Option name="scissor" :selection="this.ownData.selection" @selection="selectionMade"/>
                                <Option name="paper" :selection="this.ownData.selection" @selection="selectionMade"/>
                                <Option name="rock" :selection="this.ownData.selection" @selection="selectionMade"/>
                            </div>
                            <input type="submit" class="btn blue lighten-2"><br><br>
                            <p v-if="ownData.submitted" class="red-text">You've already submitted your selection!</p>
                        </form>
                    </div>
                    <span v-if="ownData.submitted && opponentData.submitted">
                        <span v-if="winnerID === playerID" class="green-text">You've won!</span>
                        <span v-if="winnerID === opponentID" class="red-text">You've lost!</span>
                        <span v-if="winnerID === 'tie'" class="yellow-text">It's a tie!</span>
                        <!-- Your choice: {{ownData.selection}}<br>
                        {{opponentData.name}}'s choice: {{opponentData.selection}}<br><br>
                        <span v-if="opponentData.selection===ownData.selection"><h2 class="yellow-text">It's a tie!</h2></span>
                        <span v-else>
                            <h2 v-if="winnerID===playerID" class="green-text">You win!</h2>
                            <h2 v-else class="red-text">You lose!</h2>
                        </span> -->
                        <br>
                        <h4 v-if="opponentData.playAgain">{{opponentData.name}} wants to play again.</h4>
                        <button @click="playAgain" class="btn blue lighten-2">Play again?</button>
                        <h4 class="blue lighten-2-text">{{playAgainResponse}}</h4> 
                    </span>
                </div>
            </div>
        </span>
        <br>
        <!-- <h1>Score:</h1><br>
        {{ownData.name}}: {{ownData.score}}   -   {{opponentData.name}}: {{opponentData.score}} -->
    </div>
</template>

<script lang="ts">
import db from '@/Firebase/init.js'
import Option from './Options.vue' 
export default{
    name: 'GameScreen',
    data() {
        return {
            playerID: null,
            doubleSend: 0,
            opponentID: null,
            key: 'hello',
            ownData: {
                name: null,
                selection: null,
                submitted: null,
                playAgain: false,
                score: 0
            },
            opponentData: {},
            winnerID: null,
            playAgainResponse: null,
            copied: false,
        }
    },
    props: ['name', 'gameID'],
    components: {
        Option
    },
    methods: {
        selectionMade(selection){
            this.ownData.selection = selection
        },
        submitSelection(){
            // console.log('Submitted!')
            this.ownData.submitted = true
            this.doubleSend++
            this.sendData()
        },
        generateGameID(){
            //This function is only triggered if the player doesn't have a gameID.
            let alpha = 'HLTPSANQS3MC7DEPDFNU7NCCJJ6ZWYNMSWGMZPV0MDD1FPVJH5FYFIZOWZIEUV9RV4U9759FG491JVZZZSDLRTCV9D8TQBUWYGV3'.split('')
            let gameID = alpha.filter(() => {
                return Math.round(Math.random())
            }).filter(() => {
                return Math.round(Math.random())
            }).splice(2,6).join('')
            this.gameID = gameID
        },
        sendData(){
            db.collection("players").doc(this.gameID).update({
                [this.playerID]: this.ownData
            })
        },
        initializeGame(){
            //Creates a firestore doc with the corresponding game ID
             db.collection("players").doc(this.gameID).set({
            })
        },
        declareWinner(){
            //Checking if both have submitted or not
            //Draw mech is handled in template part
            if(this.ownData.submitted && this.opponentData.submitted){
                if(this.ownData.selection === this.opponentData.selection){
                    this.winnerID = 'tie'
                }
                else if(this.ownData.selection === 'rock'){
                    if(this.opponentData.selection === 'paper') {
                        this.winnerID = this.opponentID
                    }
                    if(this.opponentData.selection === 'scissor') {
                        this.winnerID = this.playerID
                        this.incrementScore('ownData')
                    }
                }
                else if(this.ownData.selection === 'paper'){
                    if(this.opponentData.selection === 'scissor') {
                        this.winnerID = this.opponentID
                    }
                    if(this.opponentData.selection === 'rock') {
                        this.winnerID = this.playerID
                        this.incrementScore('ownData')
                    }
                }
                else if(this.ownData.selection === 'scissor'){
                    if(this.opponentData.selection === 'rock') {
                        this.winnerID = this.opponentID
                    }
                    if(this.opponentData.selection === 'paper') {
                        this.winnerID = this.playerID
                        this.incrementScore('ownData')
                    }
                }
            }
            // If both wants to playAgain, call rematch
            if(this.ownData.playAgain && this.opponentData.playAgain)   this.rematch()
        },
        playAgain(){
            //Called when a user clicks on play again
            this.ownData.playAgain = true
            this.winnerID = null
            this.sendData()
            this.playAgainResponse = "Rematch challenge sent!"
        },
        rematch(){
            //Resets the game
            this.ownData.selection = null
            this.opponentData.selection = false
            this.ownData.submitted = false
            this.opponentData.submitted = false
            this.ownData.playAgain = false
            this.playAgainResponse = null
            this.sendData()
        },
        incrementScore(whos){
            console.log(whos)
            // this[whos].score++
            // this.sendData()
        },
        copyURL() {
        let Url = `https://scissor-paper-rock.hostman.site/?code=${this.gameID}`
        navigator.clipboard.writeText(Url)
        this.copied = true
        setTimeout(()=>{
            this.copied = false
        }, 5000)
        }
    },
    watch: {
        "ownData.submitted": function() {
            if(this.ownData.submitted && this.opponentData.submitted){
                this.declareWinner()
            }
        },
        "opponentData.submitted": function() {
            if(this.ownData.submitted && this.opponentData.submitted){
                this.declareWinner()
            }
        }
    },
    created(){
        this.playerID = "two"
        this.opponentID = "one" //Sets the playerID to be 2. but if the player doesn't have a gameID already, he'll be converted to player 1
        if(!this.gameID){
            //If gameID is null, create a new gameID
            this.playerID = "one"
            this.opponentID = "two"
            this.generateGameID()
            this.initializeGame()
        }
        //Storing data locally
        this.ownData = {
            name: this.name,
            selection: null,
            score: 0
        }
        //Sending data to the server
        this.sendData()
        //Pulling data and storing locally from firebase
        //Listening for changes in the DB
        db.collection("players").doc(this.gameID).onSnapshot(doc => {
           //doc.data() contains an object containing everything (one ra two dubaiko)
            // this.ownData = doc.data()[this.playerID]
            this.opponentData = doc.data()[this.opponentID]
            // console.log(doc.data()[this.playerID], doc.data()[this.opponentID])
            this.declareWinner()
        })
    }
}
</script>

<style scoped>

#scoreboard{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
}

#share-icon{
    cursor: pointer;
}

#copied-prompt{
    font-size: 20px;
    color: greenyellow
}
</style>

