# Automation Testing — SajiloCare
**Website:** sajilocare.com.np  
**Testing Period:** June 2026  
**Tester:** Apkha Sharma 
**Tool:** Playwright (Node.js)  
**Browsers:** Chrome, Firefox, Safari

---

## Background

After completing manual and API testing on SajiloCare, I wanted to explore browser automation as well. I learned Playwright from scratch and wrote automated tests against the SajiloCare website. This was done independently, outside of my assigned work scope, to build practical automation skills.

Setting up Playwright involved learning Node.js, npm, and enough JavaScript to write async test functions. I ran into real issues during the process a flaky toast message check, Safari compatibility problems with `networkidle`, and timeout tuning and worked through them to get all 9 test runs passing across 3 browsers. I am continuing to build on this foundation.

---

## What I Tested

| # | Test | Description |
|---|---|---|
| 1 | Homepage Load | Verifies the homepage loads successfully and the title is correct |
| 2 | Login Link Navigation | Clicks the login link and confirms the login page loads |
| 3 | Login Form | Fills in email and password fields and submits the login form |

---

## Test Results

| Browser | Tests | Passed | Failed |
|---|---|---|---|
| Chrome | 3 | 3 | 0 |
| Firefox | 3 | 3 | 0 |
| Safari | 3 | 3 | 0 |
| **Total** | **9** | **9** | **0** |

---

## Challenges and Fixes

**Flaky toast message check**  
An assertion checking for a toast notification was failing intermittently because the toast appeared and disappeared faster than the test could catch it. Fixed by adjusting the assertion timing.

**Safari compatibility**  
Safari was failing on `networkidle` as the wait condition for page loads. Switched to `domcontentloaded` which is better supported and more reliable across browsers.

**Timeout tuning**  
Some assertions were timing out on slower loads. Tuned individual timeouts to give enough time without making tests unnecessarily slow.

---

## What I Learned

This is my first experience with browser automation and I am still actively learning. So far I have learned how to set up Playwright from scratch, write basic async tests, and debug real cross browser failures. I plan to expand this test suite as I build more confidence with the tool.

---

## Files in This Folder

| File/Folder | Description |
|---|---|
| `tests/sajilocare.spec.js` | All three automated test cases |
| `playwright.config.js` | Playwright configuration — browsers, timeouts, base URL |
| `package.json` | Project dependencies |