# Amayraa Web Application Test Plan

## Application Overview

Functional and UX test plan for the Amayraa premium fashion storefront at https://www.amayraa.com (redirects to the US storefront). Coverage includes homepage navigation, catalog discovery, search, product detail and inventory behavior, cart, account registration and login, contact/newsletter forms, and informational pages. Run each scenario independently from a fresh browser state with no authenticated user and an empty cart. Use a non-production environment and controlled test data for any form submission; do not place real orders or send real customer messages.

## Test Scenarios

### 1. Storefront discovery and shopping

**Seed:** `tests\seed.spec.ts`

#### 1.1. Browse the homepage and navigate to a category

**File:** `tests\amayraa\homepage-navigation.spec.ts`

**Steps:**
  1. Start with a fresh browser context, no signed-in user, and an empty cart. Open https://www.amayraa.com.
    - expect: The browser redirects to the US storefront, the page title identifies Amayraa, and the homepage renders without a blocking error.
  2. Inspect the primary navigation, hero carousel, category carousel, new-items section, shop-the-look links, brand section, and footer.
    - expect: Primary navigation includes the visible shopping categories and About link. Carousel controls can select another slide and return to the initial slide.
  3. Open Dresses from the primary navigation, then use the site logo to return home.
    - expect: The Dresses listing loads and displays product cards. The logo returns to the storefront homepage.

#### 1.2. Filter, sort, and clear a category listing

**File:** `tests\amayraa\catalog-filters-sorting.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.amayraa.com/us/categories/dresses.
    - expect: The listing shows the Dresses heading, a product count, product cards, filter controls, and a sorting control.
  2. Open Filter and inspect the category, price, brand, and size controls. Set a valid price range that excludes some listed products and apply it.
    - expect: The selected filter is reflected in the listing, the product count updates consistently, and all shown product prices satisfy the chosen range.
  3. Change the sort order to Price, low to high, then Price, high to low.
    - expect: Products reorder in the selected direction and their prices remain attached to the correct product cards.
  4. Clear the selected filters using the available reset/remove-all control.
    - expect: The category returns to its unfiltered state, the product count and cards are restored, and no stale filter chip remains.
  5. Enter a reversed or out-of-range price boundary and attempt to apply it.
    - expect: The control prevents invalid bounds or displays a clear validation response; it does not silently show an inconsistent result set.

#### 1.3. Use catalog pagination and brand navigation

**File:** `tests\amayraa\catalog-pagination-brand.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.amayraa.com/us/store.
    - expect: The new-arrivals listing displays product cards, sorting/filter controls, and pagination when multiple pages are available.
  2. Select the next page, then return to the first page.
    - expect: The product set changes on the next page, the selected page is indicated, and returning restores the first-page results without a broken route.
  3. Open a visible brand link from the homepage brand carousel or View All Brands page.
    - expect: The brand destination loads and displays the selected brand or appropriately filtered products.
  4. Use browser back to return to the prior catalog or homepage.
    - expect: Navigation returns to the prior page without a blank state or unexpected loss of the current route.

#### 1.4. Search for products and handle empty results

**File:** `tests\amayraa\site-search.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the homepage. Open the global search panel.
    - expect: The search dialog is visible with a Search textbox, search action, quick category links, inspiration products, and a close control.
  2. Submit a distinctive term matching a visible catalog product, such as “Kanavu dress”.
    - expect: Matching products or a relevant result state are displayed; selecting the matching product opens its detail page.
  3. Reopen search and submit an unlikely term with no matching products.
    - expect: A clear no-results state is displayed, with no unrelated product presented as a match.
  4. Submit an empty or whitespace-only query, then close the search panel.
    - expect: The app does not show a misleading result for an empty query, and the close control dismisses the dialog and restores the underlying page.

#### 1.5. Inspect product details, variants, and out-of-stock behavior

**File:** `tests\amayraa\product-detail.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.amayraa.com/us/products/kanavu-dress.
    - expect: The product page displays its title, price, description, image gallery controls, quantity area, and detail tabs. If the item is out of stock, that status is clearly shown.
  2. Select each product image thumbnail and use next/previous image controls.
    - expect: The selected image changes as expected, the active thumbnail state updates, and gallery navigation remains within the available images.
  3. Inspect available size/color variants and attempt to select an available option; inspect quantity controls and try a boundary quantity such as zero or a negative number.
    - expect: Variant selection updates the selected state and product URL or displayed details as applicable. Invalid quantities are rejected or normalized and cannot create an invalid cart quantity.
  4. If the product is out of stock, attempt to use the purchase action. If an in-stock variant is available in the test environment, select it and add one unit to the cart instead.
    - expect: Out-of-stock items cannot be added and are clearly marked. For an in-stock item, adding one valid variant succeeds and the cart count reflects one item.
  5. Open Description, Additional Information, Review, Shipping, and Return Policies sections.
    - expect: Each section opens the corresponding product information or review interface, and section switching does not corrupt the product selection.

#### 1.6. Verify empty cart and checkout gating

**File:** `tests\amayraa\cart-empty-state.spec.ts`

**Steps:**
  1. Start with a fresh browser context and empty cart. Open the cart from the header.
    - expect: The cart panel reports that the cart is empty, the subtotal is $0.00, a view-all-products link is available, and checkout is disabled or otherwise unavailable.
  2. Follow the View cart link to the full cart page.
    - expect: The full cart page shows an empty-cart message and an Explore Products link leading to the store.
  3. Return to the store and, if an in-stock test product is available, add one item and reopen the cart. Otherwise, verify the displayed out-of-stock item cannot be added.
    - expect: A valid add updates item count and subtotal consistently, or an out-of-stock add is blocked with no cart count or subtotal change.
  4. From an empty cart, attempt to proceed to checkout if the control is available.
    - expect: Checkout cannot proceed with an empty cart; the user is not sent to an invalid checkout or charged.

### 2. Account and customer communication

**Seed:** `tests\seed.spec.ts`

#### 2.1. Validate login, account roles, and recovery entry

**File:** `tests\amayraa\account-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context with no authenticated user and open https://www.amayraa.com/us/account.
    - expect: The Log in form is visible with email and password fields, Customer/Company/Employee role controls, password visibility control, forgot-password link, and login action.
  2. Submit the login form with both fields empty, then with a malformed email and a password.
    - expect: Required-field and email-format validation is shown; invalid credentials are not accepted and the page remains usable.
  3. Select Company and Employee account types, then return to Customer.
    - expect: The selected role is indicated and the corresponding login form or requirements update consistently without losing the account page.
  4. Use the password visibility control and open the forgot-password flow.
    - expect: Password visibility toggles without altering the entered value. The recovery flow opens and provides a way to enter an email and continue or return to login.
  5. Attempt a login using a controlled invalid test account.
    - expect: A clear authentication failure is shown without exposing sensitive details or entering an authenticated state.

#### 2.2. Validate registration and return to login

**File:** `tests\amayraa\account-registration.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.amayraa.com/us/account. Choose Register.
    - expect: The registration form is displayed with first name, last name, email, password, account type choices, and a link back to login.
  2. Submit the registration form with required fields empty, then enter an invalid email and a password that does not meet the displayed requirements.
    - expect: Required-field, email, and password validation appears; invalid registration is not accepted.
  3. Enter valid synthetic test details in a non-production environment and submit registration.
    - expect: Registration succeeds with a clear confirmation or expected next step, and the newly created account can proceed to the appropriate authenticated state.
  4. Use the existing-account login link.
    - expect: The login form is shown and the user can return between registration and login without losing site navigation.

#### 2.3. Validate the contact form and submission response

**File:** `tests\amayraa\contact-form.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.amayraa.com/us/contact.
    - expect: The page shows Contact Us, store address/phone/email/opening details, map links, and a contact form with Name, Email, Message, and Send controls.
  2. Submit the contact form empty, then submit with malformed email and otherwise populated fields.
    - expect: Required and email-format validation is displayed; no successful-submission state appears for invalid input.
  3. In a non-production environment, submit the form using synthetic contact details and a short test message.
    - expect: The message is accepted and a visible confirmation appears, or a clear server error is shown; duplicate submissions are prevented while processing.
  4. Follow the map or directions link and return to the contact page.
    - expect: The external map destination is opened as intended and the contact page remains accessible.

#### 2.4. Validate newsletter signup feedback

**File:** `tests\amayraa\newsletter.spec.ts`

**Steps:**
  1. Start from a fresh browser context and locate the Sign Up for Email form in the site footer.
    - expect: The newsletter form and its submit action are visible and usable from a standard storefront page.
  2. Attempt submission with an empty value and then a malformed email address.
    - expect: The form rejects empty or malformed email input with clear validation and does not report a successful subscription.
  3. In a non-production environment, submit a unique controlled test email address.
    - expect: A clear subscription confirmation is displayed, or an actionable error is surfaced. Repeated submission does not create misleading duplicate-success feedback.

#### 2.5. Navigate informational and customer-help pages

**File:** `tests\amayraa\informational-pages.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the About page using the primary navigation.
    - expect: The About page loads with its brand introduction, mission, heritage, and supporting content; the page title and navigation are appropriate.
  2. Open the shipping and delivery information page using the footer help link or the shipping link in the cart.
    - expect: The shipping page loads, its content is readable, and the route is not blank or broken.
  3. Navigate to other visible footer help and policy pages, such as returns, privacy, and FAQ, when linked.
    - expect: Each available help/policy link opens the intended page and the site header/footer remain navigable.
  4. Use the logo and primary navigation to return to the storefront.
    - expect: The homepage loads successfully and remains usable after visiting informational pages.
