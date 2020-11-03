<template>
<div class="wrapper">
    <van-search v-model="value" shape="round" background=" rgba(0, 40, 89, .5)" placeholder="请输入搜索关键词" @search="onSearch" @input="searchkey" @clear="clear" @blur="getHistory" />
    <div v-show="show_suggest" class="show_suggest">
        <div class="search_suggest" v-for="suggest in searchSuggest" :key="suggest.id" @click="goSearch(suggest)">
            <img class="search-pic" src="@/assets/search.png" />
            <div class="search_suggest_name">{{suggest.title}}</div>
        </div>
    </div>
    <div v-show="show_result" class="show_result">
        <div class="search_result" v-for="result in searchResult" :key="result.id" @click="goDetail(result)">
            <div class="search_result_name">{{result.title}}</div>
        </div>
    </div>
    <div v-show="show_history" class="show_history">
        <div class="history-wrapper">
            <div class="history-name">历史记录</div>
            <!--删除标签-->
            <img class="history-delete" src="@/assets/del.png" @click="deleteHis" />
        </div>
        <div class="allHistory">
            <div class="allHistory-box" v-for="his in history" :key="his.id">
                <div class="historyName" @click="toSearch(his)">{{his}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import {
    Search,
    Icon,
    Dialog
} from 'vant';
Vue.use(Search);
Vue.use(Icon)
export default {
    data() {
        return {
            value: '',
            inputValue: '',
            searchSuggest: [],
            searchResult: [],
            history: [],
            show_suggest: true,
            show_result: false,
            show_history: true
        }
    },
    methods: {
        onSearch(val) {
            this.$http.getSearchSuggest({
                    title: val
                })
                .then(res => {
                    // console.log(res)
                    this.searchSuggest = res.data
                    // console.log(this.searchSuggest)
                })
            this.show_suggest = true
        },
        searchkey(val) {
            // console.log(val)
            this.inputValue = val
            this.$http.getSearchSuggest({
                    title: val
                })
                .then(res => {
                    // console.log(res)
                    this.searchSuggest = res.data
                    // console.log(this.searchSuggest)
                })
            this.show_suggest = true
        },
        goSearch(suggest) {
            // console.log(suggest.title)
            this.$http.getSearchSuggest({
                    title: suggest.title
                })
                .then(res => {
                    // console.log(res)
                    this.searchResult = res.data
                    // console.log(this.searchResult)
                })
            this.show_suggest = false
            this.show_history = false
            this.show_result = true
        },
        clear() {
            this.show_result = false
            this.show_history = true
            return
        },
        goDetail(result) {
            // console.log(result)
            this.$router.push({
                path: "/detail",
                query: {
                    des: result
                }
            });
        },
        getHistory() {
            // if (this.inputValue) {
            //     console.log(this.inputValue);
            //     let history = localStorage.getItem('history') || [];
            //     if (typeof history === 'string') history = JSON.parse(history);
            //     this.history = [...history, this.inputValue].reduce((res, item) => {
            //         // console.log(item)
            //         return res.includes(item) ? [...res] : [...res, item];
            //     }, []);
            //     localStorage.setItem('history', JSON.stringify([...this.history]))
            //     this.history.reverse()
            // } else {
            //     return
            // }
            console.log(this.inputValue)
            if (this.inputValue.length > 0) {
                let history = localStorage.getItem("history") || []
                history = history.filter(item => item !== this.inputValue)
                history.unshift(this.inputValue)
                localStorage.getItem("histroy", history)
                console.log(history)
            } else {
                return
            }
        },
        deleteHis() {
            Dialog.confirm({
                    title: '标题',
                    message: '弹窗内容',
                })
                .then(() => {
                    this.history = []
                })
                .catch(() => {
                    // on cancel
                });
        },
        toSearch(his) {
            console.log(his)
            this.value = his
            this.$http.getSearchSuggest({
                    title: his
                })
                .then(res => {
                    // console.log(res)
                    this.searchResult = res.data
                    // console.log(this.searchResult)
                })
            this.show_suggest = false
            this.show_history = false
            this.show_result = true
        }
    },
    mounted() {
        this.history = localStorage.getItem("history") || []
    },
};
</script>

<style>
.show_suggest {
    width: 285px;
    margin-left: 20px;
    position: absolute;
    z-index: 2;
    background: #fff;
    box-shadow: 1px 1px 5px #888888;
}

.search_suggest {
    width: 285px;
    height: 50px;
    border-bottom: 1px solid #eaeaea;
}

.search-pic {
    width: 25px;
    height: 25px;
    margin-top: 13px;
    margin-left: 10px;
}

.search_suggest_name {
    display: block;
    float: right;
    position: absolute;
    margin-left: 42px;
    margin-top: -23px;
    font-size: 14px;
    color: darkgrey;
}

.show_result {
    margin-top: 330rpx;
    width: 100%;
    height: 100%;
    margin-left: 15rpx;
}

.search_result {
    display: block;
    margin: 7.5px;
    border-bottom: 1px solid #EDEEF0;
    margin-top: 20px;
}

.search_result_name {
    font-size: 15px;
    color: #000000;
    margin-bottom: 7.5px;
}

.show_history {
    margin: 30px 0 15px 20px;
}

.history-delete {
    width: 25px;
    height: 25px;
    position: absolute;
    margin-left: 270px;
    margin-top: -23px;
}

.allHistory {
    display: flex;
    flex-wrap: wrap;
}

.allHistory-box {
    margin: 15px 10px 0 0;
    background-color: #ededed;
    border-radius: 5px;
}

.historyName {
    font-size: 15px;
    margin: 10px 10px 10px 10px;
}
</style>
