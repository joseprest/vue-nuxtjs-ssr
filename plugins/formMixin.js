export default {
    methods: {
        checkEmail(val) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.errors.email.status =  !re.test(val);
            this.errors.email.message = this.errors.email.status === true ?
                ( val ? this.$t('email-example') : this.$t('Please enter your email') ) : null;
        },
        checkPassword(val) {
            if(val === null)
                return;
            this.errors.password.status = (!val || val.length < 6);
            this.errors.password.message = this.errors.password.status === true ?
                (val ? this.$t('Please enter at least 6 characters') : this.$t('Please enter your password')) : null;
        },
        checkConfirmPassword(val) {
            if (val !== this.model.password) {
                this.errors.passwordConfirm.status = true;
                this.errors.passwordConfirm.message = this.$t('Please enter equal password');
            } else {
                this.errors.passwordConfirm.status = false;
                this.errors.passwordConfirm.message = '';
            }
        },
    }
}