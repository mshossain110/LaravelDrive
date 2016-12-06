@extends('admin.layouts.app')


@section('title', 'Form General')

@section('headerScript')

@endsection


@section('pageContent')

<div class="col-md-12 col-sm-12 col-xs-12">
<div class="x_panel">
  <div class="x_title">
    <h2>Users</h2>
    <div class="clearfix"></div>
  </div>
  <div class="x_content">
    <table id="datatable-buttons" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Active</th>
          <th>Role</th>
          
        </tr>
      </thead>


      <tbody>
        
        
        @foreach ($users as $user)
          <tr>
            <td>{{$user->id}}</td>
            <td>{{$user->username}}</td>
            <td>{{$user->email}}</td>
            <td>{{$user->active}}</td>
            <td>{{$user->getValue('permission')}}</td>
          </tr>
        @endforeach
       
        
          
      </tbody>
    </table>
  </div>
</div>
</div>


@endsection



@section('footerScript')


<!-- Datatables -->
    <script src="/bower/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="/bower/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="/bower/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="/bower/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
    <script src="/bower/datatables.net-buttons/js/buttons.flash.min.js"></script>
    <script src="/bower/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="/bower/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="/bower/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
    <script src="/bower/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
    <script src="/bower/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="/bower/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
    <script src="/bower/datatables.net-scroller/js/datatables.scroller.min.js"></script>
    <script src="/bower/jszip/dist/jszip.min.js"></script>
    <script src="/bower/pdfmake/build/pdfmake.min.js"></script>
    <script src="/bower/pdfmake/build/vfs_fonts.js"></script>



    <!-- Datatables -->
    <script>
      $(document).ready(function() {
        var handleDataTableButtons = function() {
          if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
              dom: "Bfrtip",
              buttons: [
                {
                  extend: "copy",
                  className: "btn-sm"
                },
                {
                  extend: "csv",
                  className: "btn-sm"
                },
                {
                  extend: "excel",
                  className: "btn-sm"
                },
                {
                  extend: "pdfHtml5",
                  className: "btn-sm"
                },
                {
                  extend: "print",
                  className: "btn-sm"
                },
              ],
              responsive: true
            });
          }
        };

        TableManageButtons = function() {
          "use strict";
          return {
            init: function() {
              handleDataTableButtons();
            }
          };
        }();

        

        TableManageButtons.init();
      });
    </script>
    <!-- /Datatables -->

@endsection