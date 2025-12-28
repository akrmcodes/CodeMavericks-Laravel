<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_id',
        'title',
        'description',
        'quantity_kg',
        'status',
        'pickup_code',
        'delivery_code',
        'latitude',
        'longitude',
        'expires_at',
    ];

    protected $casts = [
        'quantity_kg' => 'decimal:2',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'expires_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function donor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'donor_id');
    }

    public function claim(): HasOne
    {
        return $this->hasOne(Claim::class);
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<', now())
                     ->where('status', '!=', 'delivered');
    }

    // Helper methods
    public function isAvailable(): bool
    {
        return $this->status === 'available' && 
               ($this->expires_at === null || $this->expires_at->isFuture());
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && 
               $this->expires_at->isPast() && 
               $this->status !== 'delivered';
    }

    public static function generateCode(): string
    {
        return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }
}
