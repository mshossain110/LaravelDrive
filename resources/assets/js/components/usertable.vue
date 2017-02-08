<template>

    <table id="datatable-buttons" class="table table-striped table-bordered">
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
       <tr v-for="user in userData">
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
      }
    }
	}
	
</script>