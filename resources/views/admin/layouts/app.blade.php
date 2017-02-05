<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>

    <!-- Bootstrap -->
    <link href="/bower/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">

    <!-- NProgress -->
    <link href="/bower/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="/bower/iCheck/skins/flat/green.css" rel="stylesheet">
    <!-- bootstrap-progressbar -->
    <link href="/bower/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
    <!-- JQVMap -->
    <link href="/bower/jqvmap/dist/jqvmap.min.css" rel="stylesheet"/>
    <!-- bootstrap-daterangepicker -->
    <link href="/bower/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">
    
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
    @yield('headerScript')

    <!-- Custom Theme Style -->
    <link href="/css/custom.min.css" rel="stylesheet">

  </head>

  <body class="nav-md">
    <div class="container body" id="app">
      <div class="main_container">
        
        @include('admin.layouts.sidenav')

        <!-- top navigation -->
         @include('admin.layouts.topnav') 

        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
            @include('admin.layouts.content')
        </div>
        <!-- /page content -->

        <!-- footer content -->
        <footer>
          <div class="pull-right">
            Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
      </div>
    </div>
    <script src="/js/app.js"></script>
    <!-- jQuery -->
    <script src="/bower/jquery/dist/jquery.min.js" type="text/javascript"></script>

    <!-- Bootstrap -->
    <script src="/bower/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- FastClick -->
    <script src="/bower/fastclick/lib/fastclick.js" type="text/javascript"></script>
    <!-- NProgress -->
    <script src="/bower/nprogress/nprogress.js" type="text/javascript"></script>
    <!-- Chart.js -->
    <script src="/bower/Chart.js/dist/Chart.min.js" type="text/javascript"></script>
    <!-- gauge.js -->
    <script src="/bower/gauge.js/dist/gauge.min.js" type="text/javascript"></script>
    <!-- bootstrap-progressbar -->
    <script src="/bower/bootstrap-progressbar/bootstrap-progressbar.min.js" type="text/javascript"></script>
    <!-- iCheck -->
    <script src="/bower/iCheck/icheck.min.js" type="text/javascript"></script>
    <!-- Skycons -->
    <script src="/bower/skycons/skycons.js" type="text/javascript"></script>
    <!-- Flot -->
    <script src="/bower/Flot/jquery.flot.js" type="text/javascript"></script>
    <script src="/bower/Flot/jquery.flot.pie.js" type="text/javascript"></script>
    <script src="/bower/Flot/jquery.flot.time.js" type="text/javascript"></script>
    <script src="/bower/Flot/jquery.flot.stack.js" type="text/javascript"></script>
    <script src="/bower/Flot/jquery.flot.resize.js" type="text/javascript"></script>
    <!-- Flot plugins -->
    <script src="/bower/flot.orderbars/js/jquery.flot.orderBars.js" type="text/javascript"></script>
    <script src="/bower/flot-spline/js/jquery.flot.spline.min.js" type="text/javascript"></script>
    <script src="/bower/flot.curvedlines/curvedLines.js" type="text/javascript"></script>
    <!-- DateJS -->
    <script src="/bower/DateJS/build/date.js"  type="text/javascript"></script>
    <!-- JQVMap -->
    <script src="/bower/jqvmap/dist/jquery.vmap.js" type="text/javascript"></script>
    <script src="/bower/jqvmap/dist/maps/jquery.vmap.world.js" type="text/javascript"></script>
    <script src="/bower/jqvmap/examples/js/jquery.vmap.sampledata.js" type="text/javascript"></script>
    <!-- bootstrap-daterangepicker -->
    <script src="/bower/moment/min/moment.min.js" type="text/javascript"></script>
    <script src="/bower/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
    <!-- Custom Theme Scripts -->
    <script src="/js/custom.min.js" type="text/javascript"></script>

    
    
    @yield('footerScript')



  </body>
</html>
