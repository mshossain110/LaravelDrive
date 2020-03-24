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

    
        <link rel="stylesheet" href="{{ asset('css/auth.css') }}">
    <link rel="shortcut icon" href="assets/ico/favicon.png">
    <script>
        window.LD = @json([
            'csftToken' => csrf_token()
        ]);
    </script>
        <style>
            * {
                box-sizing: border-box;
            }
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

        </style>
    </head>

    <body>

        <div class="auth-wrap">
            <div class="container">
                <div class="auth-outer" id="members">
                    <div class="form-wrap login-form-wrap">
                    
                        <div v-if="isLogin" class="form-inner">
                            <Login />
                        </div>

                        <div v-if="isRegister" class="form-inner">
                            <Register />
                        </div>
                        
                        
                        <div class="or-wrap"><span>OR</span></div>
                        <div class="social-login">
                            <Social />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="{{ mix('js/manifest.js') }}"></script>
        <script src="{{ mix('js/vendor.js') }}"></script>

        <script src="{{ asset('js/config.js') }}" defer></script>
        <script src="{{ asset('js/auth.js') }}" defer></script>
        
        <!--[if lt IE 10]>
            <script src="assets/js/placeholder.js"></script>
        <![endif]-->

    </body>

</html>
