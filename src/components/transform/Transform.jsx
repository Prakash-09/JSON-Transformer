import React from 'react';
import { Row, Col } from 'reactstrap';

import { JSON_DATA } from './Transform.data';
import './Transform.css';

export default class Transform extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rawJson: [],
            jsFunction: undefined,
            output: []
        }
    }

    componentDidMount() {
        let { rawJson, jsFunction } = this.state;
        rawJson = JSON_DATA;

        jsFunction = `function transform(input) {
            let testTag = document.getElementById('test-tag');
            let newTag = document.createElement("p");
            let text = document.createTextNode("this is new tag with text")
            newTag.appendChild(text);
            testTag.appendChild(newTag);
        }`

        this.setState({ rawJson: rawJson, jsFunction: jsFunction })
    }

    action() {

        let { rawJson, jsFunction, output } = this.state;
        let validation = jsFunction.search("document")

        if (validation === -1) {
            /* eslint no-eval: 0 */
            jsFunction = eval("(" + jsFunction + ")")
            console.log("jsFunction", jsFunction)

            let rawJsonCopy = JSON.parse(JSON.stringify(rawJson))

            output = jsFunction(rawJsonCopy)

            this.setState({ output: output })
        } else {
            alert("Restricted DOM elements please don't use")
        }
    }

    render() {
        const { rawJson, jsFunction, output } = this.state;
        return (
            <div className='transformer-container p-3'>
                <Row xs="2">
                    <Col>
                        <textarea name="rawJson" value={JSON.stringify(rawJson, undefined, 4)} onChange={(e) => this.setState({ rawJson: e.target.value })} />
                    </Col>
                    <Col>
                        <textarea name="jsFunction" value={jsFunction} onChange={(e) => this.setState({ jsFunction: e.target.value })} />
                    </Col>
                </Row>
                <Row>
                    <Col className='text-right'>
                        <button onClick={this.action.bind(this, "text", "test")} className={'btn btn-sm btn-round btn-primary'} >
                            <span className={'px-1'}>{'Submit'}</span>
                        </button>
                    </Col>
                </Row><div id="test-tag"></div>
                <Row className='mt-2'>
                    <Col>
                        <textarea name="output" value={JSON.stringify(output, undefined, 4)} onChange={(e) => this.setState({ output: e.target.value })} />
                    </Col>
                </Row>
            </div>
        )
    }
}