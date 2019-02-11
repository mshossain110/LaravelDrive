<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use App\UserMeta;
use App\Traits\CaptureIpTrait;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Laravel\Socialite\Facades\Socialite;
use Carbon\Carbon;

class SocialController extends Controller
{

    /**
     * Gets the social redirect.
     *
     * @param string $provider The provider
     *
     * @return Redirect
     */
    public function getSocialRedirect($provider)
    {
        $providerKey = config('services.'.$provider);

        if (empty($providerKey) || empty($providerKey['client_id']) || empty($providerKey['client_secret']) ) {
            return redirect()->to('login')
                ->with('error', "$provider dose not defined!!");
        }

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Gets the social handle.
     *
     * @param string $provider The provider
     *
     * @return Redirect
     */
    public function getSocialHandle($provider)
    {
        if (Input::get('denied') != '') {
            return redirect()->to('login')
                ->with('status', 'danger')
                ->with('message', "$provider denied");
        }

        $socialUserObject = Socialite::driver($provider)->user();

        $socialUser = null;

        // Check if email is already registered
        $userCheck = User::where('email', '=', $socialUserObject->email)->first();

        $email = $socialUserObject->email;

        if (!$socialUserObject->email) {
            $email = 'missing'.str_random(10).'@'.str_random(10).'.example.org';
        }

        if (empty($userCheck)) {
            $sameSocialId = UserMeta::where('value', '=', $socialUserObject->id)
                ->where('key', '=', $provider)
                ->first();

            if (empty($sameSocialId)) {
                $ipAddress = new CaptureIpTrait();
                
                
                $fullname = explode(' ', $socialUserObject->name);
                if (count($fullname) == 1) {
                    $fullname[1] = '';
                }
                $username = $socialUserObject->nickname;

                if ($username == null) {
                    foreach ($fullname as $name) {
                        $username .= $name;
                    }
                }

                // Check to make sure username does not already exist in DB before recording
                $username = $this->checkUserName($username, $email);
                info($socialUserObject->getAvatar());

                $user = User::create([
                    'name'              => $username,
                    'firstname'         => $fullname[0],
                    'lastname'          => $fullname[1],
                    'email'             => $email,
                    'password'          => bcrypt(str_random(40)),
                    'avatar'            => $socialUserObject->getAvatar(),
                    'status'            => User::$status[1],
                    'email_verified_at' => Carbon::now(),
                    'ip'                => $ipAddress->getClientIp()

                ]);

                $socialUser = $user;
            } else {
                $socialUser = $sameSocialId->user;
            }

            auth()->login($socialUser, true);

            return redirect()->to('drive');
        }

        $socialUser = $userCheck;

        auth()->login($socialUser, true);

        return redirect()->to('drive');
    }

    /**
     * Check if username against database and return valid username.
     * If username is not in the DB return the username
     * else generate, check, and return the username.
     *
     * @param string $username
     * @param string $email
     *
     * @return string
     */
    public function checkUserName($username, $email)
    {
        $userNameCheck = User::where('name', '=', $username)->first();

        if ($userNameCheck) {
            $i = 1;
            do {
                $username = $this->generateUserName($username);
                $newCheck = User::where('name', '=', $username)->first();

                if ($newCheck == null) {
                    $newCheck = 0;
                } else {
                    $newCheck = count($newCheck);
                }
            } while ($newCheck != 0);
        }

        return $username;
    }

    /**
     * Generate Username.
     *
     * @param string $username
     *
     * @return string
     */
    public function generateUserName($username)
    {
        return $username.'_'.str_random(10);
    }

    
}
