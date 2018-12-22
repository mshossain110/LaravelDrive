<template>
    <li >
            <v-icon>folder_open</v-icon>
            <span>{{ folder.name }}</span>
            <a href=""  v-if="folder.children.length" @click.prevent="openColleps"><v-icon >keyboard_arrow_down</v-icon></a>
            <ul v-if="folder.children.length && colleps" :class="chieldClass" >
                <recursive-folder v-for="child in folder.children" :folder="child" :key="child.id"  :depth="depth+1"></recursive-folder>
            </ul>

            <!-- <v-list-group
                v-for="folder in folders"
                v-model="folder.id"
                :key="folder.id"
                prepend-icon="folder"
                no-action
                >
                {{folder.id}}
                <v-list-tile slot="activator">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ folder.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                
                <recussive-folder :folders="folder.children" v-if="folder.children.length"></recussive-folder>

                 <v-list-tile
                    v-for="subfolder in folder.children"
                    :key="subfolder.id"
                    >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ subfolder.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group> -->
        
    </li>

</template>


<script>
export default {
    name: "RecursiveFolder",
    props: {
        folder: {
            type: Object,
            default: {}
        },
        depth: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            colleps: false,
        }
    },
    computed: {
        chieldClass () {
            let d = this.depth+1
            return 'children ' + 'children-' + d;
        }
    },
    methods: {
        openColleps () {
            this.colleps = !this.colleps
        }
    }
}
</script>

<style>
    
</style>