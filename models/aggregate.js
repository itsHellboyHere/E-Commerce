import {
  ObjectId
} from 'mongodb';

const agg=[
  {
    '$match': {
      'product': new ObjectId('65fe67b311bb139ee7208afe')
    }
  }, {
    '$group': {
      '_id': null, 
      'averageRating': {
        '$avg': '$rating'
      }, 
      'numOfReviews': {
        '$sum': 1
      }
    }
  }
]