import React from 'react';
import { storiesOf } from '@storybook/react';

import { DataTable } from '../../src/Data';
import { default as Tag } from '../../src/Tag';
import {wrapInApp } from './decorators'
import Panel from '../../src/Panel';
import { Action } from '../../src/Action';

const data = [
  {
    sku: 4356,
    label: "Mens",
    status: "On Hold"
  },
  {
    sku: 4357,
    label: "Washing Machine",
    status: "Fulfilled"
  },
  {
    sku: 4358,
    label: "Television",
    status: "Fulfilled"
  },
];

const columns = [
  function ({ sku }) {
    return <span style={{ color: "#4696dc" }}>#{sku}</span>
  },
  "label",
  function ({ status }) {
    return <Tag color={status === 'On Hold' ? "blue" : "green"}>{status}</Tag>
  }
];

storiesOf('DataTable', module)
  .add('normal' , wrapInApp([
    <DataTable columns={columns} data={data} />
  ]))
  .add('in panel' , wrapInApp([
    <Panel title={"Products"}>
      <DataTable columns={columns} data={data} />
      <Action icon={"up"} label={"Sort Ascending"} labelDisplay={"onHover"}></Action>

    </Panel>

  ]))
;
