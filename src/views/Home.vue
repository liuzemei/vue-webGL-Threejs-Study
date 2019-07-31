<template>
    <div class="home">
        <button v-for="num in lessionNum" @click="handleClickChangeNumber(num)">lession{{num}}</button>
        <component :key="curSelectLession" :is="curSelectLession"></component>
    </div>
</template>

<script>
import lession1 from '../components/One/lession1';
import lession2 from '../components/One/lession2';

export default {
    name: 'home',
    components: { lession1, lession2 },
    data() {
        return {
            curSelectLession: 'lession1',
            lessionNum: [1, 2]
        };
    },
    methods: {
        handleClickChangeNumber(num) {
            this.curSelectLession = 'lession' + num;
        }
    }
};
</script>
