<template>

    <table id="datatable-buttons" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>first Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Active</th>
          <th>permission</th>
        </tr>
      </thead>


      <tbody>
       <tr v-for="user in _users">
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
        _permission:{}
			};
			
		},
		created: function(){
      this._users= JSON.parse(this.users);
			this._permission= JSON.parse(this.permission);
			console.log(this._permission);
		},
    methods:{
      findByKey:function(ar, key){
        return _.find(ar, { 'key': key }).value;
      },
      getPermission: function(ar){
        var id = _.find(ar, { 'key': "permission" }).value;
        return _.find(this._permission, id);
      }
    }
	}
	
</script>