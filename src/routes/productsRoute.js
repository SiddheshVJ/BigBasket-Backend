import express from "express"
import Product from "../models/Product"

let router = express.Router()

// get all products

router.get('/', async (req, res) => {
    let productId = req.query.id
    try {
        if (productId) {
            let products = await Product.findById(productId)
            res.status(200).send(products)
        } else {
            let products = await Product.find()
            res.status(200).send(products)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
})

// add product with unique name
router.post('/addproduct', async (req, res) => {
    let newProductData = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info
    }
    try {
        let product = await Product.findOne({ name: newProductData.name })
        if (product) {
            return res.status(401).json({
                msg: "Product is already Exists."
            })
        }
        // save to database

        product = new Product(newProductData)
        product = await product.save()

        res.status(200).json({
            result: "Product created",
            product: product
        })
    } catch (error) {
        res.send(500).json({
            error: error.message
        })
    }
})

// update existing products using id
router.put('/update/:id', async (req, res) => {
    let productId = req.params.id

    let updateProductData = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info
    }

    try {
        let product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                msg: "Product not found !!!"
            })
        }

        product = await Product.findByIdAndUpdate(productId, {
            $set: updateProductData
        }, { new: true })

        res.status(200).json({
            result: 'Product updated successfully !!!',
            product: product
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})

// Delete products using id
router.delete('/deleteproduct/:id', async (req, res) => {
    let productId = req.params.id

    try {
        let product = await Product.findById(productId)

        if (!product) {
            return res.status(401).json({
                msg: "Product doesn't exists"
            })
        }

        // delete from DB

        product = await Product.findByIdAndDelete(productId)
        res.status(200).json({
            result: 'Product deleted successfully',
            product: product
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
export default router