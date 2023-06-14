<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                购买管理
                </span>
        <span class= "IconArea" style="flex: 2;font-size: 18px;font-weight: bold;color: #4E5C72;justify-content: end;display: flex">
                   <el-button round size="medium"  @click="newFix()"  ref='btn1'>新增购买订单</el-button>
        </span>


      </div>

    </div>

    <div class="visualizationOfHome">
      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto" v-if="update" >
          <div v-show="flagOfstartCreate" class="voteArea" :key="100">
            <div class="headOfvoteData">
              <span >新增购物订单</span>
            </div>
            <div class="voteCreate">
              <!--    现有投票-->
                <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item  label="经办人员" >
                    <el-select v-model="form.userId" placeholder="请选择经办人员">
                      <!--eslint-disable-next-line-->
                      <el-option v-for="i in userlist" :label="i.userName" :value="i.userId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  label="设备号" >
                    <el-select v-model="form.deviceId" placeholder="请选择设备号">
                      <!--eslint-disable-next-line-->
                      <el-option v-for="i in devicelist" :label="i.deviceName" :value="i.deviceId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="购入数量">
                    <el-input v-model="form.quantity"></el-input>
                  </el-form-item>
                  <el-form-item label="单件经费">
                    <el-input v-model="form.funds"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">立即创建</el-button>

                  </el-form-item>

                </el-form>

            </div>
          </div>

          <!--eslint-disable-next-line-->
          <transition-group name="list-complete" tag="p" appear v-for="i in myPurchase" v-show="flagOftext"  >
            <div v-if="update" class="textArea" :key="i" >
                <!--    现有投票-->
                <div class="voteNowHave" @click="votePageApper(i.recordId)">
                  <div>
                    订&nbsp;单&nbsp;编&nbsp;号&nbsp;:
                    <span>{{i.recordId}}</span>
                  </div>
                  <div>
                    购&nbsp;买&nbsp;总&nbsp;量&nbsp;:
                    <span>{{i.sum}}</span>
                  </div>
                </div>
            </div>
          </transition-group>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
import 'animate.css'
// eslint-disable-next-line no-unused-vars
import axios, {Axios as request} from "axios";
export default {
  name: "Shop",
  data(){
    return {

      form: {
        userId:'',
        deviceId:'',
        quantity:'',
        funds:'',
      },

      myPurchase:[],
      userlist:[],
      devicelist:[],
      changeBtn:'返回',
      update:true,
      flagOftext:true,
      flagOfstartCreate:false,
    }
  },
  methods:{

    submitForm() {

      this.request.post('/purchase/create/', this.form).then(res=>{
        if(res.code=="1"){
          this.$message.success("提交成功！")
        }
        else{
          this.$message.error("提交失败！")
        }
        this.request.get("/purchase/list").then(res => {
          this.tabledatas = res.data
        })
      })
      window.location.reload()  //页面刷新
    },

    votePageApper(id){
      this.$router.push({
                name:"ShopContent",
                query:{
                  record:id //变量名准备改
                }
            })
    },

    goBack() {
      this.$router.go(-1)
    },

    list(){
      this.request.get("/purchase/list").then(res => {
        this.myPurchase = res.data
      })
    },
    table(){

      this.request.get("/user/list").then(res=>{//路由
        this.userlist=res.data
      })
      this.request.get("/device/list").then(res=>{//路由
        this.devicelist=res.data
      })
    },


    newFix(){
      var n = this.changeBtn;
      this.changeBtn = this.$refs.btn1.$el.innerText;
      this.$refs.btn1.$el.innerText = n;
      this.flagOftext = !this.flagOftext;
      this.flagOfstartCreate = !this.flagOfstartCreate;
      //刷新数据
      this.update = false;
      this.$nextTick(() => {
        this.update = true
      })


    },
  },
  created() {
    this.list()
    this.table()
  }
}
</script>

<style scoped>

.mainBodyOfHome{
  display: flex;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FFE8EA, #EDF3FF 70%, #EDF2FB);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.viewOfvoteData{
  width: 100%;
  height: 570px;
  background-color: #F5F7F9;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  right: 0px;
}

.voteChannel{
  flex: 14;
  width: 100%;
  overflow-y: auto;
  position: relative;

}

.voteChannel div{
  border-radius: 15px;
  margin-top: 20px;
  transition: all 0.5s;
}

.voteChannel div:hover{
  transform: scale(1,1);
}


.textArea{
  width: 95%;
  height: 100px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #87d7efb0, #e0d394 70%, #e7eda1b0);
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
}

.textArea div{
  margin-top: 0px;
}

.voteCreate{
  flex: 16;
  width: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.voteCreate div{
  margin-top: 0px;
}


.liList li{
  text-align: center;
}

.liList li:hover{
  color: #257B5E;
  background-color: rgba(37,123,94,0.1);
}

.voteNowHave{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  color: #464646;
  padding: 0 15px
}

.voteNowHave:hover{
  cursor: pointer;
  background-color: rgba(231,234,237,0.7);
  transform: scale(0,0);
  width: 99%;
  border-radius: 10px;
}


.voteArea{
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-top: 100px;
  position: relative;
  width: 95%;
  height: 450px;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #bdfff3ad,#bdebffad 70%, #f7ffbdad);
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
}


.headOfvoteData{
  height: 100%;
  width: 100%;
  flex: 2;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-weight: bold;
  font-size: 16px;
  justify-content: center;
}


.dataDisplayOfHome{
  flex: 2;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px;
}

.visualizationOfHome{
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #DAF3EE;
}

.headOfDataDisplay{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.voteChannel{
  flex: 6;
  width: 100%;
}

</style>