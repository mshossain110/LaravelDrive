
export default {
    data () {
        return {
            currentUser: LD.user /* globals LD:true */
        }
    },
    created () {

    },
    computed: {
        fullname () {
            if (this.currentUser.firstname || this.currentUser.lastname) {
                return this.currentUser.firstname + ' ' + this.currentUser.lastname
            } else {
                return this.currentUser.name
            }
        }
    },

    methods: {
        getUserPermissions () {
            return LD.user.permissions
        },
        hasPermission (p) {
            if (!LD.user.permissions || !LD.user.permissions.length) {
                return false
            }
            if (LD.user.permissions.indexOf('administrator') !== -1) {
                return true
            }

            return LD.user.permissions.indexOf(p) !== -1
        }
    }

}
