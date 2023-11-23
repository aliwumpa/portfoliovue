<template>
    <div class="jakmall__summary--container">
        <div class="jakmall__summary--content-1">
            <div class="jakmall__summary--title">
                <h2>Summary</h2>
                <p>10 items purchased</p>
            </div>
            <div class="jakmall__summary--estimation" v-show="activeStep === 2 || activeStep === 3 && formDataPayment.optionShipment !== ''">
                <p>Delivery estimation</p>
                <span><strong>{{ formDataPayment.optionShipment }} by {{ deliveryEstimation }}</strong></span>
            </div>
            <div class="jakmall__summary--payment" v-show="activeStep === 3 && formDataPayment.optionShipment !== ''">
                <p>Payment method</p>
                <p><strong>{{ formDataPayment.optionPayment }}</strong></p>
            </div>
        </div>
        <div class="jakmall__summary--content-2">
            <div>
                <span>Cost of goods</span>
                <span>{{ formattedNumberDecimal(costOfGoods) }}</span>
            </div>
            <div v-show="tickAsDropshipper">
                <span>Dropshipping Fee</span>
                <span>{{ formattedNumberDecimal(dropshippingFee) }}</span>
            </div>
            <div v-show="formDataPayment.optionShipment !== ''">
                <span><strong>{{ formDataPayment.optionShipment }} shipment</strong></span>
                <span>{{ formattedNumberDecimal(shipmentFee) }}</span>
            </div>
            <div class="jakmall__summary--total">
                <span>Total</span>
                <span>{{ formattedNumberDecimal(totalCostCalc()) }}</span>
            </div>
            <div class="jakmall__summary--button" v-show="activeStep === 1 || activeStep === 2">
                <button v-if="activeStep === 1" @click="nextStep(activeStep)">Continue to Payment</button>
                <button v-else @click="nextStep(activeStep)" v-show="formDataPayment.optionPayment !== ''">Pay with {{ formDataPayment.optionPayment }}</button>
            </div> 
        </div>
    </div>
</template>
<script>

import { mapState } from 'vuex';

export default {
    data () {
        return {
        }
    },
    beforeMount() {
        this.totalCostCalc();
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
            formDataDelivery: state => state.formDataDelivery,
            formDataPayment: state => state.formDataPayment,
            shipmentFee: state => state.shipmentFee,
            deliveryEstimation: state => state.deliveryEstimation,
            deliveryFormValid: state => state.deliveryFormValid,
            paymentFormValid: state => state.paymentFormValid
        }),
        costOfGoods() {
            return this.$store.getters.getCostOfGoods;
        },
        dropshippingFee() {
            return this.$store.getters.getDropshippingFee;
        },
        tickAsDropshipper() {
            return this.$store.getters.getTickAsDropshipper;
        }
    },
    watch: {
        dropshippingFee(newVal) {
            if(!newVal) {
                this.totalCostCalc();
            }
        },
        shipmentFee(newFee) {
            if(!newFee) {
                this.totalCostCalc();
            }
        }
    },
    methods: {
        formattedNumberDecimal(number) {
            return number.toLocaleString('en-US');
        },
        totalCostCalc() {
            let tempTotal = this.costOfGoods + this.dropshippingFee + this.shipmentFee;
            this.$store.dispatch('updateTotalCost', tempTotal);
            return this.$store.getters.getTotalCost;
        },
        nextStep(step) {
            switch (step) {
                case 1:
                    if(this.deliveryFormValid) {
                        this.$store.dispatch('updateActiveStep', this.activeStep + 1);
                        this.$store.dispatch('updateFormDataDelivery', this.formDataDelivery);
                    } else {
                        alert('Form is not valid !');
                    }
                    break;
                case 2:
                    if(this.paymentFormValid) {
                        this.$store.dispatch('updateActiveStep', this.activeStep + 1);
                    } else {
                        alert('Choose Shipment !');
                    }
            }
        }
    }   
}
</script>