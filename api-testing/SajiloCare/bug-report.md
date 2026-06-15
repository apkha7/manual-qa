# Bug Report — SajiloCare API
**Project:** SajiloCare (sajilocare.com.np)  
**Base URL:** https://api.sajilocare.com.np/api  
**Testing Period:** May 2026  
**Tester:** Apkha Sharma  
**Total Bugs Found:** 17

---

## Critical

| ID | Module | Endpoint | Bug Title | Description |
|---|---|---|---|---|
| B-01 | Authentication | GET /api/auth/verifyUser | No authentication required — exposes other users' private data | Removing the auth token entirely still returns 200 OK with another user's full private profile: name, email, phone, loyalty history, purchase history, and loyalty points. No authentication guard exists on this endpoint. |
| B-02 | Loyalty & Rewards | GET /api/redeems/loyalty-summary/:userId | Broken object-level access control — any user can view any other user's loyalty data | A logged-in user can read the complete loyalty summary of any other user by changing the userId in the URL. The API does not verify whether the userId matches the authenticated user. |
| B-03 | User & Staff Management | PATCH /api/users/toggle-status/:userId | Hashed password returned in API response body | The toggle status response includes the user's bcrypt hashed password. Passwords must never appear in any API response under any circumstances. |

---

## High

| ID | Module | Endpoint | Bug Title | Description |
|---|---|---|---|---|
| B-04 | Authentication | POST /api/auth/register | Duplicate email registration returns 500 | Registering with an existing email returns 500 Internal Server Error instead of 409 Conflict. |
| B-05 | Authentication | POST /api/auth/register | Missing fields crash server | Empty email, password, or phone returns 500. No input validation exists on the API — only the frontend validates these fields. |
| B-06 | Authentication | POST /api/auth/userLogin | Wrong credentials crash server | Supplying wrong email or password returns 500 Internal Server Error instead of 401 Unauthorized. |
| B-07 | Products | GET /api/products | 160 of 222 active products missing | Admin panel shows 222 active products but the API returns only 62. Customers cannot see 160 products on the website. |
| B-08 | Products | GET /api/products?minPrice=abc | Non-numeric price filter exposes internal database error | Passing text as a price value returns a 500 error that leaks raw database error details and internal schema structure. |
| B-09 | Coupons | POST /api/coupons/validate | Coupon applies against a fake product ID | The endpoint does not verify whether products in cartItems actually exist. A completely invalid product ID still results in 200 OK with the coupon applied. |
| B-10 | Orders | POST /api/orders/create | Valid order fails — frontend calls localhost:5000 in production | A correctly structured order returns 500. Browser dev tools revealed the production frontend is calling localhost:5000 instead of the live API for some order endpoints. |
| B-11 | Orders | POST /api/orders/create | Missing shipping address crashes server | Sending an order with no shippingAddress causes 500. The server attempts to process the field without checking if it exists. |
| B-12 | Orders | POST /api/orders/create | Invalid payment method crashes server | Sending an unlisted paymentMethod value returns 500. No validation exists on this field before processing. |
| B-17 | Loyalty & Rewards | POST /api/redeems/create | Loyalty point cost mismatch | Admin panel shows 1 point required; API calculates 3.5 points for the same product. Users with 1–2 points are incorrectly blocked from redeeming. |

---

## Medium

| ID | Module | Endpoint | Bug Title | Description |
|---|---|---|---|---|
| B-13 | Reviews | POST /api/reviews/check-eligibility | API docs mismatch — orderId required but not documented | Official docs say only productId is needed. The actual endpoint requires both productId and orderId. |
| B-14 | Wishlist | GET /api/wishlist | Frontend shows empty wishlist despite correct API response | The API correctly returns added products but the website always displays an empty wishlist. Frontend rendering or state management issue. |
| B-16 | Communication | POST /api/contact/create | Invalid email format accepted and saved | A contact form with no @ or domain (e.g. 'abcemail') returns 201 and is saved to the database. Staff cannot reply to the customer. |

---

## Low

| ID | Module | Endpoint | Bug Title | Description |
|---|---|---|---|---|
| B-15 | Products | GET /api/products?sortBy=price | sortBy parameter has no effect | Passing sortBy=price returns products in default order. The frontend compensates by sorting on the client side instead. |