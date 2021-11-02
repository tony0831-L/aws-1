Vue.createApp({
    data(){
        return{
            first:"",
            last:"",
            weight:0,
            high:0,
            res:0,
            date:dayjs().format('YYYY/MM/DD'),
            time:dayjs().format('HH:mm:ss'),
        }
    },
    methods:{
        post(){
            this.res="pending....,pleas wait."
            fetch("https://bdth6z6245.execute-api.us-west-2.amazonaws.com/dev", {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "firstName": this.first,
                    "lastName": this.last ,
                    "height":this.high,
                    "weight":this.weight
                }),
            })
            .then(response => response.text())
            .then(result => {
                this.res=this.first+" "+this.last+". your bmi is:"+Math.round(parseFloat(JSON.parse(result).body)*100)/100;
            })
            .catch(error => console.log('error', error));
        }
    }
}).mount('#app')