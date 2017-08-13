<template>
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
</template>


<script>
	export default{

		mounted(){
			axios.get('/api/v1/media')
				.then(response=>{console.log(response);
					this.media=response.data});

				console.log(this.media);
		},

		data(){
			return{
				media:[]
			}
		}


	}

</script>