<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Sala de chat</title>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" type="text/css" href="{{  asset('css/app.css') }}">
	<style>
		.list-group{
			overflow-y: scroll;
			height: 200px;
		}
	</style>
</head>
<body>

	<div class="container">
		<div class="row" id="app">
			<div class="offset-4 col-4 offset-sm-1 col-sm-10">
				<li class="list-group-item active">Sala de chat
					<span class="badge badge-pill badge-danger"> @{{ numberOfUsers }}</span></li>

				<div class="badge badge-pill badge-primary"> @{{ typing }}</div>
					
				
				<ul class="list-group" v-chat-scroll>
  					
  					<message
  					v-for="value, index in chat.message"
  					:key=value.index
  					:color=chat.color[index]
  					:user = chat.user[index]
  					:time = chat.time[index]
  					>
  					@{{ value }} </message>

  					
				</ul>
				<input type="text" class="form-control" placeholder="Escribe tus comentarios aquí..." v-model='message' @keyup.enter='send'>
				
			</div>
				
		</div>
	</div>

<script src=" {{  asset('js/app.js')}}"></script>
</body>
</html>