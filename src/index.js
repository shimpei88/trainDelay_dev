import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const template = document.getElementById('app')
const ENDPOINT = 'https://rti-giken.jp/fhc/api/train_tetsudo/delay.json'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            isDelay: true
        }
        this.searchWord = ''
        this.getData = this.getData.bind(this);
    }
    getData() {
        axios.get(ENDPOINT)
        .then((response) => {
            const filterEle = response.data.filter((element, index, array) => {
                return element.name === this.searchWord
            })
            
            if (filterEle.length > 0) {
                this.setState({
                    isDelay: true,
                    name: filterEle[0].name
                })
            } else {
                this.setState({
                    isDelay: false
                })
            }
            this.refs.newText.value = ''
            this.searchWord = ''
        })
        .catch((error) => {
            console.log(error)
        })
        this.setState({
            isDelay: true
        })
    }
    render() {
        let result = null
        if (this.state.name && this.state.isDelay) {
            result = <p className="result"><span>{this.state.name}</span><br/>現在遅延しています<br/>余裕を持って行動してください</p>
        } else if (!this.state.isDelay ) {
            if (this.searchWord === '') {
                result = null
            } else {
                result = <p className="result"><span>{this.searchWord}</span><br/>事故・遅延情報はありません</p> 
            }
        }
        return (
            <section>
                <h1><img src="./train_icon.png" alt="train icon"/></h1>
                <p>遅延情報が知りたい<br/>沿線名を入力してください</p>
                <div className="info">
                    <input type="text" placeholder="例：山手線" onChange={(e) => this.searchWord = e.target.value} ref="newText"/>
                    <button onClick={this.getData}>調べる</button>
                </div>
                {result}
            </section> 
        )
    }
}

ReactDOM.render( <App />, template )