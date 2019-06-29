import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: "http://localhost:9999",
    user:"nm00001",
    account:["ac00001"],
    clazzes:[{
      value: "艺术",
      label: "艺术"
    },
    {
        value: "文学",
        label: "文学"
    },{
        value: "自然科学",
        label: "自然科学"
    },{
        value: "教育",
        label: "教育"
    },{
        value: "生活",
        label: "生活"
    },{
        value: "儿童",
        label: "儿童"
    },{
        value: "工程技术",
        label: "工程技术"
    },{
        value: "计算机",
        label: "计算机"
    },{
        value: "社会科学",
        label: "社会科学"
    },{
      value: "党政教育",
      label: "党政教育"
    },{
        value: "其他",
        label: "其他"
    },]
  },
  mutations: {

  },
  actions: {

  }
})
