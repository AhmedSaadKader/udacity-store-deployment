CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    product_id integer REFERENCES products(id) NOT NULL,
    order_id integer REFERENCES orders(id) NOT NULL
);
