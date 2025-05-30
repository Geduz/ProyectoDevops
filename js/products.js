document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Proteína Whey Premium",
            description: "Proteína de suero de leche de alta calidad, 25g por porción",
            price: 899,
            image: "https://placehold.co/300x300",
            category: "supplements"
        },
        {
            id: 2,
            name: "Pre-Entrenamiento Energético",
            description: "Fórmula avanzada para maximizar tu rendimiento",
            price: 649,
            image: "https://placehold.co/300x300",
            category: "supplements"
        },
        {
            id: 3,
            name: "BCAA Recovery",
            description: "Aminoácidos esenciales para una mejor recuperación muscular",
            price: 499,
            image: "https://placehold.co/300x300",
            category: "supplements"
        },
        {
            id: 4,
            name: "Guantes de Entrenamiento",
            description: "Protección y agarre superior para tus entrenamientos",
            price: 349,
            image: "https://placehold.co/300x300",
            category: "accessories"
        },
        {
            id: 5,
            name: "Shaker Premium",
            description: "Botella mezcladora de 600ml con compartimentos",
            price: 199,
            image: "https://placehold.co/300x300",
            category: "accessories"
        },
        {
            id: 6,
            name: "Camiseta PowerFit",
            description: "Material transpirable y cómodo para tus entrenamientos",
            price: 299,
            image: "https://placehold.co/300x300",
            category: "clothing"
        }
    ];

    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.querySelector('.search-box input');

    // Display products
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productsContainer.innerHTML = '<p class="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price}</div>
                    <button class="btn btn-primary btn-full add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                    </button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    // Filter and sort products
    function filterAndSortProducts() {
        let filteredProducts = [...products];
        const categoryValue = categoryFilter.value;
        const sortValue = sortFilter.value;
        const searchValue = searchInput.value.toLowerCase();

        // Apply category filter
        if (categoryValue) {
            filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
        }

        // Apply search filter
        if (searchValue) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchValue) || 
                product.description.toLowerCase().includes(searchValue)
            );
        }

        // Apply sorting
        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                // 'featured' - no sorting needed
                break;
        }

        displayProducts(filteredProducts);
    }

    // Add to cart functionality
    function addToCart(productId) {
        // In a real application, this would add the product to a cart
        // For this demo, we'll just update the cart count
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
        
        alert('Producto agregado al carrito');
    }

    // Event listeners for filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterAndSortProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSortProducts);
    }

    // Initial display
    displayProducts(products);
});