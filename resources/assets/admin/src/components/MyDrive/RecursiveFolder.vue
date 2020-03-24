<template>
    <li>
        <VIcon>folder_open</VIcon>
        <span>{{ folder.name }}</span>
        <a
            v-if="folder.children.length"
            href=""
            @click.prevent="openColleps"
        ><VIcon>keyboard_arrow_down</VIcon></a>
        <ul
            v-if="folder.children.length && colleps"
            :class="chieldClass"
        >
            <RecursiveFolder
                v-for="child in folder.children"
                :key="child.id"
                :folder="child"
                :depth="depth+1"
            />
        </ul>

        <!-- <v-list-group
                v-for="folder in folders"
                v-model="folder.id"
                :key="folder.id"
                prepend-icon="folder"
                no-action
                >
                {{folder.id}}
                <v-list-item slot="activator">
                    <v-list-item-content>
                        <v-list-item-title>{{ folder.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <recussive-folder :folders="folder.children" v-if="folder.children.length"></recussive-folder>

                 <v-list-item
                    v-for="subfolder in folder.children"
                    :key="subfolder.id"
                    >
                    <v-list-item-content>
                        <v-list-item-title>{{ subfolder.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group> -->
    </li>
</template>

<script>
export default {
    name: 'RecursiveFolder',
    props: {
        folder: {
            type: Object,
            default () {
                return {};
            }
        },
        depth: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            colleps: false
        };
    },
    computed: {
        chieldClass () {
            const d = this.depth + 1;
            return 'children ' + 'children-' + d;
        }
    },
    methods: {
        openColleps () {
            this.colleps = !this.colleps;
        }
    }
};
</script>

<style>

</style>
