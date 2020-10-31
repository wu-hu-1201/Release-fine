<template>
<div class="wrapper" ref="wrapper">
    <div class="wrapper-co">
        <van-swipe :autoplay="3000" class="swipe">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" class="swipe-img" />
            </van-swipe-item>
        </van-swipe>
    </div>
    <div class="content">
        <img class="bg-img" src="@/assets/1.gif" />
        <div class="group" v-for="group in groups" :key="group.id">
            <div class="subline">{{ group.title }}</div>
            <div class="more" @click="goInfo(group)">
                <van-icon name="arrow" />
            </div>
            <div class="item" v-for="des in group.dess" :key="des.id">
                <div class="info" @click="goDetail(des)">
                    <img v-lazy="des.images[0]" class="item-img" v-if="des.images.length" />
                    <div class="test">{{ des.title }}</div>
                </div>
            </div>
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
import {
    mapState
} from 'vuex';

Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);

export default {
    data() {
        return {
            images: [
                "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2058217702,4005312955&fm=26&gp=0.jpg",
                "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2869729226,4144426068&fm=26&gp=0.jpg",
                "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1825658886,3086766909&fm=26&gp=0.jpg",
                "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2990146016,9931138&fm=26&gp=0.jpg",
            ],
            records: '',
            groups: [{
                    title: "游记",
                    dess: []
                },
                {
                    title: "N行情诗",
                    dess: []
                },
                {
                    title: "心语",
                    dess: []
                },
                {
                    title: '故事分享',
                    dess: []
                }
            ],
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        goInfo(group) {
            console.log(group)
            this.$router.push({
                path: "/info",
                query: {
                    group: group
                }
            })
        },
        goDetail(des) {
            console.log(des)
            this.$router.push({
                path: "/detail",
                query: {
                    des: des
                }
            });
        },
    },
    mounted() {
        // 获取所有发布的信息
        this.$http.getRecords({
                status: "open"
            })
            .then(res => {
                // 在数据源中添加一个records，将获取返回的数据存入其中
                this.records = res.data
                console.log(this.records)

                // 使用forEach遍历数据源groups中的数据
                this.groups.forEach(item => {
                    for (let one of this.records) {
                        if (item.title == one.target) {
                            // 当数据源groups中的title与返回拿到的数据records当中的target相同时
                            // console.log(item)
                            // console.log(one)
                            // 按照相同的种类将其他信息 逆序插入到dess中
                            item.dess.unshift(one)
                        }
                    }
                })
                console.log(this.groups);
            });

    }
};
</script>

<style lang="less" scoped>
.wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
}

.bg-img {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.wrapper-co {
    width: 100%;
    z-index: -1;
}

.swipe {
    width: 100%;
    height: 200px;
}

.swipe-img {
    width: 100%;
    height: 200px;
}

.content {
    overflow: scroll;
    height: 70vh;
    box-sizing: border-box;
    padding-bottom: 40px;
    z-index: 2;
}

.group {
    margin: 15px 15px 20px 15px;
    border-radius: 10px;
    height: 180px;
    box-shadow: 1px 1px 5px #888888;
}

.subline {
    color: red;
    font-weight: 600;
    margin-left: 10px;
    padding-top: 10px;
}

.item {
    display: inline-flex;
}

.info {
    display: flex;
    flex-direction: column;
    margin-left: 11px;
}

.item-img {
    width: 100px;
    height: 100px;
    margin-top: 10px;
}

.test {
    font-size: 12px;
    max-width: 95px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 5px;
}

.more {
    float: right;
    margin-top: -20px;
    margin-right: 10px;
}
</style>
