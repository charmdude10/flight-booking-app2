// import { PrismaClient } from "@prisma/client";
// // import Flutterwave from "flutterwave-node-v3";

// const prisma = new PrismaClient();
// const flw = new Flutterwave(
//   process.env.FLUTTERWAVE_PUBLIC_KEY,
//   process.env.FLUTTERWAVE_SECRET_KEY
// );

// // Initialize Payment
// export const initializePayment = async (req, res) => {
//   const { amount, email, bookingId } = req.body;

//   try {
//     // Create a payment payload
//     const payload = {
//       tx_ref: `booking-${bookingId}-${Date.now()}`, // Unique transaction reference
//       amount: amount,
//       currency: "NGN", // Change to your preferred currency
//       payment_options: "card, banktransfer, ussd",
//       redirect_url: `${process.env.CLIENT_URL}/payment-success`, // Redirect after payment
//       meta: {
//         bookingId: bookingId,
//       },
//       customer: {
//         email: email,
//       },
//       customizations: {
//         title: "Flight Booking Payment",
//         description: "Payment for flight booking",
//         logo: "https://github.com/charmdude10/flight-booking-app1/blob/main/public/img/flight1.png",
//       },
//     };

//     // Initialize payment with Flutterwave
//     const response = await flw.Payment.initialize(payload);

//     if (response.status === "success") {
//       res.status(200).json({
//         success: true,
//         message: "Payment initialized successfully",
//         paymentLink: response.data.link,
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "Failed to initialize payment",
//       });
//     }
//   } catch (error) {
//     console.error("Error initializing payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while initializing payment",
//     });
//   }
// };

// // Verify Payment
// export const verifyPayment = async (req, res) => {
//   const { transaction_id } = req.params;

//   try {
//     // Verify payment with Flutterwave
//     const response = await flw.Transaction.verify({ id: transaction_id });

//     if (
//       response.data.status === "successful" &&
//       response.data.amount === response.data.charged_amount
//     ) {
//       // Update booking status to "PAID"
//       const updatedBooking = await prisma.booking.update({
//         where: { id: response.data.meta.bookingId },
//         data: { status: "PAID" },
//       });

//       res.status(200).json({
//         success: true,
//         message: "Payment verified successfully",
//         booking: updatedBooking,
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while verifying payment",
//     });
//   }
// };
