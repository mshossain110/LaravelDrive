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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">

    <!-- NProgress -->
    <link href="vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="vendors/iCheck/skins/flat/green.css" rel="stylesheet">
    <!-- bootstrap-progressbar -->
    <link href="vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
    <!-- JQVMap -->
    <link href="vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet"/>
    <!-- bootstrap-daterangepicker -->
    <link href="vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="css/custom.min.css" rel="stylesheet">

    @yield('header_file')
  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        
        @include('layouts.sidenav')

        <!-- top navigation -->
         @include('layouts.topnav') 

        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
            @include('layouts.content')
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

    <!-- jQuery -->
    <script src="/vendors/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <!-- Bootstrap -->
    <script src="/vendors/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- FastClick -->
    <script src="/vendors/fastclick/lib/fastclick.js" type="text/javascript"></script>
    <!-- NProgress -->
    <script src="/vendors/nprogress/nprogress.js" type="text/javascript"></script>
    <!-- Chart.js -->
    <script src="/vendors/Chart.js/dist/Chart.min.js" type="text/javascript"></script>
    <!-- gauge.js -->
    <script src="/vendors/gauge.js/dist/gauge.min.js" type="text/javascript"></script>
    <!-- bootstrap-progressbar -->
    <script src="/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js" type="text/javascript"></script>
    <!-- iCheck -->
    <script src="/vendors/iCheck/icheck.min.js" type="text/javascript"></script>
    <!-- Skycons -->
    <script src="/vendors/skycons/skycons.js" type="text/javascript"></script>
    <!-- Flot -->
    <script src="/vendors/Flot/jquery.flot.js" type="text/javascript"></script>
    <script src="/vendors/Flot/jquery.flot.pie.js" type="text/javascript"></script>
    <script src="/vendors/Flot/jquery.flot.time.js" type="text/javascript"></script>
    <script src="/vendors/Flot/jquery.flot.stack.js" type="text/javascript"></script>
    <script src="/vendors/Flot/jquery.flot.resize.js" type="text/javascript"></script>
    <!-- Flot plugins -->
    <script src="/vendors/flot.orderbars/js/jquery.flot.orderBars.js" type="text/javascript"></script>
    <script src="/vendors/flot-spline/js/jquery.flot.spline.min.js" type="text/javascript"></script>
    <script src="/vendors/flot.curvedlines/curvedLines.js" type="text/javascript"></script>
    <!-- DateJS -->
    <script src="/vendors/DateJS/build/date.js"  type="text/javascript"></script>
    <!-- JQVMap -->
    <script src="/vendors/jqvmap/dist/jquery.vmap.js" type="text/javascript"></script>
    <script src="/vendors/jqvmap/dist/maps/jquery.vmap.world.js" type="text/javascript"></script>
    <script src="/vendors/jqvmap/examples/js/jquery.vmap.sampledata.js" type="text/javascript"></script>
    <!-- bootstrap-daterangepicker -->
    <script src="/vendors/moment/min/moment.min.js" type="text/javascript"></script>
    <script src="/vendors/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>

    <!-- Custom Theme Scripts -->
    <script src="/js/custom.min.js" type="text/javascript"></script>

    @yield('footerScript')
  </body>
</html>
