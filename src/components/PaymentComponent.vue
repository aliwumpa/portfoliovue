<template>
    <div class="jakmall__transaction--outer">
        <div class="jakmall__transaction-shipment--container">
            <div 
                v-for="(shipment, index) in shipments"
                :key="shipment.key"
                :class="{ 'jakmall__transaction-shipment--active' : valueShipment === shipment.service }"
                @click="
                    setSelectedShipment(shipment.service); 
                    setSelectedShipmentFee(index); 
                    setSelectedShipmentEstimation(shipment.service); 
                    validateFieldShipment();"
            >
                <p>{{ shipment.service }}</p>
                <p>{{ formattedNumberDecimal(fees[index]) }}</p>
            </div>
        </div>
        <h1>Payment</h1>
        <div class="jakmall__transaction-payment--container">        
            <div 
                v-for="(payment, index) in payments"
                :key="payment.key"
                :class="{ 'jakmall__transaction-payment--active' : valuePayment === payment.service }"
                @click="setSelectedPayment(payment.service); validateFieldShipment()"
            >
                <p>{{ payment.service }}</p>
                <p v-if="index === 0">{{ formattedNumberDecimal(formDataPayment.ewallet_quota) }} left</p>
            </div>     
        </div>
    </div>

</template>
<script>
export default {
    mounted() {
        const storedData = localStorage.getItem('1');

        if (storedData) {
            const parsedData = JSON.parse(storedData);

            if (parsedData.formDataPayment) {
                const { optionPayment, optionShipment } = parsedData.formDataPayment;
                this.checkAndAddClass('jakmall__transaction-payment--container', 'jakmall__transaction-shipment', optionPayment);
                this.checkAndAddClass('jakmall__transaction-shipment--container', 'jakmall__transaction-payment', optionShipment);
            }
        }
    },
    props: {
        shipments: {
            type: Array,
            default: () => [],
        },
        payments: {
            type: Array,
            default: () => [],
        }    
    },
    data () {
        return {
            fees: [15000, 9000, 29000],
            valueShipment: '',
            valueEstimation: '',
            valuePayment: '',
            valueShipmentFee: 0
        }
    },
    computed: {
        formDataPayment() {
            return this.$store.getters.getFormDataPayment;
        },
    },
    methods: {
        checkAndAddClass(containerClassName, activeClass, value) {
            const elements = document.querySelectorAll(`.${containerClassName} div`);

            elements.forEach((element) => {
                const divContent = element.querySelector('p:first-child').textContent;
                if (divContent === value) {
                    element.classList.add(`${activeClass}--active`);
                }
            });
        },
        formattedNumberDecimal(number) {
            return number.toLocaleString('en-US');
        },
        validateFieldShipment() {
            if(this.valueShipment !== '' && this.valuePayment !== '') {
                this.$store.dispatch('updatePaymentFormValid', true);
            }
        },
        setSelectedShipment(shipment) {
            this.valueShipment = shipment;
            this.$store.commit('setOptionShipment', shipment);
        },
        setSelectedPayment(payment) {
            this.valuePayment = payment;
            this.$store.commit('setOptionPayment', payment);
        },
        setSelectedShipmentFee(i) {
            this.valueShipmentFee = this.fees[i];
            this.$store.dispatch('updateShipmentFee', this.valueShipmentFee);
        },
        setSelectedShipmentEstimation(shipment) {
            switch (shipment) {
                case 'GO-SEND' :
                    this.valueEstimation = 'today';
                    break
                case 'JNE' :
                    this.valueEstimation = '2 days';
                    break
                case 'Personal Courier' :
                    this.valueEstimation = '1 day';
                    break
            }
            
            this.$store.dispatch('updateDeliveryEstimation', this.valueEstimation);
        }
    }
}
</script>