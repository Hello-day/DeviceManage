<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                转借管理
                </span>
        <span class= "IconArea" style="flex: 2;font-size: 18px;font-weight: bold;color: #4E5C72;justify-content: end;display: flex">
                   <el-button round size="medium"  @click="newFix()"  ref='btn1'>新增转借</el-button>
        </span>

      </div>

    </div>

    <div class="visualizationOfHome">
      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto">
          <div class="textArea"  >
            <div class="voteChannel">
              <div v-show="flagOfstartCreate" class="voteArea" :key="100">
                <div class="headOfvoteData">
                  <span >新增转借记录</span>
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
                          <el-option v-for="i in devicelist":label="`${i.deviceName} 现有数量:${i.quantity}`" :value="i.deviceId"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="submitForm()">立即创建</el-button>

                      </el-form-item>

                    </el-form>

                  </div>
                </div>
              </div>

              <div class="voteNowHave"  style="overflow-y:auto" v-show="flagOftext" v-if="update">
                <template>
                  <el-table
                      :data="tabledatas"
                      stripe
                      style="width: 100% ;margin-top: 30px;overflow-y:auto" >
                    <el-table-column
                        prop="recordId"
                        label="记录号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="deviceId"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="lendDate"
                        label="转借日期">
                    </el-table-column>
                    <el-table-column
                        prop="returnDate"
                        label="归还日期">
                    </el-table-column>
                    <el-table-column
                        prop="userId"
                        label="经手人">
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

export default {
  name: "Lend",
  data(){
    return {

      changeBtn:'返回',
      flagOftext:true,
      flagOfstartCreate:false,
      update:true,

      tabledatas:[],
      userlist:[],
      devicelist:[],

      form: {
        userId:'',
        deviceId:''
      },

    }
  },
  methods:{
    submitForm() {
      this.request.post('/lend/form/', this.form).then(res=>{
        if(res.code=="1"){
          this.$message.success("提交成功！")
        }
        else{
          this.$message.error("提交失败！")
        }
        this.request.get("/lend/list").then(res => {
          this.tabledatas = res.data
        })
      })

    },
    table(){
      this.request.get("/lend/list").then(res=>{//路由
        this.tabledatas=res.data
      })

      this.request.get("/user/list").then(res=>{//路由
        this.userlist=res.data
      })
      this.request.get("/device/list").then(res=>{//路由
        this.devicelist=res.data
      })
    },

    delect(deviceId,index) {
      this.tabledatas.splice(index, 1)
      this.request.get('/user/delete/'+ deviceId).then(res=>{  //路由没配
        if(res.code=="1"){
          this.$message.success("删除成功！")
        }
        else{
          this.$message.error("删除失败！")
        }
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