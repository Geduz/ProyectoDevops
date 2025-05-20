document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabName}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Sample data for memberships
    const memberships = [
        { id: 1, name: "Juan Pérez", plan: "Premium", startDate: "01/04/2023", endDate: "01/04/2024", status: "Activo" },
        { id: 2, name: "María López", plan: "Estándar", startDate: "15/03/2023", endDate: "15/03/2024", status: "Activo" },
        { id: 3, name: "Carlos Rodríguez", plan: "Básico", startDate: "10/02/2023", endDate: "10/02/2024", status: "Activo" },
        { id: 4, name: "Ana Martínez", plan: "Premium", startDate: "05/01/2023", endDate: "05/01/2024", status: "Activo" },
        { id: 5, name: "Roberto Sánchez", plan: "Estándar", startDate: "20/12/2022", endDate: "20/12/2023", status: "Inactivo" }
    ];

    // Sample data for products
    const products = [
        { id: 1, name: "Proteína Whey Premium", category: "Suplementos", price: 899, stock: 25 },
        { id: 2, name: "Pre-Entrenamiento Energético", category: "Suplementos", price: 649, stock: 18 },
        { id: 3, name: "BCAA Recovery", category: "Suplementos", price: 499, stock: 30 },
        { id: 4, name: "Guantes de Entrenamiento", category: "Accesorios", price: 349, stock: 15 },
        { id: 5, name: "Shaker Premium", category: "Accesorios", price: 199, stock: 40 }
    ];

    // Sample data for sales
    const recentSales = [
        { id: 1, customer: "Juan Pérez", product: "Proteína Whey Premium", date: "15/05/2023", amount: 899 },
        { id: 2, customer: "María López", product: "Guantes de Entrenamiento", date: "14/05/2023", amount: 349 },
        { id: 3, customer: "Carlos Rodríguez", product: "Pre-Entrenamiento Energético", date: "13/05/2023", amount: 649 },
        { id: 4, customer: "Ana Martínez", product: "Shaker Premium", date: "12/05/2023", amount: 199 },
        { id: 5, customer: "Roberto Sánchez", product: "BCAA Recovery", date: "11/05/2023", amount: 499 }
    ];

    // Populate memberships table
    const membershipsTableBody = document.getElementById('memberships-table-body');
    if (membershipsTableBody) {
        memberships.forEach(membership => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${membership.id}</td>
                <td>${membership.name}</td>
                <td>${membership.plan}</td>
                <td>${membership.startDate}</td>
                <td>${membership.endDate}</td>
                <td><span class="status-badge ${membership.status.toLowerCase()}">${membership.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-id="${membership.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${membership.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            membershipsTableBody.appendChild(row);
        });
    }

    // Populate products table
    const productsTableBody = document.getElementById('products-table-body');
    if (productsTableBody) {
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-id="${product.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
    }

    // Populate sales table
    const salesTableBody = document.getElementById('sales-table-body');
    if (salesTableBody) {
        recentSales.forEach(sale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.customer}</td>
                <td>${sale.product}</td>
                <td>${sale.date}</td>
                <td class="text-right">$${sale.amount}</td>
            `;
            salesTableBody.appendChild(row);
        });
    }

    // Add event listeners to action buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            alert(`Editar elemento con ID: ${id}`);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm(`¿Estás seguro de que deseas eliminar el elemento con ID: ${id}?`)) {
                alert(`Elemento con ID: ${id} eliminado`);
                // In a real application, you would remove the item from the database
                // and then update the UI
            }
        });
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableBody = this.closest('.tab-content').querySelector('tbody');
            const rows = tableBody.querySelectorAll('tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
});