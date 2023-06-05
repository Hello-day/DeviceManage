<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
        <el-page-header @back="goBack" content="">
        </el-page-header>
        <span style="flex: 9;font-size: 18px;font-weight: bold">
                维修详细信息
                </span>
      </div>
      <!--            数据具体展示-->

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
                      :data="tableData"
                      stripe
                      style="width: 100% ;margin-top: 30px;">
                    <el-table-column
                        prop="date"
                        label="设备号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="设备名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="维修人员">
                    </el-table-column>
                    <el-table-column
                        prop="cost"
                        label="维修日期">
                    </el-table-column>
                    <el-table-column
                        prop="people"
                        label="维修经费">
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
  name: "LendContent",
  data(){
    return {
      tableData: [{
        date: '2016-05-02',
        name: 'iPhone11',
        address: '11'
      }, {
        date: '2016-05-04',
        name: 'iPhone12',
        address: '22'
      }, {
        date: '2016-05-01',
        name: 'iPhone13',
        address: '33'
      }, {
        date: '2016-05-03',
        name: 'iPhone14',
        address: '44'
      }],
      vote:[],  //存放频道内的投票项目
      count:0,
      Channel: this.$route.query,
      flagOfvoteCenter:true,
      flagOftext:true,
      flagOfvoteData:true,
      flagOfvoteContent:true,

    }
  },
  methods:{
    goBack() {
      this.$router.go(-1)
    },

    list(){
      this.request.get("/vote/list/"+this.Channel.id).then(res=>{
        this.vote = res.data
        console.log(this.vote)
        console.log(this.ChannelId)
      })

    },

  },
  created() {

    this.list()
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