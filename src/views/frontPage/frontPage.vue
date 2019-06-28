<template>
    <div class="front-page">
        <h2>所有书籍</h2>
        <item-short></item-short>
        <item-short></item-short>
        <item-short></item-short>
        <item-short></item-short>
    </div>
</template>




<script>
import itemShort from '../../components/itemShort/itemShort.vue'

export default {
    name: 'frontPage',
    components:{
        itemShort
    },
    data(){
        return{
            
        }
    }
}
</script>

<style>
h2{
    text-align: left;
}

</style>