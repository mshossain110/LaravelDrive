<template>

    <table id="usertable" class="table table-bordered">
      <thead>
        <tr>
          <th @click="sortBy('id')">#</th>
          <th @click="sortBy('firstName')">first Name</th>
          <th @click="sortBy('lastName')">Last Name</th>
          <th @click="sortBy('username')">Username</th>
          <th @click="sortBy('email')">Email</th>
          <th @click="sortBy('active')">Active</th>
          <th >permission</th>
        </tr>
      </thead>


      <tbody>
       <tr v-for="user in userData" @click="quickEdit(user, $event)">
            <td>{{user.id}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td>
              <span class="badge bg-green"  v-if="user.active">Active</span>
              <span class="badge bg-red"  v-else>Disactive</span>
            </td>
            <td>{{getPermission(user.usermeta)}}</td>
        </tr>
        
          
      </tbody>
    </table>
</template>


<script>
	export default {
		props:['users', 'permission'],
		data:function(){
			return {
				_users:{},
        _permission:{},
        sortKey: ''
			};
			
		},
		created: function(){
     
			this._permission= JSON.parse(this.permission);
			
		},
    computed: {
      userData: function () {
         var data= JSON.parse(this.users);
         if(this.sortKey){
          data = _.sortBy(data, [this.sortKey]);
         }
        return data;
      }
    },
    methods:{
      findByKey:function(ar, key){
        return _.find(ar, { 'key': key }).value;
      },
      getPermission: function(ar){
        var id = _.find(ar, { 'key': "permission" }).value;
        return _.find(this._permission, id);
      },

      sortBy: function (key) {
        this.sortKey = key;
      },

      quickEdit:function(user, event){
        var target = event.target, tr= $(target).parent();

        console.log(target);
        if(!tr.hasClass("parent")){
          tr.addClass("parent");
          tr.after( "<p>"+user.firstName+"</p>" );
        }else{
          tr.removeClass('parent');
          $( ".hello" ).remove();
        }
            
      }
    }
	}
	
</script>

<style type="text/css">

#usertable > tbody > tr > td:first-child
{
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}
  
  #usertable > tbody > tr > td:first-child::before
 {
  top: 9px;
  left: 4px;
  height: 14px;
  width: 14px;
  display: block;
  position: absolute;
  color: white;
  border: 2px solid white;
  border-radius: 14px;
  box-shadow: 0 0 3px #444;
  box-sizing: content-box;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  line-height: 14px;
  content: '+';
  background-color: #337ab7;
}

#usertable > tbody > tr.parent > td:first-child::before {
  content: '-';
  background-color: #d33333;
}
</style>