<template>
<div class="wrapper">
    <div class="back">
        <!--<van-icon name="arrow-left" @click="returnInfo(detail)" />-->
        <van-icon name="arrow-left" @click="returnPage" />
    </div>
    <div class="wrapper-box">
        <div class="des-box">
            <div class="title">
                <img v-lazy="detail.authorHeader" class="photo" />
                <div class="name">{{ detail.authorName }}</div>
            </div>
            <div class="logo-box">
                <div class="logo">{{ detail.target }}</div>
            </div>
            <div class="head">{{ detail.title }}</div>
            <div class="test">{{ detail.words }}</div>
            <van-swipe :autoplay="3000" class="swipe">
                <van-swipe-item v-for="img in images" :key="img.id">
                    <img v-lazy="img" class="swipe-img" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="time">
            <div class="timeNum">{{detail.publishTime}}</div>
            <div class="timeName">发布于</div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import {
    Lazyload
} from "vant";
import {
    Grid,
    GridItem
} from "vant";

Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);

export default {
    data() {
        return {
            detail: [],
            images: []
        }
    },
    mounted() {
        this.detail = this.$route.query.des
        console.log(this.detail)
        this.images = this.detail.images
    },
    methods: {
        // returnInfo(detail) {
        //     console.log(detail)
        //     // this.$router.push({ path: "/info", query: {detail: detail} })
        // }
        returnPage() {
            console.log("e");
            this.$router.go(-1);
        },
    }
};
</script>

<style lang="less" scoped>
.wrapper {
    width: 100%;
    height: 100vh;
}

.van-icon {
    margin-left: 10px;
    margin-top: 10px;
}

.des-box {
    border-radius: 20px;
    box-shadow: 1px 1px 5px black;
    width: 325px;
    margin-left: 25px;
    height: 100%;
    margin-top: 10vh;
    padding-bottom: 20px;
}

.title {
    margin: 20px 0 10px 15px;
}

.photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
}

.name {
    position: absolute;
    margin-left: 7vh;
    margin-top: -3vh;
    color: red;
}

.logo {
    position: absolute;
    margin-left: 250px;
    margin-top: -40px;
    padding: 5px 10px;
    border-radius: 7px;
    background: burlywood;
    font-size: 10px;
}

.head {
    text-align: center;
    color: burlywood;
}

.test {
    margin-left: 2.5vh;
    width: 300px;
    white-space: pre-wrap;
    border-bottom: 3rpx solid #999999;
}

.swipe {
    width: 280px;
    height: 280px;
    margin-left: 20px;
    margin-top: 10px;
    box-shadow: 1px 1px 5px white;
}

.swipe-img {
    width: 280px;
    height: 280px;
}

.time {
    text-align: center;
    margin-left: 150px;
    margin-top: 5vh;
}

.timeNum {
    width: 200px;
    border-bottom: 1.5px solid #ededed;
    font-size: 14px;
    color: gainsboro;
}

.tomeName {
    font-size: 16px;
    color: darkslategrey;
    margin-top: -1px;
}
</style>
