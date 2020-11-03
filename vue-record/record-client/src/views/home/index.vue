<template>
<div>
    <router-view></router-view>
    <van-tabbar v-model="active" class="tabbar">
        <van-tabbar-item to="/home/community" icon="shop">社区</van-tabbar-item>
        <van-tabbar-item to="/home/search" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item to="/home/publish" icon="edit">发布</van-tabbar-item>
        <van-tabbar-item to="/home/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
import {
    Tabbar,
    TabbarItem
} from "vant";

export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    data() {
        return {
            msg: "快来记录美好时刻！",
            active: 0,
        }
    },
};
</script>

<style lang="less" scoped>
// .tabbar {
//   background: pink;
// }
</style>
