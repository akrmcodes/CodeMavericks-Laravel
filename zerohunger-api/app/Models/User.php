<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'latitude',
        'longitude',
        'impact_score',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'impact_score' => 'integer',
        ];
    }

    // Relationships
    public function donations()
    {
        return $this->hasMany(Donation::class, 'donor_id');
    }

    public function claims()
    {
        return $this->hasMany(Claim::class, 'volunteer_id');
    }

    // Helper methods
    public function isDonor(): bool
    {
        return $this->hasRole('donor');
    }

    public function isVolunteer(): bool
    {
        return $this->hasRole('volunteer');
    }

    public function isRecipient(): bool
    {
        return $this->hasRole('recipient');
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }
}
