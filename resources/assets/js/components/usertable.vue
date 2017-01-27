<template>

    <table id="datatable-buttons" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Active</th>
        </tr>
      </thead>


      <tbody>
       <tr v-for="user in _users">
            <td>{{user.id}}</td>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td>{{user.active}}</td>
          </tr>
        
          
      </tbody>
    </table>
</template>


<script>
	export default {
		props:['users'],
		data:function(){
			return {
				_users:{}
			};
			
		},
		created: function(){
			this._users= JSON.parse(this.users);
			console.log(this._users);
		}
	}
	
</script>