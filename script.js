// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Select elements from the DOM
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    
    // Initialize products array from local storage or an empty array if none exist
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Function to display products in the list
    function displayProducts(filter = '') {
        productList.innerHTML = ''; // Clear current product list
        // Filter products based on search input and display each product
        products
            .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach((product, index) => {
                const li = document.createElement('li'); // Create new list item
                li.innerHTML = `${product.name} - ${product.quantity} 
                    <button onclick="removeProduct(${index})">Remove</button>`; // Include remove button
                productList.appendChild(li); // Append item to the list
            });
    }

    // Event listener for the product form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get and trim input values
        const productName = document.getElementById('productName').value.trim();
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        // Validation: Ensure name is not empty and quantity is positive
        if (productName === '' || productQuantity <= 0) {
            alert('Please enter a valid product name and quantity.');
            return; // Exit function if validation fails
        }

        // Check for duplicate product names
        if (products.some(product => product.name === productName)) {
            alert('Product name must be unique.');
            return; // Exit function if validation fails
        }

        // Create a product object
        const product = {
            name: productName,
            quantity: productQuantity
        };

        // Add product to the array and update local storage
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(); // Refresh product display
        productForm.reset(); // Reset the form fields
    });

    // Function to remove a product from the list and update local storage
    window.removeProduct = function(index) {
        products.splice(index, 1); // Remove product by index
        localStorage.setItem('products', JSON.stringify(products)); // Update local storage
        displayProducts(); // Refresh product display
    };

    // Event listener for the search button
    searchButton.addEventListener('click', () => {
        displayProducts(searchInput.value); // Filter products based on search input
    });

    // Initial call to display products on page load
    displayProducts();
});

// Wait for the DOM to fully load before running scripts for chart rendering
document.addEventListener('DOMContentLoaded', function () {
    // Inventory data for the bar chart
    const inventoryData = {
        labels: [ /* Array of labels for the chart */ ],
        datasets: [{
            label: 'Quantities',
            data: [ /* Array of quantities corresponding to the labels */ ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color of bars
            borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
            borderWidth: 1 // Border width of bars
        }]
    };
    
    // Configuration for the bar chart
    const config = {
        type: 'bar', // Type of chart
        data: inventoryData, // Data for the chart
        options: {
            scales: {
                x: {
                    beginAtZero: true, // Start x-axis at 0
                    ticks: {
                        autoSkip: false, // Show all ticks
                        maxRotation: 90, // Maximum rotation for labels
                        minRotation: 60 // Minimum rotation for labels
                    }
                },
                y: {
                    beginAtZero: true // Start y-axis at 0
                }
            },
            responsive: true, // Make the chart responsive
            plugins: {
                legend: {
                    position: 'top', // Position of the legend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || ''; // Get dataset label
                            if (label) {
                                label += ': '; // Add a colon if label exists
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y; // Add y value
                            }
                            return label; // Return label for tooltip
                        }
                    }
                }
            }
        }
    };

    // Render the bar chart
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    new Chart(ctx, config); // Create a new Chart instance
});

// Data for the pie chart
const data = {
    labels: [ /* Array of labels for the pie chart */ ],
    datasets: [{
        label: 'Service Quantities',
        data: [ /* Array of quantities corresponding to the labels */ ],
        backgroundColor: [ /* Array of background colors for each slice */ ],
        hoverOffset: 4 // Offset for hover effect
    }]
};

// Create the pie chart
const ctx = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctx, {
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
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw; // Custom tooltip label
                    }
                }
            }
        }
    }
});
