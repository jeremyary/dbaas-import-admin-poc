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
        { title: 'Cloud Provider', transforms: [wrappable] },
        { title: 'Cloud Region', transforms: [wrappable] },
        { title: 'ID' },
        { title: 'Instance Size Name', transforms: [wrappable] },
        { title: 'Name' }
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
        rowList.push({ cells: _.values(rowData) })
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
    // TODO reach back out and I can help wire this up once we have the instance selection form done
    console.log(this.state.selectedInstance);
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