class Product {
    constructor(id, title, description, price, media ) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.media = media;
    }

    getId() {
        return `${this.id}`
    }

    getTitle() { 
        return `${this.title}`
    }

    getPrice() {
        return `${this.pricing}`
    }
}

module.exports =  Product


