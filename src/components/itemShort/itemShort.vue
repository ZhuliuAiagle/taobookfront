<template>
    <div class = "item-short">
        <el-card :body-style="{ padding: '0px' }">
            <el-row>
                <el-col :span="4">
                    <img src="https://i.ibb.co/vBNK9GS/u-3034470754-3763725547-fm-26-gp-0.jpg" alt="u-3034470754-3763725547-fm-26-gp-0" border="0" class="item-image"/>
                </el-col>
                <el-col :span="20">
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
            </el-row>
        </el-card>
        <br/>
    </div>
</template>

<script>

export default {
    name: 'itemShort',
    props:{
        name: String,
        clazz: String,
        id: String,
        price: Number
    },
    computed:{
        priceFormat : function(){
            
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
</style>