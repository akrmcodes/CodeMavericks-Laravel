# ZeroHunger: Project Overview & User Scenarios

## 🌍 Project Vision

**ZeroHunger** is a food donation logistics platform that connects food donors (restaurants, bakeries, supermarkets, individuals) with volunteers who deliver surplus food to recipients in need, reducing food waste and fighting hunger.

---

## 🎯 Core Problem

Every day:
- 🍽️ Restaurants throw away perfectly good food
- 🥖 Bakeries discard unsold bread
- 🏪 Supermarkets waste products near expiry
- 😔 Meanwhile, people in the same city go hungry

**The Gap:** No efficient system to match available food with those who need it.

**The Solution:** ZeroHunger creates a real-time marketplace for surplus food donations.

---

## 👥 User Roles

### 1. **Donors** 🏪
- Restaurants, bakeries, cafes, supermarkets
- Individuals with surplus food
- Create donation listings with location & expiry time

### 2. **Volunteers** 🚗
- Individuals with vehicles
- Pick up donations and deliver to recipients
- Earn impact points for contributions

### 3. **Recipients** 🙏
- Community centers, shelters, charities
- Families in need
- View available donations in their area

### 4. **Admins** 👨‍💼
- System administrators
- Monitor platform activity
- Manage users and content

---

## ✨ Key Features

### For Donors
✅ Create donation listings (title, quantity, location, expiry)  
✅ Real-time notifications when claimed  
✅ Provide pickup code for verification  
✅ Track donation status (available → claimed → delivered)  
✅ View impact score (gamification)  

### For Volunteers
✅ View available donations on interactive map  
✅ Find nearby donations with geolocation  
✅ Claim donations with race-condition protection  
✅ Verify pickup with code from donor  
✅ Mark as picked up → delivered workflow  
✅ Earn impact points (2x for deliveries)  

### For Recipients
✅ View available donations in their area  
✅ See real-time updates  

### System Features
✅ Role-based access control  
✅ Token-based API authentication  
✅ Real-time notifications (email + in-app)  
✅ Background job processing  
✅ Geolocation with Haversine formula  
✅ Impact scoring system  
✅ Race condition protection  

---

## 📖 User Journey Scenarios

### Scenario 1: Ahmed's Bakery (Donor)

**Context:**  
Ahmed owns a bakery in Cairo. Every evening, he has 20 loaves of bread left that won't be fresh tomorrow.

**Journey:**

**Step 1: Ahmed creates a donation**
- Opens ZeroHunger app at 6:00 PM
- Logs in with his donor account
- Clicks "Create Donation"
- Fills in details:
  - Title: "Fresh Whole Wheat Bread"
  - Description: "20 loaves, baked this morning"
  - Quantity: 5 kg
  - Location: His bakery (auto-detected via GPS or manual entry)
  - Expires: Today at 10:00 PM
- Submits donation

**Step 2: Backend processes**
```
✅ Validates input (quantity, location, expiry time)
✅ Creates donation with status "available"
✅ Stores in database with geolocation coordinates
✅ Returns success with donation ID
```

**Step 3: Notification received**
- 10 minutes later, Ahmed receives notification:
  - "Your donation has been claimed by Sara!"
  - Pickup code: **483729**
- Ahmed sees Sara's phone number to coordinate

**Step 4: Pickup**
- Sara arrives at 7:00 PM
- Ahmed asks for pickup code
- Sara shows: **483729** ✅
- Ahmed hands over the bread
- Sara clicks "Mark as Picked Up" in app

**Step 5: Completion**
- Later, Ahmed receives notification:
  - "Your donation has been delivered! Thank you for fighting hunger."
- Ahmed's impact score increases by **5 points** (1 per kg)

---

### Scenario 2: Sara the Volunteer

**Context:**  
Sara is a university student who volunteers on weekends. She has a car and wants to help her community.

**Journey:**

**Step 1: Sara logs in**
- Opens app on Saturday morning
- Logs in with volunteer account
- Sees dashboard with:
  - Available donations: 12
  - Her claims: 2 active
  - Impact score: 350 points

**Step 2: Finding donations**
- Clicks "View Map"
- Sees interactive map with markers for donations
- Green markers = available
- Each marker shows:
  - Title
  - Quantity
  - Distance from her location
- Filters donations:
  - Within 10 km radius
  - Expiring within 6 hours

**Step 3: Claiming donation**
- Sara clicks on Ahmed's bakery marker
- Popup shows:
  - "Fresh Whole Wheat Bread - 5 kg"
  - Distance: 2.3 km away
  - Expires: Today 10:00 PM
- Sara clicks "Claim Donation"

**Backend magic happens:**
```
🔒 Database lock prevents duplicate claims (race condition protection)
✅ Updates donation status to "reserved"
✅ Generates pickup code: 483729
✅ Creates claim record
✅ Sends notification to Ahmed (donor)
✅ Awards Sara +5 points for claiming
✅ Returns pickup code to Sara
```

**Step 4: Pickup verification**
- Sara drives to Ahmed's bakery (uses map navigation)
- Arrives and asks Ahmed for the donation
- Ahmed asks for pickup code
- Sara enters code in app: **483729**
- App validates code ✅
- Sara clicks "Mark as Picked Up"
- System records pickup time

**Step 5: Delivery**
- Sara drives to local shelter
- Delivers bread to shelter manager
- Opens app, clicks "Mark as Delivered"
- Optional: Adds note "Delivered to Hope Shelter, received by Manager"
- Clicks submit

**Backend processes:**
```
✅ Updates claim status to "delivered"
✅ Updates donation status to "delivered"
✅ Records delivery timestamp
✅ Sends notification to Ahmed
✅ Processes impact scores:
   - Sara: +10 points (2 per kg for delivery)
   - Ahmed: +5 points (1 per kg for donation)
✅ Triggers thank you email to both
```

**Step 6: Impact**
- Sara's new impact score: **365 points**
- She sees stats:
  - Total deliveries: 28
  - Total kg delivered: 156 kg
  - Lives impacted: ~312 people

---

### Scenario 3: Multiple Volunteers (Race Condition Test)

**Context:**  
A popular restaurant posts a large donation. Multiple volunteers see it simultaneously.

**Journey:**

**7:15 PM - Donation Posted**
- "Sunset Restaurant" posts: 50 kg of cooked meals
- Located in prime area

**7:16 PM - Three volunteers see it:**
- Volunteer A (Sara): Clicks "Claim" at 7:16:23.456
- Volunteer B (Mike): Clicks "Claim" at 7:16:23.459 (3ms later!)
- Volunteer C (Ali): Clicks "Claim" at 7:16:24.100

**Backend handles race condition:**
```php
// Laravel's lockForUpdate() ensures only ONE succeeds
DB::transaction(function() {
    $donation = Donation::where('id', 15)
        ->lockForUpdate()  // 🔒 Database-level lock
        ->first();
    
    if ($donation->status !== 'available') {
        return error("Already claimed");
    }
    
    // Only first request reaches here
    $donation->update(['status' => 'reserved']);
    Claim::create([...]);
});
```

**Results:**
- ✅ Sara: "Donation claimed successfully!" (she was first by 3ms!)
- ❌ Mike: "This donation is no longer available"
- ❌ Ali: "This donation is no longer available"

**No duplicate claims!** ✨

---

### Scenario 4: Expiry & Notifications Flow

**Context:**  
Complete workflow showing all system components working together.

**8:00 AM - Donation Created**
```
Donor: "Garden Fresh Vegetables - 10 kg"
Expires: 6:00 PM today
Status: available
```

**10:00 AM - No claims yet**
- System checks expiry times (background job)
- Still 8 hours remaining ✅

**3:00 PM - Claimed by volunteer**
```
Volunteer: Jane claims donation
🔔 Email sent to donor: "Your donation has been claimed!"
🔔 Database notification created
💾 Pickup code generated: 927364
📊 Jane's impact score +10 (claimed)
Status: reserved
```

**4:00 PM - Picked up**
```
Volunteer enters code: 927364 ✅
Status: picked_up
Timestamp recorded: 4:00 PM
```

**5:30 PM - Delivered**
```
Volunteer marks delivered with note: "Delivered to Community Center"
🔔 Email sent to donor: "Delivered successfully!"
💼 Background job dispatched: ProcessImpactScore
📊 Donor score: +10 points
📊 Volunteer score: +20 points (delivery bonus)
Status: delivered
✅ Complete!
```

**If not claimed by 6:00 PM:**
```
Background job runs:
- Finds expired donations
- Updates status to "expired"
- Sends alert to donor
```

---

## 🏗️ Technical Architecture

### Backend (Laravel 11 API)
```
📁 app/
  ├── Http/Controllers/Api/
  │   ├── AuthController       → Registration, login, logout
  │   ├── DonationController   → CRUD, claim, nearby search
  │   └── ClaimController      → Pickup, delivery, cancel
  ├── Models/
  │   ├── User                 → With roles & permissions
  │   ├── Donation             → With geolocation
  │   └── Claim                → Workflow management
  ├── Services/
  │   └── GeoService           → Haversine distance calculations
  ├── Notifications/
  │   ├── DonationClaimed      → Email + database
  │   └── DonationDelivered    → Email + database
  └── Jobs/
      └── ProcessImpactScore   → Background scoring
```

### Frontend (Next.js 15)
```
📁 src/
  ├── app/
  │   ├── login/               → Authentication
  │   ├── dashboard/           → Role-based dashboards
  │   └── layout.js            → App wrapper
  ├── components/
  │   ├── DonationMap          → Leaflet map
  │   ├── DonationList         → Grid view
  │   └── ClaimActions         → Pickup/delivery buttons
  ├── contexts/
  │   └── AuthContext          → Global auth state
  └── lib/
      └── api.js               → Axios client
```

### Database Schema
```sql
users (id, name, email, lat, lng, impact_score, roles)
donations (id, donor_id, title, qty, lat, lng, status, pickup_code)
claims (id, donation_id, volunteer_id, status, picked_up_at, delivered_at)
notifications (id, user_id, type, data, read_at)
jobs (id, queue, payload)  -- Background processing
```

---

## ✅ Requirements Fulfillment Checklist

### Functional Requirements
- ✅ User registration with role selection (donor/volunteer/recipient)
- ✅ Token-based authentication (Laravel Sanctum)
- ✅ Role-based access control (Spatie Permissions)
- ✅ Donation CRUD operations
- ✅ Geolocation-based search (Haversine formula)
- ✅ Claim management workflow
- ✅ Pickup code verification
- ✅ Real-time notifications (email + database)
- ✅ Impact scoring system
- ✅ Background job processing

### Non-Functional Requirements
- ✅ **Security:** SQL injection protection (Eloquent ORM)
- ✅ **Security:** XSS protection (React escaping)
- ✅ **Security:** CSRF protection
- ✅ **Security:** Password hashing (bcrypt)
- ✅ **Concurrency:** Race condition protection (lockForUpdate)
- ✅ **Performance:** Database indexing (lat/lng, status, created_at)
- ✅ **Performance:** Eager loading (N+1 prevention)
- ✅ **Performance:** Background jobs (queue system)
- ✅ **Scalability:** Stateless API (token-based)
- ✅ **Maintainability:** Clean architecture with services
- ✅ **Testability:** Feature & unit tests

### Technical Stack Constraints
- ✅ **Backend:** Laravel 11 (PHP 8.3)
- ✅ **Frontend:** Next.js 15 + React 18
- ✅ **Database:** MySQL 8.0
- ✅ **Auth:** Laravel Sanctum (no Passport)
- ✅ **Permissions:** Spatie Laravel Permission
- ✅ **Queue:** Database driver (no Redis)
- ✅ **Cache:** File driver (no Redis)
- ✅ **Mail:** Log driver (development)
- ✅ **Maps:** React-Leaflet + OpenStreetMap (no Google Maps)
- ✅ **Server:** Laravel Herd (Windows 11)
- ✅ **No Docker** requirement met

---

## 🎯 Business Impact

### Metrics to Track
1. **Food Saved:** Total kg of donations delivered
2. **People Fed:** Estimated based on kg (1 kg ≈ 2 meals)
3. **Active Users:** Donors, volunteers by role
4. **Average Claim Time:** How fast donations get claimed
5. **Completion Rate:** Claimed → Delivered percentage
6. **Geographic Coverage:** Heat map of active areas

### Expected Outcomes
- 📉 Reduce food waste by 30% in participating businesses
- 📈 Feed 1000+ people monthly
- 🌍 Create sustainable community network
- ⭐ Recognition & gamification drive engagement

---

## 🚀 Future Enhancements (Out of Scope)

1. **Mobile Apps:** iOS & Android native apps
2. **Real-time Updates:** WebSockets for live map updates
3. **Chat System:** In-app messaging between donors/volunteers
4. **Route Optimization:** Multi-stop delivery planning
5. **Analytics Dashboard:** Visual reports for admins
6. **Recipient Verification:** QR codes for delivery confirmation
7. **Social Sharing:** Share impact on social media
8. **Scheduling:** Recurring donations for regular donors

---

## 📊 Success Criteria

**Project is successful if:**
1. ✅ Donor can create donation in < 2 minutes
2. ✅ Volunteer can find & claim nearby donation in < 3 minutes
3. ✅ No duplicate claims (race condition prevented)
4. ✅ 95%+ of claimed donations are delivered
5. ✅ API response time < 500ms
6. ✅ Zero security vulnerabilities
7. ✅ All automated tests passing
8. ✅ Documentation complete

---

## 🎓 For Stakeholders

**Why ZeroHunger Matters:**

> "In Cairo alone, restaurants discard tons of edible food daily, while shelters struggle to feed families. ZeroHunger bridges this gap with technology, creating a win-win-win: businesses reduce waste, volunteers earn recognition, and families get meals. It's not just an app—it's a movement."

**ROI for Businesses:**
- 🌱 CSR & sustainability credentials
- 💰 Tax deductions for donations
- 📱 Free platform (no listing fees)
- 📊 Impact reporting for PR

**Value for Volunteers:**
- 🏆 Gamification & recognition
- 🤝 Community building
- ⏱️ Flexible scheduling
- 💝 Making real impact

---

## 📝 Summary

**ZeroHunger** is a complete, production-ready food donation platform that:

✅ Connects **donors** with **volunteers** to deliver food to those in need  
✅ Uses **geolocation** to find nearby donations  
✅ Implements **secure workflows** with code verification  
✅ Provides **real-time notifications** to all parties  
✅ Tracks **impact** through gamification  
✅ Built with **modern tech stack** (Laravel 11 + Next.js 15)  
✅ Follows **best practices** for security, performance, and scalability  
✅ **Fully documented** with API contract for parallel development  

**The platform is ready to save food, fight hunger, and build community.** 🌍💚

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-05  
**Status:** Ready for Development
