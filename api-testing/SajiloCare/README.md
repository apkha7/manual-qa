# API Testing — SajiloCare
**Website:** sajilocare.com.np  
**Base URL:** https://api.sajilocare.com.np/api  
**Testing Period:** May 2026  
**Tester:** Apkha Sharma 
**Tool:** Postman

---

## Background

SajiloCare is a Nepali e-commerce platform for baby and health products. I was originally assigned to do manual testing on this project at my company. After completing that, I wanted to go further and explore API testing on my own so I requested the API documentation from the developer and tested the backend independently.

The API docs were well structured and included expected inputs, outputs, and status codes. I used those as a base and added my own negative test cases on top things like missing fields, wrong data types, invalid tokens, and boundary conditions that weren't in the original scope.

---

## What I Tested

| Module | Tests |
|---|---|
| Authentication | 17 |
| Products | 10 |
| Categories | 3 |
| Reviews | 3 |
| Wishlist | 7 |
| Coupons | 4 |
| Orders | 9 |
| Admin Dashboard | 3 |
| Communication | 5 |
| User & Staff Management | 7 |
| Loyalty & Rewards | 5 |
| POS Orders | 2 |
| **Total** | **75** |

---

## Results Summary

| Passed | Failed | Partial | Bugs Found |
|---|---|---|---|
| 59 | 15 | 1 | 17 |

---

## Notable Findings

**Critical bugs found:**
- Unauthenticated requests to `/api/auth/verifyUser` return another user's full private data — name, email, phone, purchase history, loyalty points — with no token required at all
- Any logged-in user can view any other user's complete loyalty summary just by changing the userId in the URL
- The toggle user status endpoint returns the user's hashed password in the response body

**Other significant findings:**
- 160 out of 222 active products are missing from the API response — customers cannot see them on the website
- The production frontend calls `localhost:5000` for some order endpoints, causing all order creation to fail in production
- Multiple endpoints crash with 500 Internal Server Error on invalid input instead of returning proper validation errors

---

## What I Learned

This was my first time doing API testing and it was less intimidating than I expected. Having the API documentation made it easier to get started. The most valuable part was adding negative test cases beyond what was documented that's where most of the real bugs showed up. I also learned to cross check API responses against what the actual website shows, which helped catch frontend bugs like the wishlist display issue.

---

## Files in This Folder

| File | Description |
|---|---|
| `README.md` | This file — project overview and findings summary |
| `test-cases.md` | All 75 test cases with expected and actual results |
| `bug-report.md` | Detailed bug register with severity levels |