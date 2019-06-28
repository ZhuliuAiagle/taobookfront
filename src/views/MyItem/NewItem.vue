<template>
    <div class = "new-item">
        <h1>发布新商品</h1>
        <div class="new-item-form">
            <el-form title="请填写商品详细信息" :model="newItemForm">
                <el-form-item>
                    <el-input v-model="newItemForm.itemName" auto-complete="off" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="newItemForm.clazz" placeholder="分类">
                        <el-option v-for="item in clazzes" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否应求">
                    <el-radio v-model="newItemForm.type" label="1">普通商品</el-radio>
                    <el-radio v-model="newItemForm.type" label="2">应求商品</el-radio>
                </el-form-item>
                <el-form-item v-if="newItemForm.type=='2'">
                    <el-input v-model="newItemForm.reqId" auto-complete="off" placeholder="应求者ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" :rows="4" 
                    v-model="newItemForm.description" auto-complete="off" placeholder="商品描述（少于150字）"
                    maxlength="150" show-word-limit></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="newItemForm.img" auto-complete="off" placeholder="图像链接（需先上传）"></el-input>
                </el-form-item>
                <el-form-item label="初始库存">
                    <el-input-number v-model="newItemForm.stock" :min="1" :max="100" label="初始库存"></el-input-number>
                </el-form-item>
                <el-form-item label="初始单价">
                    <el-row>
                        <span style="font-size: 20px;">${{actualPrice}}元</span>
                    </el-row>
                    <el-row :gutter="6">
                        <el-col :span="12">
                            <el-input v-model="newItemForm.price.int" auto-complete="off" placeholder="整数" maxlength="8" show-word-limit></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="newItemForm.price.dec" auto-complete="off" placeholder="小数" maxlength="2" show-word-limit></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="商品外链（如果有）">
                    <el-input v-model="newItemForm.link" auto-complete="off" placeholder="商品外链（如果有）"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="onSubmit()">确认无误，立即发布！</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
export default {
    name:"NewItem",
    computed:{
        actualPrice:function(){
            return this.newItemForm.price.int + "." + this.newItemForm.price.dec
        },
        actualPriceNum:function(){
            console.log(this.newItemForm.price.int)
            console.log(this.newItemForm.price.dec)
            
            var sm = (parseInt(this.newItemForm.price.dec) * 0.01)
            console.log(sm)
            var num = (parseInt(this.newItemForm.price.int) + sm)
            return num
        },
        actualType:function(){
            return parseInt(this.newItemForm.type)
        }
    },
    methods:{
        //发布书籍
        onSubmit:function(){
            var a = {
                user_id:'nm00001',
                req_id: this.newItemForm.reqId,
                itemname:this.newItemForm.itemName,
                clazz:this.newItemForm.clazz,
                type:this.actualType,
                description: this.newItemForm.description,
                img: this.newItemForm.img,
                stock: this.newItemForm.stock,
                price:this.actualPriceNum,
                link:this.newItemForm.link
            }
            console.log(a)
            var url = this.$store.state.server
            var that = this
            axios.post(url + '/item/add',a).then(function(response){
                alert(response.data)
            })
        }
    },
    data(){
        return{
            newItemForm:{
                reqId:"",
                itemName:"",
                clazz:"",
                type:'1',
                description:"",
                img:"",
                stock:1,
                price:{
                    int:"",
                    dec:""
                },
                link:""
            },
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
                value: "其他",
                label: "其他"
            },]
        }
    }
}
</script>




<style>
.new-item{
    text-align: left;
}
</style>
