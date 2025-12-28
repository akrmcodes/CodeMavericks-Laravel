<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Claim extends Model
{
    use HasFactory;

    protected $fillable = [
        'donation_id',
        'volunteer_id',
        'status',
        'picked_up_at',
        'delivered_at',
        'notes',
    ];

    protected $casts = [
        'picked_up_at' => 'datetime',
        'delivered_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function donation(): BelongsTo
    {
        return $this->belongsTo(Donation::class);
    }

    public function volunteer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'volunteer_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeDelivered($query)
    {
        return $query->where('status', 'delivered');
    }

    // Helper methods
    public function markAsPickedUp(): void
    {
        $this->update([
            'status' => 'picked_up',
            'picked_up_at' => now(),
        ]);

        $this->donation->update(['status' => 'picked_up']);
    }

    public function markAsDelivered(): void
    {
        $this->update([
            'status' => 'delivered',
            'delivered_at' => now(),
        ]);

        $this->donation->update(['status' => 'delivered']);
    }

    public function cancel(): void
    {
        $this->update(['status' => 'cancelled']);
        $this->donation->update([
            'status' => 'available',
            'pickup_code' => null,
        ]);
    }
}
