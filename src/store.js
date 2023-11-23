import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
	createPersistedState({
		key: '1',
		paths: [
			'activeStep',
			'dropshippingFee',
			'totalCost',
			'formDataDelivery',
			'tick_as_dropshipper',
			'formDataPayment',
			'shipmentFee',
			'deliveryEstimation',
			'deliveryFormValid',
			'paymentFormValid'
		],
	}),
  ],
  state: {
	activeStep: 1,
	costOfGoods: 500000,
	dropshippingFee: 0,
	shipmentFee: 0,
	deliveryEstimation: '',
	totalCost: 0,
	tick_as_dropshipper: false,
	formDataDelivery: {
		email: '',
		phone: null,
		address: '',
		dropshipper_name: '',
		dropshipper_phone: null
	},
	formDataPayment: {
		ewallet_quota: 1500000,
		optionShipment: '',
		optionPayment: ''
	},
	deliveryFormValid: false,
	paymentFormValid: false
  },
  mutations: {
	setActiveStep(state, step) {
		state.activeStep = step;
	},
	setCostOfGoods(state, cost) {
		state.costOfGoods = cost;
	},
	setDropshippingFee(state, fee) {
		state.dropshippingFee = fee;
	},
	setShipmentFee(state, fee2) {
		state.shipmentFee = fee2;
	},
	setDeliveryEstimation(state, estimate) {
		state.deliveryEstimation = estimate;
	},
	setTotalCost(state, total) {
		state.totalCost = total;
	},
	setFormDataDelivery(state, formDataDelivery) {
		state.formDataDelivery = { ...state.formDataDelivery, ...formDataDelivery };
		localStorage.setItem('formDataDelivery', JSON.stringify(formDataDelivery));
	},
	setOptionShipment(state, optionShipment) {
		state.formDataPayment.optionShipment = optionShipment;
	},
	setOptionPayment(state, optionPayment) {
		state.formDataPayment.optionPayment = optionPayment;
	},
	setInitialFormDataPayment(state, formDataPayment) {
		state.formDataPayment = { ...state.formDataPayment, ...formDataPayment };
	},	
	setFormDataPayment(state, formDataPayment) {
		state.formDataPayment.ewallet_quota = formDataPayment.ewallet_quota;
		state.formDataPayment.optionShipment = formDataPayment.optionShipment;
		state.formDataPayment.optionPayment = formDataPayment.optionPayment;
	},
	setTickAsDropshipper(state, tick) {
		state.tick_as_dropshipper = tick;
	},
	setEwalletQuota(state, quota) {
		state.formDataPayment.ewallet_quota = quota;
	},	
	setDeliveryFormValid(state, deliveryForm) {
		state.deliveryFormValid = deliveryForm;
	},
	setPaymentFormValid(state, paymentForm) {
		state.paymentFormValid = paymentForm;
	}	
  },
  actions: {
	updateActiveStep({ commit }, step) {
		commit('setActiveStep', step);
	},
	updateCostOfGoods({ commit }, cost) {
		commit('setCostOfGoods', cost);
	},
	updateDropshippingFee({ commit }, fee) {
		commit('setDropshippingFee', fee);
	},
	updateShipmentFee({ commit }, fee2) {
		commit('setShipmentFee', fee2);
	},
	updateDeliveryEstimation({ commit }, estimate) {
		commit('setDeliveryEstimation', estimate);
	}, 
	updateTotalCost({ commit }, total) {
		commit('setTotalCost', total)
	},
	updateFormDataDelivery({ commit }, formDataDelivery) {
		commit('setFormDataDelivery', formDataDelivery);
	},
	updateFormDataPayment({ commit }, formDataPayment) {
		commit('setFormDataPayment', formDataPayment);
	},
	updateTickAsDropshipper({ commit }, tick) {
		commit('setTickAsDropshipper', tick);
	},
	updateEwalletQuota({ commit }, quota) {
		commit('setEwalletQuota', quota);
	},
	updateDeliveryFormValid({ commit }, deliveryForm) {
		commit('setDeliveryFormValid', deliveryForm);
	},
	updatePaymentFormValid({ commit }, paymentForm) {
		commit('setPaymentFormValid', paymentForm);
	}
  },
  getters: {
	getActiveStep: (state) => {
		return state.activeStep;
	},
	getCostOfGoods: (state) => {
		return state.costOfGoods;
	},
	getDropshippingFee: (state) => {
		return state.dropshippingFee;
	},
	getShipmentFee: (state) => {
		return state.shipmentFee;
	},
	getDeliveryEstimation: (state) => {
		return state.deliveryEstimation;
	},
	getTotalCost: (state) => {
		return state.totalCost;
	}, 
	getFormDataDelivery: (state) => {
		return state.formDataDelivery;
	},
	getFormDataPayment: (state) => {
		return state.formDataPayment;
	},
	getTickAsDropshipper: (state) => {
		return state.tick_as_dropshipper;
	},
	getEwalletQuota: (state) => {
		return state.formDataPayment.ewallet_quota;
	},
	getDeliveryFormValid: (state) => {
		return state.deliveryFormValid;
	},
	getPaymentFormValid: (state) => {
		return state.paymentFormValid;
	}
  }
});

export default store;