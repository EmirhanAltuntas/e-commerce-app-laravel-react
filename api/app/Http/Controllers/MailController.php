<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ComfirmMail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
   public function sendEmail(){
    $details = [
        'title'=> 'Hepsi 1 aradadan bir e-postanız var',
        'body'=>'Test e-postası',
        'user'=>'Emirhan'
    ];
    Mail::to('ealtuntasonline@gmail.com')->send(new ComfirmMail($details));
    return 'Email gönderildi';
}
}
