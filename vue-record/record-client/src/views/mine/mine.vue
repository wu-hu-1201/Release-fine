<template>
<div class="wrap">
    <div v-show="wrapper">
        <img class="bg-img" src="@/assets/1.png" />
        <div class="contain">
            <div class="head">
                <img class="photo" :src="user.headerImg || defaultHeader" alt="">
                <div class="name">{{ user.userName }}</div>
            </div>
            <div class="item" @click="goMessage">
                <div class="item-name">资料修改</div>
                <img class="z1" src="@/assets/z1.png" />
            </div>
            <div class="item" @click="goMyPublish">
                <div class="item-name">我的发布</div>
                <img class="z2" src="@/assets/z2.png" />
            </div>
            <div class="item" @click="goPlace">
                <div class="item-name">心里话</div>
                <img class="z3" src="@/assets/z3.png" />
            </div>
            <div class="item" @click="goNote">
                <div class="item-name">便签</div>
                <img class="z4" src="@/assets/z5.png" />
            </div>
            <div class="item" @click="goData">
                <div class="item-name">日记</div>
                <img class="z4" src="@/assets/z4.png" />
            </div>
        </div>
    </div>
    <div v-show="message">
        <img class="bg-img" src="@/assets/1.png" />
        <div class="change-photo">
            <van-uploader class="photo" v-model="fileList" multiple :max-count="1" />
        </div>
        <div>
            <input class="input-item" type="text" placeholder="昵称" v-model="editInfo.userName" />
            <input class="input-word" type="text" placeholder="记录此刻心情" v-model="editInfo.signature" />
        </div>
        <div class="release" @click="release">确定</div>
        <div class="release01" @click="cancel">取消</div>
    </div>
</div>
</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex';
export default {
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    data() {
        return {
            editInfo: '',
            wrapper: true,
            fileList: [],
            // name: "",
            message: false,
            // signature: ''
            defaultHeader: '@/assets/2.png'
        };
    },
    mounted() {
        this.editInfo = Object.assign({}, this.user)
    },
    methods: {
        ...mapMutations(['SET_USER']),
        goMessage() {
            this.wrapper = false;
            this.message = true;
        },
        goMyPublish() {

        },
        goPlace() {},
        goNote() {},
        goData() {},
        release() {
            // console.log(this.fileList[0].content)
            this.editInfo.headerImg = this.fileList[0].content
            // console.log(this.editInfo.headerImg)
            const user = Object.assign({},
                this.editInfo,
            )
            // console.log(this.editInfo)
            this.$http.release(user)
                .then(res => {
                    console.log(res)
                    this.$toast.success("修改成功！"),
                        this.SET_USER(user)
                })
            this.wrapper = true;
            this.message = false;
        },
        cancel() {
            this.wrapper = true;
            this.message = false;
        }
    }

};
</script>

<style lang="less" scoped>
.bg-img {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.contain {
    padding-top: 50px;
}

.head {
    padding: 20px 20px;
}

.photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.name {
    margin-left: 100px;
    margin-top: -4vh;
    font-size: 22px;
    color: brown;
    font-weight: 600;
}

.item {
    width: 315px;
    margin-left: 30px;
    border-bottom: 1px solid #ededed;
}

.item-name {
    color: burlywood;
    margin-top: 50px;
    margin-bottom: 10px;
}

.z1 {
    width: 20px;
    height: 20px;
    float: right;
    position: absolute;
    margin-top: -32px;
    margin-left: 72px;
}

.z2 {
    width: 26px;
    height: 26px;
    float: right;
    position: absolute;
    margin-top: -34px;
    margin-left: 70px;
}

.z3 {
    width: 26px;
    height: 26px;
    float: right;
    position: absolute;
    margin-top: -34px;
    margin-left: 57px;
}

.z4 {
    width: 26px;
    height: 26px;
    float: right;
    position: absolute;
    margin-top: -34px;
    margin-left: 38px;
}

.change-photo {
    width: 80px;
    height: 80px;
    padding-left: 150px;
    padding-top: 15vh;
}

.input-item {
    color: #ffffff;
    background: linear-gradient(to bottom right, rgba(11, 63, 103, .8), rgba(36, 112, 136, .8));
    height: 32px;
    width: 300px;
    margin-top: 120px;
    margin-left: 5vh;
}

.input-word {
    color: #ffffff;
    background: linear-gradient(to bottom right, rgba(11, 63, 103, .8), rgba(36, 112, 136, .8));
    height: 100px;
    width: 300px;
    margin-top: 60px;
    margin-left: 5vh;
}

.release {
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #BF406B;
    color: #fff;
    margin-bottom: 15px;
    margin-left: 8vh;
    margin-top: 60px;
}

.release01 {
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ededed;
    color: black;
    margin-bottom: 15px;
    float: right;
    position: absolute;
    margin-top: -6.7vh;
    margin-left: 25vh;
}
</style>
