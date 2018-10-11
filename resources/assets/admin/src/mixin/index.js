

export default {
    data () {
        return {
            currentUser: LA.user,  /*globals LA:true*/
        }
    },
    created () {

    },
    computed: {
        fullname () {
            if (this.currentUser.firstname || this.currentUser.lastname) {
                return this.currentUser.firstname + ' ' + this.currentUser.lastname
            } else {
                return this.currentUser.name;
            }
            
        }
    },

    methods: {

    }

}