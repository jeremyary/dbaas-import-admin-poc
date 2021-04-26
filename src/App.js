import React from 'react';
import './App.css';
import topLeft from './top-left.png';
import topRight from './top-right.png';
import leftNav from './left-nav.png';

function toggleVendorTabTitle() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}

class VendorTabTitle extends React.Component {
    constructor(props) {
        super(props);
        // eslint-disable-next-line
        this.state = {
            active: true,
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleVendorTabTitle = toggleVendorTabTitle.bind(this);
    }

    render() {
        return (
            <div id="vendor-tab-title" className={this.state.active ? 'tab-title-selected' : 'tab-title'}>Vendor</div>
        );
    }
}

function toggleCredentialsTabTitle() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}


class CredentialsTabTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleCredentialsTabTitle = toggleCredentialsTabTitle.bind(this);
    }

    render() {
        return (
            <div id="credentials-tab-title" className={this.state.active ? 'tab-title-selected' : 'tab-title'}>Credentials</div>
        );
    }
}

function toggleInstancesTabTitle() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}

class InstancesTabTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleInstancesTabTitle = toggleInstancesTabTitle.bind(this);
    }

    render() {
        return (
            <div id="instances-tab-title" className={this.state.active ? 'tab-title-selected' : 'tab-title'}>Instances</div>
        );
    }
}

function toggleVendorSectionTitle() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}

class VendorSectionTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleVendorSectionTitle = toggleVendorSectionTitle.bind(this);
    }

    render() {
        return (
            <div className={"section-title " + (this.state.active ? null : 'hide')}>Vendor Selection</div>
        );
    }
}

function toggleCredentialsSectionTitle() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}

class CredentialsSectionTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleCredentialsSectionTitle = toggleCredentialsSectionTitle.bind(this);
    }

    render() {
        return (
            <div className={"section-title " + (this.state.active ? null : 'hide')}>MongoDB Atlas Credentials</div>
        );
    }
}

function toggleInstancesSectionTitle() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}

class InstancesSectionTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleInstancesSectionTitle = toggleInstancesSectionTitle.bind(this);
    }

    render() {
        return (
            <div className={"section-title " + (this.state.active ? null : 'hide')}>Database Instances Selection</div>
        );
    }
}

class VendorForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: false,
        };
    }
    toggleClass() {
        const currentState = this.state.active;
        toggleVendorTabTitle();
        toggleVendorSectionTitle()
        toggleCredentialsTabTitle();
        toggleCredentialsSectionTitle();
        toggleCredentialsForm();
        this.setState({active: !currentState});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.toggleClass();
    };

    render() {
        return (
            <form id="vendor-select-form" onSubmit={this.handleSubmit} className={this.state.active ? 'hide' : null}>
                <div className="radio-div">
                    <label className="radio-label">
                        <input type="radio" id="atlas" value="atlas" name="vendor" defaultChecked={true}/>
                        MongoDB Atlas
                    </label>
                    <br/>
                    <label className="radio-label">
                        <input type="radio" value="crunchy" name="vendor"/>
                        Crunchy Data PostgreSQL
                    </label>
                    <br/>
                    <label className="radio-label">
                        <input type="radio" value="cockroach" name="vendor"/>
                        CockroachCloud
                    </label>
                    <br/>
                    <label className="radio-label">
                        <input type="radio" value="couchbase" name="vendor"/>
                        Couchbase Cloud
                    </label>
                    <br/>
                    <br/>
                    <button id="vendor-select-button">Select</button>
                </div>
            </form>
        );
    }
}

function toggleCredentialsForm() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}

class CredentialsForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: true,
            orgPublicKey: '',
            orgPrivateKey: '',
            postResponse: '',
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleCredentialsForm = toggleCredentialsForm.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        toggleCredentialsTabTitle();
        toggleCredentialsSectionTitle();
        toggleInstancesTabTitle();
        toggleInstancesSectionTitle();
        toggleInstancesForm();
        this.setState({active: !currentState});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const requestOpts = {
            method: 'POST',
            headers: {
                'Authorization': '<redacted>',
                'Authentication': '<redacted>',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "apiVersion": "v1",
                "kind": "Secret",
                "metadata": {
                    "name": "dbaas-vendor-credentials-jary",
                    "namespace": "jary-test",
                    "labels": {
                        "related-to": "dbaas-operator",
                        "type": "dbaas-vendor-credentials"
                    }
                },
                "data": {
                    "org-public-key": Buffer.from(this.state.orgPublicKey).toString('base64'),
                    "org-private-key": Buffer.from(this.state.orgPrivateKey).toString('base64')
                },
                "type": "Opaque"
            })
        };
        fetch(
            '/api/v1/namespaces/jary-test/secrets',
            requestOpts
        )
            .then(response => response.json())
            .then(data =>this.setState({ postResponse: data }));
        console.log(this.state.postResponse);
        this.toggleClass();
    };

    render() {
        return (
            <form id="credentials-form" onSubmit={this.handleSubmit} className={this.state.active ? 'hide' : null}>
                <div className="radio-div">
                    <label className="text-field-label" htmlFor="orgPublicKey">
                        Organization Public Key
                    </label>
                    <br/>
                    <input id="orgPublicKey" className="text-field" value={this.state.orgPublicKey} name="orgPublicKey"
                        onChange={ event => this.setState({orgPublicKey: event.target.value })} />
                    <br/>
                    <label className="text-field-label" htmlFor="orgPrivateKey">
                        Organization Private Key
                    </label>
                    <br/>
                    <input id="orgPrivateKey" className="text-field" value={this.state.orgPrivateKey} name="orgPrivateKey"
                           onChange={ event => this.setState({orgPrivateKey: event.target.value })} />
                    <br/>
                    <button id="vendor-select-button">Select</button>
                </div>
            </form>
        );
    }
}

function toggleInstancesForm() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
}

class InstancesForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: true,
        };
    }

    componentDidMount() {
        // eslint-disable-next-line
        toggleInstancesForm = toggleInstancesForm.bind(this);
    }

    toggleClass() {
        // const currentState = this.state.active;
        // toggleCredentialsTabTitle();
        // toggleInstancesTabTitle();
        // toggleInstancesForm();
        // this.setState({active: !currentState});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.toggleClass();
    };

    render() {
        return (
            <form id="instances-form" onSubmit={this.handleSubmit} className={this.state.active ? 'hide' : null}>
                <div className="radio-div">
                    <label className="radio-label">
                        <input type="radio" id="atlas" value="atlas" name="vendor"/>
                        instances form
                    </label>
                    <br/>
                    <br/>
                    <button id="vendor-select-button">Select</button>
                </div>
            </form>
        );
    }
}

class App extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <header className="top-banner">
                        <img src={topLeft} className="top-left-banner" alt="top-left"/>
                        <img src={topRight} className="top-right-banner" alt="top-left"/>
                    </header>
                </div>
                <div className="left-nav">
                    <img src={leftNav} className="left-nav-img" alt="left-nav"/>
                </div>
                <div className="section-header-div">
                    <div className="section-padding-top">&nbsp;</div>
                    <div className="section-padding-left">&nbsp;</div>
                    <div className="section-breadcrumb">
                        <span className="breadcrumb-link">DBaaS Import</span>
                        <span className="breadcrumb-chevron"> > </span>
                        Vendor Details
                    </div>
                    <div className="section-title">DBaaS Import</div>
                    <div className="tab-divider">
                        <VendorTabTitle />
                        <CredentialsTabTitle />
                        <InstancesTabTitle />
                    </div>
                </div>
                <div className="form-div">
                    <VendorSectionTitle />
                    <CredentialsSectionTitle />
                    <InstancesSectionTitle />

                    <div id="form-container">
                        <VendorForm />
                        <CredentialsForm />
                        <InstancesForm />
                    </div>
                </div>
                &nbsp;
            </div>
        );
    }
}

export default App;