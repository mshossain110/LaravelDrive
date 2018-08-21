<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    

    public function setCapabilitiesAttribute( $value ) {
        if ( ! empty($value) ) {
            $this->attributes['meta'] = serialize( $value );
        }
    }

    public function getCapabilitiesAttribute( $value ) {
        return unserialize( $value );
    }


    /**
     * Get the user for a role.
     */
    public function user()
    {
        return $this->hasMany('App\User');
    }
}
