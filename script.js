// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to necessary DOM elements
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');

    // Initialize products array by retrieving it from local storage, or use an empty array if not present
    let products = JSON.parse(localStorage.getItem('products')) || [];

    /**
     * Function to display products in the product list
     * @param {string} filter - Optional filter string to search for products
     */
    function displayProducts(filter = '') {
        // Clear the current product list display
        productList.innerHTML = '';

        // Filter products based on the provided filter string (case-insensitive)
        products
            .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach((product, index) => {
                // Create a list item for each product
                const li = document.createElement('li');
                li.innerHTML = `${product.name} - ${product.quantity} 
                    <button onclick="removeProduct(${index})">Remove</button>`;
                // Append the list item to the product list
                productList.appendChild(li);
            });
    }

    // Event listener for the product form submission
    productForm.addEventListener('submit', (e) => {
        // Prevent default form submission behavior
        e.preventDefault();
        
        // Get the product name and quantity from the form inputs
        const productName = document.getElementById('productName').value.trim();
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        // Validate the input values
        if (productName === '' || productQuantity <= 0) {
            alert('Please enter a valid product name and quantity.'); // Show an alert if invalid
            return;
        }

        // Check if the product name is unique in the products array
        if (products.some(product => product.name === productName)) {
            alert('Product name must be unique.'); // Show an alert if the product already exists
            return;
        }

        // Create a new product object
        const product = {
            name: productName,
            quantity: productQuantity
        };

        // Add the new product to the products array
        products.push(product);
        // Save the updated products array back to local storage
        localStorage.setItem('products', JSON.stringify(products));
        // Refresh the displayed product list
        displayProducts();
        // Reset the form inputs
        productForm.reset();
    });

    // Function to remove a product by its index
    window.removeProduct = function(index) {
        // Remove the product from the array
        products.splice(index, 1);
        // Update local storage with the new products array
        localStorage.setItem('products', JSON.stringify(products));
        // Refresh the displayed product list
        displayProducts();
    };

    // Event listener for the search button click
    searchButton.addEventListener('click', () => {
        // Refresh the product list with the search filter
        displayProducts(searchInput.value);
    });

    // Initial call to display products on page load
    displayProducts();
});

// Wait for the DOM content to be fully loaded before executing the chart initialization
document.addEventListener('DOMContentLoaded', function () {
    // Inventory data for the bar chart
    const inventoryData = {
        // Array of labels for the x-axis
        labels: [
            'Custom Website Design', 'E-commerce Development', 'SEO Optimization', 
            'Content Management Systems', 'Responsive Web Design', 'Mobile App Development', 
            'Website Maintenance', 'UX/UI Design', 'Web Hosting', 'Domain Registration', 
            'SSL Certificate Implementation', 'API Integration', 'Database Development', 
            'Custom Web Application Development', 'Website Redesign', 'Landing Page Design', 
            'Graphic Design Services', 'Logo Design', 'Social Media Integration', 
            'Email Marketing', 'Blog Development', 'Website Analytics', 'Website Speed Optimization', 
            'Security Audits', 'Backup and Restore Services', 'User Training and Support', 
            'Multilingual Website Development', 'Accessibility Compliance', 'Website Copywriting', 
            'Custom Forms Development', 'Online Booking Systems', 'Membership Website Development', 
            'Payment Gateway Integration', 'Forum/Community Site Development', 'Newsletter Setup', 
            'Photo and Video Gallery Creation', 'Virtual Tours and Interactive Maps', 
            'Online Survey and Feedback Tools', 'Event Calendar Integration', 'Chatbot Integration', 
            'Customer Portal Development', 'Affiliate Marketing Setup', 'Product Catalog Development', 
            'Order Management System', 'Inventory Management System', 'Project Management Tools', 
            'CRM Integration', 'Custom Plugin Development', 'Custom Theme Development', 
            'Online Course and LMS Development', 'Webinar Setup', 'FAQ Page Development', 
            'Knowledge Base Development', 'Directory Website Development', 
            'Real Estate Website Development', 'Job Board Website Development', 
            'Classified Ads Website Development', 'Travel Booking Website Development', 
            'Restaurant Website Development', 'Portfolio Website Development', 
            'Personal Blog Setup', 'Business Blog Setup', 'Government Website Development', 
            'NGO/Non-Profit Website Development', 'Education Website Development', 
            'Health and Fitness Website Development', 'News and Magazine Website Development', 
            'Entertainment Website Development', 'Fashion Website Development', 
            'Automotive Website Development', 'Music and Band Website Development', 
            'Photography Website Development', 'Wedding Website Development', 
            'Event Planning Website Development', 'Hotel and Hospitality Website Development', 
            'Consulting Website Development', 'Legal Services Website Development', 
            'Financial Services Website Development', 'Insurance Website Development', 
            'Real Estate IDX Integration', 'Auction Website Development', 
            'Crowdfunding Platform Development', 'SaaS Product Development', 
            'Marketplace Development', 'Multi-Vendor E-commerce Development', 
            'Coupon Website Development', 'Price Comparison Website Development', 
            'Job Application Portal Development', 'Freelance Marketplace Development', 
            'Donation Platform Development', 'Subscription Box Website Development', 
            'Online Magazine Development', 'Custom Dashboard Development', 
            'Interactive Infographic Creation', 'Podcast Website Development', 
            'Event Ticketing Website Development', 'Membership Subscription Website', 
            'Multi-Language Website Development'
        ],
        // Dataset for the chart containing quantities for each label
        datasets: [{
            label: 'Quantities',
            data: [
                50, 30, 40, 25, 60, 20, 35, 45, 55, 50, 50, 25, 30, 15, 40, 45, 50, 40, 30, 25, 20, 
                35, 40, 30, 25, 20, 15, 10, 25, 30, 15, 10, 25, 10, 20, 15, 10, 20, 15, 25, 20, 
                15, 10, 10, 20, 25, 10, 15, 25, 20, 15, 10, 10, 10, 5, 15, 25, 30, 20, 10, 15, 
                20, 10, 5, 10, 15, 10, 5, 10, 15, 10, 5, 20, 10, 15, 10, 5, 10, 5, 10, 5, 
                5, 10, 5, 10, 5, 10, 5, 10, 15, 20, 10, 5, 10, 5
            ],
            // Background color for the bars
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            // Border color for the bars
            borderColor: 'rgba(75, 192, 192, 1)',
            // Border width for the bars
            borderWidth: 1
        }]
    };

    // Configuration for the bar chart
    const config = {
        type: 'bar', // Type of chart
        data: inventoryData, // Data for the chart
        options: {
            // Configuration for the scales
            scales: {
                x: {
                    beginAtZero: true, // Start y-axis at zero
                    ticks: {
                        autoSkip: false, // Do not skip labels automatically
                        maxRotation: 90, // Maximum rotation for x-axis labels
                        minRotation: 60 // Minimum rotation for x-axis labels
                    }
                },
                y: {
                    beginAtZero: true // Start y-axis at zero
                }
            },
            // Responsive settings and plugin options
            responsive: true,
            plugins: {
                legend: {
                    position: 'top', // Position of the legend
                },
                tooltip: {
                    callbacks: {
                        // Custom label for tooltips
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y; // Append y-value to label
                            }
                            return label; // Return the tooltip label
                        }
                    }
                }
            }
        }
    };

    // Render the chart by getting the 2D context of the canvas
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    new Chart(ctx, config); // Create a new Chart instance
});

// Data for the pie chart
const data = {
    labels: [
        'Custom Website Design', 'E-commerce Development', 'SEO Optimization', 
        'Content Management Systems', 'Responsive Web Design', 'Mobile App Development', 
        'Website Maintenance', 'UX/UI Design', 'Web Hosting', 'Domain Registration', 
        'SSL Certificate Implementation', 'API Integration', 'Database Development', 
        'Custom Web Application Development', 'Website Redesign', 'Landing Page Design', 
        'Graphic Design Services', 'Logo Design', 'Social Media Integration', 
        'Email Marketing', 'Blog Development', 'Website Analytics', 'Website Speed Optimization', 
        'Security Audits', 'Backup and Restore Services', 'User Training and Support', 
        'Multilingual Website Development', 'Accessibility Compliance', 'Website Copywriting', 
        'Custom Forms Development', 'Online Booking Systems', 'Membership Website Development', 
        'Payment Gateway Integration', 'Forum/Community Site Development', 'Newsletter Setup', 
        'Photo and Video Gallery Creation', 'Virtual Tours and Interactive Maps', 
        'Online Survey and Feedback Tools', 'Event Calendar Integration', 'Chatbot Integration', 
        'Customer Portal Development', 'Affiliate Marketing Setup', 'Product Catalog Development', 
        'Order Management System', 'Inventory Management System', 'Project Management Tools', 
        'CRM Integration', 'Custom Plugin Development', 'Custom Theme Development', 
        'Online Course and LMS Development', 'Webinar Setup', 'FAQ Page Development', 
        'Knowledge Base Development', 'Directory Website Development', 
        'Real Estate Website Development', 'Job Board Website Development', 
        'Classified Ads Website Development', 'Travel Booking Website Development', 
        'Restaurant Website Development', 'Portfolio Website Development', 
        'Personal Blog Setup', 'Business Blog Setup', 'Government Website Development', 
        'NGO/Non-Profit Website Development', 'Education Website Development', 
        'Health and Fitness Website Development', 'News and Magazine Website Development', 
        'Entertainment Website Development', 'Fashion Website Development', 
        'Automotive Website Development', 'Music and Band Website Development', 
        'Photography Website Development', 'Wedding Website Development', 
        'Event Planning Website Development', 'Hotel and Hospitality Website Development', 
        'Consulting Website Development', 'Legal Services Website Development', 
        'Financial Services Website Development', 'Insurance Website Development', 
        'Real Estate IDX Integration', 'Auction Website Development', 
        'Crowdfunding Platform Development', 'SaaS Product Development', 
        'Marketplace Development', 'Multi-Vendor E-commerce Development', 
        'Coupon Website Development', 'Price Comparison Website Development', 
        'Job Application Portal Development', 'Freelance Marketplace Development', 
        'Donation Platform Development', 'Subscription Box Website Development', 
        'Online Magazine Development', 'Custom Dashboard Development', 
        'Interactive Infographic Creation', 'Podcast Website Development', 
        'Event Ticketing Website Development', 'Membership Subscription Website', 
        'Multi-Language Website Development'
    ],
    datasets: [{
        label: 'Service Quantities',
        data: [
            50, 30, 40, 25, 60, 20, 35, 45, 55, 50, 50, 25, 30, 15, 40, 45, 
            50, 40, 30, 25, 20, 35, 40, 30, 25, 20, 15, 10, 25, 30, 15, 
            10, 25, 30, 15, 20, 10, 5, 15, 25, 30, 15, 10, 5, 10, 5, 
            10, 10, 5, 10, 5, 10, 15, 10, 10, 10, 10, 5, 15, 30, 20, 
            10, 15, 10, 5, 15, 10, 10, 5, 10, 5, 10, 5, 10, 15, 10, 
            5, 10, 15, 10, 10, 20, 5
        ],
        // Background colors for the pie chart segments
        backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#FF5722', '#795548', '#607D8B', '#9E9E9E', '#FFC107', 
            '#03A9F4', '#8BC34A', '#FFEB3B', '#FF9800', '#9C27B0', '#3F51B5', 
            '#4CAF50', '#FF5722', '#FFC107', '#8BC34A', '#FF9800', '#03A9F4', 
            '#FFEB3B', '#9E9E9E', '#795548', '#607D8B', '#3F51B5', '#9C27B0', 
            '#FF5722', '#4CAF50', '#8BC34A', '#FF9800', '#03A9F4', '#FFC107', 
            '#FFEB3B', '#FF9800', '#FF5722', '#FFEB3B', '#9E9E9E', '#3F51B5', 
            '#8BC34A', '#4CAF50', '#9C27B0', '#FF9800', '#03A9F4', '#FFEB3B', 
            '#FF9800', '#FF5722', '#FFEB3B', '#FF9800', '#4CAF50', '#9E9E9E', 
            '#FFC107', '#3F51B5', '#8BC34A', '#FF9800', '#FFEB3B', '#9C27B0', 
            '#4CAF50', '#FF9800', '#FFEB3B', '#FF5722'
        ],
        hoverOffset: 4 // Offset for hover effect
    }]
};

// Create the pie chart
const ctx = document.getElementById('myPieChart').getContext('2d'); // Get the 2D context of the canvas for the pie chart
const myPieChart = new Chart(ctx, { // Create a new Chart instance for the pie chart
    type: 'pie', // Type of chart
    data: data, // Data for the chart
    options: {
        responsive: true, // Make the chart responsive
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
            tooltip: {
                callbacks: {
                    // Custom label for tooltips in the pie chart
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw; // Show label and raw value
                    }
                }
            }
        }
    }
});
