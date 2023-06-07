<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                报废管理
                </span>
      </div>
    </div>


    <div class="visualizationOfHome">
      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto">
          <div class="textArea" >
            <div class="voteChannel">
              <!--    现有投票-->
              <div class="voteNowHave"  style="overflow-y:auto" >
                <template>
                  <el-table
                      :data="tabledatas"
                      stripe
                      style="width: 100% ;margin-top: 30px;overflow-y:auto">
                    <el-table-column
                        prop="deviceId"
                        label="设备号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="deviceName"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="scrapDate"
                        label="报废日期">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="批准人">
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
  name: "Obsolete",
  data(){
    return {
      tabledatas:[],
    }
  },
  methods:{
    goBack() {
      this.$router.go(-1)
    },

    table(){
      this.request.get("/scrap/list").then(res=>{
        this.tabledatas=res.data
      })
      // console.log(this.tabledatas)
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