<template>
    <div class = "item-short">
        <el-card :body-style="{ padding: '0px' }">
            <el-row>
                <el-col :span="4">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" 
                    class="item-image">
                </el-col>
                <el-col :span="20">
                    <div class = "item-description">
                        <div class = "title" style = "margin-top: 0px;">
                            <span style = "font-size:150%;">汉堡的烹饪方式</span>
                        </div>
                        <div class = "price" style = "font-size: 200%;">
                            <el-row>
                                <span style="vertical-align:middle;"> $ 34.00&nbsp;&nbsp;</span>
                                <el-tag type="success" effect="dark">-30%</el-tag>
                            </el-row>
                        </div>
                        <div class = "cluster">
                            <span>美食</span>
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
}
</script>

<style>
.item-image{
    width: 40%;
    height: 40%;
    margin: 10%;
    
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