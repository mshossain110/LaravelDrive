<template>
    <div class="social-login">
        <h3>
            Social login
        </h3>
        <ul>
            <li>
                <a href="#">
                    <img
                        src="/images/social/login-fb.png"
                        alt="facebook"
                    >
                </a>
            </li>
            <li>
                <a href="#">
                    <img
                        src="/images/social/login-in.png"
                        alt="twitter"
                    >
                </a>
            </li>
            <li>
                <a href="#">
                    <img
                        src="/images/social/login-tw.png"
                        alt="google plush"
                    >
                </a>
            </li>
            <li>
                <a href="#">
                    <img
                        src="/images/social/login-gl.png"
                        alt="linked in"
                    >
                </a>
            </li>
        </ul>
        <div class="new">
            <span>
                Are you new user? <a
                    href="#"
                    class="Sign-up"
                >
                    Sign up
                </a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>
<style>
.social-login h3 {
    margin-bottom: 5px;
}
.social-login ul {
    display: block;
    overflow: hidden;
    list-style: none;
    margin: 0;
    padding: 0;
}

.social-login ul li {
    display: inline-block;
    margin: 0;
    overflow: hidden;
}

.social-login ul li a {
    display: block;
    text-decoration: none;
    overflow: hidden;
}

.social-login ul li img {
    width: 28px;
    height: auto;
}
</style>
