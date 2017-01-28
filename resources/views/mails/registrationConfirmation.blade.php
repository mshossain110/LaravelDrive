<html>
	<head>
		<title>Verify your email</title>

	</head>
	<body>
		<table class="table_container">
			<tr>
				
				<td></td>
				<td>
					<p>Hi  {{$data['name']}}<br/><br/></p>

					<p>Welcome to Envato!</p>

					</p>Could you please click the link below to verify that this is your email address?

					<a href="{{url('active?code='. $data['code'].'&email='.$data['email'])}}">Here</a>

					<p>If you need help or have any questions, please contanc us</p>

					<p>Thanks!</p>
				</td>
				<td></td>

			</tr>

		</table>
	</body>

</html>