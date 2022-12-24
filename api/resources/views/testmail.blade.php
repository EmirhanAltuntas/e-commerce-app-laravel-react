<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{$details['title']}}</title>
    <style>
     @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
     *{
        font-family: 'Quicksand', sans-serif;
     }
    </style>
</head>
  <body style="background-color: rgb(245,245,245);">
    <div class="container-fluid" >
        <div class="row">
            <div class="col-md-6 offset-3 text-center" style="border: 1px solid rgb(133, 2, 255);">
                <h1 style="color: rgb(133, 2, 255);">Getiriver</h1>
                <img src="https://picsum.photos/id/1/200/300" style="border-radius: 5px;" alt="">
                <p class="mt-3">Getiriver ile işbirliği yaptığınız için teşekkür eder, başarılar dileriz. <br>
                    Aşagıdaki bilgiler ile giriş yapabilirsiniz.
                    {{$details['body']}}
                 </p>
                 <div class="row">
                    <div class="col-md-6 offset-md-3 text-center">
                        Email :  {{$details['email']}} <br>
                        password : {{$details['password'] ? $details['password']:""}}<br>

                        <a class="btn bg-info mb-4" href="http://localhost:3000/login">Giriş Yap</a>

                    </div>
                 </div>
            </div>
        </div>
    </div>

  </body>
</html>
