<template>
  <div id="app">
    <indicator-step-component :indicators="indicators"></indicator-step-component>
    <div class="jakmall__form--container">
      <div class="jakmall__form--container-back">
        <button type="button" @click="backStep(activeStep)">
          <span class="fa fa-arrow-left"></span>
          <span>Back to {{ changeTextBack }}</span>
        </button>
      </div>
      <div class="jakmall__form--container-content">
          <div class="jakmall__form--container-content-1">
            <h1 :class="{'hide':activeStep === 3}">{{ changeTitleContent }}</h1>
            <div class="jakmall__form--container-checkbox" v-show="activeStep === 1">
              <input
                id="checkboxInput" 
                type="checkbox" 
                v-model="tickAsDropshipper" 
                @change="checkedAsDropshipper()"
              />
              <label for="checkboxInput"></label>
              <span>Send as dropshipper</span>
            </div>
            <delivery-component 
              v-show="activeStep === 1" 
              @updateFormDataDelivery="handleUpdateFormDataDelivery"
            >
            </delivery-component>
            <payment-component 
              v-show="activeStep === 2"
              :shipments="shipments"
              :payments="payments"
            >
            </payment-component>
            <finish-component v-show="activeStep === 3"></finish-component>
          </div>
          <div class="jakmall__form--container-content-2">
            <order-summary-component></order-summary-component>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import IndicatorStepComponent from './components/IndicatorStepComponent.vue';
import DeliveryComponent from './components/DeliveryComponent.vue';
import PaymentComponent from './components/PaymentComponent.vue';
import FinishComponent from './components/FinishComponent.vue';
import OrderSummaryComponent from './components/OrderSummaryComponent.vue';


export default {
  components: {
    'indicator-step-component': IndicatorStepComponent,
    'delivery-component': DeliveryComponent,
    'payment-component': PaymentComponent,
    'finish-component': FinishComponent,
    'order-summary-component': OrderSummaryComponent
  },
  name: 'app',
  data () {
    return {
      textBack: '',
      textTitle: '',
      constDropshippingFee: 5900,
      indicators: [
        {key:'1', step:'Delivery'},
        {key:'2', step:'Payment'},
        {key:'3', step:'Finish'}
      ],
      shipments: [{key:'1', service:'GO-SEND'}, {key:'2', service:'JNE'}, {key:'3', service:'Personal Courier'}],
      payments: [{key:'1', service:'e-Wallet'}, {key:'2', service:'Bank Transfer'}, {key:'3', service:'Virtual Account'}]
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
    tickAsDropshipper: {
      get() {
        return this.$store.getters.getTickAsDropshipper;
      },
      set(value) {
        this.$store.dispatch('updateTickAsDropshipper', value);
      },
    },
    changeTextBack() {
      switch (this.activeStep) {
        case 1 :
          return 'cart';
        case 2 :
          return 'delivery';
        default :
          return true;
      }
    },
    changeTitleContent() {
      switch (this.activeStep) {
        case 1 :
          return 'Delivery details';
        case 2 :
          return 'Shipment';
        default :
          return '';
      }      
    }
  },
  methods: {
    checkedAsDropshipper() {
      if(this.tickAsDropshipper) {
        this.$store.dispatch('updateTickAsDropshipper', this.tickAsDropshipper);
        this.$store.dispatch('updateDropshippingFee', this.constDropshippingFee);        
      } else {
        this.resetFormData();
        this.$store.dispatch('updateTickAsDropshipper', false);
        this.$store.dispatch('updateDropshippingFee', 0);
      }
    },
    handleUpdateFormDataDelivery(updatedData) {
      this.$store.dispatch('updateFormDataDelivery', updatedData);
    },
    resetFormData() {
      this.$store.dispatch('updateFormDataDelivery', {
        email: '',
        phone: null,
        address: '',
        dropshipper_name: '',
        dropshipper_phone: null
      });
    },
    backStep(step) {
      if( step !== 1 ) {
        this.$store.dispatch('updateActiveStep', this.activeStep - 1);
      }
    }
  }
}
</script>

<style lang="stylus">
  @import './style/main.styl'
</style>