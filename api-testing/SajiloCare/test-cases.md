# Test Cases — SajiloCare API
**Project:** SajiloCare (sajilocare.com.np)  
**Base URL:** https://api.sajilocare.com.np/api  
**Testing Period:** May 2026  
**Tester:** Apkha Sharma 
**Total Tests:** 75 | **Passed:** 59 | **Failed:** 15 | **Partial:** 1

## Authentication

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| A-01 | POST | /api/auth/register | Register with valid data | 201 Created | 201 Created | PASS |
| A-02 | POST | /api/auth/register | Register with duplicate email | 409 Conflict | 500 Internal Server Error | FAIL |
| A-03 | POST | /api/auth/register | Register with empty email | 400 Bad Request | 500 Internal Server Error | FAIL |
| A-04 | POST | /api/auth/register | Register with empty phone | 400 Bad Request | 500 Internal Server Error | FAIL |
| A-05 | POST | /api/auth/userLogin | Login with valid credentials | 200 OK, token returned | 200 OK, token returned | PASS |
| A-06 | POST | /api/auth/userLogin | Login with wrong password | 401 Unauthorized | 500 Internal Server Error | FAIL |
| A-07 | POST | /api/auth/logout | Logout with valid session | 200 OK | 200 OK | PASS |
| A-08 | POST | /api/auth/adminLogin | Admin login with valid credentials | 200 OK, adminToken returned | 200 OK, adminToken returned | PASS |
| A-09 | GET | /api/auth/verifyUser | Verify user with valid token | 200 OK, user data | 200 OK, user data returned | PASS |
| A-10 | GET | /api/auth/verifyUser | Verify user with no token | 401 Unauthorized | 200 OK — returns another user's private data | FAIL |
| A-11 | POST | /api/auth/forgot-password | Forgot password with registered email | 200 OK, OTP sent | 200 OK, OTP sent | PASS |
| A-12 | POST | /api/auth/forgot-password | Forgot password with unregistered email | 400 Bad Request | 400 Bad Request | PASS |
| A-13 | POST | /api/auth/verify-otp | Verify OTP with correct code | 200 OK | 200 OK | PASS |
| A-14 | POST | /api/auth/reset-password | Reset password with valid OTP | 200 OK | 200 OK | PASS |
| A-15 | POST | /api/auth/reset-password | Reset password with wrong OTP | 400 Bad Request | 400 Bad Request | PASS |
| A-16 | POST | /api/auth/delete-account | Delete own account with valid token | 200 OK | 200 OK | PASS |
| A-17 | POST | /api/auth/delete-account | Delete account with no token | 401 Unauthorized | 401 Unauthorized | PASS |

---

## Products

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| P-01 | GET | /api/products | Get all products | 200 OK, 222 products | 200 OK, only 62 returned | FAIL |
| P-02 | GET | /api/products/:slug | Get product by valid slug | 200 OK, product details | 200 OK, correct details | PASS |
| P-03 | GET | /api/products/:slug | Get product by invalid slug | 404 Not Found | 404 Not Found | PASS |
| P-04 | GET | /api/products?search=honey | Search with valid keyword | 200 OK, matching products | 200 OK, correct results | PASS |
| P-05 | GET | /api/products?search=xyzabc123 | Search with no matches | 200 OK, empty array | 200 OK, empty array | PASS |
| P-06 | GET | /api/products?minPrice=100&maxPrice=500 | Filter by valid price range | Products within range | All results within range | PASS |
| P-07 | GET | /api/products?page=9999 | Request page beyond available data | 200 OK, empty array | 200 OK, empty array | PASS |
| P-08 | GET | /api/products?minPrice=-100&maxPrice=-1 | Filter by negative price range | Empty or handled gracefully | 200 OK, empty data | PASS |
| P-09 | GET | /api/products?minPrice=abc&maxPrice=xyz | Filter by non-numeric price | 400 Bad Request | 500, exposes database error | FAIL |
| P-10 | GET | /api/products?sortBy=price | Sort by price | Products sorted by price | No effect, default order returned | PARTIAL |

---

## Categories

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| C-01 | GET | /api/categories | Get all categories | 200 OK | 200 OK, matches website | PASS |
| C-02 | GET | /api/categories/:slug/subcategories | Get subcategories for valid slug | 200 OK, subcategories listed | 200 OK, correct subcategories | PASS |
| C-03 | GET | /api/categories/:slug/subcategories | Get subcategories for invalid slug | 404 Not Found | 404 Not Found | PASS |

---

## Reviews

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| R-01 | GET | /api/reviews/product/:id | Get reviews for product with reviews | 200 OK, reviews returned | 200 OK, correct data | PASS |
| R-02 | GET | /api/reviews/product/:id | Get reviews for product with no reviews | 200 OK, empty array | 200 OK, empty array | PASS |
| R-03 | POST | /api/reviews/check-eligibility | Check eligibility with various inputs | Correct auth and field validation | Works but requires undocumented orderId field | PASS |

---

## Wishlist

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| W-01 | GET | /api/wishlist | Get empty wishlist | 200 OK, empty array | 200 OK, empty array | PASS |
| W-02 | POST | /api/wishlist/add | Add product to wishlist | 200 OK, product added | 200 OK, product added | PASS |
| W-03 | GET | /api/wishlist | Get wishlist after adding product | Product visible | API returns correctly, website shows empty | PASS |
| W-04 | GET | /api/wishlist/check/:id | Check if product is in wishlist | 200 OK, inWishlist: true | 200 OK, inWishlist: true | PASS |
| W-05 | POST | /api/wishlist/remove | Remove product from wishlist | 200 OK, removed | 200 OK, removed | PASS |
| W-06 | GET | /api/wishlist/clear | Clear entire wishlist | 200 OK, cleared | 200 OK, cleared | PASS |
| W-07 | POST | /api/wishlist/add | Add same product twice | Error or already in wishlist | 200 OK, no duplicate created | PASS |

---

## Coupons

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| CU-01 | POST | /api/coupons/validate | Validate real active coupon | 200 OK, discount applied | 200 OK, discount applied | PASS |
| CU-02 | POST | /api/coupons/validate | Validate non-existent coupon | 404 Not Found | 404 Not Found | PASS |
| CU-03 | POST | /api/coupons/validate | Validate with empty code field | 400 or 404 | 404 Not Found | PASS |
| CU-04 | POST | /api/coupons/validate | Validate with fake product ID in cart | 400 Bad Request | 200 OK, coupon applied despite invalid product | FAIL |

---

## Orders

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| O-01 | POST | /api/orders/create | Create valid order | 201 Created | 500 — frontend calls localhost:5000 in production | FAIL |
| O-02 | POST | /api/orders/create | Create order with empty items | 400 Bad Request | 400 Bad Request | PASS |
| O-03 | POST | /api/orders/create | Create order with no shipping address | 400 Bad Request | 500 Internal Server Error | FAIL |
| O-04 | POST | /api/orders/create | Create order with invalid payment method | 400 Bad Request | 500 Internal Server Error | FAIL |
| O-05 | GET | /api/orders/my-orders | Get order history authenticated | 200 OK | 200 OK, empty array | PASS |
| O-06 | GET | /api/orders/my-orders | Get order history no token | 401 Unauthorized | 401 Unauthorized | PASS |
| O-07 | PATCH | /api/orders/update-status | Admin updates order status | 200 OK | 200 OK, status updated | PASS |
| O-08 | PATCH | /api/orders/update-status | Update status no admin token | 401 Unauthorized | 401 Unauthorized | PASS |
| O-09 | PATCH | /api/orders/update-status | Update status invalid value | 400 Bad Request | 400 Bad Request | PASS |

---

## Admin Dashboard

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| AD-01 | GET | /api/admin/dashboard | Get stats with valid admin token | 200 OK, full stats | 200 OK, complete stats | PASS |
| AD-02 | GET | /api/admin/dashboard | Get stats with no token | 401 Unauthorized | 401 Unauthorized | PASS |
| AD-03 | GET | /api/admin/dashboard | Get stats with user token | 401 or 403 | 400 Bad Request | PASS |

---

## Communication

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| CM-01 | POST | /api/contact/create | Submit contact form valid | 201 Created | 201 Created | PASS |
| CM-02 | POST | /api/contact/create | Submit with missing field | 400 Bad Request | 400 Bad Request | PASS |
| CM-03 | POST | /api/contact/create | Submit with invalid email format | 400 Bad Request | 201 Created, invalid email saved | FAIL |
| CM-04 | POST | /api/chat/initialize | Initialize chat with valid token | 200 OK, roomId returned | 200 OK, correct roomId | PASS |
| CM-05 | POST | /api/chat/initialize | Initialize chat with no token | 401 Unauthorized | 401 Unauthorized | PASS |

---

## User & Staff Management

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| US-01 | GET | /api/users | Get all users as admin | 200 OK | 200 OK, all users returned | PASS |
| US-02 | GET | /api/users | Get all users no admin token | 401 Unauthorized | 401 Unauthorized | PASS |
| US-03 | PATCH | /api/users/toggle-status/:userId | Toggle user status | 200 OK | 200 OK, but hashed password in response | FAIL |
| US-04 | POST | /api/staff/create | Create staff as admin | 201 Created | 201 Created | PASS |
| US-05 | POST | /api/staff/login | Staff login correct credentials | 200 OK | 200 OK | PASS |
| US-06 | POST | /api/staff/login | Staff login wrong password | 401 Unauthorized | 401 Unauthorized | PASS |
| US-07 | POST | /api/staff/create | Create staff no admin token | 401 Unauthorized | 401 Unauthorized | PASS |

---

## Loyalty & Rewards

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| L-01 | GET | /api/redeems/loyalty-summary/:userId | Get own loyalty summary | 200 OK | 200 OK, correct data | PASS |
| L-02 | GET | /api/redeems/loyalty-summary/:userId | Get loyalty summary no token | 401 Unauthorized | 401 Unauthorized | PASS |
| L-03 | GET | /api/redeems/loyalty-summary/:userId | Get another user's loyalty summary | 403 Forbidden | 200 OK, other user's full data returned | FAIL |
| L-04 | POST | /api/redeems/create | Redeem with insufficient points | 400 Bad Request | 400 Bad Request | PASS |
| L-05 | POST | /api/redeems/create | Loyalty point cost mismatch | Points match admin config | API requires 3.5 points, admin shows 1 | FAIL |

---

## POS Orders

| ID | Method | Endpoint | Description | Expected | Actual | Result |
|---|---|---|---|---|---|---|
| POS-01 | POST | /api/pos-orders/create | Create POS order as admin | 200 OK | 200 OK, status: Completed | PASS |
| POS-02 | POST | /api/pos-orders/create | Create POS order no token | 401 Unauthorized | 401 Unauthorized | PASS |