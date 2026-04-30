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
    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet" />

    <script>
        window.LD = @json([
            'csftToken' => csrf_token(),
            'user'  => Auth::user(),
        ]);
        window.LD.getUserPermissions = function() {
            return LD.user.permissions || null;
        };
        window.LD.hasPermission = function(p) {
            if (!LD.user.permissions || !LD.user.permissions.length) return false;
            if (LD.user.permissions.indexOf('administrator') !== -1) return true;
            return LD.user.permissions.indexOf(p) !== -1;
        };
    </script>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])


</head>
<body>
    <div class="laraadmin rootouter">
        <div id="root"></div>
    </div>
</body>
</html>
