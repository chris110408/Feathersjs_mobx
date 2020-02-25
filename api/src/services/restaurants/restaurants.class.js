const { Service } = require('feathers-mongoose');
const mongoose = require('mongoose');
const _ = require('lodash')
const rest = require('../../models/restaurants.model')
exports.Restaurants = class Restaurants extends Service {
  async find (params) {
    if(_.isEmpty(params.query)){
      return super.find(params)
    }else{
      const restaurants = mongoose.model('restaurants');
      const {name,address,star,type}=params.query
      const nameReg = new RegExp(_.isEmpty(name)?'':name, 'i')
      const addressReg = new RegExp(_.isEmpty(address)?'':address, 'i')
      const starMin =_.isEmpty(star)?1:star


      const result = _.isEmpty(type)?await restaurants.find({$and : [
          {name : {$regex : nameReg}},
          {address : {$regex : addressReg}},
          {star:{$gte : starMin}}
        ]
      }):await restaurants.find({$and : [
          {name : {$regex : nameReg}},
          {address : {$regex : addressReg}},
          {star:{$gte : starMin}},
          {type:{$eq : type}}
        ]
      })

      return {data:result}
    }

  }
};

