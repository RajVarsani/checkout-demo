# Checkout Experience Demo

This repository contains the implementation of a user-friendly, visually engaging, and responsive checkout process for an e-commerce platform. Designed with modern UI/UX principles, the application guides users seamlessly through the final stages of their online shopping journey.


## Key Features

- **Dynamic Theme Customization**: Fetches and applies brand themes dynamically, refreshing every minute to emulate white labeling.
- **Local Caching**: Cart and order data, along with the state, are cached locally in localStorage, enabling users to pick up where they left off in the event of a page reload.
- **Fresh Cart Data**: Users can force a refresh of their cart items to receive new product selections from the API.
- **Inventory Management**: The maximum quantity of any single item in the cart is limited to 10 units to ensure product availability.
- **Promo Code Simulation**: A default "GROWW" promo code is included, which applies a 25% discount up to $10 on applicable orders.
- **Payment Status Simulation**: Payment status is randomly generated to simulate successes, failures, or a pending status to emulate a real-world counterpart.
- **Retry on Failed Payments**: Gives users the ability to retry payments in case of a failed transaction.
- **Redirection Logic**: Users navigating directly to the payment page without any cart items or after an order has been processed will be redirected to the appropriate stage. Similar appicable logic is used in diffrent section of apps.
- **Notifications**: Integrated notifications provide immediate, user-friendly feedback to enhance the overall user experience during the checkout process.

## Screenshots

### Dynamic Brand Themes:

<img src="https://github.com/RajVarsani/checkout-demo/assets/74860406/b8f209ab-4aa1-44ef-81a0-c9c8e7ba43a9" width="550">
<img src="https://github.com/RajVarsani/checkout-demo/assets/74860406/dbf62ef8-2e6e-4a3c-bfa0-c6fe473241c0" width="550">
<img src="https://github.com/RajVarsani/checkout-demo/assets/74860406/0fca6ca7-3ad5-42c7-ade2-8534fb873311" width="550">

### Responsive Design:

<p float="left">

  <img src="https://github.com/RajVarsani/checkout-demo/assets/74860406/b8eade66-79b7-4bcd-bf9a-564af2227876" height="400">
  <img src="https://github.com/RajVarsani/checkout-demo/assets/74860406/a20d695c-74ec-47b3-b408-b0d05b65b280" height="400">
  <img src="https://github.com/RajVarsani/checkout-demo/assets/74860406/99fc5eaf-389e-4f09-8f16-8fa8f85216d3" height="400">
  <img src="https://github.com/RajVarsani/checkout-demo/assets/74860406/74e119b5-3754-4028-9558-e1fab3e360f0" height="400">
</p>


## Technologies Used

- **Framework**: Next.js (React.js)
- **State Management**: Zustand
- **Styling**: Mentine for UI Components along with Module CSS
- **Caching**: LocalStorage for persistence and Next caching of request for brand caching

## How to Run

To run this project, you'll need to have Node.js installed on your system.

```sh
# Install dependencies
npm install

# Run the project
npm run dev
```

Open `http://localhost:3000` in your web browser to view the application.

## Challenges Faced

During development, challenges included ensuring a responsive layout on various devices and integrating the dynamic theme customization feature. Implementing error handling and form validations required thoughtful consideration to maintain a smooth user experience.

Feel free to explore the demo or review the source code, and reach out with any questions!

## Demo

Live demo available [here](https://groww-checkout.vercel.app/)
