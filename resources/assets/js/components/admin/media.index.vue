<template>

<div class="col-md-12 col-sm-12 col-xs-12">

 <button type="button" class="btn btn-primary" @click="toggle">Add New Media</button>
 <transition name="slide-fade">
	 <div class="ddropzone-area" v-if="this.showUpload">
	 		<dropzone  id="myVueDropzone" url="/api/v1/media" v-on:vdropzone-success="showSuccess"  :headers="this.headers"></dropzone>
	 </div>
 </transition>


<div class="x_panel">
  <div class="x_title">
    <h2>Media Gallery <small> gallery design </small></h2>
    <div class="clearfix"></div>
  </div>
  <div class="x_content">



  	<div class="row">

  		<div id="media-entry">
		<div class="col-sm-4 col-md-3" v-for="m in media">
	        <div class="thumbnail">
	          <div class="image view view-first">
	            <img style="width: 100%; display: block;" :src=m.path alt="image" />
	            <div class="mask">
	              
	              <div class="tools tools-bottom">
	                <a href=""><i class="fa fa-link"></i></a>
	                <a href=""><i class="fa fa-pencil"></i></a>
	                
	              </div>
	            </div>
	          </div>
	          
	          <div class="caption">
	          	<strong></strong>
	            <p></p>
	          </div>
	         
	        </div>
	     </div>
	</div>
	
	

	</div>	
  </div>
</div>
</div>
	
</template>


<script>
	import Dropzone from 'vue2-dropzone'


	export default{
		name: 'MediaPage',

		components:{
				Dropzone     
    	},

		mounted(){
			this.loadImage();
		},

		data:function(){
			return{
				media:[],
				showUpload:false,
				headers:{
					    'X-Requested-With': 'XMLHttpRequest',
					    'X-CSRF-TOKEN':window.Laravel.csrfToken
					},

			};
		},

		methods:{
			
				showSuccess(file) {
	        		this.loadImage();
	        		this.toggle();
	      		},

	      		loadImage(){
	      			axios.get('/api/v1/media')
							.then(response=>{this.media=response.data});
	      		},

	      		toggle(){
	      			this.showUpload=!this.showUpload;
	      		},
		},


	}

</script>


<style>

.ddropzone-area{
	margin:20px 0px;
}

.slide-fade-enter-active {
   	animation-duration: .5s;
	animation-fill-mode: both;
	animation-name: zoomIn;
}
.slide-fade-leave-active {
 	animation-duration: .5s;
	animation-fill-mode: both;
	animation-name: zoomOut;
}
.slide-fade-enter, .slide-fade-leave-to{

}


@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  to {
    opacity: 0;
  }
}

</style>