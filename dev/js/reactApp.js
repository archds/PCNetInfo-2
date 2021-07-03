import React from 'react'
import {gql, GraphQLClient} from "graphql-request";


export class AddElementDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.client = new GraphQLClient('/api/')
        this.state = {}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.createPC = this.createPC.bind(this)
    }

    handleInputChange(event) {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        value = event.target.type === 'number' ? parseInt(value) * 1024 * 1024 : value
        const name = event.target.name

        this.setState({
            [name]: value
        })
    }


    createPC(event) {
        event.preventDefault()
        for (const input of this.props.inputs) {
            const inputElement = event.target.parentNode.querySelector(`input[name=${input.id}]`)
            if (inputElement.required) {
                if (inputElement.value) {
                    inputElement.classList.add('is-valid')
                } else {
                    inputElement.classList.add('is-invalid')
                    inputElement.addEventListener('input', () => {
                        inputElement.classList.remove('is-invalid')
                        inputElement.classList.add('is-valid')
                    }, {once: true})
                }
            }
        }
        if (event.target.parentNode.querySelector('.is-invalid')) return
        const query = gql`mutation CreatePC($input: CreatePCInput) {
            createPC(input_data: $input)
        }`
        console.log(this.state)
        this.client.request(query, {input: this.state}).then(data => {
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                <h5 className="">{this.props.header}</h5>
                <form action="">
                    {this.props.inputs.map((input, index) => {
                        return <label className="form-label" key={index} htmlFor={input.id}>{input.label}
                            <input name={input.id} type={input.type} className="form-control form-control-sm"
                                   onChange={this.handleInputChange} required={true}/>
                        </label>
                    })}
                    <button type="submit" className={"btn btn-primary"} onClick={this.createPC}>Create!</button>
                </form>
            </div>
        );
    }
}

