<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'impact_score' => $this->impact_score,
            'status' => $this->status,
            'roles' => $this->getRoleNames(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
