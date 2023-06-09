<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                库存管理
                </span>
      </div>
    </div>


    <div class="visualizationOfHome">
      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto">
          <div class="textArea" >
            <div class="voteChannel">
              <!--    现有投票-->
              <div class="voteNowHave" >
                <template >
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
                        prop="quantity"
                        label="设备数量">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="设备状态">
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作" width="150">
                      <template slot-scope="scope">
                        <el-popover
                            placement="bottom"
                            title="详细描述:"
                            width="150"
                            trigger="click"
                           >
                          <slot>{{ scope.row.description }}</slot>
                          <el-button slot="reference">查看详情</el-button>
                        </el-popover>

                        <el-button  type="text"
                                    size="small" style="color:#e98484; margin-left:8px;"  @click="delect(scope.row.deviceId,scope.$index)">报废</el-button>
                      </template>
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
  name: "Storage",
  data(){
    return {
      tabledatas: [],
    }
  },
  methods:{

    table(){
      this.request.get("/device/list").then(res=>{
        this.tabledatas=res.data
      })
      // console.log(this.tabledatas)
    },

    delect(deviceId,index) {
      this.tabledatas.splice(index, 1)
      this.request.get('/device/delete/'+ deviceId).then(res=>{
        if(res.code=="1"){
          this.$message.success("删除成功！")
        }
        else{
          this.$message.error("删除失败！")
        }
      })

    },

    delete(i){   //删除
      // this.myVote.splice(i-1, 1);  //从数组中删除，使这项不显示，应该放到删除成功下面，此处为测试用
      this.request.get('/vote/delete/'+ i.id).then(res=>{  //路由没配
        if(res.code=="1"){
          this.$message.success("删除成功！")
          // this.myVote.splice(i-1, 1);
          this.request.get("/vote/mine").then(res => {
            this.myVote = res.data
          })
        }
        else{
          this.$message.error("删除失败！")
        }
      })

    },

    handleClick(row) {
      this.$router.push({
        name: "DeviceContent",
        params: {
          taskId: row.taskId,
          times: this.times,
        },
      });
    },

    goBack() {
      this.$router.go(-1)
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