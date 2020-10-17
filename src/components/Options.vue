<template>
    <div class="col s4 m4">
        <div :class="selection === this.name? 'card green': 'card white'" @click="selectionMade">
            <div class="card-content blue-text">
            <span class="card-title"><img :src="`/img/${name}.png`" :alt="`${name}`"></span>
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

<style scoped>
img{
    width: 120px;
}
@media (max-width: 768px) {
    img{
        width: 60px;
    }
}
</style>