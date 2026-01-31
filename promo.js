const PROMO_BRAIN = {
    calculate(bag, paxi) {
        let items = Object.values(bag).reduce((a, b) => a + b, 0);
        let subtotal = items * 20;
        let freeItems = Math.floor(items / 3); // Buy 2 Get 1 Free
        let discount = freeItems * 20;
        return { subtotal, discount, paxi, finalTotal: (subtotal - discount) + paxi };
    },
    initiatePayment(total) {
        alert("Redirecting to PayFast for R" + total);
        // window.location.href = `https://www.payfast.co.za/...&amount=${total}`;
    }
};
