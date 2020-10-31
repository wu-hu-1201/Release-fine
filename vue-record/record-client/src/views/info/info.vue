<template>
<div class="all">
    <div class="quiet">
        <div class="head">
            <div class="background">
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2858800443,121828722&fm=26&gp=0.jpg" class="bg-img" />
            </div>
            <div class="back">
                <van-icon name="arrow-left" @click="returnPage" />
            </div>
            <div class="top">
                <div class="top-01 text">A long road, I will be born later</div>
                <div class="top-02 text">accompany you to every corner.</div>
            </div>
        </div>
        <div class="wrapper">
            <div class="group" v-for="group in groups" :key="group.id" @click="goDetail(group)">
                <img v-lazy="group.images[0]" class="group-img" v-if="group.images.length" />
                <div class="des">
                    <div class="title">
                        <div class="title-t">{{ group.title }}</div>
                    </div>
                    <div class="text">
                        <div class="text-t">{{ group.words }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <v-detail v-show="showDetail"></v-detail> -->
</div>
</template>

<script>
import Vue from "vue";
import {
    Lazyload
} from "vant";
// import Detail from '@/components/detail'

Vue.use(Lazyload);

export default {
    // components: {
    //   'v-detail': Detail
    // },
    data() {
        return {
            // quiet: true,
            // showDetail: false,
            detail: '',
            de: [],
            groups: [],
        };
    },
    mounted() {
        this.groups = this.$route.query.group.dess;
        // this.de = this.$route.query.group.title
        console.log(this.groups);
        // this.detail = this.$route.query.detail.target
        // console.log(this.detail)
        // console.log(this.de)
        // this.$http.getInfo({target: this.de})
        // .then(res => {
        //   this.records = res.data
        //   console.log(this.records)
        //   this.groups.forEach(item => {
        //     for (let one of this.records) {
        //       item.unshift(one)
        //     }
        //   })
        //   console.log(this.groups)
        // })
    },
    methods: {
        goDetail(group) {
            console.log(group);
            this.$router.push({
                path: "/detail",
                query: {
                    des: group
                }
            });
            // this.quiet = false
            // this.showDetail = true
        },
        returnPage() {
            console.log("e");
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="less" scoped>
.quiet {
    width: 100%;
    height: 25vh;
}

.head {
    z-index: -1;
}

.bg-img {
    width: 100%;
    height: 170.75px;
    border-radius: 0 0 45px 45px;
}

.back {
    border-radius: 7px;
    position: fixed;
    top: 28px;
    left: 20px;
    background: white;
    width: 24px;
    height: 24px;
}

.van-icon {
    padding: 0px 4px;
    margin-top: 4px;
}

.top {
    position: fixed;
    left: 50%;
    top: 10%;
    height: 50px;
    width: 100%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    z-index: 1;
}

.text {
    width: 100%;
    text-align: center;
}

.top-01 {
    font-size: 20px;
    font-weight: 700;
    color: black;
}

.top-02 {
    font-size: 15px;
    color: #ededed;
}

.wrapper {
    background: white;
    width: 100%;
    height: 75vh;
    overflow: scroll;
    padding: 0 15px;
    box-sizing: border-box;
    padding-bottom: 10px;
}

.group {
    height: 100px;
    width: 100%;
    margin: 20px 0;
    border-bottom: 1px solid #999999;
    display: flex;
    flex-wrap: nowrap;
    padding-top: 10px;
}

.group-img {
    width: 100px;
    height: 100px;
}

.des {
    flex: 1;
    height: 100%;
    margin: 0 10px 0 7px;
}

.title {
    color: brown;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.text {
    height: 30px;
    width: 100%;
    margin-top: 15px;
}

.text-t {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    float: left;
    font-size: 12px;
    color: #999999;
}
</style>
