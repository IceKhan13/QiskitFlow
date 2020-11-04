/**
 *
 * ExperimentsList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  Table,
  Button,
  Tag,
  Pagination,
  Form,
  AutoComplete,
  DatePicker,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import {
  makeSelectExperimentListItems,
  makeSelectExperimentListLoading,
  makeSelectExperimentListPage,
  makeSelectExperimentListTotal,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getExperimentsAction } from './actions';

const { RangePicker } = DatePicker;

const FilterForm = ({ page, getExperiments }) => {
  const [query, setQuery] = useState('');
  const [dateStart, setDateStart] = useState(false);
  const [dateEnd, setDateEnd] = useState(false);

  const onSearch = q => {
    setQuery(q);
    dispatchRequest();
  };

  const onSelect = selection => {
    console.log('Selection:', selection);
  };

  const onDateChange = dates => {
    const format = 'DD-MM-YYYY';
    const [start, end] = dates;

    setDateStart(start.format(format));
    setDateEnd(end.format(format));

    dispatchRequest();
  };

  const dispatchRequest = () => getExperiments(page, query, dateStart, dateEnd);

  return (
    <Form layout="inline" name="basic" style={{ padding: '16px' }}>
      <Form.Item label="Search" name="query">
        <AutoComplete
          options={[]}
          style={{ width: 500 }}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="Experiment name..."
        />
      </Form.Item>

      <Form.Item name="dates" label="Dates">
        <RangePicker onChange={onDateChange} />
      </Form.Item>
    </Form>
  );
};

FilterForm.propTypes = {
  page: PropTypes.number,
  getExperiments: PropTypes.func,
};

const expandedRowRender = record => {
  const columns = [
    {
      title: 'Run id',
      dataIndex: 'uuid',
      key: 'uuid',
      render: uuid => <Link to={`/runs/${uuid}`}>{`Run [${uuid}]`}</Link>,
    },
    {
      title: 'Metrics',
      dataIndex: 'metrics',
      key: 'metrics',
      render: metrics => {
        const metricsList = metrics.map((m, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`metric_${m.name}_${i}`}>{`${m.name}: ${m.value}`}</div>
        ));
        return <span>{metricsList}</span>;
      },
    },
    {
      title: 'Parameters',
      dataIndex: 'parameters',
      key: 'parameters',
      render: parameters => {
        const parametersList = parameters.map((p, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`param_${p.name}_${i}`}>{`${p.name}: ${p.value}`}</div>
        ));
        return <span>{parametersList}</span>;
      },
    },
    {
      title: '# measurements',
      dataIndex: 'measurements',
      key: 'measurements',
      render: measurements => measurements.length,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <span>
          <Button danger size="small" type="text" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={record.runs}
      pagination={false}
    />
  );
};

const key = 'experiments';

export function ExperimentsList({
  loading,
  page,
  total,
  items,
  getExperiments,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (items.length === 0) getExperiments(1);
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, row) => <Link to={`/experiments/${row.id}`}>{name}</Link>,
    },
    {
      title: '# of runs',
      dataIndex: 'runs',
      key: 'runs',
      render: runs => runs.length,
    },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Date', dataIndex: 'created_at', key: 'created_at' },
    {
      title: 'Tags',
      key: 'tags',
      render: row => {
        const tagsList = row.tags.map((tag, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tag key={`tags_${tag}_${i}`}>{tag}</Tag>
        ));
        return <div>{tagsList}</div>;
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Experiments</title>
        <meta name="description" content="QiskitFlow. Experiments list." />
      </Helmet>
      <FilterForm page={page} getExperiments={getExperiments} />
      <Table
        loading={loading}
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={items}
        pagination={
          <Pagination
            onChange={p => getExperiments(p)}
            defaultCurrent={1}
            current={page}
            total={total}
          />
        }
      />
    </div>
  );
}

ExperimentsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number,
  total: PropTypes.number,
  items: PropTypes.array,
  getExperiments: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectExperimentListLoading(),
  page: makeSelectExperimentListPage(),
  total: makeSelectExperimentListTotal(),
  items: makeSelectExperimentListItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getExperiments: (page, query, dateStart, dateEnd) =>
      dispatch(getExperimentsAction(page, query, dateStart, dateEnd)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExperimentsList);
