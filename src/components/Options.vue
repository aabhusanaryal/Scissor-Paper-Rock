<template>
    <div class="col s12 m4">
        <div :class="selection === this.name? 'card green': 'card white'" @click="selectionMade">
            <div class="card-content blue-text">
            <span class="card-title"><img :src="`/img/${name}.png`" width="130px" :alt="`${name}`"></span>
            <span>{{name.toUpperCase()}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'Option',
    data(){
        return{

        }
    },
    methods: {
        selectionMade(){
            this.$emit('selection', this.name);
        }
    },
    props: ['name', 'selection']
}
</script>