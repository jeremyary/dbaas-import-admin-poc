import React from 'react';
import _ from 'lodash';
import {
  Table,
  TableHeader,
  TableBody,
  RowSelectVariant,
  wrappable
} from '@patternfly/react-table';
import {
  Title,
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Button
} from '@patternfly/react-core';

class InstanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Instance' },
        { title: 'Size', transforms: [wrappable] },
        { title: 'Provider', transforms: [wrappable] },
        { title: 'Region', transforms: [wrappable] },
        { title: 'ID' }
      ],
      rows: [],
      selectedInstance: {}
    };
    this.onSelect = this.onSelect.bind(this);
    this.getRows = this.getRows.bind(this);
    this.submitInstances = this.submitInstances.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.data && this.props.data.length > 0 && !_.isEqual(prevProps.data, this.props.data)) {
      this.getRows(this.props.data);
    }
  }

  getRows(data) {
    let rowList = [];
    if (data) {
      _.forEach(data, rowData => {
        rowList.push({ cells: [rowData.name, rowData.instanceSizeName, rowData.cloudProvider, rowData.cloudRegion, rowData.id] })
      })
    };

    this.setState({ rows: rowList });
  };

  onSelect(event, isSelected, rowId) {
    let rows = this.state.rows.map((oneRow, index) => {
      oneRow.selected = rowId === index;
      return oneRow;
    });
    this.setState({
      selectedInstance: this.props.data[rowId],
      rows: rows
    });
  }

  submitInstances() {
    let patch = [
      {
        "op": "add",
        "path": "/spec/selectedForImport",
        "value": [ this.state.selectedInstance.id ]
      }
    ]
    let requestOpts = {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_OCP_API_AUTHORIZATION,
        Authentication:
            "Bearer: " + process.env.REACT_APP_OCP_API_AUTHENTICATION,
        "Content-Type": "application/json-patch+json",
        Accept: "application/json",
      },
      body: JSON.stringify(patch),
    };
    fetch(
        '/apis/dbaas.redhat.com/v1/namespaces/' + process.env.REACT_APP_OCP_NAMESPACE + '/dbaasservices/atlas-dbaas-service',
        requestOpts
    )
        .then((response) => response.json())
        .then((data) => this.setState({ postResponse: data }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.submitInstances();
  };

  render() {
    const { columns, rows } = this.state;

    if (this.props.isLoading) {
      return (
        <EmptyState>
          <EmptyStateIcon variant="container" component={Spinner} />
          <Title size="lg" headingLevel="h3">
            Fetching instances from Atlas...
          </Title>
        </EmptyState>
      )
    }

    return (
      <div>
        <Table
          onSelect={this.onSelect}
          selectVariant={RowSelectVariant.radio}
          aria-label="Instance Table"
          cells={columns}
          rows={rows}
        >
          <TableHeader />
          <TableBody />
        </Table>
        <br/>
        <br/>
        <div className={this.props.isLoading ? "hide" : null}>
          <Button id="instance-select-button" variant="primary" onClick={this.handleSubmit} isDisabled={_.isEmpty(this.state.selectedInstance)}>
            Connect
          </Button>
        </div>
      </div>
    );
  }
}

export default InstanceTable;