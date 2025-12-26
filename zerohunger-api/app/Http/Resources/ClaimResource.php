<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClaimResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'donation_id' => $this->donation_id,
            'volunteer_id' => $this->volunteer_id,
            'status' => $this->status,
            'picked_up_at' => $this->picked_up_at?->toISOString(),
            'delivered_at' => $this->delivered_at?->toISOString(),
            'notes' => $this->notes,
            
            // Relationships
            'donation' => new DonationResource($this->whenLoaded('donation')),
            'volunteer' => new UserResource($this->whenLoaded('volunteer')),
            
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
