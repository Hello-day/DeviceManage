<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
        <el-page-header @back="goBack" content="">
        </el-page-header>
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                库存详情
                </span>

      </div>

    </div>

    <div class="visualizationOfHome">

      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto" @click="votePageApper(1)">
          <div class="textArea" >
            <div class="voteChannel">
              <!--    现有投票-->
              <div class="voteNowHave" >
                <div>
                  订&nbsp;单&nbsp;编&nbsp;号&nbsp;:
                  <span>详细描述</span>
                </div>
                <br>
                <div>
                  订&nbsp;单&nbsp;日&nbsp;期&nbsp;:
                  <span>详细描述</span>
                </div>
              </div>
            </div>

            <!--eslint-disable-next-line-->
            <transition-group name="list-complete" tag="p" appear v-for="i in myVote">
              <div v-show="flagOftext" class="textArea" :key="i">

                <div class="voteChannel" @click="votePageApper(i)">
                  <!--    现有投票-->
                  <div class="voteNowHave">
                    <div>
                      投&nbsp;票&nbsp;详&nbsp;情&nbsp;:
                      <span>{{i.description}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

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
  name: "Shop",
  data(){
    return {
      changeBtn:'返回',
      vote_Id:''

    }
  },
  methods:{

    goBack() {
      this.$router.go(-1)
    },


    list(){
      this.request.get("/channel/list").then(res=>{
        if(res.code == 1){
          this.channel=res.data
        }else{
          prompt(res.msg)
        }
        // console.log(this.channel)
        this.request.get("/vote/mine").then(res => {
          this.myVote = res.data
        })
      })
    },

  },
  created() {
    this.list()
    // this.loadMyVote()
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
  flex: 1;
  width: 100%;

  overflow-y: auto;
  position: relative;

}

.voteChannel div{
  border-radius: 15px;
  margin-top: 20px;
  transition: all 0.5s;
}


.textArea{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 400px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #87d7efb0, #eceaaeab 70%, #e7eda1b0);
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
}

.textArea div{
  margin-top: 0px;
}

.voteCreate div{
  border-radius: 15px;
  margin-top: 20px;

}

.voteCreate div:hover{
  transform: scale(1,1);
}

.voteArea div{
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