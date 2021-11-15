import wNumb from 'wnumb'
import Vue from 'vue'

Vue.prototype.eur = wNumb({
	mark:',',
	thousand: '.',
	suffix: ' €',
	decimals: 2
});
Vue.prototype.eur_nz = wNumb({
	mark:',',
	thousand: '.',
	suffix: ' €',
	decimals: 0
});

Vue.prototype.gbp = wNumb({
	mark:',',
	thousand: '.',
	suffix: ' £',
	decimals: 2
});

Vue.prototype.gbp_nz = wNumb({
	mark:',',
	thousand: '.',
	suffix: ' £',
	decimals: 0
});

Vue.prototype.jpy = wNumb({
	mark:'.',
	thousand: ',',
	prefix: '‎¥‎ ',
	decimals: 2
});

Vue.prototype.jpy_nz = wNumb({
	mark:'.',
	thousand: ',',
	prefix: '¥‎ ',
	decimals: 2
});

Vue.prototype.usd = wNumb({
	mark:'.',
	thousand: ',',
	prefix: '$ ',
	decimals: 2
});

Vue.prototype.usd_suffix = wNumb({
	mark:'.',
	thousand: ',',
    suffix: ' $',
	decimals: 2
});

Vue.prototype.jpy_suffix = wNumb({
	mark:'.',
	thousand: ',',
    suffix: ' ¥',
	decimals: 2
});

Vue.prototype.usd_nz = wNumb({
	mark:'.',
	thousand: ',',
	prefix: '$ ',
	decimals: 0
});

Vue.prototype.pln = wNumb({
	mark:'.',
	thousand: ',',
	suffix: ' PLN',
	decimals: 2
});

Vue.prototype.pln_nz = wNumb({
	mark:'.',
	thousand: ',',
	suffix: ' PLN',
	decimals: 0
});

Vue.prototype.percentage = wNumb({
	suffix: '%',
	decimals: 0
});



