Vue.createApp({
    data(){
        return{
            first:"",
            last:"",
            weight:0,
            high:0,
            res:"",
            date:dayjs().format('YYYY/MM/DD'),
            time:dayjs().format('HH:mm:ss'),
            history:[],
        }
    },
    methods:{
        post(){
            this.res="pending....,pleas wait."
            this.get()
            fetch("https://bdth6z6245.execute-api.us-west-2.amazonaws.com/dev", {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "methods": 'post',
                    "firstName": this.first,
                    "lastName": this.last ,
                    "height":this.high,
                    "weight":this.weight
                }),
            })
            .then(response => response.text())
            .then(result => {
                this.res=this.first+" "+this.last+". your bmi is:"+Math.round(parseFloat(JSON.parse(result).body)*100)/100;
                this.get()
            })
            .catch(error => console.log('error', error));
        },
        get(){
            fetch("https://bdth6z6245.execute-api.us-west-2.amazonaws.com/dev", {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "methods": 'get',
                }),
            })
            .then(response => response.text())
            .then(result => {
                this.history = (JSON.parse(result).body).Items
            })
            .catch(error => console.log('error', error));
        },
        del(id){
            fetch("https://bdth6z6245.execute-api.us-west-2.amazonaws.com/dev", {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "methods": 'del',
                    "item":id
                }),
            })
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result).body)
                this.get()
            })
            .catch(error => console.log('error', error));
        },
    },
    mounted(){
        this.get()
    }
}).mount('#app')