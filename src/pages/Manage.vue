<template>
    <div class="mainBody">
<!--        左侧边栏-->
        <div class="leftBar">
            <LeftNavBar/>
        </div>
<!--        数据可视化部分-->
        <div class="dataView">
            <transition
                    name="animate__animated animate__bounce router_view"
                    enter-active-class="animate__fadeIn"
                    leave-active-class="animate__fadeOut"
                    appear
            >
            <router-view style="transition: all 0.1s" />
            </transition>
            <!--        右侧个人中心组件-->
            <transition
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__bounceInRight"
                    leave-active-class="animate__fadeOutRight"
                    appear
            >
            <div v-show="personalViewFlag" class="personalCenter">
                <PersonalView/>
            </div>
            </transition>
        </div>


    </div>
</template>
<script>
    import LeftNavBar from "../components/LeftNavBar";
    import PersonalView from "../components/PersonalView";

    export default {
        name: "Manage",
        components:{LeftNavBar,PersonalView},
        data(){
            return{
                personalViewFlag:false
            }
          },
        mounted() {
            this.$bus.$on('personalCenterChange',(data)=>{
                this.personalViewFlag=data
            })

        }
    }
</script>

<style scoped>
.mainBody{
    height: 100vh;
    background-color: #257B5E;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    background-image: url("../assets/images/bg.png");
    background-size: 100%;
    position: relative;
}
    .dataView{
        width: 900px;
        height: 650px;
        background-color:#FDFFFD ;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
        overflow: hidden;
        position: relative;
    }
    .personalCenter{
        position: absolute;
        right: 0px;
        top: 0px;
    }
    .router_view-leave-active {
        opacity: 0;
    }
</style>