# ZeroHunger API Contract for Frontend Team

**Version:** 1.0  
**Base URL:** `http://localhost:8000/api/v1`  
**Authentication:** Bearer Token (Sanctum)

---

## 🔐 Authentication Flow

### 1. Register New User

**Endpoint:** `POST /register`  
**Access:** Public  
**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "+1234567890",
  "role": "donor"
}
```

**Roles:** `donor`, `volunteer`, `recipient`

**Success Response (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "latitude": null,
    "longitude": null,
    "impact_score": 0,
    "status": "active",
    "roles": ["donor"],
    "created_at": "2025-12-04T20:00:00.000000Z"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz1234567890"
}
```

**Error Response (422 - Validation):**
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password confirmation does not match."]
  }
}
```

---

### 2. Login

**Endpoint:** `POST /login`  
**Access:** Public  
**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "latitude": 30.0444,
    "longitude": 31.2357,
    "roles": ["donor"],
    "permissions": ["create-donation", "view-donation"],
    "impact_score": 150,
    "status": "active"
  },
  "token": "2|XyZaBcDeFgHiJkLmNoPqRsTuVwXy0987654321"
}
```

**Error Response (401):**
```json
{
  "message": "The provided credentials are incorrect."
}
```

---

### 3. Logout

**Endpoint:** `POST /logout`  
**Access:** Protected  
**Headers:** 
- `Authorization: Bearer {token}`
- `Content-Type: application/json`

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 4. Get Current User

**Endpoint:** `GET /me`  
**Access:** Protected  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "latitude": 30.0444,
    "longitude": 31.2357,
    "roles": ["donor"],
    "permissions": ["create-donation", "view-donation"],
    "impact_score": 150,
    "status": "active"
  }
}
```

---

### 5. Update Profile

**Endpoint:** `PUT /profile`  
**Access:** Protected  
**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+9876543210",
  "latitude": 30.0500,
  "longitude": 31.2400
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "+9876543210",
    "latitude": 30.0500,
    "longitude": 31.2400,
    "impact_score": 150
  }
}
```

---

## 🍽️ Donation Endpoints

### 1. List All Available Donations

**Endpoint:** `GET /donations`  
**Access:** Protected  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Fresh Bread from Bakery",
    "description": "20 loaves of fresh whole wheat bread",
    "quantity_kg": 5.0,
    "status": "available",
    "latitude": 30.0444,
    "longitude": 31.2357,
    "expires_at": "2025-12-05T18:00:00.000000Z",
    "is_expired": false,
    "is_available": true,
    "donor": {
      "id": 2,
      "name": "Ahmed Restaurant",
      "email": "donor@test.com",
      "phone": "+1234567891"
    },
    "created_at": "2025-12-04T20:00:00.000000Z",
    "updated_at": "2025-12-04T20:00:00.000000Z"
  }
]
```

---

### 2. Get Single Donation

**Endpoint:** `GET /donations/{id}`  
**Access:** Protected  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Fresh Bread from Bakery",
  "description": "20 loaves of fresh whole wheat bread",
  "quantity_kg": 5.0,
  "status": "available",
  "pickup_code": null,
  "latitude": 30.0444,
  "longitude": 31.2357,
  "expires_at": "2025-12-05T18:00:00.000000Z",
  "is_expired": false,
  "is_available": true,
  "donor": {
    "id": 2,
    "name": "Ahmed Restaurant"
  },
  "claim": null,
  "created_at": "2025-12-04T20:00:00.000000Z",
  "updated_at": "2025-12-04T20:00:00.000000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Resource not found"
}
```

---

### 3. Create Donation (Donor Only)

**Endpoint:** `POST /donations`  
**Access:** Protected (Donor role required)  
**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "Fresh Vegetables",
  "description": "Assorted fresh vegetables from farm",
  "quantity_kg": 12.5,
  "latitude": 30.0444,
  "longitude": 31.2357,
  "expires_at": "2025-12-05T18:00:00Z"
}
```

**Field Rules:**
- `title`: Required, max 255 characters
- `description`: Optional, string
- `quantity_kg`: Required, number, min 0.1, max 1000
- `latitude`: Required, number, between -90 and 90
- `longitude`: Required, number, between -180 and 180
- `expires_at`: Optional, ISO 8601 datetime, must be future

**Success Response (201):**
```json
{
  "id": 15,
  "title": "Fresh Vegetables",
  "description": "Assorted fresh vegetables from farm",
  "quantity_kg": 12.5,
  "status": "available",
  "latitude": 30.0444,
  "longitude": 31.2357,
  "expires_at": "2025-12-05T18:00:00.000000Z",
  "donor": {
    "id": 1,
    "name": "John Doe"
  },
  "created_at": "2025-12-04T22:00:00.000000Z"
}
```

**Error Response (403):**
```json
{
  "message": "Only donors can create donations"
}
```

---

### 4. Claim Donation (Volunteer Only)

**Endpoint:** `POST /donations/{id}/claim`  
**Access:** Protected (Volunteer role required)  
**Headers:** `Authorization: Bearer {token}`

**Request Body:** Empty `{}`

**Success Response (200):**
```json
{
  "message": "Donation claimed successfully",
  "donation": {
    "id": 1,
    "title": "Fresh Bread from Bakery",
    "status": "reserved",
    "pickup_code": "123456",
    "donor": {
      "id": 2,
      "name": "Ahmed Restaurant",
      "phone": "+1234567891"
    }
  },
  "pickup_code": "123456"
}
```

**Error Responses:**
- **409 Conflict (Already claimed):**
```json
{
  "message": "This donation is no longer available"
}
```

- **403 Forbidden:**
```json
{
  "message": "Only volunteers can claim donations"
}
```

---

### 5. Get My Donations (Donor Only)

**Endpoint:** `GET /my-donations`  
**Access:** Protected (Donor role required)  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Fresh Bread",
    "status": "reserved",
    "pickup_code": "123456",
    "quantity_kg": 5.0,
    "claim": {
      "id": 1,
      "status": "active",
      "volunteer": {
        "id": 3,
        "name": "Jane Volunteer",
        "phone": "+1234567892"
      }
    }
  }
]
```

---

### 6. Nearby Donations (Geolocation)

**Endpoint:** `GET /donations/nearby?latitude={lat}&longitude={lng}&radius={km}`  
**Access:** Protected  
**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `latitude`: Required, float
- `longitude`: Required, float
- `radius`: Optional, integer (default: 10 km)

**Example:** `/donations/nearby?latitude=30.0444&longitude=31.2357&radius=15`

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Fresh Bread",
    "quantity_kg": 5.0,
    "distance": 0.8,
    "latitude": 30.0444,
    "longitude": 31.2357,
    "donor": {
      "name": "Ahmed Restaurant"
    }
  },
  {
    "id": 2,
    "title": "Vegetables",
    "quantity_kg": 12.0,
    "distance": 2.3,
    "latitude": 30.0500,
    "longitude": 31.2400
  }
]
```

**Note:** Results sorted by distance (nearest first)

---

## 📋 Claim Endpoints (Volunteer Only)

### 1. Get My Claims

**Endpoint:** `GET /claims`  
**Access:** Protected (Volunteer role required)  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
[
  {
    "id": 1,
    "donation_id": 3,
    "volunteer_id": 3,
    "status": "active",
    "picked_up_at": null,
    "delivered_at": null,
    "donation": {
      "id": 3,
      "title": "Fresh Bread",
      "quantity_kg": 5.0,
      "pickup_code": "123456",
      "latitude": 30.0444,
      "longitude": 31.2357,
      "donor": {
        "id": 2,
        "name": "Ahmed Restaurant",
        "phone": "+1234567891"
      }
    },
    "created_at": "2025-12-04T20:00:00.000000Z"
  }
]
```

**Claim Statuses:** `active`, `picked_up`, `delivered`, `cancelled`

---

### 2. Mark as Picked Up

**Endpoint:** `POST /claims/{id}/pickup`  
**Access:** Protected (Claim owner only)  
**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "pickup_code": "123456"
}
```

**Success Response (200):**
```json
{
  "message": "Marked as picked up successfully",
  "claim": {
    "id": 1,
    "status": "picked_up",
    "picked_up_at": "2025-12-04T21:00:00.000000Z",
    "donation": {
      "status": "picked_up"
    }
  }
}
```

**Error Response (422 - Invalid Code):**
```json
{
  "message": "Invalid pickup code"
}
```

---

### 3. Mark as Delivered

**Endpoint:** `POST /claims/{id}/deliver`  
**Access:** Protected (Claim owner only)  
**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "notes": "Delivered to community center"
}
```

**Success Response (200):**
```json
{
  "message": "Marked as delivered successfully! Thank you for your service.",
  "claim": {
    "id": 1,
    "status": "delivered",
    "delivered_at": "2025-12-04T22:00:00.000000Z",
    "notes": "Delivered to community center"
  }
}
```

**Error Response (409 - Not picked up yet):**
```json
{
  "message": "Donation must be picked up before marking as delivered"
}
```

---

### 4. Cancel Claim

**Endpoint:** `DELETE /claims/{id}`  
**Access:** Protected (Claim owner only)  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "message": "Claim cancelled successfully"
}
```

**Note:** Donation becomes available again

---

## 🔔 Notification Endpoints

### 1. Get Notifications

**Endpoint:** `GET /notifications`  
**Access:** Protected  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
[
  {
    "id": "uuid-1234-5678",
    "type": "App\\Notifications\\DonationClaimed",
    "data": {
      "donation_id": 1,
      "donation_title": "Fresh Bread",
      "volunteer_name": "Jane Volunteer",
      "pickup_code": "123456",
      "message": "Your donation has been claimed by Jane Volunteer"
    },
    "read_at": null,
    "created_at": "2025-12-04T20:00:00.000000Z"
  }
]
```

---

### 2. Mark Notification as Read

**Endpoint:** `POST /notifications/{id}/read`  
**Access:** Protected  
**Headers:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "message": "Marked as read"
}
```

---

## 📊 Data Models

### User Object
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  impact_score: number;
  status: "active" | "inactive" | "suspended";
  roles: string[];  // ["donor", "volunteer", "recipient", "admin"]
  permissions?: string[];
  created_at: string;  // ISO 8601
}
```

### Donation Object
```typescript
interface Donation {
  id: number;
  title: string;
  description: string | null;
  quantity_kg: number;
  status: "available" | "reserved" | "picked_up" | "delivered" | "expired" | "cancelled";
  pickup_code: string | null;  // Only visible to donor and volunteer
  latitude: number;
  longitude: number;
  expires_at: string | null;  // ISO 8601
  is_expired: boolean;
  is_available: boolean;
  distance?: number;  // Only in nearby queries
  donor: User;
  claim?: Claim | null;
  created_at: string;
  updated_at: string;
}
```

### Claim Object
```typescript
interface Claim {
  id: number;
  donation_id: number;
  volunteer_id: number;
  status: "active" | "picked_up" | "delivered" | "cancelled";
  picked_up_at: string | null;  // ISO 8601
  delivered_at: string | null;  // ISO 8601
  notes: string | null;
  donation?: Donation;
  volunteer?: User;
  created_at: string;
  updated_at: string;
}
```

---

## ❌ Error Responses

### Standard Error Format
```json
{
  "message": "Error description",
  "error": "Detailed error (only in debug mode)"
}
```

### HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT, POST, DELETE |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | User doesn't have permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already claimed, etc. |
| 422 | Validation Error | Input validation failed |
| 500 | Server Error | Internal server error |

---

## 🔒 Authentication Headers

**All protected endpoints require:**
```
Authorization: Bearer {your-token-here}
Content-Type: application/json
Accept: application/json
```

**Example:**
```javascript
fetch('http://localhost:8000/api/v1/donations', {
  headers: {
    'Authorization': 'Bearer 1|AbCdEf...',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
```

---

## 🧪 Test Accounts

All passwords: `password`

| Email | Role | Use Case |
|-------|------|----------|
| donor@test.com | Donor | Create donations |
| volunteer@test.com | Volunteer | Claim & deliver |
| recipient@test.com | Recipient | View donations |
| admin@test.com | Admin | Full access |

---

## 🚀 Development Workflow

### Frontend Developer (Your Teammate)

1. **Phase 1: Mock API**
   - Use this contract to create mock API responses
   - Build UI components with fake data
   - Test all user flows

2. **Phase 2: Connect to Real API**
   - Update API base URL to backend server
   - Replace mock responses with real fetch calls
   - Everything should "just work"!

### Backend Developer (You)

1. **Build according to this contract**
2. **Test with Postman** to verify all endpoints match
3. **Once ready, share backend URL** with frontend team
4. **Connect and test together**

---

## 📍 CORS Configuration

Backend will allow requests from:
- `http://localhost:3000` (Next.js dev)
- Your production frontend domain

---

## ✅ API Contract Checklist

Before saying "API is ready":

- [ ] All authentication endpoints working
- [ ] All donation CRUD endpoints working
- [ ] Claim workflow complete (claim → pickup → deliver)
- [ ] Geolocation nearby search working
- [ ] Notifications endpoints working
- [ ] Error responses match format
- [ ] CORS configured for frontend URL
- [ ] Test accounts seeded
- [ ] Postman collection exported

---

**Questions?** Contact backend team!  
**Last Updated:** 2025-12-04  
**Backend Team:** Laravel 11 API  
**Frontend Team:** Next.js 15
