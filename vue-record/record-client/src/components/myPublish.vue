<template>
<div>
    <div class="back">
        <van-icon name="arrow-left" @click="back" />
    </div>
    <div v-for="item in publishInfo" :key="item.id">
        <div @click="detail(item)">
            <div>{{item.title}}</div>
            <div>{{item.words}}</div>
            <div>{{item.publishTime}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        'publishInfo': {
            type: Array,
            require: true
        }
    },
    methods: {
        back() {
            this.$router.go(0);
        },
        detail(item) {
            console.log(item)
            this.$router.push({
                path: "/detail",
                query: {
                    des: item
                }
            });
        }
    },
}
</script>

<style>

</style>
