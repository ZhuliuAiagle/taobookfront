<template>
    <div class = "item-short">
        <el-card :body-style="{ padding: '0px' }">
            <el-row>
                <el-col :span="4">
                    <img src="https://i.ibb.co/vBNK9GS/u-3034470754-3763725547-fm-26-gp-0.jpg" alt="u-3034470754-3763725547-fm-26-gp-0" border="0" class="item-image"/>
                </el-col>
                <el-col :span="16">
                    <div class = "item-description">
                        <div class = "title" style = "margin-top: 0px;">
                            <span style = "font-size:150%;">{{name}}</span>
                        </div>
                        <div class = "price" style = "font-size: 200%;">
                            <el-row>
                                <span style="vertical-align:middle;"> $ {{price.toFixed(2)}}&nbsp;&nbsp;</span>
                                <el-tag type="success" effect="dark">-30%</el-tag>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" class="detail-button" style="padding-top: 2.5%; padding-bottom:2.5%;">
                    <el-row>
                        <el-button type="primary" v-if="!showDetail" @click="showDetail=true;getTableData">详细信息</el-button>
                        <el-button type="primary" v-if="showDetail" @click="showDetail=false">隐藏信息</el-button>
                    </el-row>
                    <el-row style="margin-top: 10px;">
                        <el-button type="danger"  @click="dialogFormVisible=true">立即购买</el-button>
                    </el-row>
                </el-col>
            </el-row>
            <div class = "detail-info" v-if="showDetail" style="padding: 20px;">
                <h1 style="text-align:center; margin-bottom: 0px; margin-top: 0px;" >商品信息</h1>
                <el-table :data="getTableData" show-header="false">
                    <el-table-column prop="key">
                    </el-table-column>
                    <el-table-column prop="value">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog title="确认订单" :visible.sync="dialogFormVisible" style="text-align:left; padding: 10px; width: 100%; margin: 0px;">
            <el-form :model="orderInfo">
                <el-form-item label="数量" :label-width="formLabelWidth">
                    <el-input-number size="small" v-model="orderInfo.count" :min="1" :max="detail[0].stock" label="购买数量"></el-input-number>
                </el-form-item>
                <el-form-item label="配送" :label-width="formLabelWidth">
                    <el-radio v-model="orderInfo.mode" label="1">邮递运输</el-radio>
                    <el-radio v-model="orderInfo.mode" label="2">送货上门</el-radio>
                </el-form-item>
                <el-form-item label="账户" :label-width="formLabelWidth">
                    <el-select placeholder="请选择付款账户" v-model="orderInfo.payAccount">
                        <el-option v-for="item in this.$store.state.account"
                        :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密钥" :label-width="formLabelWidth">
                    <el-input show-password placeholder="请输入密码" maxlength="6" show-word-limit v-model="orderInfo.payPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false; onOrderSubmit();">确 定</el-button>
            </div>
        </el-dialog>
        <br/>
    </div>
</template>

<script>
import TableComponent from '../tableComponent/TableComponent.vue'

export default {
    name: 'itemShort',
    components:{
        TableComponent
    },
    props:{
        name: String,
        clazz: String,
        id: String,
        price: Number,
        detail: Array
    },
    data(){
        return {
            showDetail: false,
            dialogFormVisible: false,
            orderInfo:{
                count:0,
                mode:"",
                payAccount:"",
                payPassword:""
            },
            formLabelWidth: '60px'
        }
    },
    computed:{
        priceFormat : function(){
            
        },
        getTableData: function(){
            var data = new Array()
            if(this.detail != null || this.detail.length != 0){
                var obj = this.detail[0]
                var keys = Object.keys(obj)
                var values = Object.values(obj);
                for(var i = 0;i < keys.length;i = i + 1){
                    if(keys[i] == 'publisher_id'||
                       keys[i] == 'publisher_name'||
                       keys[i] == 'description'||
                       keys[i] == 'stock'||
                       keys[i] == 'clazz')
                    data.push({key: keys[i], value: values[i]})
                }
            }
            return data
            console.log(data)
        }
    },
    methods:{
        onOrderSubmit: function(){
            var finalOrderInfo = {
                acc_id: this.orderInfo.payAccount,
                item_id: this.detail[0].id,
                count: this.orderInfo.count,
                pay_type: parseInt(this.orderInfo.mode),
                type: parseInt(this.orderInfo.mode)
            }
            console.log(finalOrderInfo)
            axios.post(this.$store.state.server + '/order/submit', finalOrderInfo).then(function(response){
                if(response.data == "SUCCESS") alert("支付成功")
                else alert("支付失败：" + response.data)
            })
        }
    }
}
</script>

<style>
.item-image{
    width: 50%;
    height: 50%;
    margin: 10%;
    object-fit: cover;
    
}
.item-description{
    margin-top:1.5%;
    text-align: left;
    line-height: 330%;
}
.el-tag{
    font-size:100%;
    text-align:center;
    height: 40%;
    vertical-align:middle;
    line-height:120%;
}
.detail-button{
    padding-top:4%;
}
.el-dialog{
    width: 300px;
}
</style>