<template>
    <div class="jakmall__finish--container">
        <h1>Thank you</h1>
        <div class="jakmall__finish--order-id">
            <span><strong>Order ID : {{ generateID() }}</strong></span>
        </div>
        <div class="jakmall__finish--notification">
            <p>Your order will be delivered {{ deliveryEstimation }} with {{ formDataPayment.optionShipment }}</p>
        </div>
        <div class="jakmall__finish--container-back">
            <button type="button" @click="backToBeginning(activeStep)">
                <span class="fa fa-arrow-left"></span>
                <span>Go to homepage</span>
            </button>
        </div>
    </div>
</template>
<script>

import { mapState } from 'vuex';

export default {
    data () {
        return {
            initialFormDataDelivery: {
                email: '',
                phone: null,
                address: '',
                dropshipper_name: '',
                dropshipper_phone: null
            },
            initialFormDataPayment: {
                ewallet_quota: 1500000,
                optionShipment: '',
                optionPayment: ''
            },
            initialDropshippingFee: 0,
            initialShipmentFee: 0,
            initialDeliveryEstimation: '',
            initialTotalCost: 0,
            initialDeliveryFormValid: false,
            initialPaymentFormValid: false,
            initialTick_as_dropshipper: false
        }
    },
    computed: {
        activeStep: {
            get() {
                return this.$store.getters.getActiveStep;
            },
            set(value) {
                this.$store.dispatch('updateActiveStep', value);
            }
        },
        ...mapState({
            formDataPayment: state => state.formDataPayment,
            deliveryEstimation: state => state.deliveryEstimation
        })
    },
    methods: {
        generateID() {
            const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
            let result = '';

            for (let i = 0; i < 5; i++) {
                const charRandom = Math.floor(Math.random() * chars.length);
                result += chars.charAt(charRandom);
            }

            return result;
        },

        backToBeginning(step) {
            if(step === 3) {
                this.$store.commit('setFormDataDelivery', this.initialFormDataDelivery);
                this.$store.commit('setDeliveryFormValid', this.initialDeliveryFormValid);
                this.$store.commit('setPaymentFormValid', this.initialPaymentFormValid);
                this.$store.commit('setTickAsDropshipper', this.initialTick_as_dropshipper);
                this.$store.commit('setInitialFormDataPayment', this.initialFormDataPayment);
                this.$store.commit('setDropshippingFee', this.initialDropshippingFee);
                this.$store.commit('setTotalCost', this.initialTotalCost);
                this.$store.commit('setDeliveryEstimation', this.initialDeliveryEstimation);
                this.$store.commit('setShipmentFee', this.initialShipmentFee);
                
                localStorage.removeItem('1');
                localStorage.removeItem('formDataDelivery');

                this.$store.dispatch('updateActiveStep', 1);
            }
        }
    }
}
</script>