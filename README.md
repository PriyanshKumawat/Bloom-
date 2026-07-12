Bloom
A vanilla JavaScript flower shop front-end with product browsing, client-side filtering, a localStorage-backed shopping cart, promo codes, and wishlist functionality. Open the HTML files directly in a browser to explore the UI.

Features
Product Catalogue – Static product data rendered as cards with images, names, and prices
Category Filtering – Filter buttons on the product page to show matching bouquets
Add-to-Cart – Items stored in localStorage via the shared BloomCart module
Cart Management – View items, adjust quantities, remove items, clear cart, apply promo codes
Promo Codes – Built-in discounts: BLOOM10, FRESH20, PETALS15
Wishlist Toggle – Heart icon toggles state with toast feedback
Toast Notifications – Reusable toast UI for cart actions and wishlist feedback
Responsive Design – CSS variables and flexible grid layouts adapt to viewports
Quick Start
The project is a static site with no build tools or dependencies.

Clone the repository

git clone https://github.com/priyansh-98/Bloom.git
cd Bloom
Open any HTML page in a browser

# macOS / Linux
open html/index.html

# Windows
start html\index.html
Usage
Browse Products
Navigate to html/product.html and use the filter buttons to narrow the product view by category.

Add to Cart
Click an "Add to Cart" button on any product card. A toast confirms the action and the cart badge updates.

Manage Cart
Open html/cart.html to:

View all items in your cart
Adjust quantities using the +/- buttons
Remove individual items
Apply promo codes for discounts
Clear the entire cart
Wishlist
Click the heart icon on a product card to toggle its wishlist state. Toast notifications confirm the action.

Project Structure
Bloom/
├─ css/
│   ├─ about.css      # About page styles
│   ├─ cart.css       # Cart page styles
│   ├─ contact.css    # Contact page styles
│   ├─ product.css    # Product page styles
│   ├─ reset.css      # Sign in / Sign up styles
│   ├─ sign-in.css    # Sign in page styles
│   ├─ sign-up.css    # Sign up page styles
│   └─ style.css      # Global styles
├─ html/
│   ├─ about.html
│   ├─ cart.html
│   ├─ contact.html
│   ├─ index.html
│   ├─ product.html
│   ├─ reset.html
│   ├─ sign-in.html
│   └─ sign-up.html
├─ image/
│   ├─ about/         # About page assets
│   ├─ contact/       # Contact page assets
│   ├─ generated/     # Generated product images
│   ├─ index/         # Home page assets
│   └─ producte/      # Product images
├─ js/
│   ├─ bloom-cart.js  # Shared cart store & toast helper
│   ├─ cart.js        # Cart page logic
│   └─ product.js     # Product page logic
└─ .vscode/
    └─ settings.json
Tech Stack
Layer	Technology
Markup	HTML5
Styling	CSS3 (custom properties, responsive grid)
Scripting	Vanilla JavaScript (ES6+)
Storage	localStorage
Fonts	Google Fonts (Playfair Display, Inter)
Contributing
Contributions are welcome! To get started:

Fork the repository and create a feature branch
Make your changes (e.g., add a product, improve styling, fix a bug)
Open the affected HTML file in a browser to verify functionality
Submit a pull request with a clear description of changes
Please maintain consistency with the existing code style: plain JavaScript, CSS variables, and semantic HTML.

License
No license file is present in this repository. By default, the code is unlicensed. Consider adding an appropriate open-source license if you plan to redistribute or modify the project.
