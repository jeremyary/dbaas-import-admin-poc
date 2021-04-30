import React from "react";
import "./App.css";
import "@patternfly/react-core/dist/styles/base.css";
import topLeft from "./top-left.png";
import topRight from "./top-right.png";
import leftNav from "./left-nav.png";
import InstanceTable from "./components/InstanceTable";

function toggleVendorTabTitle() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
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
      <div
        id="vendor-tab-title"
        className={this.state.active ? "tab-title-selected" : "tab-title"}
      >
        Vendor
      </div>
    );
  }
}

function toggleCredentialsTabTitle() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
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
      <div
        id="credentials-tab-title"
        className={this.state.active ? "tab-title-selected" : "tab-title"}
      >
        Credentials
      </div>
    );
  }
}

function toggleInstancesTabTitle() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
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
      <div
        id="instances-tab-title"
        className={this.state.active ? "tab-title-selected" : "tab-title"}
      >
        Instances
      </div>
    );
  }
}

function toggleVendorSectionTitle() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
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
      <div className={"section-title " + (this.state.active ? null : "hide")}>
        Vendor Selection
      </div>
    );
  }
}

function toggleCredentialsSectionTitle() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
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
      <div className={"section-title " + (this.state.active ? null : "hide")}>
        MongoDB Atlas Credentials
      </div>
    );
  }
}

function toggleInstancesSectionTitle() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
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
      <div className={"section-title " + (this.state.active ? null : "hide")}>
        Database Instances Selection
      </div>
    );
  }
}

class VendorForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: true,
    };
  }
  toggleClass() {
    const currentState = this.state.active;
    toggleVendorTabTitle();
    toggleVendorSectionTitle();
    toggleCredentialsTabTitle();
    toggleCredentialsSectionTitle();
    toggleCredentialsForm();
    this.setState({ active: !currentState });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.toggleClass();
  };

  render() {
    return (
      <form
        id="vendor-select-form"
        onSubmit={this.handleSubmit}
        className={this.state.active ? null : "hide"}
      >
        <div className="radio-div">
          <label className="radio-label">
            <input
              type="radio"
              id="atlas"
              value="atlas"
              name="vendor"
              className="select-radio-input"
              defaultChecked={true}
            />
            MongoDB Atlas
          </label>
          <br />
          <label className="radio-label">
            <input
              type="radio"
              value="crunchy"
              name="vendor"
              className="select-radio-input"
            />
            Crunchy Data PostgreSQL
          </label>
          <br />
          <label className="radio-label">
            <input
              type="radio"
              value="cockroach"
              name="vendor"
              className="select-radio-input"
            />
            CockroachCloud
          </label>
          <br />
          <label className="radio-label">
            <input
              type="radio"
              value="couchbase"
              name="vendor"
              className="select-radio-input"
            />
            Couchbase Cloud
          </label>
          <br />
          <br />
          <button id="vendor-select-button" className="select-button">
            Select
          </button>
        </div>
      </form>
    );
  }
}

function toggleCredentialsForm() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
}

class CredentialsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false,
      orgId: "6084842689a3a50549e9c5b0",
      orgPublicKey: "grljrhma",
      orgPrivateKey: "fe84a759-8d96-4926-8482-3075f411111a",
      postResponse: "",
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
    doStatusFetch();
    this.setState({ active: !currentState });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let requestOpts = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_OCP_API_AUTHORIZATION,
        Authentication:
          "Bearer: " + process.env.REACT_APP_OCP_API_AUTHENTICATION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        apiVersion: "v1",
        kind: "Secret",
        metadata: {
          name: "dbaas-vendor-credentials-jary",
          namespace: process.env.REACT_APP_OCP_NAMESPACE,
          labels: {
            "related-to": "dbaas-operator",
            type: "dbaas-vendor-credentials",
          },
        },
        data: {
          orgId: Buffer.from(this.state.orgId).toString("base64"),
          publicApiKey: Buffer.from(this.state.orgPublicKey).toString("base64"),
          privateApiKey: Buffer.from(this.state.orgPrivateKey).toString(
            "base64"
          ),
        },
        type: "Opaque",
      }),
    };
    fetch('/api/v1/namespaces/' + process.env.REACT_APP_OCP_NAMESPACE + '/secrets', requestOpts)
      .then((response) => response.json())
      .then((data) => this.setState({ postResponse: data }));

    requestOpts = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_OCP_API_AUTHORIZATION,
        Authentication:
          "Bearer: " + process.env.REACT_APP_OCP_API_AUTHENTICATION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        apiVersion: "dbaas.redhat.com/v1",
        kind: "DBaaSService",
        metadata: {
          name: "atlas-dbaas-service",
          namespace: process.env.REACT_APP_OCP_NAMESPACE,
          labels: {
            "related-to": "dbaas-operator",
            type: "dbaas-vendor-service",
          },
        },
        spec: {
          provider: {
            name: "MongoDB Atlas",
          },
          credentialsSecretName: "dbaas-vendor-credentials-jary",
          credentialsSecretNamespace: process.env.REACT_APP_OCP_NAMESPACE,
        },
      }),
    };
    fetch(
      '/apis/dbaas.redhat.com/v1/namespaces/' + process.env.REACT_APP_OCP_NAMESPACE + '/dbaasservices',
      requestOpts
    )
      .then((response) => response.json())
      .then((data) => this.setState({ postResponse: data }));

    this.toggleClass();
  };

  render() {
    return (
      <form
        id="credentials-form"
        onSubmit={this.handleSubmit}
        className={this.state.active ? null : "hide"}
      >
        <div className="radio-div">
          <label className="text-field-label" htmlFor="orgId">
            Organization ID
          </label>
          <br />
          <input
            id="orgId"
            className="text-field"
            value={this.state.orgId}
            name="orgId"
            onChange={(event) => this.setState({ orgId: event.target.value })}
          />
          <br />
          <label className="text-field-label" htmlFor="orgPublicKey">
            Organization Public Key
          </label>
          <br />
          <input
            id="orgPublicKey"
            className="text-field"
            value={this.state.orgPublicKey}
            name="orgPublicKey"
            onChange={(event) =>
              this.setState({ orgPublicKey: event.target.value })
            }
          />
          <br />
          <label className="text-field-label" htmlFor="orgPrivateKey">
            Organization Private Key
          </label>
          <br />
          <input
            id="orgPrivateKey"
            className="text-field"
            value={this.state.orgPrivateKey}
            name="orgPrivateKey"
            onChange={(event) =>
              this.setState({ orgPrivateKey: event.target.value })
            }
          />
          <br />
          <button id="credential-select-button" className="select-button">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

function toggleInstancesForm() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
}

function doStatusFetch() {
  setTimeout(
    function () {
      var requestOpts = {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + process.env.REACT_APP_OCP_API_AUTHORIZATION,
          Authentication:
            "Bearer: " + process.env.REACT_APP_OCP_API_AUTHENTICATION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch(
        '/apis/dbaas.redhat.com/v1/namespaces/' + process.env.REACT_APP_OCP_NAMESPACE + '/dbaasservices/atlas-dbaas-service',
        requestOpts
      )
        .then((response) => response.json())
        .then((data) => parsePayload(data));
      this.setState({ showResults: true });
    }.bind(this),
    3000
  );
}

function parsePayload(responseJson) {
  let instances = [];
  responseJson.status.projects.forEach(function (value) {
    value.clusters.forEach(function (value) {
      instances.push(value);
    });
  });
  this.setState({ instances: instances });
}

class InstancesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      showResults: false,
      instances: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    toggleInstancesForm = toggleInstancesForm.bind(this);
    // eslint-disable-next-line
    doStatusFetch = doStatusFetch.bind(this);
    // eslint-disable-next-line
    parsePayload = parsePayload.bind(this);
  }

  render() {
    return (
      <form id="instances-form" className={this.state.active ? null : "hide"}>
        <div className="instance-table">
          <InstanceTable isLoading={!this.state.showResults} data={this.state.instances}/>
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
            <img src={topLeft} className="top-left-banner" alt="top-left" />
            <img src={topRight} className="top-right-banner" alt="top-left" />
          </header>
        </div>
        <div className="left-nav">
          <img src={leftNav} className="left-nav-img" alt="left-nav" />
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
