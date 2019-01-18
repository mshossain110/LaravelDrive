<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>


    <!-- Fonts -->
    
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/0.5.0/modern-normalize.css">

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">

    <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    <link rel="shortcut icon" href="assets/ico/favicon.png">
    <script>
        window.LA = @json([
            'csftToken' => csrf_token()
        ]);
    </script>
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                font-size: 16px;
                font-weight: 300;
                color: #888;
                line-height: 30px;
                background-color: #1266F1;
            }
            body.image-bg {
                background-image: url("../img/backgrounds/1.jpg");
                background-size: cover;
            }
            .container {
                width: 400px;
                margin: 0 auto;
            }

            .form-wrap h3 {
                margin-bottom: 25px;
                margin-top: 0;
                text-transform: uppercase;
                font-weight: 700;
                font-size: 20px;
                text-align: center;
            }

            .form-wrap p {
                text-align: center;
            }
            .form-wrap  a {
                text-decoration: none;
                font-size: 13px;
                font-weight: 700;
                color: #598bd6;
            }
            .form-wrap a:hover {
                color: #1a5dc3;
            }
            .form-wrap form, .form-wrap .social-login {
                position: relative;
                padding: 25px;
                background-color: #FFF;
                color: #333;
            }
            
            

            .form-wrap .form-group {
                position: relative;
                margin-bottom: 25px;
                text-align: left;
            }

            .form-wrap input {
                height: 45px;
                padding: 5px 15px;
                width: 100%;
                border: solid 1px #f4f4f4;
                transition: all ease-in-out 0.3s;
                color: #999;
                font-size: 14px;
            }
            .form-wrap label {
                margin-bottom: 12px;
                display: block;
                color: #444;
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 0.5px;
                font-weight: 600;
            }

            .release-contnet {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
            }

            .form-wrap .release-contnet #remember {
                width: 20px;
                display: inline;
                height: auto;
            }
            
            .login-button button {
                width: 100%;
                padding: 10px;
                background: #0162f5;
                color: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
                text-transform: uppercase;
                margin-top: 30px;
            }
            .or-wrap {
                height: 1px;
                margin: 40px 0px;
                border-top: 1px solid #d0d0d0;
                text-align: center;
            }
            .or-wrap span {
                background: #FFF;
                color: #1266F1;
                height: 40px;
                border-radius: 100%;
                line-height: 40px;
                display: inline-block;
                top: -20px;
                position: relative;
                width: 40px;
                text-align: center;
            }
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

            /* .login-form-wrap {
                display: none;
            } */
            .registration-form-wrap {
                display: none;
            }

            


        </style>
    </head>

    <body>

        <div class="auth-wrap">
            <div class="container">
                <div class="auth-outer" id="members">
                    <div class="form-wrap login-form-wrap">
                        <div class="login-form">
                            <Login />
                            <div class="or-wrap"><span>OR</span></div>
                            <div class="social-login">
                                <h3>
                                    Social login
                                </h3>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-fb.png" alt="facebook">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-in.png" alt="twitter">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-tw.png" alt="google plush">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-gl.png" alt="linked in">
                                        </a>
                                    </li>
                                </ul>
                                <div class="new">
                                    <span>Are you new user? <a href="#" class="Sign-up">Sign up</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-wrap registration-form-wrap">
                                                <!-- registration form -->
                        <div class="registration-form">
                        <form role="form" action="" method="post" class="f1">
                                
                                <h3>Register To Our App</h3>
                        		<p>Fill in the form to get instant access</p>
                                
                                <div>
                                    <div class="form-group">
                        			    <label  for="f1-first-name">First name</label>
                                        <input type="text" name="f1-first-name" placeholder="First name..." class="f1-first-name form-control" id="f1-first-name">
                                    </div>
                                    <div class="form-group">
                                        <label  for="f1-last-name">Last name</label>
                                        <input type="text" name="f1-last-name" placeholder="Last name..." class="f1-last-name form-control" id="f1-last-name">
                                    </div>
        

                                    <div class="form-group">
                                        <label  for="f1-email">Email</label>
                                        <input type="text" name="f1-email" placeholder="Email..." class="f1-email form-control" id="f1-email">
                                    </div>
                                    <div class="form-group">
                                        <label  for="f1-password">Password</label>
                                        <input type="password" name="f1-password" placeholder="Password..." class="f1-password form-control" id="f1-password">
                                    </div>
                                    <div class="form-group">
                                        <label  for="f1-repeat-password">Repeat password</label>
                                        <input type="password" name="f1-repeat-password" placeholder="Repeat password..." 
                                                            class="f1-repeat-password form-control" id="f1-repeat-password">
                                    </div>

                                    <div class="login-button">
                                        <button type="submit" name="login">Login</button>
                                    </div>
                                </div>
                            </form>
                            <div class="or-wrap"><span>OR</span></div>
                            <div class="social-login">
                                <h3>
                                    Social login
                                </h3>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-fb.png" alt="facebook">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-in.png" alt="twitter">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-tw.png" alt="google plush">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/images/social/login-gl.png" alt="linked in">
                                        </a>
                                    </li>
                                </ul>
                                <div class="new">
                                    <span>Are you existing user? <a href="#" class="Sign-up">Login</a></span>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                    <div class="from-wrap forget-form">

                    </div>
                </div>
            </div>
        </div>

        <script src="{{ asset('js/auth.js') }}" defer></script>
        
        <!--[if lt IE 10]>
            <script src="assets/js/placeholder.js"></script>
        <![endif]-->

    </body>

</html>
