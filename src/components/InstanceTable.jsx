import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  RowSelectVariant,
} from '@patternfly/react-table';

class InstanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Repositories' },
        { title: 'Branches' },
        { title: 'Pull requests' },
        { title: 'Workspaces' },
        { title: 'Last commit' },
      ],
      rows: [
        {
          cells: ['one', 'two', 'a', 'four', 'five']
        },
        {
          cells: ['a', 'two', 'k', 'four', 'five'],
        },
        {
          cells: ['p', 'two', 'b', 'four', 'five']
        }
      ]
    };
    this.onSelect = this.onSelect.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  onSelect(event, isSelected, rowId) {
    let rows = this.state.rows.map((oneRow, index) => {
      oneRow.selected = rowId === index;
      return oneRow;
    });
    this.setState({
      rows
    });
  }

  toggleSelect(checked) {
    this.setState({
      canSelectAll: checked
    });
  }

  render() {
    const { columns, rows } = this.state;

    return (
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
    );
  }
}

export default InstanceTable;