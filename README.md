# Zenith Product API

Zenith Product API is a full-stack inventory management application built with Node.js, Express, MongoDB, and Mongoose. The application provides a RESTful API for managing product inventory along with a responsive dashboard for viewing, searching, filtering, creating, editing, and deleting products.

## Features

- Create new products
- View all products
- Update existing products
- Delete products
- Search products
- Filter products by category and availability
- Sort products by price
- Paginate product results
- Track product availability
- Display inventory statistics
- Calculate total catalog value
- Display in-stock and unavailable product counts
- Responsive inventory management interface
- MongoDB Atlas database integration
- Mongoose schema validation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- REST API

## Project Structure

```text
zenith-product-api/
├── config/
│   └── connection.js
├── controllers/
│   └── productController.js
├── models/
│   └── Product.js
├── public/
│   ├── images/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── routes/
│   └── productRoutes.js
├── src/
│   └── input.css
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Product Model

Products contain the following information:

- `name` - Product name
- `description` - Product description
- `price` - Product price
- `category` - Product category
- `inStock` - Product availability
- `tags` - Array of product tags
- `createdAt` - Date the product was created

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update an existing product |
| DELETE | `/api/products/:id` | Delete a product |

### Query Parameters

The products endpoint supports query parameters for filtering, sorting, and pagination.

Example:

```text
GET /api/products?category=Electronics&sort=price&page=1&limit=10
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd zenith-product-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

> The `.env` file is excluded from version control and should not be committed to GitHub.

## Running the Application

Start the development server:

```bash
npm run dev
```

Or start the application normally:

```bash
npm start
```

Open the application in your browser:

```text
http://localhost:3000
```

## Building Tailwind CSS

Compile the Tailwind CSS:

```bash
npm run build
```

The build command compiles:

```text
src/input.css → public/style.css
```

## Example Product

```json
{
  "name": "Aurora Mechanical Keyboard",
  "description": "Wireless mechanical keyboard with hot-swappable switches and RGB backlighting.",
  "price": 149.95,
  "category": "Electronics",
  "inStock": true,
  "tags": [
    "keyboard",
    "wireless",
    "mechanical",
    "gaming"
  ]
}
```

## Dashboard

The Zenith inventory dashboard dynamically displays:

- Total catalog value
- Total number of products
- Number of products in stock
- Number of unavailable products
- Catalog availability percentage

Dashboard statistics are recalculated from the current product inventory.

## Author

Priscilla Leonard

## Acknowledgments

Developed as part of the Per Scholas Software Engineering program.