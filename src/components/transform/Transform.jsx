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
        rawJson = JSON_DATA

        jsFunction = `function(input) {
            input?.map((item, itemIdx) => {
                item.id = itemIdx + 1
            })
            return input
        }`

        this.setState({ rawJson: rawJson, jsFunction: jsFunction })
    }

    action() {
        let { rawJson, jsFunction, output } = this.state;

        /* eslint no-eval: 0 */
        jsFunction = eval("(" + jsFunction + ")")

        let rawJsonCopy = JSON.parse(JSON.stringify(rawJson))

        output = jsFunction(rawJsonCopy)

        this.setState({ output: output })
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
                        <button onClick={this.action.bind(this)} className={'btn btn-sm btn-round btn-primary'} >
                            <span className={'px-1'}>{'Submit'}</span>
                        </button>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col>
                        <textarea name="output" value={JSON.stringify(output, undefined, 4)} onChange={(e) => this.setState({ output: e.target.value })} />
                    </Col>
                </Row>
            </div>
        )
    }
}