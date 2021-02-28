import React from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';

import {
  Form,
  AutoComplete,
  DatePicker,
} from 'antd';

const { RangePicker } = DatePicker;

const FilterForm = ({
  filter,
  setFilterDateStart,
  setFilterDateEnd,
  setFilterQuery,
}) => {
  const onSearch = q => {
    setFilterQuery(q);
  };

  const onSelect = selection => {
    console.log('Selection:', selection);
  };

  const onDateChange = dates => {
    const format = 'DD-MM-YYYY';
    const [start, end] = dates;

    setFilterDateStart(start.format(format));
    setFilterDateEnd(end.format(format));
  };

  return(<span/>);

  return (
    <Form layout="inline" name="basic" style={{ padding: '16px' }}>
      <Form.Item label="Search" name="query">
        <AutoComplete
          options={[]}
          value={filter.query}
          style={{ width: 500 }}
          onSelect={onSelect}
          onSearch={debounce(onSearch, 500)}
          placeholder="Name..."
        />
      </Form.Item>

      <Form.Item name="dates" label="Dates">
        <RangePicker onChange={onDateChange} />
      </Form.Item>
    </Form>
  );
};

FilterForm.propTypes = {
  setFilterDateStart: PropTypes.func,
  setFilterDateEnd: PropTypes.func,
  setFilterQuery: PropTypes.func,
  filter: PropTypes.object,
};

export default FilterForm;
