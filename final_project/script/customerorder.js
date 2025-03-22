document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const orderForm = document.getElementById('orderForm');
            const quantityInputs = document.querySelectorAll('.quantity-input');
            const increaseBtns = document.querySelectorAll('.increase-btn');
            const decreaseBtns = document.querySelectorAll('.decrease-btn');
            const orderItemsContainer = document.getElementById('orderItems');
            const subtotalElement = document.getElementById('subtotal');
            const shippingElement = document.getElementById('shipping');
            const totalElement = document.getElementById('total');
            const successMessage = document.getElementById('successMessage');
            
            // Product data
            const products = [
                { id: 1, name: 'Ceramic Mug Set (4 pieces)', price: 85.00 },
                { id: 2, name: 'Decorative Vase', price: 120.00 },
                { id: 3, name: 'Serving Bowl', price: 95.00 }
            ];
            
            // Initialize order
            let order = {
                items: [],
                subtotal: 0,
                shipping: 0,
                total: 0
            };
            
            // Increase quantity
            increaseBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const input = this.parentElement.querySelector('.quantity-input');
                    input.value = parseInt(input.value) + 1;
                    updateOrderSummary();
                });
            });
            
            // Decrease quantity
            decreaseBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const input = this.parentElement.querySelector('.quantity-input');
                    if (parseInt(input.value) > 0) {
                        input.value = parseInt(input.value) - 1;
                        updateOrderSummary();
                    }
                });
            });
            
            // Update when input changes directly
            quantityInputs.forEach(input => {
                input.addEventListener('change', function() {
                    if (parseInt(this.value) < 0) {
                        this.value = 0;
                    }
                    updateOrderSummary();
                });
            });
            
            // Update order summary
            function updateOrderSummary() {
                order.items = [];
                order.subtotal = 0;
                
                quantityInputs.forEach(input => {
                    const productId = parseInt(input.getAttribute('data-product-id'));
                    const quantity = parseInt(input.value);
                    
                    if (quantity > 0) {
                        const product = products.find(p => p.id === productId);
                        const itemTotal = product.price * quantity;
                        
                        order.items.push({
                            id: productId,
                            name: product.name,
                            price: product.price,
                            quantity: quantity,
                            total: itemTotal
                        });
                        
                        order.subtotal += itemTotal;
                    }
                });
                
                // Calculate shipping (free for orders over $150)
                order.shipping = order.subtotal > 150 ? 0 : 15;
                order.total = order.subtotal + order.shipping;
                
                // Update summary display
                renderOrderSummary();
            }
            
            // Render order summary
            function renderOrderSummary() {
                // Clear previous items
                orderItemsContainer.innerHTML = '';
                
                // Add each item
                order.items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'summary-row';
                    itemElement.innerHTML = `
                        <div>${item.name} x ${item.quantity}</div>
                        <div>$${item.total.toFixed(2)}</div>
                    `;
                    orderItemsContainer.appendChild(itemElement);
                });
                
                // If no items, show message
                if (order.items.length === 0) {
                    const noItemsElement = document.createElement('div');
                    noItemsElement.className = 'summary-row';
                    noItemsElement.innerHTML = '<div>No items selected</div><div>$0.00</div>';
                    orderItemsContainer.appendChild(noItemsElement);
                }
                
                // Update totals
                subtotalElement.textContent = `$${order.subtotal.toFixed(2)}`;
                shippingElement.textContent = order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`;
                totalElement.textContent = `$${order.total.toFixed(2)}`;
            }
            
            // Form validation
            function validateForm() {
                let isValid = true;
                const requiredFields = [
                    { id: 'firstName', errorId: 'firstNameError' },
                    { id: 'lastName', errorId: 'lastNameError' },
                    { id: 'email', errorId: 'emailError' },
                    { id: 'phone', errorId: 'phoneError' },
                    { id: 'address', errorId: 'addressError' },
                    { id: 'city', errorId: 'cityError' },
                    { id: 'state', errorId: 'stateError' },
                    { id: 'zipCode', errorId: 'zipCodeError' }
                ];
                
                // Reset all error messages
                document.querySelectorAll('.error-message').forEach(error => {
                    error.style.display = 'none';
                });
                
                // Check required fields
                requiredFields.forEach(field => {
                    const input = document.getElementById(field.id);
                    if (!input.value.trim()) {
                        document.getElementById(field.errorId).style.display = 'block';
                        isValid = false;
                    }
                });
                
                // Email validation
                const emailInput = document.getElementById('email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput.value.trim() && !emailRegex.test(emailInput.value)) {
                    document.getElementById('emailError').style.display = 'block';
                    isValid = false;
                }
                
                // Check if any items are selected
                if (order.items.length === 0) {
                    alert('Please select at least one item to order.');
                    isValid = false;
                }
                
                return isValid;
            }
            
            // Form submission
            orderForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    // In a real application, you would send this data to a server
                    console.log('Order submitted:', {
                        customer: {
                            firstName: document.getElementById('firstName').value,
                            lastName: document.getElementById('lastName').value,
                            email: document.getElementById('email').value,
                            phone: document.getElementById('phone').value,
                            address: {
                                street: document.getElementById('address').value,
                                city: document.getElementById('city').value,
                                state: document.getElementById('state').value,
                                zipCode: document.getElementById('zipCode').value
                            }
                        },
                        order: order,
                        customRequest: document.getElementById('customRequest').value
                    });
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    
                    // Reset form
                    orderForm.reset();
                    quantityInputs.forEach(input => {
                        input.value = 0;
                    });
                    updateOrderSummary();
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            });
            
            // Initialize order summary
            updateOrderSummary();
        });
