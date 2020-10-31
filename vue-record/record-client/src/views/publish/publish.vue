<template>
<div class="main">
    <div class="background">
        <img class="bg-img" src="@/assets/0.png" />
    </div>
    <div class="container">
        <div class="wrapper">
            <div class="wrapper-content">
                <div class="item-h120">
                    <div class="title-fs">标题</div>
                    <input class="in-text" type="text" placeholder="请输入标题" v-model="titleValue" />
                </div>
                <div class="item-un" @click="selectType">
                    <div class="title-fss">主题</div>
                    <van-icon name="arrow" class="arrow" />
                    <span class="span-text">{{selectCon}}</span>
                    <van-action-sheet :zIndex="zIndex" v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="onCancel" @click-overlay="onClickOverlay" />
                </div>
                <div class="item">
                    <div class="intro_fs">简介({{placeholder}})</div>
                    <textarea class="textarea" maxlength="200" v-model="introInput"></textarea>
                </div>
                <div class="item">
                    <div class="title_fs">上传图片</div>
                    <div class="up">
                        <van-uploader v-model="fileList" multiple :max-count="6" accept="image/*.*" :max-size="500 * 1024" @oversize="onOversize" />
                    </div>
                </div>
            </div>
            <div class="release" @click="publish">release</div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import {
    Uploader,
    Toast
} from 'vant';
import {
    mapState
} from 'vuex';
Vue.use(Uploader);
export default {
    data() {
        return {
            deletable: true,
            zIndex: 1000,
            isWarning: 0,
            show: false,
            isSelect: 0,
            placeholder: '快来分享更多好玩或者需要记录的时刻吧',
            actions: [{
                    name: '游记'
                },
                {
                    name: 'N行情诗',
                },
                {
                    name: '心语',
                },
                {
                    name: '故事分享',
                }
            ],
            selectCon: '点击选择发布的主题',
            titleValue: '',
            introInput: '',
            fileList: [],
            date: '',
            images: []
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted() {
        this.author = Object.assign({}, this.user)
    },
    methods: {
        selectType() {
            this.show = true;
        },
        onSelect(item) {
            console.log(item);
            this.selectCon = item.name;
            console.log(this.selectCon);
            this.show = false;
        },
        onCancel() {
            setTimeout(() => {
                this.show = false
            }, 1)
        },
        onClickOverlay() {},
        onOversize(fileList) {
            console.log(fileList);
            Toast('文件大小不能超过 500kb');
        },
        publish() {
            if (!this.fileList || !this.titleValue || !this.introInput) {
                this.$toast('请输入')
                return
            }
            for (let i = 0; i < this.fileList.length; i++) {
                this.images.push(this.fileList[i].content)
            }
            let data = {
                status: 'open',
                images: this.images,
                title: this.titleValue,
                words: this.introInput,
                author: this.user.userId,
                authorName: this.user.userName,
                authorHeader: this.user.headerImg,
                target: this.selectCon,
                publishTime: this.getPublishTime(new Date())
            };
            console.log(data)
            this.$http.publish(data)
                .then(res => {
                    console.log(res)
                    this.$toast.success("发布成功！");
                    // this.setRecordInfo(res.data)
                    this.getPublishTime();
                });
        },
        getPublishTime() {
            var date = new Date()
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month
            }
            if (strDate >= 1 && strDate <= 9) {
                strDate = "0" + strDate
            }
            var currentDate = year + '年' + month + '月' + strDate;
            return currentDate
        }
    },

};
</script>

<style lang="less" scoped>
.bg-img {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.main {
    width: 100%;
    height: 100vh;
    display: flex;
}

.container {
    background: linear-gradient(to bottom right, rgba(0, 40, 89, .5), rgba(35, 109, 134, .5));
    width: 88%;
    height: 520px;
    display: flex;
    margin: 0 auto;
    margin-top: 8vh;
    flex-direction: column;
}

.wrapper {
    width: 86%;
    height: 85%;
    margin: 40px auto 25px;
    display: flex;
    flex-direction: column;
}

.wrapper-content {
    display: flex;
    flex-direction: column;
}

.item-h120 {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    height: 60px;
}

.title-fs {
    width: 100%;
    color: #a0a0a0;
    letter-spacing: 1px;
    margin-bottom: 10px;
}

.in-text {
    border: 1px solid rgba(255, 151, 106, .9);
    color: #ffffff;
    background: linear-gradient(to bottom right, rgba(11, 63, 103, .8), rgba(36, 112, 136, .8));
    height: 25px;
}

.item-un {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: nowrap;
    color: #a0a0a0;
}

.textarea {
    color: #fff;
    width: 100%;
    background: linear-gradient(to bottom right, rgba(11, 63, 103, .8), rgba(36, 112, 136, .8));
    height: 100px;
}

.title-fss {
    margin-right: 12px;
}

.span-text {
    margin-left: 12rx;
    color: #fff;
}

.item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
}

.title_fs {
    color: #a0a0a0;
    letter-spacing: 1px;
    margin-bottom: 10px;
}

.up {
    display: flex;
    flex-wrap: nowrap;
}

.van-uploader__preview {
    position: relative;
    margin: 0 7px 8px 0;
    cursor: pointer;
}

.release {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #BF406B;
    color: #fff;
    margin-bottom: 15px;
}
</style>
