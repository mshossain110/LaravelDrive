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
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    
    <link href="{{ asset('css/font/flaticon.css') }}" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <style>
        * {
            background-repeat: no-repeat;
            padding: 0;
            margin: 0;
        }
        *, :after, :before {
            box-sizing: inherit;
        }
        .wrapper {
            background: rgb(75, 75, 75);
            width: 100%;
            position: relative;
        }

        .wrapper main{
            width: 100%;
            height: 100%;

        }
        .wrapper header.header {
            position: absolute;
            background: rgba(75, 75, 75, 0.3);
            width: 100%;
            display: block;
            overflow: hidden;
        }
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 80%;
            margin: 0 auto;
        }
        .menu {
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .menu a {
            color: #fff;
            display: inline-block;
            padding: 5px;
            cursor: pointer;
        }
        .menu a.btn-singup {
            background: #4d90fe;
            padding: 8px 15px;
            margin-left: 10px;
            border-radius: 5px;
            box-shadow: 0px 1px 6px #7777;
        }

        .menu a:hover {
            background: rgb(25, 25, 25);
        }


    </style>

</head>
<body>

<div class="wrapper">

    <div class="container">
        <header class="header">
            <nav>
                <div class="logo">
                    <a href="/"><img src="/images/logo.png" width="150px"></a>
                </div>
                <div class="menu">
                    <a href="#">
                        <i class="material-icons">
                            note_add
                        </i>
                    </a>
                    <a href="#">
                        <i class="material-icons">
                            print
                        </i>
                    </a>
                    <a href="#">
                        <i class="material-icons">
                            cloud_download
                        </i>
                    </a>
                    <a class="btn-singup">
                        Singin
                    </a>
                </div>
            </nav>
        </header>
        <main>
            <div class="file-wrap">
            
            </div>
        </main>
    </div>
</div>
    
</body>
</html>