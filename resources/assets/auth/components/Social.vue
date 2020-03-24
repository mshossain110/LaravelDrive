<template>
    <div class="social-login">
        <h3>
            Social login
        </h3>
        <ul>
            <li>
                <a href="/login/redirect/facebook">
                    <img
                        src="/images/social/login-fb.png"
                        alt="facebook"
                    >
                </a>
            </li>
            <li>
                <a href="/login/redirect/linkind">
                    <img
                        src="/images/social/login-in.png"
                        alt="twitter"
                    >
                </a>
            </li>
            <li>
                <a href="/login/redirect/twitter">
                    <img
                        src="/images/social/login-tw.png"
                        alt="google plush"
                    >
                </a>
            </li>
            <li>
                <a href="/login/redirect/google">
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

        };
    }
};
</script>
<style>
    .social-login  {
        position: relative;
        padding: 25px;
        background-color: #FFF;
        color: #333;
    }
    .social-login h3 {
        margin-bottom: 5px;
        margin-top: 0;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
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
