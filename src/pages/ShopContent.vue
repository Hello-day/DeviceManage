<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
        <el-page-header @back="goBack" content="">
        </el-page-header>
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                购物详细信息
                </span>
        <span class= "IconArea" style="flex: 2;font-size: 18px;font-weight: bold;color: #4E5C72;justify-content: end;display: flex">
                   <el-button round size="medium"  @click="newFix()"  ref='btn1'>新增设备记录</el-button>
        </span>
      </div>
      <!--            数据具体展示-->

    </div>

    <div class="visualizationOfHome">
      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto">
          <div class="textArea" >
            <div class="voteChannel">

              <div v-show="flagOfstartCreate" class="voteArea" :key="100">
                <div class="headOfvoteData">
                  <span >新增购入记录</span>
                </div>

                <div class="voteCreate">
                  <!--    现有投票-->
                  <div  class="voteEdit" >

                    <el-form ref="form" :model="form" label-width="100px">

                      <el-form-item  label="经办人员" >
                        <el-select v-model="form.userId" placeholder="请选择经办人员">
                          <!--eslint-disable-next-line-->
                          <el-option v-for="i in userlist" :label="i.userName" :value="i.userId"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item  label="设备名" >
                        <el-select v-model="form.deviceId" placeholder="请选择设备名">
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
              </div>

              <!--    现有投票-->
              <div class="voteNowHave" v-show="flagOftext" v-if="update">
                <template >
                  <el-table
                      :data="tableData"
                      stripe
                      style="width: 100% ;margin-top: 30px;overflow-y:auto">
                    <el-table-column
                        prop="deviceName"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="purchaseDate"
                        label="购入日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="购入数量">
                    </el-table-column>
                    <el-table-column
                        prop="funds"
                        label="购买经费">
                    </el-table-column>
                    <el-table-column
                        prop="userId"
                        label="经手人员">
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </div>
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
  name: "ShopContent",
  data(){
    return {

      form: {
        userId:'',
        deviceId:'',
        quantity:'',
        funds:'',
        recordId:this.$route.query.record,
      },

      changeBtn:'返回',
      update:true,
      flagOftext:true,
      flagOfstartCreate:false,
      tableData: [],
      userlist:[],
      devicelist:[],
      record: this.$route.query.record
    }
  },
  methods:{
    submitForm() {
      this.request.post('/purchase/newgoods', this.form).then(res=>{
        if(res.code=="1"){
          this.$message.success("提交成功！")
        }
        else{
          this.$message.error("提交失败！")
        }
        this.request.get("/purchase/detail/"+this.record).then(res=>{ //路径需要改
          this.tableData = res.data
        })
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

    goBack() {
      this.$router.go(-1)
    },

    table(){

      this.request.get("/user/list").then(res=>{//路由
        this.userlist=res.data
      })
      this.request.get("/device/list").then(res=>{//路由
        this.devicelist=res.data
      })
    },

    list(){
      this.request.get("/purchase/detail/"+this.record).then(res=>{ //路径需要改
        this.tableData = res.data
      })
      
    },
  },
  created() {
    console.log(this.record)
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
  transform: scale(1.01,1.01);
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
  height: 90%;
  width: 100%;
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  color: #464646;
  padding: 0 15px
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

.voteArea{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 350px;
  background-color: rgb(0,0,0,0);
  margin-left: 30px;
  margin-top: 100px;
  position: relative;
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


.textArea{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 500px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #87d7efb0, #e4faa891 70%, #e7eda1b0);
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
}

.textArea div{
  margin-top: 0px;
}

.voteChannel{
  flex: 6;
  width: 100%;
}
</style>