<template>
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        v-model="selected"
        item-key="name"
        select-all
        class="elevation-1"
    >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</template>


<script>
	import { mapState } from 'vuex';

    export default {
        data () {
            return {
                search: '',
                selected: [],
                headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
                ],
       
            }
        },
        created () {
            this.$store.dispatch('Users/getUsers');
        },
        computed: {
            ...mapState(['Users/users', 'Users/totalPage', 'Users/totalUsers', 'Users/perPage'])
        },
        methods: {
            
        }
    }
</script>

<style>
    
</style>