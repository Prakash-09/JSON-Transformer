import React from 'react';
import { Row, Col } from 'reactstrap';

import { JSON_DATA } from './Transform.data';
import './Transform.css';

export default class Transform extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rawJson: [],
            jsFunction: '',
            output: []
        }
    }

    componentDidMount() {
        let { rawJson } = this.state;
        rawJson = JSON_DATA

        this.setState({ rawJson: rawJson })
    }

    action() {
        let { jsFunction } = this.state;

        /* eslint no-eval: 0 */
        let output = eval(jsFunction)

        console.log(output)

        // this.setState({ output: output })
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