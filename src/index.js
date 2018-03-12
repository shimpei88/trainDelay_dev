import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const template = document.getElementById('app')
const ENDPOINT = 'https://rti-giken.jp/fhc/api/train_tetsudo/delay.json'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            searchWord: ""
        }
        this.getData = this.getData.bind(this);
    }
    getData() {
        axios.get(ENDPOINT)
        .then((response) => {
            this.setState({
                data: response.data
            })
            // const filterEle = this.state.data.filter((element, index, array) => {
            //     if (element.name) {
            //         return element.name === this.state.searchWord
            //     } else {
            //         return
            //     }
            // })
            // console.log(filterEle)
            // console.log(this.state.searchWord)
            this.refs.newText.value = ''
        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <section>
                <h1><img src="/train_icon.png" alt="train icon"/></h1>
                <p>遅延情報を知りたい<br/>沿線名を入力してください</p>
                <div className="info">
                    <input type="text" value={this.state.searchWord} placeholder="例：山手線" onChange={(e) => this.setState({searchWord: e.target.value})} ref="newText"/>
                    <button onClick={this.getData}>調べる</button>
                </div>
                {
                    this.state.data.filter((element, index, array) => {
                        if (element.name) {
                            const output = element.name === this.state.searchWord
                            `<p>${output}</p>`
                        } else {
                            return
                        }
                    })
                }
            </section> 
        )
    }
}

ReactDOM.render( <App />, template )