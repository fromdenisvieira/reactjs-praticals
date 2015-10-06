var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

// Define initial data points
var _product = {}, _selected = null;


// Method to load product data from mock API
function loadProductData(data) {
	_product = data[0];
	_selected = data[0].variants[0];
}

// Method to set currently selected product variation
function setSelected(index) {
	_selected = product.variants[index];
}

var ProductStore = _.extend({},EventEmitter.prototype,{

	// Return product Data
	getProduct: function(){
		return _product;
	},
	
	// Emit Change Event
	emitChange: function(){
		this.emit('change');
	},
	
	// Add Change listener
	addChangeListener: function()	{
		this.on('change',callback);
	},
	
	// Remove Change Listener
	removeChangeListener: function(){
		this.removeListener('change',callback);
	}

});


// Register Callback with AppDispatcher
AppDispatcher.register(function(payload){
	var action = payload.action;
	var text;

	switch(action.actionType){

		// Respond to RECEIVE_DATA action
		case FluxCartConstants.RECEIVE_DATA:
			loadProductData(action.data);
			break;

		// Respond to SELECT_PRODUCT action
		case FluxCartConstants.SELECT_PRODUCT:
			setSelected(action.data);
			break;

		default:
			return true;
	}

	// If action was responded to, emit change event
	ProductStore.emitChange();
	
	return true;

});


module.exports = ProductStore;