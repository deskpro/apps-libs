import React from 'react';
import { storiesOf } from '@storybook/react';


import { DataList } from '../../src/Data';
import { Action } from '../../src/Action';
import {wrapInApp } from './decorators'


const data = [
  {
    label: "Owner",
    value: "Name Surname"
  },
  {
    label: "Type",
    value: "Customer"
  },
  {
    label: "Industry",
    value: "Retail"
  },
  {
    label: "Billing City",
    value: "London"
  },
  {
    label: "Billing Country",
    value: "United Kingdom"
  },
];


storiesOf('DataList', module)
  .add('normal' , wrapInApp([
    <DataList title={"Company"} data={data} >
      <Action icon={"edit"} label={"Edit"}></Action>
    </DataList>
  ]))
;
