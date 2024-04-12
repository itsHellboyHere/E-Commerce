const mongoose = require('mongoose')

const ReviewScehma =  new mongoose.Schema({

    rating:{
        type : Number,
        min : 1,
        max : 5,
        required:[true, 'Please provide a Rating']
    },
    title :{
        type :String,
        trim:true,
        required :[true, "please add a title for the review"],
        maxlength : 100,
    },
    comment:{
        type: String,
        required:[true, "Please provide a Comment"]
    },
    user:{
        type : mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    product :{
        type: mongoose.Schema.ObjectId,
        ref:'Product',
        required :true,
    },

},{timestamps:true});

ReviewScehma.index({product:1,user:1}, {unique: true})

ReviewScehma.statics.calculateAverageRating = async function(productId){
    const result = await this.aggregate([
        {
            $match:{product:productId}
        },
        {
            $group :{
                _id: "$product",
                averageRating: {$avg:'$rating'},
                numOfReviews :{$sum:1},
            },
        },
    ]);
   
    try {
        await this.model( 'Product' ).findOneAndUpdate({_id:productId},{
            averageRating : Math.ceil(result[0]?.averageRating || 0),
            numOfReviews : result[0]?.numOfReviews || 0,
        })
    } catch (error) {
        console.log(error);
    }
}

ReviewScehma.post('save', async function() {
    await this.constructor.calculateAverageRating(this.product);
    
})

ReviewScehma.post('remove', async function() {
     await this.constructor.calculateAverageRating(this.product);
})
module.exports = mongoose.model('Review',ReviewScehma)