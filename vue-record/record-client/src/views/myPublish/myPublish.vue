<template>
<div>
    <div class="back">
        <van-icon name="arrow-left" @click="back" />
    </div>
    <div class="wrapper" v-for="item in publishInfo" :key="item.id">
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
    data() {
        return {
            useId: '',
            publishInfo: []
        }
    },
    mounted() {
        this.useId = this.$route.query.group
        this.$http.getPublish({
                author: this.useId
            })
            .then(res => {
                this.publishInfo = res.data
                this.publishInfo.reverse()
                console.log(this.publishInfo)
            })
    },
    methods: {
        back() {
            console.log('e')
            this.$router.go(-1);
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
.wrapper {
    border-bottom: 1px solid #ededed;
}
</style>
