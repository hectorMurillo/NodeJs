const Product = require('../models/product');

function getProduct(req,res){
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion${err}` })
        if (!product) return res.status(404).send({ message: `El producto no existe` })
        /*
        EN ESTE CASO CUANDO LA CLAVE Y VALOR DE JSON SEAN LO MISMO SE SIMPLIFICA EN ES6 
        A LO DESPUES DE ESTO
        res.status(200).send({product:product})
        */
        res.status(200).send({ product });
    })

}

function getProducts(req,res){
      Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realiza la peticion ${err}` })
        if (!products) return res.status(404).send({ message: `No hay productos` })
        res.send(200, { products })
    })
}
function saveProduct(req,res){
    console.log('POST /API/PRODUCT')
    console.log(req.body)
    //creamos un objeto de mongoose con sus atributos
    let product = new Product()
    //la clave debe de tener la propiedad name
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    //GUARDAMOS
    product.save((err, productStored) => {
        if (err) res.status(500).sen({ mensaje: `Error al salvar la BD ${err}` });
        res.status(200).send({ product: productStored })
    })
}

function updateProduct(req,res){
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId,update,(err,productUpdate)=>{
        if(err) res.status(500).send({ message: `Existe un error ${err}` })
        res.status(200).send({product : productUpdate})
    })
}



function deleteProduct(req,res){
    let productId = req.params.productId;

    Product.findById(productId, (err) => {
        if (err) res.status(500).send({ message: `Existe un error ${err}` })
        Product.remove(err => {
            if (err) res.status(500).send({ message: `Existe un error ${err}` })
            res.status(200).send({ message: 'El producto ha sido eliminado' });
        })
    })
}

module.exports ={
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}