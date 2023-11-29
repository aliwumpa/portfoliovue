<template>
    <div class="jakmall__delivery--container">
        <div v-for="(value, key, index) in formDataDelivery" :key="key" class="jakmall__delivery--container-input">
            <label :class="{ 'success' : isInputValid(key) && formDataDelivery[key], 'error' : !isInputValid(key) && formDataDelivery[key], 
            'custom-label' : customLabelClass(key) }">
                {{ loopThroughPlaceholders(index) }}
            </label>
            <input
                v-model="formDataDelivery[key]"
                :class="{ 'success' : isInputValid(key) && formDataDelivery[key], 'error' : !isInputValid(key) && formDataDelivery[key]
                , 'custom-height' : customHeightClass(key) }"
                :type="customTypeInput(key)"
                :pattern="customPatternInput(key)"
                :disabled="!tickAsDropshipper"
                @input="validateField(key); updateCounter(key)"
            />
            <label :class="{ 'icon-success' : isInputValid(key) && formDataDelivery[key], 'icon-error' : !isInputValid(key) && formDataDelivery[key] }"></label>
            <span v-if="key === 'address' && formDataDelivery[key]" v-show="updateCounter(key)" class="counter--text">{{ counter }} Remaining</span>
            <span v-if="!isInputValid(key) && formDataDelivery[key]" class="error--message">{{ getErrorMessage(key) }}</span>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        const storedFormData = localStorage.getItem('formDataDelivery');

        if (storedFormData) {
            const formData = JSON.parse(storedFormData);
            this.formDataDelivery = formData;
        }
    },
    mounted() {
        this.customLabelClass();
        this.customHeightClass();
        this.customTypeInput();
        this.customPatternInput();
    },
    data () {
        return {
            formDataDelivery: {
                email: '',
                dropshipper_name: '',
                phone: null,
                dropshipper_phone: null,
                address: ''
            },
            placeholders: [
                'Email',
                'Dropshipper name',
                'Phone Number',
                'Dropshipper Phone Number',
                'Delivery Address'
            ],
            errorMessages: {
                email: '',
                phone: '',
                address: '',
                dropshipper_name: '',
                dropshipper_phone: '',
            },
            counter: 120,
            counterFlag: true,
            deliveryFormValid: false
        }
    },
    computed: {
        tickAsDropshipper() {
            return this.$store.getters.getTickAsDropshipper;
        }
    },
    watch: {
        tickAsDropshipper(newVal) {
            if (!newVal) {
                this.clearInputFields();
            }
        },
    },
    methods: {
        customLabelClass(key) {
            if(key === 'address') {
                return true;
            } else {
                return false;
            }
        },
        customHeightClass(key) {
            if(key === 'address') {
                return true;
            } else {
                return false;
            }
        },
        customTypeInput(key) {
            if(key === 'phone') {
                return "tel";
            } else {
                return false;
            }
        }, 
        customPatternInput(key) {
            if(key === 'phone') {
                return "[0-9]{10}";
            } else {
                return false;
            }
        }, 
        loopThroughPlaceholders(index) {
            return this.placeholders[index] || '';
        },
        validateField(key) {
            const inputValue = this.formDataDelivery[key];
            switch (key) {
                case 'email':
                    this.errorMessages[key] = this.validateEmail(inputValue) ? '' : 'Invalid email format';
                    break;
                case 'phone':
                    this.errorMessages[key] = this.validatePhone(inputValue) ? '' : 'Invalid phone format';
                    break;
                case 'dropshipper_phone':
                    this.errorMessages[key] = this.validatePhone(inputValue) ? '' : 'Invalid phone format';
                    break;
                case 'address':
                    this.errorMessages[key] = this.validateAddress(inputValue) ? '' : 'Invalid address';
                    break;
                
                default:
                    this.errorMessages[key] = inputValue.length >= 3 ? '' : 'Input is too short';
                    break;
            }

            this.checkDeliveryFormValidity()
        },
        isInputValid(key) {
            return this.errorMessages[key] === '';
        },
        getErrorMessage(key) {
            return this.errorMessages[key];
        },
        checkDeliveryFormValidity() {
            this.deliveryFormValid = Object.keys(this.formDataDelivery).every((key) => {
                return this.formDataDelivery[key] && this.isInputValid(key);
            });

            if(this.deliveryFormValid) {
                this.$store.commit('setFormDataDelivery', this.formDataDelivery)
                this.$store.dispatch('updateDeliveryFormValid', true);
            }
        },
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        validatePhone(phone) {
            const phoneRegex = /^(?:0)(?:\d{5,14}|\d{1,4}[-\s]\d{1,4}[-\s]\d{4,8}|\(\d{1,4}\)[-.\s]?\d{1,4}[-.\s]?\d{4,8})$/;
            return phoneRegex.test(phone);
        },
        validateAddress(address) {
            return address.trim() !== '' && address.length <= 120;
        },
        updateCounter(key) {
            if(key === 'address') {
                this.counter = 120 - this.formDataDelivery.address.length;
                const inputValue = this.formDataDelivery[key];

                if(this.counter !== 0 && inputValue.length <= 120) {
                    return true;
                } else {
                    return false;
                }
            }

        },
        clearInputFields() {
            this.formDataDelivery.email = '';
            this.formDataDelivery.phone = null;
            this.formDataDelivery.address = '';
            this.formDataDelivery.dropshipper_name = '';
            this.formDataDelivery.dropshipper_phone = null;
        }
    }
}
</script>