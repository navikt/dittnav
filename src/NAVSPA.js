import React from 'react';
import ReactDOM from 'react-dom';

export default class NAVSPA {

    static importer(name) {
        class NAVSPAImporter extends React.Component {

            constructor(props) {
                super(props);
                this.state = {
                    hasError: false,
                };
            }

            componentDidCatch(error) {
                this.setState({ hasError: true });
            }

            componentDidMount() {
                try {
                    if (this.el) {
                        NAVSPA.scope[name](this.el, this.props);
                    }
                } catch (e) {
                    this.setState({ hasError: true });
                }
            }

            componentWillUnmount() {
                if (this.el) {
                    ReactDOM.unmountComponentAtNode(this.el);
                }
            }

            render() {
                return <div ref={el => (this.el = el)} />;
            }
        }

        return NAVSPAImporter;
    }

    static scope = (window.NAVSPA = window.NAVSPA || {});

}
